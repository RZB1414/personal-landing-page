"use client";

const stack = [
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "PostgreSQL",
  "Cloudflare",
  "Docker",
  "OpenAI",
];

export default function TechMarquee() {
  const doubled = [...stack, ...stack, ...stack, ...stack];

  return (
    <div className="border-y border-border overflow-hidden py-4">
      <div className="flex animate-marquee">
        {doubled.map((name, i) => (
          <span
            key={i}
            className="text-[12px] font-mono text-text-ghost uppercase tracking-widest whitespace-nowrap px-6 flex-shrink-0 select-none"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
