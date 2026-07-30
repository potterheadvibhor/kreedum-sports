import { SOCIAL_LINKS } from "../../data/socialLinks";

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-4">
      {SOCIAL_LINKS.map((s) => (
        <a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.name}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
          style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.85)" xmlns="http://www.w3.org/2000/svg">
            <path d={s.path} />
          </svg>
        </a>
      ))}
    </div>
  );
}
