import { useEffect, useRef, useState } from "react";
import { useIsTouchDevice, usePrefersReducedMotion } from "@/lib/hooks";

export default function CustomCursor() {
  const isTouch = useIsTouchDevice();
  const reduced = usePrefersReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState<"link" | "image" | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isTouch || reduced) return;

    document.documentElement.classList.add("cursor-active");

    let ringX = 0, ringY = 0, targetX = 0, targetY = 0;
    let raf = 0;

    const move = (e: MouseEvent) => {
      setVisible(true);
      targetX = e.clientX;
      targetY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${targetX}px, ${targetY}px)`;
      }
      const el = e.target as HTMLElement;
      if (el.closest("img,[data-cursor='image']")) setHovering("image");
      else if (el.closest("a,button,[data-cursor='link']")) setHovering("link");
      else setHovering(null);
    };

    const tick = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("cursor-active");
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, [isTouch, reduced]);

  if (isTouch || reduced) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[95]" aria-hidden="true">
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[var(--color-signal)] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200"
        style={{ opacity: visible ? 1 : 0 }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,border-color,background-color] duration-200"
        style={{
          width: hovering === "image" ? 64 : hovering === "link" ? 46 : 28,
          height: hovering === "image" ? 64 : hovering === "link" ? 46 : 28,
          borderColor: hovering ? "var(--color-signal)" : "rgba(255,255,255,0.35)",
          backgroundColor: hovering === "link" ? "rgba(63,232,201,0.08)" : "transparent",
          opacity: visible ? 1 : 0,
        }}
      />
    </div>
  );
}
