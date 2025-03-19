import React from "react";
import { useNavigate } from "react-router-dom";
import "./PricingPage.css";

const PricingPage = () => {
  const navigate = useNavigate();

  // Function to scroll to a specific section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="pricing-container">
      {/* Header Section */}
      <header className="header">
        <div className="header-left">
          {/* Link to the logo in the public folder */}
          <img src="/StockNest2.png" alt="Company Logo" className="company-logo" />
          <span className="company-name">StockNest</span>
        </div>
        <div className="header-center">
          <nav className="nav-links">
            <button onClick={() => scrollToSection("features-section")} className="nav-link">
              Features
            </button>
            <button onClick={() => scrollToSection("pricing-cards")} className="nav-link">
              Pricing
            </button>
          </nav>
        </div>
        <div className="header-right">
          <button
            onClick={() => navigate("/signup")}
            className="signup-button"
          >
            Signup
          </button>
          <button
            onClick={() => navigate("/login")}
            className="login-button"
          >
            Login
          </button>
        </div>
      </header>

      {/* Hero Section  */}
      <section id="hero">
        <div class="hero-content">
          <h1>Revolutionize Your Stock Management</h1>
          <p>Efficient, intuitive, and scalable solutions for businesses of all sizes. Take control of your inventory with StockNest.</p>
          <a href="/signup" class="cta-button">Get Started Now →</a>
        </div>
        <div class="hero-image">
          {/* <img src="https://via.placeholder.com/500x400" alt="Placeholder Image"> */}
        </div>
      </section>

      {/* About Us Section  */}
      <section id="about-us">
        <h2>ABOUT US</h2>
        <p>From Passion to Precision in Stock Management</p>
        <p>StockNest was born from a founder’s vision to simplify stock management for businesses of all sizes. Inspired by the challenges faced in tracking inventory, managing stock levels, and optimizing supply chains, our mission is to revolutionize how businesses handle their stock. Our goal is to provide an intuitive and powerful tool that streamlines stock management, saving time and reducing errors.</p>
        <p>Our mission is clear: to deliver a cost-effective, efficient, and scalable solution tailored to the unique needs of modern businesses.</p>
        <p>With StockNest, experience the perfect blend of innovation and practicality, offering a solution designed by experts who understand the complexities of stock management.</p>
        <a href="/signup" class="explore-now">Explore Now →</a>
      </section>

      {/* Features Section */}
      <section id="features-section" className="features-section">
        <h2 className="features-title">Features Overview</h2>
        <div className="features-grid">
          {/* Dashboard */}
          <div className="feature-card">
            <h3 className="feature-title">Dashboard</h3>
            <p className="feature-description">
              A visually appealing dashboard with key metrics like total sales, purchases, products, and more.
            </p>
          </div>

          {/* Purchase Management */}
          <div className="feature-card">
            <h3 className="feature-title">Purchase Management</h3>
            <p className="feature-description">
              Manage purchase bills, vendors, and update stock levels seamlessly.
            </p>
          </div>

          {/* Sales Management */}
          <div className="feature-card">
            <h3 className="feature-title">Sales Management</h3>
            <p className="feature-description">
              Generate and track sales bills, manage customers, and update stock accordingly.
            </p>
          </div>

          {/* Product Management */}
          <div className="feature-card">
            <h3 className="feature-title">Product Management</h3>
            <p className="feature-description">
              Add, update, and track product details with ease.
            </p>
          </div>

          {/* Expense Tracker */}
          <div className="feature-card">
            <h3 className="feature-title">Expense Tracker</h3>
            <p className="feature-description">
              Monitor expenses for better financial management.
            </p>
          </div>

          {/* Reports & Analytics */}
          <div className="feature-card">
            <h3 className="feature-title">Reports & Analytics</h3>
            <p className="feature-description">
              View insightful reports for better decision-making.
            </p>
          </div>

          {/* Smart Assistant (AI Chatbot) */}
          <div className="feature-card">
            <h3 className="feature-title">Smart Assistant (AI Chatbot)</h3>
            <p className="feature-description">
              Get instant answers to queries like "How many sales today?"
            </p>
          </div>

          {/* User Management */}
          <div className="feature-card">
            <h3 className="feature-title">User Management</h3>
            <p className="feature-description">
              Secure authentication and role-based access control.
            </p>
          </div>

          {/* Security */}
          <div className="feature-card">
            <h3 className="feature-title">Security</h3>
            <p className="feature-description">
              Robust security measures to protect sensitive data.
            </p>
          </div>

          {/* Notifications */}
          <div className="feature-card">
            <h3 className="feature-title">Notifications</h3>
            <p className="feature-description">
              Receive timely reminders for task deadlines and low stock alerts.
            </p>
          </div>

          {/* Export */}
          <div className="feature-card">
            <h3 className="feature-title">Export</h3>
            <p className="feature-description">
              Export data to CSV for further processing.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section id="pricing-cards" className="pricing-cards">
        <h2 className="pricing-title">Pricing Plans</h2>
        <div className="pricing-grid">
          {/* Free 7 Days Plan */}
          <div className="pricing-card free-card">
            <h2 className="plan-title">FREE</h2>
            <p className="plan-subtitle">7 Days Trial</p>
            <p className="plan-price">₹0</p>
            <ul className="plan-features">
              <li>Access to all features</li>
              <li>10 Bill generation</li>
              <li>Limited Report Access</li>
              <li>24/7 Customer Support</li>
            </ul>
            <button
              onClick={() => navigate("/signup")}
              className="get-started-button"
            >
              Get Started
            </button>
          </div>

          {/* 1 Month Plan */}
          <div className="pricing-card one-month-card">
            <h2 className="plan-title">1 MONTH</h2>
            <p className="plan-subtitle">Billed Monthly</p>
            <p className="plan-price">₹499</p>
            <ul className="plan-features">
              <li>Access to all features</li>
              <li>Unlimited Bill generation</li>
              <li>All Report Access</li>
              <li>24/7 Customer Support</li>
            </ul>
            <button
              onClick={() => navigate("/signup")}
              className="get-started-button"
            >
              Get Started
            </button>
          </div>

          {/* 6 Months Plan */}
          <div className="pricing-card six-months-card">
            <h2 className="plan-title">6 MONTHS</h2>
            <p className="plan-subtitle">Billed Every 6 Months</p>
            <p className="plan-price">₹2499</p>
            <ul className="plan-features">
              <li>Access to all features</li>
              <li>Unlimited Bill generation</li>
              <li>All Report Access</li>
              <li>24/7 Customer Support</li>
            </ul>
            <button
              onClick={() => navigate("/signup")}
              className="get-started-button"
            >
              Get Started
            </button>
          </div>

          {/* 1 Year Plan */}
          <div className="pricing-card one-year-card">
            <h2 className="plan-title">1 YEAR</h2>
            <p className="plan-subtitle">Billed Annually</p>
            <p className="plan-price">₹4999</p>
            <ul className="plan-features">
              <li>Access to all features</li>
              <li>Unlimited Bill generation</li>
              <li>All Report Access</li>
              <li>24/7 Customer Support</li>
            </ul>
            <button
              onClick={() => navigate("/signup")}
              className="get-started-button"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          {/* Follow Us Section */}
          <div className="footer-section">
            <h3 className="footer-section-title">Follow Us</h3>
            <div className="social-links">
              <a href="https://facebook.com" className="social-link">
                Facebook
              </a>
              <a href="https://twitter.com" className="social-link">
                Twitter
              </a>
              <a href="https://instagram.com" className="social-link">
                Instagram
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="footer-section">
            <h3 className="footer-section-title">Quick Links</h3>
            <div className="footer-links">
              <a href="/features" className="footer-link">
                Features
              </a>
              <a href="/pricing" className="footer-link">
                Pricing
              </a>
              <a href="/about-us" className="footer-link">
                About Us
              </a>
            </div>
          </div>

          {/* Legal Section */}
          <div className="footer-section">
            <h3 className="footer-section-title">Legal</h3>
            <div className="footer-links">
              <a href="/privacy-policy" className="footer-link">
                Privacy Policy
              </a>
              <a href="/terms-conditions" className="footer-link">
                Terms & Conditions
              </a>
              <a href="/customer-care" className="footer-link">
                Customer Care
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="copyright-section">
          <p className="copyright-text">
            Copyright © 2025 StockNest | All Rights Reserved |{" "}
            <a href="/terms-conditions" className="copyright-link">
              Terms and Conditions
            </a>{" "}
            |{" "}
            <a href="/privacy-policy" className="copyright-link">
              Privacy Policy
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PricingPage;