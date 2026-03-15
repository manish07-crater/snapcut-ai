import LegalLayout from "./LegalLayout";

const ShippingPolicy = () => {
    return (
        <LegalLayout title="Shipping & Delivery" lastUpdated="October 20, 2023">
            <h2>1. Digital Products</h2>
            <p>
                Snapcut AI provides digital services for image background removal. We do not ship physical products.
            </p>

            <h2>2. Delivery Method</h2>
            <p>
                Upon successful payment for a Pro subscription, the "Pro" features will be activated on your account <strong>immediately</strong>. You will receive an email confirmation of your purchase.
            </p>

            <h2>3. Processing Time</h2>
            <p>
                The activation is typically instantaneous. In rare cases, it may take up to 2-4 hours for payment verification by the payment gateway (Razorpay).
            </p>

            <h2>4. Access Issues</h2>
            <p>
                If you do not see the Pro features active on your account within 4 hours of payment, please contact us at support@snapcut.ai with your payment receipt.
            </p>
        </LegalLayout>
    );
};

export default ShippingPolicy;
