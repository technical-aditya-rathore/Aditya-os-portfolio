import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TerminalSquare, X } from "lucide-react";
import { personalInfo, projects, skills, socialLinks } from "@/data/portfolio";

type Line = { text: string; kind?: "cmd" | "out" };

const HELP = "about · projects · skills · experience · contact · github · resume · clear";

function run(cmd: string): { output: string[]; action?: () => void } {
  const c = cmd.trim().toLowerCase();

  switch (c) {
    case "help":
      return { output: [HELP] };
    case "whoami":
      return {
        output: [personalInfo.name, "CSE Student", "Developer", "Builder", "Tech Explorer"],
      };
    case "about":
      return {
        output: [personalInfo.intro],
        action: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }),
      };
    case "projects":
      return {
        output: projects.map((p) => `${p.number} — ${p.name}`),
        action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }),
      };
    case "skills":
      return {
        output: [skills.map((s) => s.name).join(", ")],
        action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }),
      };
    case "experience":
      return {
        output: ["Scrolling to internships & hackathons..."],
        action: () => document.getElementById("internships")?.scrollIntoView({ behavior: "smooth" }),
      };
    case "contact":
      return {
        output: [`${socialLinks.email}`, `${socialLinks.phone}`],
        action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }),
      };
    case "github":
      return {
        output: [`Opening ${socialLinks.github} ...`],
        action: () => window.open(socialLinks.github, "_blank", "noopener,noreferrer"),
      };
    case "resume":
      return {
        output: ["Opening resume ..."],
        action: () => window.open(personalInfo.resumeUrl, "_blank", "noopener,noreferrer"),
      };
    case "":
      return { output: [] };
    default:
      return { output: [`command not found: ${c}`, `type 'help' for a list of commands`] };
  }
}

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<Line[]>([
    { text: "ADITYA.OS terminal — type 'help' to get started", kind: "out" },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim().toLowerCase() === "clear") {
      setLines([]);
      setInput("");
      return;
    }
    const { output, action } = run(input);
    setLines((prev) => [
      ...prev,
      { text: `$ ${input}`, kind: "cmd" },
      ...output.map((o) => ({ text: o, kind: "out" as const })),
    ]);
    setInput("");
    if (action) setTimeout(action, 200);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open terminal easter egg"
        className="fixed bottom-5 right-5 z-40 w-11 h-11 rounded-full glass flex items-center justify-center text-[var(--color-text-dim)] hover:text-[var(--color-signal)] hover:border-[var(--color-signal)] transition-colors"
      >
        <TerminalSquare size={18} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-99 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] font-mono text-sm overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-line)]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-rose)]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-amber)]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-signal)]" />
                  <span className="ml-2 text-[11px] text-[var(--color-text-faint)]">aditya@os:~</span>
                </div>
                <button onClick={() => setOpen(false)} aria-label="Close terminal">
                  <X size={15} className="text-[var(--color-text-dim)]" />
                </button>
              </div>

              <div className="h-64 overflow-y-auto px-4 py-3 space-y-1">
                {lines.map((l, i) => (
                  <p
                    key={i}
                    className={l.kind === "cmd" ? "text-[var(--color-text)]" : "text-[var(--color-text-dim)]"}
                  >
                    {l.text}
                  </p>
                ))}
                <div ref={endRef} />
              </div>

              <form onSubmit={submit} className="flex items-center gap-2 px-4 py-3 border-t border-[var(--color-line)]">
                <span className="signal-text">$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-[var(--color-text)]"
                  placeholder="type a command..."
                  aria-label="Terminal command input"
                  autoComplete="off"
                  spellCheck={false}
                />
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
