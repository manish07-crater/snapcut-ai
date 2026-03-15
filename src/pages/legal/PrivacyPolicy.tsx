import LegalLayout from "./LegalLayout";

const PrivacyPolicy = () => {
    return (
        <LegalLayout title="Privacy Policy" lastUpdated="October 20, 2023">
            <h2>1. Introduction</h2>
            <p>
                Welcome to Snapcut AI ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and disclose your personal information when you use our website and services.
            </p>

            <h2>2. Information We Collect</h2>
            <p>
                <strong>Image Data:</strong> When you upload images to our background removal service, we process these images through our AI models. We do not store these images permanently on our servers unless you have an account with history enabled.
            </p>
            <p>
                <strong>Account Information:</strong> If you create an account, we collect your name, email address, and payment information processed through our secure partner, Razorpay.
            </p>

            <h2>3. How We Use Your Information</h2>
            <ul>
                <li>To provide and maintain our Service.</li>
                <li>To notify you about changes to our Service.</li>
                <li>To provide customer support.</li>
                <li>To process payments and prevent fraud.</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>
                The security of your data is important to us, but remember that no method of transmission over the Internet is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>

            <h2>5. Cookies and Tracking</h2>
            <p>
                We use cookies to improve your user experience, such as remembering your preferences and session state.
            </p>

            <h2>6. Contact Us</h2>
            <p>
                If you have any questions about this Privacy Policy, please contact us at support@snapcut.ai.
            </p>
        </LegalLayout>
    );
};

export default PrivacyPolicy;
