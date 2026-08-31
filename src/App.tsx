import { useEffect, useState } from "react";
import BootScreen from "@/components/BootScreen";
import { ScrollProgressBar } from "@/components/HUD";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Deployments from "@/components/Deployments";
import Projects from "@/components/Projects";
import Certificates from "@/components/Certificates";
import AmbassadorRoles from "@/components/AmbassadorRoles";
import Hackathons from "@/components/Hackathons";
import Internships from "@/components/Internships";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Terminal from "@/components/Terminal";

export default function App() {
  const [booted, setBooted] = useState(false);
  const [isDay, setIsDay] = useState(() => localStorage.getItem("aditya-theme") === "day");
  const [accent, setAccent] = useState(() => localStorage.getItem("aditya-accent") || "gold");

  useEffect(() => {
    document.documentElement.dataset.theme = isDay ? "day" : "night";
    document.documentElement.dataset.accent = accent;
    localStorage.setItem("aditya-theme", isDay ? "day" : "night");
    localStorage.setItem("aditya-accent", accent);
  }, [accent, isDay]);

  useEffect(() => {
    const updateGlow = (x: number, y: number) => {
      document.documentElement.style.setProperty("--pointer-x", `${x}px`);
      document.documentElement.style.setProperty("--pointer-y", `${y}px`);
    };
    const onPointerMove = (event: PointerEvent) => updateGlow(event.clientX, event.clientY);
    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) updateGlow(touch.clientX, touch.clientY);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchstart", onTouchStart);
    };
  }, []);

  return (
    <>
      {!booted && <BootScreen onDone={() => setBooted(true)} />}

      <div
        style={{
          opacity: booted ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        <div className="grain" />
        <div className="neon-field" aria-hidden="true" />
        <ScrollProgressBar />
        <div className="touch-glow" aria-hidden="true" />
        <Nav
          isDay={isDay}
          onThemeToggle={() => setIsDay((current) => !current)}
          accent={accent}
          onAccentChange={setAccent}
        />

        <main>
          <Hero />
          <About />
          <Skills />
          <Deployments />
          <Projects />
          <Certificates />
          <AmbassadorRoles />
          <Hackathons />
          <Internships />
          <Contact />
        </main>

        <Footer />
        <Terminal />
      </div>
    </>
  );
}
