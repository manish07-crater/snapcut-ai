import LegalLayout from "./legal/LegalLayout";
import { Sparkles, Users, Heart, Target } from "lucide-react";

const About = () => {
    return (
        <LegalLayout title="About Snapcut AI" lastUpdated="March 02, 2026">
            <div className="space-y-10">
                <section>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <Sparkles className="h-6 w-6" />
                        </div>
                        <h2 className="text-2xl font-bold !m-0">Our Mission</h2>
                    </div>
                    <p>
                        At <strong>Snapcut AI</strong>, we believe that high-quality image editing should be accessible to everyone—from solo creators and small businesses to large scale enterprises. Our mission is to automate the most tedious parts of the creative workflow using state-of-the-art AI, allowing you to focus on what truly matters: your vision.
                    </p>
                </section>

                <div className="grid md:grid-cols-2 gap-8 not-prose my-12">
                    <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-primary/50 transition-all group">
                        <Target className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-bold mb-3 text-white">Innovation First</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            We use the latest Deep Learning models to ensure that even complex edges—like hair, fur, and semi-transparent objects—are handled with surgical precision.
                        </p>
                    </div>
                    <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-primary/50 transition-all group">
                        <Users className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-bold mb-3 text-white">Youthful Energy</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Based in <strong>Gorakhpur, Uttar Pradesh</strong>, we are a team of passionate developers and AI enthusiasts dedicated to building world-class technology right from the heart of India.
                        </p>
                    </div>
                </div>

                <section>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <Heart className="h-6 w-6" />
                        </div>
                        <h2 className="text-2xl font-bold !m-0">Why Choose Us?</h2>
                    </div>
                    <p>
                        Unlike generic background removers, Snapcut AI is built specifically for quality at scale. We provide:
                    </p>
                    <ul>
                        <li><strong>Unmatched Precision:</strong> AI that learns from millions of professional images.</li>
                        <li><strong>Privacy by Design:</strong> Your images are processed securely and never stored longer than necessary.</li>
                        <li><strong>Developer Friendly:</strong> Integration with our REST API takes minutes, not hours.</li>
                        <li><strong>Professional Support:</strong> We are always here to help you solve your unique image processing challenges.</li>
                    </ul>
                </section>

                <div className="p-10 rounded-[2.5rem] bg-primary/10 border border-primary/20 text-center space-y-4">
                    <h3 className="text-2xl font-black text-white">Building the Future Together</h3>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Snapcut AI is more than just a tool; it's a partner in your creative journey. Join thousands of users who are already saving time and money with our AI-powered solutions.
                    </p>
                </div>
            </div>
        </LegalLayout>
    );
};

export default About;
