"use client";

import { motion } from "framer-motion";
import { Mail, Instagram, ArrowUpRight } from "lucide-react";

export default function Contact() {
  return (
    <section className="section-padding" id="contato">
      <div className="max-w-[1120px] mx-auto">
        <div className="max-w-lg mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[12px] text-text-tertiary font-mono uppercase tracking-[0.15em] mb-3"
          >
            Contato
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[clamp(1.6rem,3.5vw,2.6rem)] font-bold font-display tracking-tight mb-4"
          >
            Vamos construir <span className="accent">juntos.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-text-secondary text-[14px] mb-10"
          >
            Pronto para transformar sua ideia em código de alta performance?
            <br />
            Entre em contato por e-mail ou Instagram.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            {/* email */}
            <a
              href="mailto:renanbuiatti18@gmail.com"
              className="group card flex items-center gap-3 px-5 py-4"
              id="contact-email"
            >
              <Mail size={16} strokeWidth={1.5} className="text-accent" />
              <span className="text-[13px] text-text-secondary group-hover:text-text-primary transition-colors">
                renanbuiatti18@gmail.com
              </span>
              <ArrowUpRight
                size={13}
                className="text-text-ghost group-hover:text-accent ml-auto transition-colors"
              />
            </a>

            {/* instagram */}
            <a
              href="https://instagram.com/renanbuiatti"
              target="_blank"
              rel="noopener noreferrer"
              className="group card flex items-center gap-3 px-5 py-4"
              id="contact-instagram"
            >
              <Instagram size={16} strokeWidth={1.5} className="text-accent" />
              <span className="text-[13px] text-text-secondary group-hover:text-text-primary transition-colors">
                @renanbuiatti
              </span>
              <ArrowUpRight
                size={13}
                className="text-text-ghost group-hover:text-accent ml-auto transition-colors"
              />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
