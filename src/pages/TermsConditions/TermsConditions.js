import React from "react";
import { useNavigate } from "react-router-dom";
import "../TermsConditions/TermsConditions.css";

const TermsConditions = () => {
    const navigate = useNavigate();

    return (
        <div className="terms-conditions-container">
            <button className="back-button" onClick={() => navigate(-1)}>
                 Back
            </button>
            <h1>Terms and Conditions</h1>
            <p>Welcome to our application. Please read these terms and conditions carefully before using our service. By accessing or using our service, you agree to comply with and be bound by these terms.</p>

            <section>
                <h2>1. Acceptance of Terms</h2>
                <p>By accessing or using our service, you agree to be bound by these terms and conditions and our Privacy Policy. If you do not agree with any part of these terms, you must not use our service.</p>
            </section>

            <section>
                <h2>2. Changes to Terms</h2>
                <p>We may revise these terms from time to time. Any changes will be effective immediately upon posting the revised terms on our website. Your continued use of the service after such changes constitutes your acceptance of the new terms.</p>
            </section>

            <section>
                <h2>3. User Responsibilities</h2>
                <p>Users are responsible for maintaining the confidentiality of their account and password. You agree to notify us immediately of any unauthorized use of your account. We are not liable for any loss or damage arising from your failure to protect your account information.</p>
            </section>

            <section>
                <h2>4. Prohibited Activities</h2>
                <p>You agree not to engage in any of the following prohibited activities:</p>
                <ul>
                    <li>Using the service for any unlawful purpose or in violation of any applicable laws or regulations.</li>
                    <li>Interfering with or disrupting the integrity or performance of the service.</li>
                    <li>Attempting to gain unauthorized access to the service or its related systems or networks.</li>
                </ul>
            </section>

            <section>
                <h2>5. Intellectual Property</h2>
                <p>All content, trademarks, and other intellectual property rights related to the service are owned by us or our licensors. You are granted a limited, non-exclusive, non-transferable license to use the service for personal, non-commercial purposes.</p>
            </section>

            <section>
                <h2>6. Limitation of Liability</h2>
                <p>To the maximum extent permitted by law, we are not liable for any indirect, incidental, special, or consequential damages arising from or related to your use of the service. Our total liability for any claims related to the service is limited to the amount you paid for access to the service.</p>
            </section>

            <section>
                <h2>7. Governing Law</h2>
                <p>These terms and conditions are governed by and construed in accordance with the laws of [Your Country/State]. Any disputes arising out of or related to these terms shall be subject to the exclusive jurisdiction of the courts located in [Your Location].</p>
            </section>

            <section>
                <h2>8. Contact Us</h2>
                <p>If you have any questions or concerns about these terms and conditions, please contact us at [Insert Contact Email].</p>
            </section>
        </div>
    );
};

export default TermsConditions;
