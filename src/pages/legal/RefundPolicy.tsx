import LegalLayout from "./LegalLayout";

const RefundPolicy = () => {
    return (
        <LegalLayout title="Refund and Cancellation" lastUpdated="October 20, 2023">
            <h2>1. Cancellation Policy</h2>
            <p>
                Users can cancel their Pro subscription at any time through their account settings. After cancellation, you will continue to have access to the Pro features until the end of your current billing period.
            </p>

            <h2>2. Refund Eligibility</h2>
            <p>
                We offer a <strong>7-day money-back guarantee</strong> for first-time subscribers. To be eligible for a refund, you must:
            </p>
            <ul>
                <li>Request the refund within 7 days of your initial purchase.</li>
                <li>Have processed fewer than 20 images using the Pro features.</li>
            </ul>

            <h2>3. Non-refundable Items</h2>
            <p>
                Renewal payments and Enterprise custom plans are generally non-refundable unless there is a confirmed technical failure of our service.
            </p>

            <h2>4. Refund Process</h2>
            <p>
                To request a refund, please email support@snapcut.ai with your transaction ID and reason for the request. Once approved, the refund will be processed by Snapcut AI through Razorpay and initiated to your original payment method within 5-7 working days.
            </p>

            <h2>5. Duplicate Payments</h2>
            <p>
                In case of double payments due to technical errors, we will initiate a refund for the duplicate transaction immediately upon verification.
            </p>
        </LegalLayout>
    );
};

export default RefundPolicy;
