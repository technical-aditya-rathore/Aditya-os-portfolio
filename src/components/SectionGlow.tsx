export default function SectionGlow({
  position = "top-right",
  color = "signal",
}: {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "center";
  color?: "signal" | "violet" | "amber";
}) {
  const pos: Record<string, string> = {
    "top-right": "top-[-10%] right-[-5%]",
    "top-left": "top-[-10%] left-[-5%]",
    "bottom-right": "bottom-[-10%] right-[-5%]",
    "bottom-left": "bottom-[-10%] left-[-5%]",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  };
  const colors: Record<string, string> = {
    signal: "var(--color-signal)",
    violet: "var(--color-violet)",
    amber: "var(--color-amber)",
  };

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 w-[36rem] h-[36rem] rounded-full opacity-[0.08] blur-[110px] ${pos[position]}`}
      style={{ background: colors[color] }}
    />
  );
}
