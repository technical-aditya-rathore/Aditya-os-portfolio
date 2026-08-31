import { motion } from "framer-motion";
import { skillGroups } from "@/data/portfolio";
import SectionLabel from "./SectionLabel";
import SectionGlow from "./SectionGlow";

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden px-6 sm:px-10 lg:px-14 xl:px-20 2xl:px-28 py-24 md:py-28 lg:py-32 max-w-[1600px] mx-auto">
      <SectionGlow position="top-left" color="violet" />
      <SectionLabel
        index="02"
        module="Skill Ecosystem"
        title="Skills"
        description="A structured view of the languages, platforms and disciplines behind my work."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {skillGroups.map((group, i) => (
          <motion.article
            key={group.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            className="skill-panel glass p-5 min-h-40"
          >
            <div className="flex items-center justify-between gap-3 mb-5">
              <h3 className="font-display font-semibold text-sm">{group.title}</h3>
              <span className="font-mono text-[10px] text-[var(--color-signal)]">{group.category}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => <span key={skill} className="skill-chip">{skill}</span>)}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
