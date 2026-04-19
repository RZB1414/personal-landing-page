"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, Rocket, Zap, Bot } from "lucide-react";

const services = [
  {
    title: "Sistemas & Dashboards",
    detail:
      "Plataformas de gestão com dashboards interativos, relatórios em tempo real e automação de processos.",
    icon: LayoutDashboard,
  },
  {
    title: "Integrações com IA",
    detail:
      "Agentes inteligentes, automação com LLMs e integrações que otimizam operações do seu negócio.",
    icon: Bot,
  },
  {
    title: "Web Apps",
    detail:
      "Aplicações robustas e escaláveis com UX refinada. Construídas para crescer sem dívida técnica.",
    icon: Zap,
  },
  {
    title: "Landing Pages",
    detail:
      "Design de alto impacto, SEO técnico e performance máxima para converter visitantes em clientes.",
    icon: Rocket,
  },
];

export default function Services() {
  return (
    <section className="section-padding" id="servicos">
      <div className="max-w-[1120px] mx-auto">
        {/* header */}
        <div className="mb-16 max-w-md">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[12px] text-text-tertiary font-mono uppercase tracking-[0.15em] mb-3"
          >
            Serviços
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[clamp(1.6rem,3.5vw,2.6rem)] font-bold font-display tracking-tight"
          >
            Engenharia que entrega <span className="accent">resultado.</span>
          </motion.h2>
        </div>

        {/* grid — simple 2×2 */}
        <div className="grid sm:grid-cols-2 gap-4">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="card p-7 group cursor-default"
            >
              <div className="w-9 h-9 rounded-lg bg-accent-dim flex items-center justify-center mb-5 text-accent group-hover:scale-105 transition-transform duration-300">
                <s.icon size={18} strokeWidth={1.5} />
              </div>

              <h3 className="text-[16px] font-semibold mb-2 font-display group-hover:text-accent transition-colors duration-300">
                {s.title}
              </h3>

              <p className="text-[13px] text-text-secondary leading-relaxed">
                {s.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
