"use client";

import { Mail, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-[1120px] mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-[12px] text-text-tertiary font-mono">
          © {new Date().getFullYear()} redcoast.labs
        </span>

        <div className="flex items-center gap-4">
          <a
            href="mailto:renanbuiatti18@gmail.com"
            className="text-text-ghost hover:text-accent transition-colors"
            aria-label="Email"
          >
            <Mail size={16} strokeWidth={1.5} />
          </a>
          <a
            href="https://instagram.com/renanbuiatti"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-ghost hover:text-accent transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={16} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </footer>
  );
}
