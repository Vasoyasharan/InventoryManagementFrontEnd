import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PremiumPage.css";
import image from "../../images/stock.jpg";
import { Url, config } from "../../Url";
import moment from "moment";
import SuccessPage from "./SuccessPage"; // Import the SuccessPage as a modal

const PremiumPage = () => {
  const [expiryDate, setExpiryDate] = useState(null);
  const [daysLeft, setDaysLeft] = useState(0);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false); // State to control modal visibility
  const [paymentDetails, setPaymentDetails] = useState({}); // State to store payment details
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const navigate = useNavigate();

  // Fetch subscription data
  const fetchSubscriptionData = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await axios.get(`${Url}/user`, config);
      const fetchedDate = response.data.payload[0].expiryDate;
      setExpiryDate(fetchedDate);

      // Calculate remaining days
      const today = moment();
      const expiryMoment = moment(fetchedDate, "YYYY-MM-DD");
      const diffDays = expiryMoment.diff(today, "days");
      setDaysLeft(diffDays + 1);
    } catch (error) {
      console.error("Error fetching subscription data:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchSubscriptionData();
  }, []);

  // Load Razorpay script
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

  // Handle payment success
  const handlePaymentSuccess = (paymentId, amount, status) => {
    setPaymentDetails({ paymentId, amount, status });
    setIsPaymentSuccess(true); // Show the modal
  };

  // Close the modal
  const closeModal = () => {
    setIsPaymentSuccess(false); // Hide the modal
  };

  // Display Razorpay payment form
  const displayRazorpay = async (amount, planName) => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // Create an order
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
      image: `${image}`,
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        // Verify payment
        const result = await axios.post(`${Url}/payment/verifyPayment`, data);

        if (result.data.msg === "success") {
          // Show the payment success modal
          handlePaymentSuccess(response.razorpay_payment_id, amount, "success");

          // Update user's expiry date
          const userData = await axios.get(`${Url}/user`, config);
          const currentExpiryDate = userData.data.payload[0].expiryDate || moment().format("YYYY-MM-DD");

          let newExpiryDate;
          let planInfo = "";

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

          // Update expiry date in the backend
          await axios.put(`${Url}/user/update-profile`, { expiryDate: newExpiryDate, plan: planInfo }, config);

          // Fetch the updated subscription data
          await fetchSubscriptionData(); // Fetch latest data
        } else {
          alert("Payment verification failed");
        }
      },
      prefill: {
        name: "Tony Stark",
        email: "test@example.com",
        contact: "9999999999",
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

        {/* Plan Expiry Section */}
        <div className="plan-expiry">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <p>
              {expiryDate ? (
                moment(expiryDate).isAfter(moment()) ? (
                  <>
                    <span className="expiry-date active-plan">
                      Your plan expires on {moment(expiryDate).format("DD MMM YYYY")}
                    </span>
                    <br />
                    <span className="days-left">({daysLeft} days remaining)</span>
                  </>
                ) : (
                  <>
                    <span className="expiry-date expired-plan">
                      Your plan expired on {moment(expiryDate).format("DD MMM YYYY")}
                    </span>
                    <br />
                    <span className="days-left">Upgrade now to continue!</span>
                  </>
                )
              ) : (
                <span className="no-subscription">
                  No active subscription. Choose a plan to get started!
                </span>
              )}
            </p>
          )}
        </div>
      </header>

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

      {/* Payment Success Modal */}
      {isPaymentSuccess && (
        <SuccessPage
          paymentId={paymentDetails.paymentId}
          amount={paymentDetails.amount}
          status={paymentDetails.status}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default PremiumPage;