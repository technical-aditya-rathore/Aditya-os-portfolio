import { useBattery, useClock, useOnlineStatus, useScrollProgress } from "@/lib/hooks";

export function ScrollProgressBar() {
  const progress = useScrollProgress();
  return (
    <div className="fixed top-0 left-0 right-0 z-90 h-[2px] bg-transparent" aria-hidden="true">
      <div
        className="h-full bg-[var(--color-signal)]"
        style={{
          width: `${progress * 100}%`,
          boxShadow: "0 0 8px var(--color-signal)",
          transition: "width 80ms linear",
        }}
      />
    </div>
  );
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function SystemHUD() {
  const clock = useClock();
  const online = useOnlineStatus();
  const battery = useBattery();

  const time = `${pad(clock.getHours())}:${pad(clock.getMinutes())} IST`;

  return (
    <div
      className="hidden md:flex fixed bottom-5 left-5 z-40 items-center gap-3 rounded-full glass px-3.5 py-2 font-mono text-[10px] tracking-widest text-[var(--color-text-dim)]"
      aria-hidden="true"
    >
      <span className="flex items-center gap-1.5">
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: online ? "var(--color-signal)" : "var(--color-rose)" }}
        />
        {online ? "ONLINE" : "OFFLINE"}
      </span>
      <span className="w-px h-3 bg-[var(--color-line)]" />
      <span>{time}</span>
      {battery.supported && battery.level !== null && (
        <>
          <span className="w-px h-3 bg-[var(--color-line)]" />
          <span>
            BAT {battery.level}%{battery.charging ? " ⚡" : ""}
          </span>
        </>
      )}
    </div>
  );
}
