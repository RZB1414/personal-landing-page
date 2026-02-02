"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="py-20 border-t border-white/5 relative overflow-hidden">
            {/* Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-cyan/10 blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl font-bold font-syne mb-8">
                    Your next big idea deserves <br />
                    <span className="text-cyan">elite code.</span>
                </h2>

                <p className="text-zinc-500 mb-12 max-w-xl mx-auto">
                    Let's transform your vision into a scalable, high-performance, and unforgettable platform.
                </p>

                <button className="px-10 py-4 bg-white text-black font-bold rounded-full mb-20 hover:scale-105 transition-transform">
                    LET'S TALK
                </button>

                <div className="flex justify-center gap-8 text-zinc-500">
                    <SocialLink icon={Github} />
                    <SocialLink icon={Linkedin} />
                    <SocialLink icon={Twitter} />
                    <SocialLink icon={Mail} />
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 text-xs text-zinc-600 font-mono">
                    © {new Date().getFullYear()} ELITE FULLSTACK ARCHITECT. ALL RIGHTS RESERVED.
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ icon: Icon }: { icon: any }) {
    return (
        <a href="#" className="hover:text-cyan transition-colors transform hover:-translate-y-1">
            <Icon size={24} />
        </a>
    )
}
