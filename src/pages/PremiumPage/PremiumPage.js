import React from "react";
import { useNavigate } from "react-router-dom";
import "./PremiumPage.css";

const PremiumPage = () => {
  const navigate = useNavigate();

  return (
    <div className="premium-container">
      {/* Header Section */}
      <header className="premium-header">
        <h1 className="premium-title">Upgrade to Premium</h1>
        <p className="premium-description">
          Unlock advanced features and take your business to the next level with our premium plans.
        </p>
      </header>

      {/* Pricing Cards Section */}
      <div className="pricing-cards">
        {/* 1 Month Plan */}
        <div className="pricing-card">
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
              onClick={() => navigate("/payment")} // Replace with your payment route
              className="buy-now-button"
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* 3 Months Plan */}
        <div className="pricing-card popular-card">
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
              onClick={() => navigate("/payment")} // Replace with your payment route
              className="buy-now-button"
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* 1 Year Plan */}
        <div className="pricing-card">
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
              onClick={() => navigate("/payment")} // Replace with your payment route
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