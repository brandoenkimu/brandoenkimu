import type { CSSProperties } from "react";
import { ArrowRight, ArrowUpRight, Code2, ExternalLink, Flame, Layers3, Mail } from "lucide-react";
import {
  CONTACT_EMAIL,
  GITHUB_URL,
  languageColors,
  technologies,
  type AnalyticsItem,
  type DesignConfig,
} from "../config/designs";
import type { GitHubProfile, Repo } from "../hooks/useGithub";

type Props = {
  cfg: DesignConfig;
  repos: Repo[];
  profile: GitHubProfile | null;
  loading: boolean;
};

/** Maps each nav label to the id of the section it should scroll to. */
const SECTION_IDS: Record<string, string> = {
  Home: "home",
  Projects: "projects",
  About: "about",
  Skills: "skills",
  "Tech Stack": "skills",
  Contact: "contact",
};

function GitHubMark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.85 10.93.58.1.8-.25.8-.56v-2.02c-3.2.7-3.87-1.37-3.87-1.37-.53-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.72-1.55-2.56-.3-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.5.12-3.13 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 5.8 0c2.22-1.49 3.2-1.18 3.2-1.18.64 1.63.24 2.83.12 3.13.75.81 1.2 1.84 1.2 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.79 1.06.79 2.14v3.17c0 .31.22.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export default function Design({ cfg, repos, profile, loading }: Props) {
  const stars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const repoCount = profile?.public_repos ?? repos.length;

  const langCounts = repos.reduce<Record<string, number>>((acc, r) => {
    if (r.language) acc[r.language] = (acc[r.language] || 0) + 1;
    return acc;
  }, {});
  const langTotal = Object.values(langCounts).reduce((a, b) => a + b, 0);
  const topLangs = Object.entries(langCounts).sort((a, b) => b[1] - a[1]).slice(0, 3);

  const valueOf = (item: AnalyticsItem) => {
    if (item.kind === "repos") return loading ? "..." : String(repoCount);
    if (item.kind === "stars") return loading ? "..." : String(stars);
    return item.value ?? "";
  };

  const repoFor = (name: string) =>
    repos.find((r) => r.name.toLowerCase() === name.toLowerCase());

  const isGitHubLink = (label: string) => label === "GitHub";

  return (
    <div
      className={`design design-${cfg.id}`}
      style={{ "--a1": cfg.accent[0], "--a2": cfg.accent[1] } as CSSProperties}
    >
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />

      <nav className="navbar">
        <a className="brand" href="#home">
          <span className="brand-symbol"><Code2 size={26} /></span>
          <span>BENTELY<span className="brand-dot">.DEV</span></span>
        </a>

        <div className="nav-links">
          {cfg.nav.map((item) =>
            isGitHubLink(item) ? (
              <a key={item} href={GITHUB_URL} target="_blank" rel="noreferrer">
                {item}
              </a>
            ) : (
              <a key={item} href={`#${SECTION_IDS[item] ?? "home"}`}>
                {item}
              </a>
            )
          )}
        </div>

        <a className="connect-link" href={cfg.cta.href}>
          {cfg.cta.label} <ArrowUpRight size={15} />
        </a>
      </nav>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="hello">{cfg.hero.hello} <span>👋</span></p>
            <h1>
              {cfg.hero.titleBefore}
              <span className="gradient-text">{cfg.hero.highlight}</span>
            </h1>
            <p className="hero-subtitle">{cfg.hero.subtitle}</p>
            <p className="hero-description">{cfg.hero.description}</p>
            <div className="hero-actions">
              <a className="button-primary" href="#projects">
                {cfg.hero.primary} <ArrowRight size={17} />
              </a>
              <a
                className="button-outline"
                href={cfg.hero.secondaryHref}
                target={cfg.hero.secondaryHref.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
              >
                {cfg.hero.secondary.includes("GitHub") ? <GitHubMark /> : <Mail size={16} />}
                {cfg.hero.secondary}
              </a>
            </div>
          </div>

          <div className="hero-art">
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />
            {cfg.artChips.map((chip, i) =>
              chip.label ? (
                <div key={i} className={`float-chip ${chip.pos}`}>
                  <span>{chip.label}</span>
                </div>
              ) : (
                <div key={i} className={`float-chip ${chip.pos} icon-chip`} />
              )
            )}
            <div className="laptop">
              <div className="laptop-screen">
                <div className="screen-glow" />
                <Code2 size={96} strokeWidth={2.2} />
              </div>
              <div className="laptop-base">
                <div className="trackpad" />
              </div>
            </div>
            {cfg.caption && <div className="art-caption">{cfg.caption}</div>}
          </div>
        </section>

        <section className="tech-ribbon" id="skills" aria-label="Technology stack">
          <div className="tech-title">⚡ Technologies I Build With</div>
          <div className="tech-list">
            {technologies.map(([name, mark], i) => (
              <div className="tech-item" key={name}>
                <span className={`tech-mark tech-${i % 6}`}>{mark}</span>
                <span>{name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section projects-section" id="projects">
          <div className="section-title-row">
            <div>
              <h2>
                <span className="section-emoji">🚀</span> Featured Projects
              </h2>
              <p>{cfg.projectsIntro}</p>
            </div>
            <a
              className="text-link"
              href={`${GITHUB_URL}?tab=repositories`}
              target="_blank"
              rel="noreferrer"
            >
              View All Projects <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="project-grid">
            {cfg.projects.map((p) => {
              const repo = repoFor(p.repo);
              return (
                <article className={`project-card ${p.tone}`} key={p.repo}>
                  <div className="project-image">
                    <img
                      src={p.image}
                      alt={`${p.name} project preview`}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <div className="project-image-fallback">
                      <span>{p.icon}</span>
                      <strong>{p.name.toUpperCase()}</strong>
                      {p.tagline && <small>{p.tagline}</small>}
                    </div>
                  </div>

                  <div className="project-info">
                    <h3>
                      <span>{p.icon}</span> {p.name}
                      {p.badge && <em className="badge">{p.badge}</em>}
                    </h3>
                    <p>{p.description}</p>
                    <div className="tag-list">
                      {p.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                    <div className="project-links">
                      <a
                        href={repo?.html_url ?? `${GITHUB_URL}?tab=repositories`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <GitHubMark size={15} /> View Repo <ArrowUpRight size={14} />
                      </a>
                      {repo?.homepage && (
                        <a href={repo.homepage} target="_blank" rel="noreferrer">
                          Live Demo <ExternalLink size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}

            <article className="project-card more-card">
              <div className="more-art">
                <Layers3 size={64} />
                <div className="more-glow" />
              </div>
              <div className="project-info">
                <h3>✨ {cfg.more.title}</h3>
                <p>{cfg.more.description}</p>
                {cfg.more.tags.length > 0 && (
                  <div className="tag-list">
                    {cfg.more.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                )}
                <div className="project-links">
                  <a href={`${GITHUB_URL}?tab=repositories`} target="_blank" rel="noreferrer">
                    {cfg.more.cta} <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="insights-section">
          <div className="analytics">
            <div className="section-title-row compact">
              <h2>📊 GitHub Analytics</h2>
              <a className="text-link" href={GITHUB_URL} target="_blank" rel="noreferrer">
                View Profile <ArrowUpRight size={15} />
              </a>
            </div>

            <div className="analytics-grid">
              {cfg.analytics.map((item) =>
                item.kind === "languages" ? (
                  <div className="analytics-card language-panel" key={item.label}>
                    <div className="card-label">{item.label}</div>
                    {topLangs.map(([name, count]) => (
                      <div className="language-row" key={name}>
                        <span>
                          <i style={{ background: languageColors[name] || "#8b5cf6" }} />
                          {name}
                        </span>
                        <b>{((count / langTotal) * 100).toFixed(1)}%</b>
                      </div>
                    ))}
                    {!topLangs.length && (
                      <p className="muted">Language data will appear here.</p>
                    )}
                    <div className="donut" />
                  </div>
                ) : (
                  <div className="analytics-card stat-panel" key={item.label}>
                    <div className="card-label">
                      <GitHubMark size={15} /> {item.label}
                    </div>
                    <strong>{valueOf(item)}</strong>
                    <span>{item.note}</span>
                    <div className="sparkline">
                      {Array.from({ length: 8 }, (_, i) => (
                        <i key={i} />
                      ))}
                    </div>
                  </div>
                )
              )}

              <div className="analytics-card streak-panel">
                <div className="card-label">
                  <Flame size={17} /> {cfg.streak.label}
                </div>
                <strong>{cfg.streak.value}</strong>
                <span>{cfg.streak.note}</span>
                <div className="heatmap">
                  {Array.from({ length: 56 }, (_, i) => (
                    <i key={i} style={{ opacity: 0.18 + ((i * 7) % 9) / 12 }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {cfg.showAbout && (
            <aside className="about-card" id="about">
              <h2>👤 About Me</h2>
              <div className="about-intro">
                {profile?.avatar_url && (
                  <img src={profile.avatar_url} alt="GitHub avatar" />
                )}
                <p>
                  {profile?.bio ||
                    "I'm a passionate developer focused on building scalable, user-friendly applications."}
                </p>
              </div>
              <div className="about-signature">
                Dream Big
                <br />
                Build Bigger
              </div>
            </aside>
          )}
        </section>

        <section className="contact-section" id="contact">
          <div>
            <span className="eyebrow">HAVE AN IDEA?</span>
            <h2>
              Let's build something
              <br />
              <span className="gradient-text">meaningful together.</span>
            </h2>
            <p>Have a project, collaboration or opportunity in mind? Let's connect.</p>
            <a className="button-primary" href={`mailto:${CONTACT_EMAIL}`}>
              <Mail size={17} /> Get In Touch <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="contact-orbit">
            <Code2 size={80} />
          </div>
        </section>

        {cfg.bottomCta && (
          <div className="bottom-cta">
            <a className="button-primary" href={GITHUB_URL} target="_blank" rel="noreferrer">
              <GitHubMark /> {cfg.bottomCta} <ArrowUpRight size={15} />
            </a>
          </div>
        )}
      </main>

      <footer className="footer">
        <a className="brand" href="#home">
          <span className="brand-symbol"><Code2 size={22} /></span>
          <span>BENTELY<span className="brand-dot">.DEV</span></span>
        </a>
        <span>© {new Date().getFullYear()} Bentely.dev. All rights reserved.</span>
        <div>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">
            <GitHubMark />
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`}>
            <Mail size={17} />
          </a>
        </div>
        <small>
          Built with <span>♥</span> using React & TypeScript
        </small>
      </footer>
    </div>
  );
}