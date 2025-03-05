import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./TermsConditions.css";

const TermsConditions = () => {
    const navigate = useNavigate();

    return (
        <div className="terms-conditions-container">
            {/* Back Arrow */}
            <div className="back-arrow" onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </div>

            <h1>Terms and Conditions</h1>
            <p className="effective-date">Last Updated: 01-07-2024</p>

            <section className="terms-section">
                <h2>1. Acceptance of Terms</h2>
                <p>
                    By accessing or using our service, you agree to be bound by these terms and conditions and our Privacy Policy. If you do not agree with any part of these terms, you must not use our service. These terms apply to all visitors, users, and others who access or use the service.
                </p>
            </section>

            <section className="terms-section">
                <h2>2. Changes to Terms</h2>
                <p>
                    We reserve the right to modify or replace these terms at any time. Any changes will be effective immediately upon posting the revised terms on our website. Your continued use of the service after such changes constitutes your acceptance of the new terms. We encourage you to review these terms periodically for updates.
                </p>
            </section>

            <section className="terms-section">
                <h2>3. User Responsibilities</h2>
                <p>
                    Users are responsible for maintaining the confidentiality of their account and password. You agree to:
                </p>
                <ul>
                    <li>Provide accurate and complete information during registration.</li>
                    <li>Notify us immediately of any unauthorized use of your account.</li>
                    <li>Accept responsibility for all activities that occur under your account.</li>
                </ul>
                <p>
                    We are not liable for any loss or damage arising from your failure to comply with these responsibilities.
                </p>
            </section>

            <section className="terms-section">
                <h2>4. Prohibited Activities</h2>
                <p>
                    You agree not to engage in any of the following prohibited activities:
                </p>
                <ul>
                    <li>Using the service for any unlawful purpose or in violation of any applicable laws or regulations.</li>
                    <li>Interfering with or disrupting the integrity or performance of the service.</li>
                    <li>Attempting to gain unauthorized access to the service or its related systems or networks.</li>
                    <li>Uploading or transmitting viruses, malware, or any other harmful code.</li>
                    <li>Engaging in any activity that could harm or exploit minors.</li>
                </ul>
            </section>

            <section className="terms-section">
                <h2>5. Intellectual Property</h2>
                <p>
                    All content, trademarks, logos, and other intellectual property rights related to the service are owned by us or our licensors. You are granted a limited, non-exclusive, non-transferable license to use the service for personal, non-commercial purposes. You may not:
                </p>
                <ul>
                    <li>Copy, modify, or create derivative works of the service.</li>
                    <li>Use the service for any commercial purpose without our prior written consent.</li>
                    <li>Reverse engineer, decompile, or disassemble the service.</li>
                </ul>
            </section>

            <section className="terms-section">
                <h2>6. Limitation of Liability</h2>
                <p>
                    To the maximum extent permitted by law, we are not liable for any indirect, incidental, special, or consequential damages arising from or related to your use of the service. This includes, but is not limited to:
                </p>
                <ul>
                    <li>Loss of data or profits.</li>
                    <li>Business interruption or downtime.</li>
                    <li>Damages resulting from third-party services or products.</li>
                </ul>
                <p>
                    Our total liability for any claims related to the service is limited to the amount you paid for access to the service.
                </p>
            </section>

            <section className="terms-section">
                <h2>7. Governing Law</h2>
                <p>
                    These terms and conditions are governed by and construed in accordance with the laws of India/Gujarat. Any disputes arising out of or related to these terms shall be subject to the exclusive jurisdiction of the courts located in Gujarat.
                </p>
            </section>

            <section className="terms-section">
                <h2>8. Contact Us</h2>
                <p>
                    If you have any questions or concerns about these terms and conditions, please feel free to contact us at <a href="mailto:support@stocknest.com">support@stocknest.com</a>. We are here to assist you.
                </p>
            </section>
        </div>
    );
};

export default TermsConditions;