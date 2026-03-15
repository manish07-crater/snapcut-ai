import LegalLayout from "./LegalLayout";
import { Mail, MapPin, Phone, Building } from "lucide-react";

const ContactUs = () => {
    return (
        <LegalLayout title="Contact Us" lastUpdated="October 20, 2023">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 not-prose">
                <div className="space-y-8">
                    <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                            <Mail className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">Email</p>
                            <p className="text-xl font-bold text-white">support@snapcut.ai</p>
                            <p className="text-sm text-muted-foreground mt-1">We typically reply within 24 hours.</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
                            <Phone className="h-6 w-6 text-secondary" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">Phone</p>
                            <p className="text-xl font-bold text-white">+91 74930 60946</p>
                            <p className="text-sm text-muted-foreground mt-1">Available Mon-Fri, 10 AM - 6 PM IST.</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                            <MapPin className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">Address</p>
                            <p className="text-xl font-bold text-white leading-relaxed">
                                Snapcut AI, 123 Tech park,<br />
                                Gorakhpur, Uttar Pradesh 273001,<br />
                                India
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                            <Building className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">Trade Name</p>
                            <p className="text-xl font-bold text-white">Snapcut AI</p>
                        </div>
                    </div>
                </div>

                <div className="glass-card p-8 rounded-[2rem] border-white/10 bg-white/5 space-y-6">
                    <h3 className="text-2xl font-bold text-white">Send us a message</h3>
                    <p className="text-muted-foreground">Have a specific question or enterprise inquiry? Our team is ready to help.</p>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-white ml-1">Your Name</label>
                            <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-white ml-1">Email Address</label>
                            <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="john@example.com" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-white ml-1">Message</label>
                            <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="How can we help you?"></textarea>
                        </div>
                        <button className="w-full h-14 bg-primary text-white font-black rounded-xl hover:glow-primary transition-all shadow-lg active:scale-95">
                            Send Message
                        </button>
                    </div>
                </div>
            </div>
        </LegalLayout>
    );
};

export default ContactUs;
