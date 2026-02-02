"use client";

import { motion } from "framer-motion";
import { Star, Zap } from "lucide-react";

export default function SocialProof() {
    return (
        <section className="py-24 bg-zinc-900/20 text-center">
            <div className="container mx-auto px-6">

                {/* Lighthouse Badge */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    className="inline-flex flex-col items-center mb-16 p-6 rounded-2xl bg-black/50 border border-white/5 relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-green-500/10 blur-xl group-hover:bg-green-500/20 transition-all duration-500" />
                    <div className="relative z-10 flex items-center gap-4">
                        <div className="flex -space-x-1">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-12 h-12 rounded-full border-4 border-black bg-zinc-800 flex items-center justify-center font-bold text-green-400">
                                    100
                                </div>
                            ))}
                        </div>
                        <div className="text-left">
                            <div className="text-sm font-mono text-zinc-400 uppercase tracking-widest">Lighthouse Score</div>
                            <div className="text-xl font-bold text-white flex items-center gap-2">
                                Performance Perfect <Zap size={16} className="text-yellow-400 fill-current" />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Testimonials */}
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <TestimonialCard
                        quote="The site performance increased our conversion by 40%. The design isn't just beautiful, it's functional and extremely fast."
                        author="Carlos Mendes"
                        role="CTO, FinTech Lab"
                    />
                    <TestimonialCard
                        quote="Simply the cleanest code I've ever seen. The scalable architecture allowed us to grow 10x without refactoring."
                        author="Sarah Jenkins"
                        role="Founder, AI Startups Inc."
                    />
                </div>
            </div>
        </section>
    );
}

function TestimonialCard({ quote, author, role }: { quote: string, author: string, role: string }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="text-left p-8 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm relative"
        >
            <div className="flex gap-1 text-yellow-500 mb-4">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <p className="text-zinc-300 font-mono text-sm leading-relaxed mb-6">"{quote}"</p>
            <div>
                <div className="font-bold text-white font-syne">{author}</div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider">{role}</div>
            </div>
        </motion.div>
    )
}
