"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Search, Layers, Code2, Rocket } from "lucide-react";

export default function Blueprint() {
    const steps = [
        {
            id: "01",
            title: "DISCOVERY",
            description: "I don't start with code, I start with your problem. We map business objectives to ensure every function has a clear purpose.",
            icon: Search,
            color: "text-cyan"
        },
        {
            id: "02",
            title: "ARCHITECTURE",
            description: "Building solid foundations. Stack definition, data modeling, and design system to ensure the system grows without technical debt.",
            icon: Layers,
            color: "text-purple"
        },
        {
            id: "03",
            title: "DEVELOPMENT",
            subtitle: "(The Sprint)",
            description: "Clean, typed, and performant code. I transform the blueprint into reality using the world's best software engineering practices.",
            icon: Code2,
            color: "text-pink-500"
        },
        {
            id: "04",
            title: "QA & LAUNCH",
            description: "Obsessive refinement. Rigorous performance and security testing to ensure a flawless deploy and a bulletproof product.",
            icon: Rocket,
            color: "text-green-500"
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-black">
            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-20 text-center">
                    <span className="text-cyan font-mono text-sm tracking-widest uppercase">The Process</span>
                    <h2 className="text-4xl md:text-6xl font-bold font-syne mt-4">
                        THE <span className="text-zinc-500">BLUEPRINT</span>
                    </h2>
                </div>

                <div className="space-y-12 relative before:absolute before:left-0 md:before:left-1/2 before:top-0 before:h-full before:w-px before:bg-white/10 before:-translate-x-1/2">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                        >
                            <div className="flex-1 w-full md:w-1/2 flex justify-center md:justify-end px-4">
                                <div className={`
                            relative p-8 rounded-2xl glass border border-white/5 w-full max-w-xl group hover:border-white/10 transition-all
                            ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}
                        `}>
                                    <div className={`absolute top-0 ${idx % 2 === 0 ? 'right-0 md:left-0' : 'left-0 md:right-0'} w-1 h-full bg-gradient-to-b from-transparent via-${step.color.replace('text-', '')} to-transparent opacity-50`} />

                                    <h3 className="text-6xl font-black text-white/5 absolute -top-4 right-4 select-none">
                                        {step.id}
                                    </h3>

                                    <div className={`flex items-center gap-4 mb-4 ${idx % 2 === 0 ? 'md:justify-end' : ''} text-${step.color.replace('text-', '')}-400`}>
                                        <step.icon size={28} className={step.color} />
                                        <h4 className="text-2xl font-bold font-syne tracking-wide">{step.title}</h4>
                                    </div>

                                    <p className="text-zinc-400 leading-relaxed font-mono text-sm">
                                        {step.description}
                                    </p>
                                </div>
                            </div>

                            <div className="relative z-20 flex-none w-4 h-4 rounded-full bg-black border-2 border-white/20">
                                <div className={`absolute inset-0 rounded-full ${step.color.replace('text-', 'bg-')} animate-ping opacity-20`} />
                            </div>

                            <div className="flex-1 w-full md:w-1/2" /> {/* Spacer */}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
