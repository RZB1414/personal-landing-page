"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

const projects = [
    {
        id: 1,
        title: "VOLLEY METRICS",
        category: "SportsTech Analytics",
        description: "Advanced technical analysis platform for professional volleyball. Real-time match data visualization, heatmaps, and player performance tracking.",
        stack: ["React", "D3.js", "Python", "Data Visualization"],
        color: "from-blue-600 to-cyan-500",
        bg: "bg-[#050a14]"
    },
    {
        id: 2,
        title: "NEXUS WAREHOUSE",
        category: "Enterprise WMS",
        description: "High-scale warehouse management system. Automated inventory tracking, logistic flows, and real-time stock optimization.",
        stack: ["Node.js", "PostgreSQL", "Docker", "Microservices"],
        color: "from-orange-600 to-red-500",
        bg: "bg-[#140505]"
    },
    {
        id: 3,
        title: "ASSET SENTINEL",
        category: "FinTech Tracker",
        description: "Personal investment valuation tracker. Real-time market data integration, portfolio balancing algorithms, and P&L analysis.",
        stack: ["Next.js", "Serverless", "Finance API", "Charts.js"],
        color: "from-emerald-600 to-green-500",
        bg: "bg-[#051405]"
    },
    {
        id: 4,
        title: "SCHEDULER PRO",
        category: "EdTech & Payments",
        description: "Student management ecosystem. Scheduling, attendance tracking, and seamless credit card payment processing via Stripe integration.",
        stack: ["React Native", "Stripe Connect", "Firebase", "Node.js"],
        color: "from-purple-600 to-indigo-500",
        bg: "bg-[#0a0514]"
    },
    {
        id: 5,
        title: "VISION GALLERY",
        category: "AI Computer Vision",
        description: "Intelligent photo gallery analyzer. Uses Neural Networks to auto-tag, categorize, and provide semantic search for image collections.",
        stack: ["Python", "TensorFlow", "OpenCV", "Next.js"],
        color: "from-pink-600 to-rose-500",
        bg: "bg-[#140510]"
    }
];

export default function PortfolioPage() {
    return (
        <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-black text-white">
            {/* Navigation Overlay */}
            <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 pointer-events-none mix-blend-difference">
                <Link href="/" className="pointer-events-auto flex items-center gap-2 text-sm font-bold tracking-widest hover:text-cyan transition-colors">
                    <ArrowLeft size={18} /> RETURN HOME
                </Link>
                <div className="text-xs font-mono opacity-50 hidden md:block">SCROLL TO NAVIGATE</div>
            </nav>

            {projects.map((project, index) => (
                <section
                    key={project.id}
                    className={`h-screen w-full snap-start relative flex items-center justify-center overflow-hidden ${project.bg}`}
                >
                    {/* Background Gradient Blob */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 0.15, scale: 1 }}
                        transition={{ duration: 1.5 }}
                        className={`absolute w-[60vh] h-[60vh] rounded-full blur-[100px] bg-gradient-to-br ${project.color}`}
                    />

                    <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-12 gap-12 items-center h-full">

                        {/* Left Content (Text) */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="lg:col-span-7 space-y-8 flex flex-col justify-center"
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-xs font-mono px-3 py-1 border border-white/20 rounded-full text-white/60">
                                    PROJECT 0{index + 1}
                                </span>
                                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${project.color} font-bold tracking-wider text-sm`}>
                                    {project.category.toUpperCase()}
                                </span>
                            </div>

                            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black font-syne leading-tight tracking-tight pb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                                {project.title}
                            </h2>

                            <p className="text-lg md:text-xl text-zinc-400 max-w-xl leading-relaxed">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {project.stack.map(tech => (
                                    <span key={tech} className="px-3 py-1 bg-white/5 border border-white/5 text-xs font-mono text-cyan/90 rounded backdrop-blur-sm">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="pt-4">
                                <button className="flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform group shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                                    VIEW CASE STUDY <ExternalLink size={18} className="group-hover:rotate-45 transition-transform" />
                                </button>
                            </div>
                        </motion.div>

                        {/* Right Content (Visual Placeholder) */}
                        <motion.div
                            initial={{ opacity: 0, y: 50, rotateX: 10 }}
                            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="lg:col-span-5 relative hidden lg:block perspective-1000"
                        >
                            <div className={`aspect-square rounded-2xl bg-gradient-to-br ${project.color} opacity-20 border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group-hover:opacity-100 transition-opacity`}>
                                <div className="absolute inset-0 flex flex-col items-center justify-center font-mono opacity-50">
                                    <span className="text-6xl font-bold mb-4">{`0${project.id}`}</span>
                                    <span className="text-sm tracking-widest">PREVIEW</span>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </section>
            ))}
        </main>
    );
}
