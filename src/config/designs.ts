export const USERNAME = "brandoenkimu";
export const GITHUB_URL = `https://github.com/${USERNAME}`;
export const CONTACT_EMAIL = "bentelybrandoen@gmail.com";

/** Each design is shown for this many hours, then the next one takes over.
 *  24 = one design per day, cycling 1 → 2 → 3 → 4 → 1 …  */
export const ROTATE_EVERY_HOURS = 24;

export type AnalyticsItem = {
  label: string;
  kind: "value" | "repos" | "stars" | "languages";
  value?: string;
  note: string;
};

export type ProjectCfg = {
  repo: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  tags: string[];
  badge?: string;
  image: string;
  tone: "green" | "purple" | "blue";
};

export type DesignConfig = {
  id: number;
  accent: [string, string];
  nav: string[];
  cta: { label: string; href: string };
  hero: {
    hello: string;
    titleBefore: string;
    highlight: string;
    subtitle: string;
    description: string;
    primary: string;
    secondary: string;
    secondaryHref: string;
  };
  artChips: { label: string; pos: "chip-ai" | "chip-cloud" | "chip-data" }[];
  caption?: string;
  projectsIntro: string;
  projects: ProjectCfg[];
  more: { title: string; description: string; tags: string[]; cta: string };
  analytics: AnalyticsItem[];
  streak: { label: string; value: string; note: string };
  showAbout: boolean;
  bottomCta?: string;
};

export const technologies: [string, string][] = [
  ["Flutter", "F"], ["Dart", "◆"], ["Kotlin", "K"], ["Java", "♨"],
  ["Android", "◉"], ["Python", "Py"], ["Django", "dj"], ["React", "⚛"],
  ["TypeScript", "TS"], ["JavaScript", "JS"], ["Node.js", "⬡"],
  ["PostgreSQL", "PG"], ["MySQL", "SQL"], ["Redis", "R"], ["Git", "⌘"],
];

export const languageColors: Record<string, string> = {
  TypeScript: "#3178c6", JavaScript: "#f1e05a", Python: "#3572A5",
  Java: "#b07219", Kotlin: "#A97BFF", Dart: "#00B4AB", HTML: "#e34c26",
  CSS: "#563d7c", PHP: "#4F5D95", Go: "#00ADD8", Rust: "#dea584",
  Ruby: "#701516", Swift: "#F05138", "C++": "#f34b7d", Shell: "#89e051",
};

export const DESIGNS: DesignConfig[] = [
  {
    id: 1,
    accent: ["#8251ff", "#21baff"],
    nav: ["Home", "Projects", "About", "Skills", "GitHub"],
    cta: { label: "Let's Connect", href: `mailto:${CONTACT_EMAIL}` },
    hero: {
      hello: "Hi, I'm Bentely",
      titleBefore: "Building Digital Solutions for a ",
      highlight: "Smarter Tomorrow",
      subtitle: "Software Developer | Problem Solver | Lifelong Learner",
      description:
        "Building intelligent, scalable and user-focused solutions for a smarter, more connected future.",
      primary: "Explore My Projects",
      secondary: "View GitHub",
      secondaryHref: GITHUB_URL,
    },
    artChips: [
      { label: "AI / ML", pos: "chip-ai" },
      { label: "Cloud", pos: "chip-cloud" },
      { label: "Data", pos: "chip-data" },
    ],
    caption: "Code. Create. Innovate.",
    projectsIntro: "Selected builds and products I'm bringing to life.",
    projects: [
      { repo: "circularai", name: "CircularAI", icon: "🌿", tagline: "Recycle · Reimagine · Sustain", description: "AI-powered circular economy platform for waste classification and resource recovery.", tags: ["Python", "Django", "React", "AI/ML"], image: "/projects/1-circularai.png", tone: "green" },
      { repo: "nyota", name: "Nyota", icon: "✨", tagline: "Build. Sell. Grow.", description: "Modern commerce platform with product catalog and seamless user experience.", tags: ["Python", "Django", "PostgreSQL"], image: "/projects/1-nyota.png", tone: "purple" },
      { repo: "elimu", name: "Elimu", icon: "🎓", tagline: "Connect. Learn. Grow.", description: "Campus-focused platform for connectivity, services and community engagement.", tags: ["React", "TypeScript", "Node.js"], image: "/projects/1-elimu.png", tone: "blue" },
    ],
    more: {
      title: "More Projects",
      description: "Explore my other projects, experiments and open source contributions.",
      tags: ["Web", "Mobile", "Full Stack"],
      cta: "Browse All Repositories",
    },
    analytics: [
      { label: "GitHub Stats", kind: "repos", note: "Public repositories" },
      { label: "Top Languages", kind: "languages", note: "" },
    ],
    streak: { label: "Contribution Streak", value: "247", note: "Days" },
    showAbout: true,
  },
  {
    id: 2,
    accent: ["#21baff", "#8251ff"],
    nav: ["Home", "Projects", "Skills", "GitHub", "Contact"],
    cta: { label: "View GitHub", href: GITHUB_URL },
    hero: {
      hello: "Hi, I'm",
      titleBefore: "Bentely ",
      highlight: "Brandoen",
      subtitle: "Full Stack Developer • AI Enthusiast • Problem Solver",
      description:
        "Building intelligent, scalable and user-focused solutions for a smarter, more connected future.",
      primary: "Explore My Projects",
      secondary: "Get In Touch",
      secondaryHref: `mailto:${CONTACT_EMAIL}`,
    },
    artChips: [
      { label: "", pos: "chip-ai" },
      { label: "", pos: "chip-cloud" },
    ],
    projectsIntro: "Selected builds and products I'm bringing to life.",
    projects: [
      { repo: "circularai", name: "CircularAI", icon: "🌿", tagline: "Reduce. Recycle. Rethink.", description: "AI-powered waste classification and resource recovery platform.", tags: ["Python", "Django", "React"], image: "/projects/2-circularai.png", tone: "green" },
      { repo: "nyota", name: "Nyota", icon: "✨", tagline: "", description: "Modern commerce platform with secure backend and analytics.", tags: ["Python", "Django", "PostgreSQL"], image: "/projects/2-nyota.png", tone: "purple" },
      { repo: "elimu", name: "Elimu", icon: "🎓", tagline: "Connect. Learn. Grow.", description: "Campus connectivity and digital services platform.", tags: ["React", "TypeScript", "Node.js"], image: "/projects/2-elimu.png", tone: "blue" },
    ],
    more: {
      title: "More Projects",
      description: "Explore more of my development experiments and ideas.",
      tags: [],
      cta: "Browse All Repositories",
    },
    analytics: [
      { label: "Total Commits", kind: "value", value: "1.2k+", note: "Commits" },
      { label: "Repositories", kind: "repos", note: "Public" },
    ],
    streak: { label: "Contribution Streak", value: "120", note: "days" },
    showAbout: false,
  },
  {
    id: 3,
    accent: ["#7c5cff", "#3b9cff"],
    nav: ["Home", "Projects", "Skills", "GitHub", "Contact"],
    cta: { label: "Let's Connect", href: `mailto:${CONTACT_EMAIL}` },
    hero: {
      hello: "Hello, I'm",
      titleBefore: "Bentely ",
      highlight: "Brandoen",
      subtitle: "Full Stack Developer & Tech Enthusiast",
      description:
        "Building intelligent solutions for a smarter, more connected future — from AI and web technologies to sustainable innovation.",
      primary: "View My GitHub",
      secondary: "Get In Touch",
      secondaryHref: `mailto:${CONTACT_EMAIL}`,
    },
    artChips: [],
    caption: "Build Innovate Grow",
    projectsIntro: "Selected builds and products I'm bringing to life.",
    projects: [
      { repo: "circularai", name: "CircularAI", icon: "♻", tagline: "", description: "AI-powered waste classification and resource recovery for a circular economy.", tags: ["Python", "Django", "AI/ML"], image: "/projects/3-circularai.png", tone: "green" },
      { repo: "elimu", name: "Elimu", icon: "🎓", tagline: "", description: "A campus connectivity platform for students and academic communities.", tags: ["React", "TypeScript", "Node.js"], image: "/projects/3-elimu.png", tone: "blue" },
      { repo: "nyota", name: "Nyota", icon: "⭐", tagline: "", description: "Modern e-commerce platform with seamless shopping experience.", tags: ["Django", "Python", "PostgreSQL"], image: "/projects/3-nyota.png", tone: "purple" },
    ],
    more: {
      title: "More Experiments",
      description: "Explore more projects, prototypes and experiments in my GitHub repository.",
      tags: ["Web", "Mobile", "Software"],
      cta: "Browse All",
    },
    analytics: [
      { label: "Total Commits", kind: "value", value: "234+", note: "Total commits" },
      { label: "Repositories", kind: "repos", note: "Public" },
      { label: "Total Stars", kind: "stars", note: "Total stars" },
    ],
    streak: { label: "GitHub Streak", value: "142", note: "Day Streak" },
    showAbout: false,
    bottomCta: "Follow Me on GitHub",
  },
  {
    id: 4,
    accent: ["#8b5cf6", "#22d3ee"],
    nav: ["Home", "Projects", "Tech Stack", "GitHub", "Contact"],
    cta: { label: "View Resume", href: GITHUB_URL },
    hero: {
      hello: "Hi, I'm Bentely",
      titleBefore: "Full Stack ",
      highlight: "Developer",
      subtitle: "Building intelligent, scalable and user-focused solutions",
      description: "with modern technologies.",
      primary: "Explore My Projects",
      secondary: "Visit GitHub",
      secondaryHref: GITHUB_URL,
    },
    artChips: [],
    projectsIntro: "Selected builds and products I'm bringing to life.",
    projects: [
      { repo: "circularai", name: "CircularAI", icon: "♻", tagline: "", description: "AI-powered waste classification and resource recovery platform for a circular economy.", tags: ["Python", "Django", "React"], badge: "AI • Computer Vision", image: "/projects/4-circularai.png", tone: "green" },
      { repo: "nyota", name: "Nyota", icon: "💠", tagline: "", description: "Modern commerce platform with product catalog and shopping experience.", tags: ["Python", "Django", "PostgreSQL"], badge: "Web Application", image: "/projects/4-nyota.png", tone: "purple" },
      { repo: "elimu", name: "Elimu", icon: "🎓", tagline: "", description: "Campus-focused platform for connectivity, services and community.", tags: ["React", "TypeScript", "Node.js"], badge: "Campus Tech", image: "/projects/4-elimu.png", tone: "blue" },
    ],
    more: {
      title: "More Experiments",
      description: "Explore my other projects, prototypes and experiments.",
      tags: ["Web", "Mobile", "Software"],
      cta: "Browse All Repositories",
    },
    analytics: [
      { label: "Total Commits", kind: "value", value: "2.4k", note: "Commits" },
      { label: "Repositories", kind: "repos", note: "Public" },
    ],
    streak: { label: "Contribution Streak", value: "184", note: "days" },
    showAbout: false,
  },
];