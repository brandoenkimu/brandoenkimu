import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Code2,
  ExternalLink,
  Flame,
  GitFork,
  Layers3,
  Mail,
  Menu,
  RefreshCw,
  Search,
  Star,
  X,
} from "lucide-react";
import "./index.css";

type Repository = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
  fork: boolean;
  archived: boolean;
};

type GitHubProfile = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  location: string | null;
};

const username = "brandoenkimu";
const github = `https://github.com/${username}`;
const contactEmail = "bentelybrandoen@gmail.com";

const projects = [
  {
    repo: "circularai",
    name: "CircularAI",
    icon: "♻",
    description: "AI-powered waste classification and resource recovery platform.",
    detail:
      "An intelligent circular-economy platform connecting waste generators, collectors and buyers.",
    image: "/projects/circularai.png",
    tags: ["Python", "Django", "React", "AI / ML"],
    tone: "green",
  },
  {
    repo: "nyota",
    name: "Nyota",
    icon: "🌌",
    description:
      "Modern commerce platform with product catalog and seamless user experience.",
    detail:
      "A full-stack commerce experience supported by a scalable backend and analytics.",
    image: "/projects/nyota.png",
    tags: ["Python", "Django", "PostgreSQL"],
    tone: "purple",
  },
  {
    repo: "elimu",
    name: "Elimu",
    icon: "🎓",
    description:
      "Campus-focused platform for connectivity, services and community engagement.",
    detail:
      "A digital campus ecosystem designed to bring useful student services together.",
    image: "/projects/elimu.png",
    tags: ["React", "TypeScript", "Node.js"],
    tone: "blue",
  },
] as const;

const technologies = [
  ["Flutter", "F"],
  ["Dart", "◆"],
  ["Kotlin", "K"],
  ["Java", "♨"],
  ["Android", "◉"],
  ["Python", "Py"],
  ["Django", "dj"],
  ["React", "⚛"],
  ["TypeScript", "TS"],
  ["JavaScript", "JS"],
  ["Node.js", "⬡"],
  ["PostgreSQL", "PG"],
  ["MySQL", "SQL"],
  ["Redis", "R"],
  ["Git", "⌘"],
];

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  HTML: "#e34c26",
  CSS: "#563d7c",
  PHP: "#4F5D95",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  Swift: "#F05138",
  "C++": "#f34b7d",
  Shell: "#89e051",
};

function GitHubMark({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.85 10.93.58.1.8-.25.8-.56v-2.02c-3.2.7-3.87-1.37-3.87-1.37-.53-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.72-1.55-2.56-.3-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.5.12-3.13 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 5.8 0c2.22-1.49 3.2-1.18 3.2-1.18.64 1.63.24 2.83.12 3.13.75.81 1.2 1.84 1.2 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.79 1.06.79 2.14v3.17c0 .31.22.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function App() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("All");
  const [sort, setSort] = useState("updated");
  const [showArchived, setShowArchived] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const loadRepos = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
        {
          headers: { Accept: "application/vnd.github+json" },
        }
      );
      if (!response.ok)
        throw new Error(
          response.status === 403
            ? "GitHub API rate limit reached. Please try again shortly."
            : `GitHub API returned ${response.status}.`
        );
      const data: Repository[] = await response.json();
      setRepos(data.filter((repo) => !repo.fork));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load repositories."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const loadProfile = useCallback(async () => {
    setProfileLoading(true);
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}`,
        {
          headers: { Accept: "application/vnd.github+json" },
        }
      );
      if (!response.ok) throw new Error("Profile unavailable");
      setProfile(await response.json());
    } catch {
      setProfile(null);
    } finally {
      setProfileLoading(false);
    }
  }, []);

  const refresh = useCallback(() => {
    void loadRepos();
    void loadProfile();
  }, [loadRepos, loadProfile]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const stars = useMemo(
    () => repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
    [repos]
  );

  const languages = useMemo(
    () =>
      repos.reduce<Record<string, number>>((acc, repo) => {
        if (repo.language) acc[repo.language] = (acc[repo.language] || 0) + 1;
        return acc;
      }, {}),
    [repos]
  );

  const languageList = useMemo(
    () => ["All", ...Object.keys(languages).sort()],
    [languages]
  );

  const totalLanguageRepos = Object.values(languages).reduce(
    (a, b) => a + b,
    0
  );

  const topLanguages = useMemo(
    () =>
      Object.entries(languages)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5),
    [languages]
  );

  const featured = projects.map((project) => ({
    project,
    repository: repos.find((repo) => repo.name.toLowerCase() === project.repo),
  }));

  const filteredRepos = useMemo(() => {
    const term = search.toLowerCase().trim();
    const result = repos.filter((repo) => {
      const matches =
        !term ||
        repo.name.toLowerCase().includes(term) ||
        (repo.description || "").toLowerCase().includes(term) ||
        (repo.language || "").toLowerCase().includes(term) ||
        (repo.topics || []).some((topic) => topic.toLowerCase().includes(term));
      return (
        matches &&
        (language === "All" || repo.language === language) &&
        (showArchived || !repo.archived)
      );
    });
    return result.sort((a, b) =>
      sort === "stars"
        ? b.stargazers_count - a.stargazers_count
        : sort === "name"
        ? a.name.localeCompare(b.name)
        : sort === "forks"
        ? b.forks_count - a.forks_count
        : new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );
  }, [repos, search, language, sort, showArchived]);

  return (
    <div className="site-shell">
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />

      <nav className="navbar">
        <a className="brand" href="#home">
          <span className="brand-symbol">
            <Code2 size={27} />
          </span>
          <span>
            BENTELY<span className="brand-dot">.DEV</span>
          </span>
        </a>
        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        <div className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          <a href="#home" onClick={() => setMenuOpen(false)}>
            Home
          </a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>
            Projects
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>
          <a href="#skills" onClick={() => setMenuOpen(false)}>
            Skills
          </a>
          <a href={github} target="_blank" rel="noreferrer">
            GitHub <ExternalLink size={13} />
          </a>
        </div>
        <a className="connect-link" href={`mailto:${contactEmail}`}>
          Let's Connect <ArrowUpRight size={15} />
        </a>
      </nav>

      <main>
        <section className="hero" id="home">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="hello">
              Hi, I'm Bentely <span>👋</span>
            </p>
            <h1>
              Building Digital Solutions
              <br />
              for a <span className="gradient-text">Smarter Tomorrow</span>
            </h1>
            <p className="hero-subtitle">
              Full Stack Developer · AI Enthusiast · Problem Solver
            </p>
            <p className="hero-description">
              Building intelligent, scalable and user-focused solutions
              <br className="desktop-break" /> for a smarter, more connected
              future.
            </p>
            <div className="hero-actions">
              <a className="button-primary" href="#projects">
                <span>🚀</span> Explore My Projects <ArrowRight size={17} />
              </a>
              <a
                className="button-outline"
                href={github}
                target="_blank"
                rel="noreferrer"
              >
                <GitHubMark /> View GitHub
              </a>
            </div>
          </motion.div>
          <motion.div
            className="hero-art"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />
            <div className="float-chip chip-ai">
              <BrainCircuit size={25} />
              <span>AI / ML</span>
            </div>
            <div className="float-chip chip-cloud">
              ☁<span>Cloud</span>
            </div>
            <div className="float-chip chip-data">
              ▤<span>Data</span>
            </div>
            <div className="laptop">
              <div className="laptop-screen">
                <div className="screen-glow" />
                <Code2 size={112} strokeWidth={2.2} />
              </div>
              <div className="laptop-base">
                <div className="trackpad" />
              </div>
            </div>
            <div className="art-caption">Code. Create. Innovate.</div>
          </motion.div>
        </section>

        <section className="tech-ribbon" id="skills" aria-label="Technology stack">
          {technologies.map(([name, mark], i) => (
            <div className="tech-item" key={name}>
              <span className={`tech-mark tech-${i % 6}`}>{mark}</span>
              <span>{name}</span>
            </div>
          ))}
          <span className="more-tech">+ more</span>
        </section>

        <section className="section projects-section" id="projects">
          <div className="section-title-row">
            <div>
              <h2>
                <span className="section-emoji">🚀</span> Featured Projects
              </h2>
              <p>Selected builds and products I’m bringing to life.</p>
            </div>
            <a
              className="text-link"
              href={`${github}?tab=repositories`}
              target="_blank"
              rel="noreferrer"
            >
              View All Projects <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="project-grid">
            {featured.map(({ project, repository }, index) => (
              <motion.article
                className={`project-card ${project.tone}`}
                key={project.repo}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <div className="project-image">
                  <img
                    src={project.image}
                    alt={`${project.name} project preview`}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <div className="project-image-fallback">
                    <span>{project.icon}</span>
                    <strong>{project.name.toUpperCase()}</strong>
                    <small>
                      {project.name === "CircularAI"
                        ? "Recycle · Reimagine · Sustain"
                        : project.name === "Nyota"
                        ? "Build. Sell. Grow."
                        : "Connect. Learn. Grow."}
                    </small>
                  </div>
                </div>
                <div className="project-info">
                  <h3>
                    <span>{project.icon}</span> {project.name}
                  </h3>
                  <p>{project.description}</p>
                  <div className="tag-list">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a
                      href={
                        repository?.html_url ||
                        `${github}?tab=repositories`
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <GitHubMark size={15} /> View Repo{" "}
                      <ArrowUpRight size={14} />
                    </a>
                    {repository?.homepage && (
                      <a
                        href={repository.homepage}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Live Demo <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
            <motion.article
              className="project-card more-card"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.25 }}
            >
              <div className="more-art">
                <Layers3 size={70} />
                <div className="more-glow" />
              </div>
              <div className="project-info">
                <h3>✨ More Projects</h3>
                <p>
                  Explore more of my development experiments, ideas and
                  open-source contributions.
                </p>
                <div className="tag-list">
                  <span>Web</span>
                  <span>Mobile</span>
                  <span>Full Stack</span>
                </div>
                <div className="project-links">
                  <a
                    href={`${github}?tab=repositories`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Browse All Repositories <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </motion.article>
          </div>
        </section>

        <section className="insights-section">
          <div className="analytics">
            <div className="section-title-row compact">
              <h2>📊 GitHub Analytics</h2>
              <a
                className="text-link"
                href={github}
                target="_blank"
                rel="noreferrer"
              >
                View Profile <ArrowUpRight size={15} />
              </a>
            </div>
            <div className="analytics-grid">
              <div className="analytics-card stat-panel">
                <div className="card-label">
                  <GitHubMark /> GitHub Stats
                </div>
                <strong>
                  {loading ? "..." : repos.length ? `${repos.length}+` : "0"}
                </strong>
                <span>Public repositories</span>
                <div className="sparkline">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <small>
                  <ArrowUpRight size={13} /> {stars} stars earned
                </small>
              </div>
              <div className="analytics-card language-panel">
                <div className="card-label">Top Languages</div>
                {topLanguages.slice(0, 3).map(([name, count]) => (
                  <div className="language-row" key={name}>
                    <span>
                      <i
                        style={{
                          background: languageColors[name] || "#8b5cf6",
                        }}
                      />
                      {name}
                    </span>
                    <b>
                      {totalLanguageRepos
                        ? ((count / totalLanguageRepos) * 100).toFixed(1)
                        : "0.0"}
                      %
                    </b>
                  </div>
                ))}
                {!topLanguages.length && (
                  <p className="muted">Language data will appear here.</p>
                )}
                <div className="donut" />
              </div>
              <div className="analytics-card streak-panel">
                <div className="card-label">
                  <Flame size={17} /> Contribution activity
                </div>
                <strong>
                  {profileLoading
                    ? "..."
                    : profile?.public_repos ?? repos.length}
                </strong>
                <span>Public repositories</span>
                <div className="heatmap">
                  {Array.from({ length: 56 }, (_, i) => (
                    <i
                      key={i}
                      style={{ opacity: 0.18 + ((i * 7) % 9) / 12 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <aside className="about-card" id="about">
            <h2>👤 About Me</h2>
            <div className="about-intro">
              {profile?.avatar_url && (
                <img src={profile.avatar_url} alt="GitHub profile avatar" />
              )}
              <p>
                {profile?.bio ||
                  "I'm a passionate developer focused on building scalable, user-friendly applications. I love solving real-world problems with technology and always strive to learn something new."}
              </p>
            </div>
            <div className="about-signature">
              Dream Big
              <br />
              Build Bigger
            </div>
            <a className="button-primary small-primary" href="#contact">
              Learn More About Me <ArrowUpRight size={14} />
            </a>
          </aside>
        </section>

        <section className="section repo-section" id="repositories">
          <div className="section-title-row">
            <div>
              <h2>
                <Code2 size={24} /> Explore My Repositories
              </h2>
              <p>Search and filter my public GitHub projects.</p>
            </div>
            <button
              className="refresh-button"
              onClick={refresh}
              disabled={loading || profileLoading}
            >
              <RefreshCw size={15} /> Refresh
            </button>
          </div>
          <div className="repo-controls">
            <label className="search-field">
              <Search size={17} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search repositories..."
              />
              {search && (
                <button onClick={() => setSearch("")} aria-label="Clear search">
                  <X size={15} />
                </button>
              )}
            </label>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="updated">Recently updated</option>
              <option value="stars">Most stars</option>
              <option value="forks">Most forks</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
          <div className="filter-list">
            {languageList.map((lang) => (
              <button
                key={lang}
                className={language === lang ? "selected" : ""}
                onClick={() => setLanguage(lang)}
              >
                {lang}
              </button>
            ))}
          </div>
          <label className="archived-option">
            <input
              type="checkbox"
              checked={showArchived}
              onChange={(e) => setShowArchived(e.target.checked)}
            />{" "}
            Include archived repositories
          </label>
          {error && (
            <div className="api-error">
              <p>{error}</p>
              <button onClick={refresh}>Try again</button>
            </div>
          )}
          {loading ? (
            <div className="loading-copy">
              <span className="spinner" /> Loading GitHub repositories...
            </div>
          ) : (
            <div className="repo-grid">
              {filteredRepos.map((repo) => (
                <article className="repo-card" key={repo.id}>
                  <div className="repo-top">
                    <Code2 size={20} />
                    <a href={repo.html_url} target="_blank" rel="noreferrer">
                      <ArrowUpRight size={17} />
                    </a>
                  </div>
                  <h3>
                    <a href={repo.html_url} target="_blank" rel="noreferrer">
                      {repo.name}
                    </a>
                  </h3>
                  <p>
                    {repo.description || "No description has been added yet."}
                  </p>
                  <div className="repo-bottom">
                    <span>
                      {repo.language && (
                        <>
                          <i
                            style={{
                              background:
                                languageColors[repo.language] || "#8b5cf6",
                            }}
                          />
                          {repo.language}
                        </>
                      )}
                    </span>
                    <span>
                      <Star size={13} />
                      {repo.stargazers_count} <GitFork size={13} />
                      {repo.forks_count}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
          {!loading && !error && (
            <p className="results-count">
              Showing {filteredRepos.length} of {repos.length} repositories
            </p>
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
            <p>
              Have a project, collaboration or opportunity in mind? Let's
              connect.
            </p>
            <a className="button-primary" href={`mailto:${contactEmail}`}>
              <Mail size={17} /> Get In Touch <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="contact-orbit">
            <Code2 size={90} />
          </div>
        </section>
      </main>

      <footer className="footer">
        <a className="brand" href="#home">
          <span className="brand-symbol">
            <Code2 size={23} />
          </span>
          <span>
            BENTELY<span className="brand-dot">.DEV</span>
          </span>
        </a>
        <span>© {new Date().getFullYear()} Bentely.dev. All rights reserved.</span>
        <div>
          <a href={github} target="_blank" rel="noreferrer">
            <GitHubMark />
          </a>
          <a href={`mailto:${contactEmail}`}>
            <Mail />
          </a>
        </div>
        <small>
          Built with <span>♥</span> using React & TypeScript
        </small>
      </footer>
    </div>
  );
}

export default App;