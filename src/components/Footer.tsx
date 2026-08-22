import { useState } from "react";
import { BatteryCharging, Check, Code2, ExternalLink, Settings2, Wifi, Clock3 } from "lucide-react";
import { contactInfo, personalInfo, socialLinks } from "@/data/portfolio";
import { useBattery, useClock, useOnlineStatus } from "@/lib/hooks";
import LegalModal from "./LegalModal";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "./BrandIcons";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

const socials = [
  { key: "linkedin", label: "LinkedIn", icon: LinkedinIcon, url: socialLinks.linkedin },
  { key: "github", label: "GitHub", icon: GithubIcon, url: socialLinks.github },
  { key: "unstop", label: "Unstop", icon: ExternalLink, url: socialLinks.unstop },
  { key: "leetcode", label: "LeetCode", icon: Code2, url: socialLinks.leetcode },
  { key: "instagram", label: "Instagram", icon: InstagramIcon, url: socialLinks.instagram },
];

const accentOptions = [
  { id: "gold", label: "Solar Gold", color: "#f2c14e" },
  { id: "cyan", label: "Electric Cyan", color: "#63d8e8" },
  { id: "coral", label: "Signal Coral", color: "#ef6f6c" },
  { id: "lime", label: "Laser Lime", color: "#b7e35f" },
];

interface FooterProps {
  accent: string;
  onAccentChange: (accent: string) => void;
}

export default function Footer({ accent, onAccentChange }: FooterProps) {
  const [legal, setLegal] = useState<"privacy" | "terms" | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const clock = useClock();
  const online = useOnlineStatus();
  const battery = useBattery();

  return (
    <footer className="site-footer relative px-6 sm:px-10 lg:px-14 xl:px-20 2xl:px-28 pt-24 pb-10 border-t border-[var(--color-line)] mt-10">
      <div className="max-w-[1600px] mx-auto">
        <div className="text-center mb-14">
          <p className="label mb-4">Find Me On</p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {socials.map((s) => {
              const disabled = !s.url;
              return (
                <a
                  key={s.key}
                  href={disabled ? undefined : s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label + (disabled ? " (not linked yet)" : "")}
                  aria-disabled={disabled}
                  title={disabled ? `${s.label} — add your profile URL` : s.label}
                  className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors ${
                    disabled
                      ? "border-[var(--color-line)] text-[var(--color-text-faint)] cursor-not-allowed"
                      : "border-[var(--color-line)] text-[var(--color-text-dim)] hover:text-[var(--color-signal)] hover:border-[var(--color-signal)]"
                  }`}
                  onClick={(e) => disabled && e.preventDefault()}
                >
                  <s.icon size={18} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-12 text-center sm:text-left">
          <div>
            <p className="label mb-1.5">Address</p>
            <p className="text-sm text-[var(--color-text-dim)]">{contactInfo.address}</p>
          </div>
          <div>
            <p className="label mb-1.5">Phone</p>
            <a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`} className="text-sm text-[var(--color-text-dim)] hover:text-[var(--color-signal)] transition-colors">
              {contactInfo.phone}
            </a>
          </div>
          <div>
            <p className="label mb-1.5">Email</p>
            <a href={`mailto:${contactInfo.email}`} className="text-sm text-[var(--color-text-dim)] hover:text-[var(--color-signal)] transition-colors">
              {contactInfo.email}
            </a>
          </div>
        </div>

        <div className="relative mb-10 font-mono text-xs">
          <button
            onClick={() => setSettingsOpen((open) => !open)}
            aria-expanded={settingsOpen}
            aria-controls="system-settings"
            className="system-status-button glass w-full text-left p-5 transition-colors"
          >
            <span className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-2 font-display font-semibold text-sm">
                <span className="w-2 h-2 rounded-full bg-[var(--color-signal)] shadow-[0_0_10px_var(--color-signal)] animate-blink" />
                ADITYA<span className="signal-text">.OS</span>
              </span>
              <span className="flex items-center gap-2 text-[var(--color-signal)] uppercase tracking-widest text-[10px]">
                <Settings2 size={14} /> System settings
              </span>
            </span>
            <span className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[var(--color-text-dim)]">
              <span className="flex items-center gap-2"><span className="text-[var(--color-signal)]">●</span> ACTIVE</span>
              <span className="flex items-center gap-2"><BatteryCharging size={14} className="text-[var(--color-signal)]" /> {battery.supported && battery.level !== null ? `${battery.level}%` : "N/A"}</span>
              <span className="flex items-center gap-2"><Wifi size={14} className={online ? "text-[var(--color-signal)]" : "text-[var(--color-rose)]"} /> {online ? "ONLINE" : "OFFLINE"}</span>
              <span className="flex items-center gap-2"><Clock3 size={14} className="text-[var(--color-signal)]" /> {pad(clock.getHours())}:{pad(clock.getMinutes())} IST</span>
            </span>
          </button>

          {settingsOpen && (
            <div id="system-settings" className="system-settings glass absolute left-0 right-0 bottom-full mb-3 z-10 p-5">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <p className="label">Interface palette</p>
                  <p className="text-sm text-[var(--color-text-dim)] mt-1">Choose your signal color</p>
                </div>
                <Check size={16} className="signal-text" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {accentOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => onAccentChange(option.id)}
                    aria-label={`Use ${option.label} palette`}
                    aria-pressed={accent === option.id}
                    className={`accent-option flex items-center gap-2 rounded-lg border px-3 py-2 text-left transition-colors ${accent === option.id ? "border-[var(--color-signal)] bg-[var(--color-signal)]/10" : "border-[var(--color-line)]"}`}
                  >
                    <span className="h-3 w-3 rounded-full" style={{ background: option.color, boxShadow: `0 0 10px ${option.color}` }} />
                    <span className="text-[10px] text-[var(--color-text-dim)]">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs text-[var(--color-text-faint)]">
            © 2026 {personalInfo.name}. All rights reserved.
          </p>
          <p className="text-xs text-[var(--color-text-dim)]">
            Designed &amp; Developed by{" "}
            <span className="signal-text font-medium">{personalInfo.name}</span>
          </p>
          <div className="flex items-center gap-4 text-xs text-[var(--color-text-faint)]">
            <button onClick={() => setLegal("privacy")} className="hover:text-[var(--color-signal)] transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => setLegal("terms")} className="hover:text-[var(--color-signal)] transition-colors">
              Terms of Use
            </button>
          </div>
        </div>
      </div>

      <LegalModal title="Privacy Policy" open={legal === "privacy"} onClose={() => setLegal(null)}>
        <p>This website is the personal portfolio of {personalInfo.name}. It is designed to share information about my education, skills, and projects.</p>
        <p><strong className="text-[var(--color-text)]">Contact form.</strong> If you use the contact form, it opens your own email client with a pre-filled message addressed to me. The site itself does not store, transmit, or process your message — nothing is sent to a server or database.</p>
        <p><strong className="text-[var(--color-text)]">Analytics &amp; cookies.</strong> This site does not use cookies or tracking scripts, and no analytics platform is currently integrated.</p>
        <p><strong className="text-[var(--color-text)]">External links.</strong> Links to GitHub, LinkedIn, Unstop and similar platforms lead to third-party sites with their own privacy policies, which I don't control.</p>
        <p><strong className="text-[var(--color-text)]">Device information.</strong> The footer may display your device's battery level using your browser's Battery Status API, when supported. This information is read locally in your browser and is never transmitted or stored anywhere.</p>
        <p><strong className="text-[var(--color-text)]">Your rights.</strong> Since no personal data is collected or stored by this site, there is nothing to request, export, or delete. If you have questions, reach out at {contactInfo.email}.</p>
      </LegalModal>

      <LegalModal title="Terms of Use" open={legal === "terms"} onClose={() => setLegal(null)}>
        <p><strong className="text-[var(--color-text)]">Usage.</strong> This website is provided for informational purposes to showcase my work, skills and experience. You're welcome to browse it and reach out via the contact details provided.</p>
        <p><strong className="text-[var(--color-text)]">Intellectual property.</strong> The design, layout and written content of this site belong to {personalInfo.name} unless otherwise noted. Project names, logos and trademarks referenced belong to their respective owners.</p>
        <p><strong className="text-[var(--color-text)]">External links.</strong> This site links to external platforms (GitHub, LinkedIn, hosting providers, etc). I'm not responsible for the content or availability of those third-party sites.</p>
        <p><strong className="text-[var(--color-text)]">Accuracy.</strong> I try to keep project details, certifications and experience accurate and up to date, but information may change over time without notice.</p>
        <p><strong className="text-[var(--color-text)]">Limitation of liability.</strong> This site is provided "as is" without warranties of any kind. I'm not liable for any damages arising from its use.</p>
        <p><strong className="text-[var(--color-text)]">Contact.</strong> Questions about these terms can be sent to {contactInfo.email}.</p>
      </LegalModal>
    </footer>
  );
}
