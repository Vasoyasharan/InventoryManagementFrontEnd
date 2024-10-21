import React from "react";
import { useNavigate } from "react-router-dom";
import "../PrivacyPolicy/PrivacyPolicy.css";


const PrivacyPolicy = () => {
    const navigate = useNavigate();

    return (
        <div className="privacy-policy-container">
            <button className="back-button" onClick={() => navigate(-1)}>
                Back
            </button>
            <h1>Privacy Policy</h1>
            <p>Effective Date: 01-07-2024</p>

            <section>
                <h2>Introduction</h2>
                <p>
                    This Privacy Policy describes how we collect, use, and protect your personal information when you use our website. By using our site, you agree to the terms outlined in this policy.
                </p>
            </section>

            <section>
                <h2>Information We Collect</h2>
                <ul>
                    <li><strong>Personal Information:</strong> Name and  other contact details.</li>
                    <li><strong>Usage Data:</strong> Information on how you use our website, including pages viewed and links clicked.</li>
                    <li><strong>Cookies:</strong> Small data files stored on your device to enhance your user experience.</li>
                </ul>
            </section>

            <section>
                <h2>How We Use Your Information</h2>
                <p>
                    We use the information we collect to:
                </p>
                <ul>
                    <li>Provide, operate, and maintain our website</li>
                    <li>Improve and personalize your experience</li>
                    <li>Communicate with you, including customer service</li>
                    <li>Process transactions and send related information</li>
                    <li>Comply with legal obligations</li>
                </ul>
            </section>

            <section>
                <h2>Sharing Your Information</h2>
                <p>
                    We do not share your personal information with third parties except as necessary to comply with legal obligations, protect our rights, or with your consent.
                </p>
            </section>

            <section>
                <h2>Security</h2>
                <p>
                    We take reasonable measures to protect your personal information from unauthorized access, loss, misuse, or alteration. However, no method of transmission over the internet is 100% secure.
                </p>
            </section>

            <section>
                <h2>Your Rights</h2>
                <p>
                    You have the right to access, update, or delete your personal information. If you wish to exercise any of these rights, please contact us at Sharanvasoya.dev@protone.me
                </p>
            </section>

            <section>
                <h2>Changes to This Policy</h2>
                <p>
                    We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the effective date will be updated accordingly.
                </p>
            </section>

            <section>
                <h2>Contact Us</h2>
                <p>
                    If you have any questions or concerns about this Privacy Policy, please contact us at stock.tracker@email.com
                </p>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
