import { useEffect, useState } from "react";
import BootScreen from "@/components/BootScreen";
import { ScrollProgressBar, SystemHUD } from "@/components/HUD";
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
        <Nav isDay={isDay} onThemeToggle={() => setIsDay((current) => !current)} />

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

        <Footer accent={accent} onAccentChange={setAccent} />
        <SystemHUD />
        <Terminal />
      </div>
    </>
  );
}
