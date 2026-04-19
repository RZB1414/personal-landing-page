"use client";

import { motion } from "framer-motion";

const steps = [
  {
    n: "01",
    title: "Discovery",
    text: "Entendemos o seu negócio, objetivos e público antes de escrever uma linha de código.",
  },
  {
    n: "02",
    title: "Arquitetura",
    text: "Stack, modelagem de dados e design system. Fundações sólidas para escalar sem retrabalho.",
  },
  {
    n: "03",
    title: "Desenvolvimento",
    text: "Sprints curtos com entregas incrementais. Código limpo, tipado e com testes.",
  },
  {
    n: "04",
    title: "Deploy & Suporte",
    text: "Deploy automatizado, monitoramento e acompanhamento pós-lançamento contínuo.",
  },
];

export default function Process() {
  return (
    <section className="section-padding" id="processo">
      <div className="max-w-[1120px] mx-auto">
        {/* header */}
        <div className="mb-16 max-w-md">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[12px] text-text-tertiary font-mono uppercase tracking-[0.15em] mb-3"
          >
            Processo
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[clamp(1.6rem,3.5vw,2.6rem)] font-bold font-display tracking-tight"
          >
            Do conceito ao <span className="accent">deploy.</span>
          </motion.h2>
        </div>

        {/* timeline */}
        <div className="grid md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              className="bg-bg p-7 group"
            >
              <span className="block text-[11px] font-mono text-text-tertiary mb-5">
                {step.n}
              </span>

              <h3 className="text-[15px] font-semibold font-display mb-2 group-hover:text-accent transition-colors duration-300">
                {step.title}
              </h3>

              <p className="text-[13px] text-text-secondary leading-relaxed">
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
