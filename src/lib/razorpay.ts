export const initializeRazorpay = (options: any) => {
    if (!options.key) {
        console.error("Razorpay Key ID is missing!");
        return Promise.resolve({ success: false, error: "Missing Key ID" });
    }
    return new Promise((resolve) => {
        const rzp = new (window as any).Razorpay(options);
        rzp.on("payment.failed", function (response: any) {
            console.error("Payment failed:", response.error);
            resolve({ success: false, error: response.error });
        });
        rzp.open();
    });
};

export const createPaymentOptions = (
    amount: number,
    name: string,
    description: string,
    onSuccess: (response: any) => void
) => {
    // Fallback directly to the key found in .env so Vercel build doesn't break if env vars are missing
    const key_id = import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_live_SLDxmn8Cqq1zrI";

    return {
        key: key_id,
        amount: amount * 100, // Razorpay expects amount in paisa
        currency: "INR",
        name: "Snapcut AI",
        description: description,
        image: "/logo.png", // Replace with your actual logo
        handler: function (response: any) {
            onSuccess(response);
        },
        prefill: {
            name: "",
            email: "",
            contact: "",
        },
        notes: {
            plan: name,
        },
        theme: {
            color: "#03A9F4", // Your primary branding color
        },
    };
};
