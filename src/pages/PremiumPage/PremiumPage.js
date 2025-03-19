import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PremiumPage.css";
import image from "../../images/stock.jpg"
import { Url, config } from "../../Url";
import moment from "moment";



const PremiumPage = () => {

  const [expiryDate, setExpiryDate] = useState(null);
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    fetchSubscriptionData();
  }, [])

  const navigate = useNavigate();
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const fetchSubscriptionData = async () => {
    const response = await axios.get(`${Url}/user`, config);
    const fetchedDate = response.data.payload[0].expiryDate
    setExpiryDate(fetchedDate);

    // Calculate remaining days
    const today = moment();
    const expiryMoment = moment(fetchedDate, "YYYY-MM-DD");
    const diffDays = expiryMoment.diff(today, "days");
    setDaysLeft(diffDays + 1);
  }

  const displayRazorpay = async (amount, planName) => {
    // Load Razorpay SDK
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // Create an order by calling the backend
    const result = await axios.post(`${Url}/payment/createOrder`, {
      amount: amount * 100, // Convert to paise
      currency: "INR",
    });

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount: orderAmount, id: order_id, currency } = result.data;

    // Razorpay options
    const options = {
      key: process.env.RAZORPAY_KEY_ID, // Replace with your Razorpay Test Key ID
      amount: orderAmount.toString(),
      currency: currency,
      name: "Stocknest",
      description: planName,
      image: `${image}`, // Replace with your logo URL
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        // Verify payment on the backend
        const result = await axios.post(`${Url}/payment/verifyPayment`, data);

        if (result.data.msg === "success") {
          const paymentDetails = await axios.get(
            `${Url}/payment/getPaymentDetails/${response.razorpay_payment_id}`
          );

          const userData = await axios.get(`${Url}/user`, config);
          const currentExpiryDate = userData.data.payload[0].expiryDate || moment().format("YYYY-MM-DD");

          let newExpiryDate;
          let planInfo = "";

          // Determine the new expiry date based on the payment amount
          switch (amount) {
            case 1299:
              newExpiryDate = moment(currentExpiryDate).add(3, "months").format("YYYY-MM-DD");
              planInfo = "3 Months Plan";
              break;
            case 499:
              newExpiryDate = moment(currentExpiryDate).add(1, "month").format("YYYY-MM-DD");
              planInfo = "1 Month Plan";
              break;
            case 4999:
              newExpiryDate = moment(currentExpiryDate).add(1, "year").format("YYYY-MM-DD");
              planInfo = "1 Year Plan";
              break;
            default:
              console.error("Invalid payment amount");
              return;
          }

          // Send updated expiry date to the API
          await axios.put(`${Url}/user/update-profile`, { expiryDate: newExpiryDate, plan: planInfo }, config);

          // Redirect to success page with payment details
          navigate("/success", {
            state: {
              paymentId: paymentDetails.data.paymentId,
              amount: paymentDetails.data.amount,
              status: paymentDetails.data.status,
            },
          });
          // Redirect or update user's premium status here
        } else {
          alert("Fake Payment Failed");
        }
      },
      prefill: {
        name: "Tony Stark", // Replace with test user's name
        email: "test@example.com", // Replace with test user's email
        contact: "9999999999", // Replace with test user's phone number
      },
      notes: {
        address: "Test Address",
      },
      theme: {
        color: "#d3dc00",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="premium-container">
      {/* Header Section */}
      <header className="premium-header">
        <h1 className="premium-title">Upgrade to Premium</h1>
        <p className="premium-description">
          Unlock advanced features and take your business to the next level with our premium plans.
        </p>

      </header>
      <u><p
        style={{
          textAlign: "right",
          fontWeight: "bold",
          color: expiryDate && moment(expiryDate).isAfter(moment()) ? "yellow" : "red",
        }}
      >
        {expiryDate ? (
          moment(expiryDate).isAfter(moment()) ? (
            <>
              Your current plan will expire on {moment(expiryDate).format("DD/MM/YYYY")} ({daysLeft} days left)
            </>
          ) : (
            <>
              Your current plan already expired on {moment(expiryDate).format("DD/MM/YYYY")}, Upgrade Plan!
            </>
          )
        ) : (
          "No subscription found. Please subscribe to a plan!"
        )}
      </p>
      </u>



      {/* Pricing Cards Section */}
      <div className="pricing-cards">
        {/* 1 Month Plan */}
        <div style={{ backgroundColor: "#ffecec" }} className="pricing-card">
          <div className="card-header">
            <h2 className="plan-title">1 Month Plan</h2>
            <p className="plan-subtitle">Perfect for short-term needs</p>
          </div>
          <div className="card-body">
            <p className="plan-price">₹499 <span className="plan-duration">/ month</span></p>
            <ul className="plan-features">
              <li>Access to all features</li>
              <li>Priority customer support</li>
              <li>Unlimited bill generation</li>
              <li>Advanced reporting tools</li>
            </ul>
            <button
              onClick={() => displayRazorpay(499, "1 Month Plan")}
              className="buy-now-button"
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* 3 Months Plan */}
        <div style={{ backgroundColor: "rgb(239 255 236)" }} className="pricing-card popular-card">
          <div className="popular-badge">Most Popular</div>
          <div className="card-header">
            <h2 className="plan-title">3 Months Plan</h2>
            <p className="plan-subtitle">Great value for small businesses</p>
          </div>
          <div className="card-body">
            <p className="plan-price">₹1299 <span className="plan-duration">/ 3 months</span></p>
            <ul className="plan-features">
              <li>Access to all features</li>
              <li>Priority customer support</li>
              <li>Unlimited bill generation</li>
              <li>Advanced reporting tools</li>
              <li>Save 10% compared to monthly billing</li>
            </ul>
            <button
              onClick={() => displayRazorpay(1299, "3 Months Plan")}
              className="buy-now-button"
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* 1 Year Plan */}
        <div style={{ backgroundColor: "rgb(255 248 214)" }} className="pricing-card">
          <div className="card-header">
            <h2 className="plan-title">1 Year Plan</h2>
            <p className="plan-subtitle">Best for long-term growth</p>
          </div>
          <div className="card-body">
            <p className="plan-price">₹4999 <span className="plan-duration">/ year</span></p>
            <ul className="plan-features">
              <li>Access to all features</li>
              <li>Priority customer support</li>
              <li>Unlimited bill generation</li>
              <li>Advanced reporting tools</li>
              <li>Save 25% compared to monthly billing</li>
            </ul>
            <button
              onClick={() => displayRazorpay(4999, "1 Year Plan")}
              className="buy-now-button"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      {/* Additional Features Section */}
      <section className="additional-features">
        <h2 className="features-title">Why Choose Premium?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <i className="fas fa-chart-line feature-icon"></i>
            <h3 className="feature-title">Advanced Analytics</h3>
            <p className="feature-description">
              Get detailed insights and reports to grow your business.
            </p>
          </div>
          <div className="feature-card">
            <i className="fas fa-headset feature-icon"></i>
            <h3 className="feature-title">Priority Support</h3>
            <p className="feature-description">
              Dedicated support team available 24/7 to assist you.
            </p>
          </div>
          <div className="feature-card">
            <i className="fas fa-shield-alt feature-icon"></i>
            <h3 className="feature-title">Enhanced Security</h3>
            <p className="feature-description">
              Your data is safe with our advanced security measures.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PremiumPage;