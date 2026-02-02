"use client";

import { motion } from "framer-motion";
import { Terminal, ArrowRight, Code } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import CrystalScene from "./CrystalScene";

export default function Hero() {
    const [text, setText] = useState("");
    const fullText = "> initializing_system...\n> loading_modules: [React, Next.js, Node.js]...\n> optimization_level: MAX\n> status: READY_TO_SCALE_";

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) clearInterval(interval);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* 3D Background Scene */}
            <div className="absolute inset-0 z-0 opacity-60">
                <CrystalScene />
            </div>

            <div className="container mx-auto px-6 z-10 grid lg:grid-cols-2 gap-12 items-center pointer-events-none">
                {/* Enable pointer events for buttons */}

                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8 pointer-events-auto"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs text-zinc-400 font-mono">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        AVAILABLE FOR HIGH-IMPACT PROJECTS
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                        Transforming <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
                            Lines of Code
                        </span> <br />
                        into <span className="text-cyan">Business Assets</span>
                    </h1>

                    <p className="text-lg text-zinc-400 max-w-xl leading-relaxed">
                        High-performance fullstack architecture for companies that refuse the ordinary.
                        Specializing in React, Node.js, and Scalability.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button className="group relative px-8 py-4 bg-white text-black font-bold rounded-lg overflow-hidden transition-all hover:scale-105">
                            <span className="relative z-10 flex items-center gap-2">
                                START PROJECT <ArrowRight size={18} />
                            </span>
                            <div className="absolute inset-0 bg-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                        </button>

                        <Link href="/portfolio" className="px-8 py-4 border border-white/10 rounded-lg font-mono text-sm hover:bg-white/5 transition-colors text-center">
                            VIEW PORTFOLIO
                        </Link>
                    </div>
                </motion.div>

                {/* Right Content - Terminal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative pointer-events-auto"
                >
                    <div className="relative rounded-xl overflow-hidden glass border border-white/10 shadow-2xl shadow-cyan/10">
                        {/* Terminal Header */}
                        <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900/50 border-b border-white/5">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            </div>
                            <div className="ml-4 flex items-center gap-2 text-xs text-zinc-500 font-mono">
                                <Terminal size={12} />
                                <span>elite-architect — zsh — 80x24</span>
                            </div>
                        </div>

                        {/* Terminal Body */}
                        <div className="p-6 bg-black/80 font-mono text-sm h-[300px] text-green-400 overflow-hidden">
                            <pre className="whitespace-pre-wrap leading-relaxed">
                                {text}
                                <motion.span
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                    className="inline-block w-2.5 h-4 bg-green-400 align-middle ml-1"
                                />
                            </pre>
                        </div>
                    </div>

                    {/* Decorative Elements around Terminal */}
                    <Code className="absolute -top-8 -right-8 text-cyan/20 w-32 h-32 rotate-12" />
                </motion.div>

            </div>
        </section>
    );
}
