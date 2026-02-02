"use client";

import { motion } from "framer-motion";
import {
    Code2,
    Database,
    Globe,
    Server,
    Workflow,
    Cpu,
    Layers,
    Box
} from "lucide-react";

const technologies = [
    { name: "React", icon: Code2 },
    { name: "Next.js", icon: Globe },
    { name: "Node.js", icon: Server },
    { name: "TypeScript", icon: Workflow },
    { name: "PostgreSQL", icon: Database },
    { name: "AWS", icon: CloudIcon },
    { name: "Tailwind", icon: Layers },
    { name: "Docker", icon: Box },
];

function CloudIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M17.5 19c0-3.037-2.463-5.5-5.5-5.5S6.5 15.963 6.5 19" />
            <path d="M19 19h-14" />
            <path d="M5 19c0-4.142 3.358-7.5 7.5-7.5s7.5 3.358 7.5 7.5" />
        </svg>
    )
}

export default function TechMarquee() {
    return (
        <section className="py-10 border-y border-white/5 bg-black/50 overflow-hidden">
            <div className="flex">
                <motion.div
                    className="flex gap-12 px-12"
                    animate={{ x: "-100%" }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    {/* Double the list for seamless loop */}
                    {[...technologies, ...technologies, ...technologies].map((tech, index) => (
                        <div key={index} className="flex items-center gap-3 text-zinc-500 hover:text-cyan transition-colors duration-300">
                            <tech.icon size={24} />
                            <span className="text-xl font-mono font-bold tracking-tighter uppercase">{tech.name}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
