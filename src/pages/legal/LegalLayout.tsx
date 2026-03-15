import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

interface LegalLayoutProps {
    title: string;
    lastUpdated: string;
    children: React.ReactNode;
}

const LegalLayout: React.FC<LegalLayoutProps> = ({ title, lastUpdated, children }) => {
    return (
        <div className="min-h-screen bg-mesh flex flex-col">
            <Navbar />
            <main className="flex-grow container pt-32 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-black mb-4 gradient-text">{title}</h1>
                        <p className="text-muted-foreground font-medium">Last Updated: {lastUpdated}</p>
                    </div>

                    <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/10 bg-white/5 backdrop-blur-md prose prose-invert max-w-none prose-headings:text-white prose-p:text-muted-foreground prose-strong:text-white">
                        {children}
                    </div>
                </motion.div>
            </main>
            <Footer />
        </div>
    );
};

export default LegalLayout;
