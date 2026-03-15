import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Code, Key, Globe, Shield } from "lucide-react";
import LegalLayout from "./legal/LegalLayout";

const ApiDocs = () => {
    return (
        <LegalLayout title="API Documentation" lastUpdated="February 27, 2026">
            <div className="space-y-8">
                <section>
                    <h2>Overview</h2>
                    <p>
                        Integrate Snapcut AI's background removal power directly into your application. Our REST API is fast, secure, and supports high-resolution images.
                    </p>
                </section>

                <div className="grid md:grid-cols-2 gap-6 not-prose">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                        <Key className="h-6 w-6 text-primary mb-4" />
                        <h3 className="text-lg font-bold mb-2">Authentication</h3>
                        <p className="text-sm text-muted-foreground">Every request requires an <code>x-api-key</code> header from your Enterprise dashboard.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                        <Globe className="h-6 w-6 text-primary mb-4" />
                        <h3 className="text-lg font-bold mb-2">Endpoint</h3>
                        <p className="text-sm text-muted-foreground"><code>POST https://api.snapcut.ai/v1/remove</code></p>
                    </div>
                </div>

                <section>
                    <h2>Quick Start</h2>
                    <div className="bg-black/40 p-6 rounded-2xl border border-white/5 font-mono text-sm overflow-x-auto text-primary">
                        <pre>
                            {`curl -X POST https://api.snapcut.ai/v1/remove \\
  -H "x-api-key: YOUR_KEY" \\
  -F "image=@photo.jpg"`}
                        </pre>
                    </div>
                </section>

                <section>
                    <h2>Rate Limits</h2>
                    <p>
                        Free users are limited to 5 calls per day. Pro users get 500 calls/month, and Enterprise users get unlimited custom volume.
                    </p>
                </section>

                <div className="p-8 rounded-[2rem] bg-primary/10 border border-primary/20 text-center">
                    <h3 className="text-xl font-bold mb-4">Need Enterprise Access?</h3>
                    <p className="mb-6 text-muted-foreground">Contact our sales team for custom volume and dedicated infrastructure.</p>
                    <Link to="/contact-us" className="inline-flex h-12 px-8 items-center justify-center rounded-xl bg-primary text-white font-bold hover:glow-primary transition-all">
                        Contact Sales
                    </Link>
                </div>
            </div>
        </LegalLayout>
    );
};

export default ApiDocs;
