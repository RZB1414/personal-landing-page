"use client";

import { useState, useEffect } from "react";

const links = [
  { label: "Serviços", href: "#servicos" },
  { label: "Processo", href: "#processo" },
  { label: "Contato", href: "#contato" },
];

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setSolid(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? "bg-bg/90 backdrop-blur-md border-b border-border" : ""
      }`}
    >
      <div className="max-w-[1120px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* brand */}
        <a href="#" className="flex items-center gap-2.5 select-none">
          <span className="text-[15px] font-bold tracking-tight font-display">
            redcoast<span className="accent">.</span>labs
          </span>
        </a>

        {/* desktop */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] text-text-secondary hover:text-text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contato"
            className="text-[13px] font-semibold px-5 py-2 rounded-full border border-border hover:border-border-hover hover:bg-bg-raised transition-all"
          >
            Fale conosco
          </a>
        </div>

        {/* mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-[5px]"
          aria-label="Menu"
        >
          <span
            className={`block w-5 h-px bg-text-primary transition-all duration-300 origin-center ${
              open ? "rotate-45 translate-y-[3px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-text-primary transition-all duration-300 origin-center ${
              open ? "-rotate-45 -translate-y-[3px]" : ""
            }`}
          />
        </button>
      </div>

      {/* mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-bg/95 backdrop-blur-lg border-b border-border ${
          open ? "max-h-60 py-4" : "max-h-0 py-0"
        }`}
      >
        <div className="px-6 space-y-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
