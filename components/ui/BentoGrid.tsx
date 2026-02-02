"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, Rocket, Zap, Bot } from "lucide-react";

export default function BentoGrid() {
    const services = [
        {
            title: "B2B Systems & Dashboards",
            description: "Data-driven management with complex dashboards and real-time visualization.",
            icon: LayoutDashboard,
            colSpan: "col-span-12 md:col-span-8",
            gradient: "from-purple/20 to-transparent"
        },
        {
            title: "AI Integrations",
            description: "Intelligent automation and LLM agents to optimize processes.",
            icon: Bot,
            colSpan: "col-span-12 md:col-span-4",
            gradient: "from-cyan/20 to-transparent"
        },
        {
            title: "High-Performance Web Apps",
            description: "Robust, scalable applications with intuitive UX focused on retention.",
            icon: Zap,
            colSpan: "col-span-12 md:col-span-6",
            gradient: "from-green-500/20 to-transparent"
        },
        {
            title: "Elite Landing Pages",
            description: "High-end aesthetics, advanced technical SEO, and maximum conversion.",
            icon: Rocket,
            colSpan: "col-span-12 md:col-span-6",
            gradient: "from-pink-500/20 to-transparent"
        }
    ];

    return (
        <section className="py-24 px-6 container mx-auto" id="services">
            <div className="mb-16 space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold font-syne">
                    Premium <span className="text-purple">Engineering</span>
                </h2>
                <p className="text-zinc-400 max-w-xl text-lg">
                    Refined technical solutions for complex problems.
                    Design and code in perfect harmony.
                </p>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {services.map((service, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className={`
              ${service.colSpan} 
              group relative p-8 rounded-2xl border border-white/10 bg-zinc-900/30 overflow-hidden hover:border-white/20 transition-all duration-500
            `}
                    >
                        {/* Background Gradient Hover */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <service.icon className="text-white w-6 h-6" />
                            </div>

                            <h3 className="text-2xl font-bold mb-3 font-syne group-hover:text-cyan transition-colors">
                                {service.title}
                            </h3>

                            <p className="text-zinc-400 leading-relaxed font-mono text-sm">
                                {service.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
