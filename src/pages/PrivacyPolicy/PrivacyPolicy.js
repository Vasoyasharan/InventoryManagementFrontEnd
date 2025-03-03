import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
    const navigate = useNavigate();

    return (
        <div className="privacy-policy-container">
            {/* Back Arrow */}
            <div className="back-arrow" onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </div>

            <h1>Privacy Policy</h1>
            <p className="effective-date">Effective Date: 01-07-2024</p>

            <section className="policy-section">
                <h2>Introduction</h2>
                <p>
                    Welcome to our Privacy Policy. This document outlines how we collect, use, and protect your personal information when you use our website. By accessing or using our services, you agree to the terms outlined in this policy. If you do not agree with these terms, please refrain from using our website.
                </p>
            </section>

            <section className="policy-section">
                <h2>Information We Collect</h2>
                <p>
                    We collect various types of information to provide and improve our services. This includes:
                </p>
                <ul>
                    <li><strong>Personal Information:</strong> Name, email address, phone number, and other contact details provided by you during registration or while using our services.</li>
                    <li><strong>Usage Data:</strong> Information about how you interact with our website, such as pages visited, time spent on the site, and links clicked.</li>
                    <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar technologies to enhance your experience, analyze trends, and administer the website.</li>
                    <li><strong>Device Information:</strong> We may collect information about the device you use to access our website, including IP address, browser type, and operating system.</li>
                </ul>
            </section>

            <section className="policy-section">
                <h2>How We Use Your Information</h2>
                <p>
                    We use the information we collect for the following purposes:
                </p>
                <ul>
                    <li><strong>To Provide Services:</strong> To operate, maintain, and improve our website and services.</li>
                    <li><strong>To Personalize Your Experience:</strong> To tailor content and recommendations based on your preferences.</li>
                    <li><strong>To Communicate:</strong> To send you updates, newsletters, and respond to your inquiries.</li>
                    <li><strong>To Analyze Usage:</strong> To understand how users interact with our website and improve its functionality.</li>
                    <li><strong>To Ensure Security:</strong> To protect our website and users from fraud, abuse, and unauthorized access.</li>
                </ul>
            </section>

            <section className="policy-section">
                <h2>Sharing Your Information</h2>
                <p>
                    We do not sell, trade, or rent your personal information to third parties. However, we may share your information in the following circumstances:
                </p>
                <ul>
                    <li><strong>With Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website and providing services.</li>
                    <li><strong>For Legal Compliance:</strong> We may disclose information if required by law or to protect our rights and property.</li>
                    <li><strong>With Your Consent:</strong> We may share information with your explicit consent.</li>
                </ul>
            </section>

            <section className="policy-section">
                <h2>Data Security</h2>
                <p>
                    We take data security seriously and implement industry-standard measures to protect your information. These include:
                </p>
                <ul>
                    <li>Encryption of sensitive data during transmission.</li>
                    <li>Regular security audits and vulnerability assessments.</li>
                    <li>Access controls to limit who can view or modify your information.</li>
                </ul>
                <p>
                    However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
                </p>
            </section>

            <section className="policy-section">
                <h2>Your Rights</h2>
                <p>
                    You have the following rights regarding your personal information:
                </p>
                <ul>
                    <li><strong>Access:</strong> You can request a copy of the personal data we hold about you.</li>
                    <li><strong>Correction:</strong> You can request corrections to any inaccurate or incomplete data.</li>
                    <li><strong>Deletion:</strong> You can request the deletion of your personal data under certain conditions.</li>
                    <li><strong>Objection:</strong> You can object to the processing of your data for specific purposes.</li>
                </ul>
                <p>
                    To exercise these rights, please contact us at <a href="mailto:Sharanvasoya.dev@protone.me">Sharanvasoya.dev@protone.me</a>.
                </p>
            </section>

            <section className="policy-section">
                <h2>Changes to This Policy</h2>
                <p>
                    We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Any changes will be posted on this page, and the effective date will be updated accordingly. We encourage you to review this policy periodically to stay informed.
                </p>
            </section>

            <section className="policy-section">
                <h2>Contact Us</h2>
                <p>
                    If you have any questions, concerns, or requests regarding this Privacy Policy, please feel free to contact us at <a href="mailto:stock.tracker@email.com">stock.tracker@email.com</a>. We are here to assist you.
                </p>
            </section>
        </div>
    );
};

export default PrivacyPolicy;