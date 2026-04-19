"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const lines = [
  "const project = await redcoast.init();",
  "project.stack(['Next.js', 'Node', 'AI']);",
  "project.deploy(); // → live ✓",
];

export default function Hero() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines((v) => {
        if (v >= lines.length) {
          clearInterval(timer);
          return v;
        }
        return v + 1;
      });
    }, 900);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex items-center">
      {/* ambient — a single soft wash, not competing blobs */}
      <div className="absolute top-0 right-0 w-[min(50vw,600px)] h-[60vh] bg-accent/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1120px] mx-auto px-6 pt-28 pb-20 w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-20 items-center">
        {/* text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-[13px] text-text-tertiary font-mono mb-6 flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Disponível para novos projetos
          </p>

          <h1 className="text-[clamp(2.4rem,5.5vw,4.2rem)] font-bold font-display leading-[1.08] tracking-tight mb-6">
            Criamos sistemas
            <br />
            que escalam o<br />
            <span className="accent">seu negócio.</span>
          </h1>

          <p className="text-text-secondary text-[15px] max-w-[420px] mb-10 leading-relaxed">
            Engenharia de software sob medida — landing pages, dashboards,
            integrações com IA. Código limpo, performance real.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#contato"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-text-primary text-bg text-[13px] font-semibold rounded-full hover:opacity-90 transition-opacity"
            >
              Iniciar projeto
              <ArrowRight
                size={15}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </a>
            <a
              href="#servicos"
              className="inline-flex items-center px-6 py-3 text-[13px] text-text-secondary border border-border rounded-full hover:border-border-hover hover:text-text-primary transition-all"
            >
              Ver serviços
            </a>
          </div>
        </motion.div>

        {/* code block — NOT a fake terminal. A clean code snippet. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="hidden lg:block"
        >
          <div className="card p-0 overflow-hidden">
            {/* top bar */}
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border">
              <div className="w-2.5 h-2.5 rounded-full bg-text-ghost" />
              <div className="w-2.5 h-2.5 rounded-full bg-text-ghost" />
              <div className="w-2.5 h-2.5 rounded-full bg-text-ghost" />
              <span className="ml-3 text-[11px] text-text-tertiary font-mono">
                projeto.ts
              </span>
            </div>

            {/* code */}
            <div className="px-5 py-6 font-mono text-[13px] leading-[1.9] min-h-[180px]">
              {lines.map((line, i) => (
                <div
                  key={i}
                  className={`transition-all duration-500 ${
                    i < visibleLines
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  }`}
                >
                  <span className="text-text-tertiary select-none mr-4">
                    {i + 1}
                  </span>
                  <span className="text-text-secondary">{line}</span>
                </div>
              ))}
              {visibleLines >= lines.length && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="inline-block w-[7px] h-[15px] bg-accent/60 ml-[52px] mt-1"
                  style={{ animation: "subtle-pulse 1.2s ease-in-out infinite" }}
                />
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
