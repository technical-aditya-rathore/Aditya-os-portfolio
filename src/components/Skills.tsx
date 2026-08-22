import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { skills, personalInfo } from "@/data/portfolio";
import SectionLabel from "./SectionLabel";
import SectionGlow from "./SectionGlow";

const categoryColor: Record<string, string> = {
  Language: "var(--color-signal)",
  Web: "var(--color-violet)",
  Data: "var(--color-amber)",
  "AI/ML": "var(--color-rose)",
  Tools: "#9aa2b1",
};

export default function Skills() {
  const [active, setActive] = useState<string | null>(null);

  const positioned = useMemo(() => {
    const n = skills.length;
    return skills.map((s, i) => {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      const radius = 42;
      const x = 50 + radius * Math.cos(angle);
      const y = 50 + radius * Math.sin(angle) * 0.82;
      return { ...s, x, y };
    });
  }, []);

  const activeSkill = positioned.find((s) => s.name === active);

  return (
    <section id="skills" className="relative overflow-hidden px-6 sm:px-10 lg:px-14 xl:px-20 2xl:px-28 py-24 md:py-28 lg:py-32 max-w-[1600px] mx-auto">
      <SectionGlow position="top-left" color="violet" />
      <SectionLabel
        index="02"
        module="Skill Ecosystem"
        title="Skills"
        description="A live map of the languages, tools and domains I build with. Hover a node for details."
      />

      {/* Desktop constellation */}
      <div className="hidden md:block relative w-full aspect-[16/9] max-h-[560px] card p-8 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            background:
              "radial-gradient(45% 45% at 50% 50%, color-mix(in srgb, var(--color-signal) 6%, transparent), transparent)",
          }}
        />
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          {positioned.map((s) => (
            <line
              key={s.name}
              x1="50%"
              y1="50%"
              x2={`${s.x}%`}
              y2={`${s.y}%`}
              stroke={active === s.name ? categoryColor[s.category] : "var(--color-line)"}
              strokeWidth={active === s.name ? 1.4 : 1}
              opacity={active === s.name ? 0.9 : 0.5}
            />
          ))}
        </svg>

        {/* center node */}
        <div
          className="absolute rounded-full glow-border flex items-center justify-center font-display font-semibold text-sm bg-[var(--color-surface-2)]"
          style={{ left: "50%", top: "50%", width: 96, height: 96, transform: "translate(-50%,-50%)" }}
        >
          {personalInfo.initials}
        </div>

        {positioned.map((s) => (
          <button
            key={s.name}
            onMouseEnter={() => setActive(s.name)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(s.name)}
            onBlur={() => setActive(null)}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full font-mono text-[11px] px-3 py-1.5 whitespace-nowrap transition-all duration-200"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              background: active === s.name ? categoryColor[s.category] : "var(--color-surface-2)",
              color: active === s.name ? "var(--color-ink)" : "var(--color-text-dim)",
              border: `1px solid ${active === s.name ? categoryColor[s.category] : "var(--color-line)"}`,
              zIndex: active === s.name ? 10 : 1,
            }}
          >
            {s.name}
          </button>
        ))}

        {activeSkill && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-sm glass rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: categoryColor[activeSkill.category] }}
              />
              <p className="font-display font-semibold text-sm">{activeSkill.name}</p>
              <span className="label ml-auto">{activeSkill.category}</span>
            </div>
            <p className="text-xs text-[var(--color-text-dim)] leading-relaxed">
              {activeSkill.note}
            </p>
          </motion.div>
        )}
      </div>

      {/* Mobile: grouped chip list */}
      <div className="md:hidden space-y-6">
        {(["Language", "Web", "Data", "AI/ML", "Tools"] as const).map((cat) => {
          const group = skills.filter((s) => s.category === cat);
          if (group.length === 0) return null;
          return (
            <div key={cat}>
              <p className="label mb-2.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: categoryColor[cat] }} />
                {cat}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.map((s) => (
                  <span
                    key={s.name}
                    className="rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-3.5 py-2 font-mono text-xs text-[var(--color-text)]"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
