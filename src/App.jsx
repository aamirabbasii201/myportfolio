import { useEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronRight,
  Code2,
  Database,
  Download,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  MousePointer2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Sprout,
  Terminal,
  X,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const PROFILE = {
  name: "Aamir Israr",
  email: "aamirabbaxii201@gmail.com",
  location: "Rawalpindi, Pakistan",
  github: "https://github.com/aamirabbasii201",
  linkedin: "https://www.linkedin.com/in/aamir-abbasi-b0a094220",
  resume: "/Aamir-Israr-CV.pdf",
  whatsapp: "https://wa.me/923126640201?text=Hi%20Aamir%2C%20I%20saw%20your%20portfolio.",
};

const EASE = [0.22, 1, 0.36, 1];

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const EXPERTISE = [
  {
    icon: Smartphone,
    title: "Mobile Development",
    copy: "Cross-platform mobile applications with thoughtful navigation, robust state, and native-feeling interactions.",
    tools: ["React Native", "Android", "AsyncStorage", "OP-SQLite"],
    color: "violet",
    index: "01",
  },
  {
    icon: Code2,
    title: "Frontend Engineering",
    copy: "Responsive, component-driven interfaces that balance visual polish with clarity and usability.",
    tools: ["React.js", "JavaScript", "HTML5", "CSS3"],
    color: "blue",
    index: "02",
  },
  {
    icon: Database,
    title: "APIs & Data",
    copy: "Backend integration and relational data systems, from database modeling to authentication and REST APIs.",
    tools: ["ASP.NET Web API", "C#", "SQL Server", "SQLite"],
    color: "teal",
    index: "03",
  },
  {
    icon: BrainCircuit,
    title: "AI & Integrations",
    copy: "Practical AI-assisted workflows, image analysis, external APIs, and cloud-connected application features.",
    tools: ["AI APIs", "Firebase", "Pexels", "Open-Meteo"],
    color: "pink",
    index: "04",
  },
];

const PROJECTS = [
  {
    id: "plant",
    number: "01",
    name: "PlantCareAI",
    subtitle: "AI plant identification & care",
    category: "Mobile",
    period: "2026 · Personal project",
    description: "A React Native plant companion that combines image-based plant identification, health diagnosis, local garden storage, and weather-aware recommendations.",
    highlights: ["AI-powered plant analysis", "My Garden with SQLite / OP-SQLite", "Pexels & Open-Meteo APIs"],
    stack: ["React Native", "JavaScript", "AI APIs", "SQLite"],
    visual: "plant",
  },
  {
    id: "elearning",
    number: "02",
    name: "E-Learning Platform",
    subtitle: "A full-stack learning experience",
    category: "Mobile",
    period: "2025–2026 · University project",
    description: "A mobile learning platform backed by ASP.NET Web API and SQL Server, with authentication, structured coursework, video lessons, quizzes, and progress tracking.",
    highlights: ["Admin, teacher & student roles", "Progressive course content and quizzes", "Certificate workflows"],
    stack: ["React Native", "ASP.NET Web API", "SQL Server", "C#"],
    visual: "learning",
    github: "https://github.com/aamirabbasii201/E-Learning-Platform",
  },
  {
    id: "primecab",
    number: "03",
    name: "PrimeCab Solutions",
    subtitle: "Responsive business website",
    category: "Web",
    period: "2026 · Personal / client project",
    description: "A mobile-friendly React.js business website built with reusable UI components and Firebase for website functionality and data handling.",
    highlights: ["Responsive layouts", "Reusable React components", "Firebase integration"],
    stack: ["React.js", "Firebase", "JavaScript", "CSS"],
    visual: "cab",
  },
  {
    id: "hotel",
    number: "04",
    name: "Hotel Management System",
    subtitle: "Desktop operations software",
    category: "Desktop",
    period: "2025 · University project",
    description: "A Windows Forms application supporting room bookings, billing, guest information, and hotel administration backed by relational data.",
    highlights: ["Room reservation workflows", "Billing & customer records", "Relational database design"],
    stack: ["C#", "Windows Forms", "SQL Server"],
    visual: "hotel",
  },
  {
    id: "rental",
    number: "05",
    name: "Car Rental Management",
    subtitle: "Rental data & workflow management",
    category: "Web",
    period: "2024 · University project",
    description: "A responsive car rental interface connected to SQL Server for organizing and managing rental information.",
    highlights: ["Responsive frontend", "Rental data management", "SQL Server integration"],
    stack: ["HTML", "CSS", "JavaScript", "SQL Server"],
    visual: "rental",
  },
  {
    id: "safety",
    number: "06",
    name: "Smart Home Safety System",
    subtitle: "Digital logic simulation",
    category: "Hardware",
    period: "2023 · University project",
    description: "A digital logic design simulation that models home safety detection for fire, smoke, and potential intrusion events.",
    highlights: ["Digital circuit design", "Safety event detection logic", "Hardware simulation"],
    stack: ["Logic Gates", "Circuit Design", "Simulation"],
    visual: "safety",
  },
];

const FILTERS = ["All", "Mobile", "Web", "Desktop", "Hardware"];

const ANALYTICS_SKILLS = [
  { name: "React Native", percent: 90, color: "#A78BFA", description: "Cross-Platform Mobile Apps" },
  { name: "React.js", percent: 85, color: "#38BDF8", description: "Modern Frontend Development" },
  { name: ".NET / APIs", percent: 75, color: "#C084FC", description: "Backend & API Integration" },
  { name: "Databases", percent: 80, color: "#2DD4BF", description: "SQL Server & SQLite" },
];

const ANALYTICS_STATS = [
  { value: "10+", label: "Projects Delivered" },
  { value: "06", label: "Featured Projects" },
  { value: "02", label: "Companies Worked With" },
  { value: "05", label: "Months Industry Experience" },
];

const JOBS = [
  {
    employer: "CloudGate Technologies",
    role: "Software Developer",
    duration: "3 months",
    place: "Rawalpindi, Pakistan",
    description: "Supported React Native and JavaScript application development, API integrations, debugging, testing, and problem-solving as part of a professional software development team.",
    stack: ["React Native", "JavaScript", "API Integration"],
  },
  {
    employer: "Safex Solutions",
    role: "Software Development Intern",
    duration: "2 months",
    place: "Remote",
    description: "Contributed to development tasks and application improvements, gaining hands-on practice with collaborative development, debugging, and remote communication.",
    stack: ["Software Development", "Debugging", "Team Collaboration"],
  },
];

/* ------------------------------------------------------------------ */
/* Shared helpers                                                      */
/* ------------------------------------------------------------------ */

function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 26 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ number, children }) {
  return (
    <div className="section-eyebrow">
      <span>{number}</span>
      <i />
      {children}
    </div>
  );
}

function SectionHeading({ number, eyebrow, title, highlight, children }) {
  return (
    <Reveal className="section-heading split-heading">
      <div>
        <Eyebrow number={number}>{eyebrow}</Eyebrow>
        <h2 className="section-title">
          {title} <span className="text-gradient">{highlight}</span>
        </h2>
      </div>
      <p>{children}</p>
    </Reveal>
  );
}

function ExternalLinkItem({ href, children, size = 14 }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children} <ArrowUpRight size={size} />
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Navbar                                                              */
/* ------------------------------------------------------------------ */

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const photoDialogRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onKey = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`site-nav ${scrolled ? "site-nav--scrolled" : ""}`}>
      <div className="nav-container container">
        <div className="wordmark-group">
          <button
            type="button"
            className="wordmark-avatar"
            onClick={() => photoDialogRef.current?.showModal()}
            aria-label="View larger profile picture"
          >
            <img src="/images/profile.jpg" alt={PROFILE.name} />
          </button>

          <a href="#home" className="wordmark" onClick={closeMenu}>
            <span>
              Aamir<span className="wordmark-light"> Israr</span>
            </span>
          </a>
        </div>

        <nav className="nav-links" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a href={PROFILE.resume} className="nav-resume" download>
          Resume <Download size={15} strokeWidth={1.9} />
        </a>

        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isOpen && (
        <motion.nav
          id="mobile-menu"
          initial={reduceMotion ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mobile-menu"
          aria-label="Mobile navigation"
        >
          {NAV_ITEMS.map((item) => (
            <a href={item.href} onClick={closeMenu} key={item.href}>
              {item.label}
              <ArrowUpRight size={17} />
            </a>
          ))}
          <a href={PROFILE.resume} download onClick={closeMenu}>
            Download CV <Download size={17} />
          </a>
        </motion.nav>
      )}

      <dialog
        ref={photoDialogRef}
        className="photo-dialog"
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <img
          src="/images/profile.jpg"
          alt={PROFILE.name}
          style={{ display: "block", maxWidth: "min(90vw, 480px)", maxHeight: "80vh" }}
        />
      </dialog>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function HeroArtwork() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="hero-art">
      <div className="hero-art-glow" aria-hidden="true" />
      <motion.figure
        className="hero-photo-frame"
        initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
      >
        <img
          src="/images/developer-portrait.webp"
          alt="Aamir Israr working on React Native development"
          className="hero-portrait"
          width="1193"
          height="1319"
          fetchPriority="high"
        />
        <figcaption className="hero-photo-caption">
          <span className="status-dot" />
          React Native Developer
        </figcaption>
      </motion.figure>
    </div>
  );
}

function Hero() {
  const reduceMotion = useReducedMotion();
  const fadeUp = (y, transition) => ({
    initial: reduceMotion ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition,
  });

  return (
    <section id="home" className="hero section-anchor">
      <div className="hero-noise" aria-hidden="true" />
      <div className="hero-ambient hero-ambient-one" aria-hidden="true" />
      <div className="hero-ambient hero-ambient-two" aria-hidden="true" />

      <div className="container hero-grid">
        <div className="hero-copy">
          <motion.div className="hero-status" {...fadeUp(12, { delay: 0.1 })}>
            <span className="status-dot" /> SOFTWARE DEVELOPER · RAWALPINDI & ISlAMABAD, PK
          </motion.div>

          <motion.h1 {...fadeUp(26, { duration: 0.75, delay: 0.14, ease: EASE })}>
            Hi, I'm <span className="name-gradient">Aamir.</span>
            <br />
            I Turn Ideas into <span className="text-gradient">Digital Products.</span>
          </motion.h1>

          <motion.p className="hero-description" {...fadeUp(18, { duration: 0.7, delay: 0.29 })}>
            Full-stack software developer building mobile apps, responsive websites, secure APIs, and AI-powered experiences—with the details that make great products feel effortless.
          </motion.p>

          <motion.div className="hero-cta" {...fadeUp(14, { delay: 0.42 })}>
            <a className="button button-primary" href="#projects">
              Explore My Work <ArrowUpRight size={18} />
            </a>
            <a className="button button-secondary" href={PROFILE.resume} download>
              Download CV <Download size={17} />
            </a>
          </motion.div>

          <div className="hero-shortcuts">
            <ExternalLinkItem href={PROFILE.github}>GitHub</ExternalLinkItem>
            <span>✳</span>
            <ExternalLinkItem href={PROFILE.linkedin}>LinkedIn</ExternalLinkItem>
            <span>✳</span>
            <a href={`mailto:${PROFILE.email}`}>
              Email <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <HeroArtwork />
      </div>

      <div className="container hero-bottom">
        <span>SCROLL TO EXPLORE</span>
        <ArrowDown size={16} />
        <span className="hero-bottom-line" />
        <span>REACT NATIVE / REACT / .NET / AI</span>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Analytics                                                           */
/* ------------------------------------------------------------------ */

function AnimatedCounter({ value, suffix = "", digits = 1 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (reduceMotion) {
      setCount(value);
      return;
    }

    const animation = animate(0, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (latest) => setCount(Math.round(latest)),
    });
    return () => animation.stop();
  }, [inView, value, reduceMotion]);

  return (
    <span ref={ref}>
      {String(count).padStart(digits, "0")}
      {suffix}
    </span>
  );
}

function CircularProgress({ name, percent, color, description }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const reduceMotion = useReducedMotion();

  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percent / 100);

  return (
    <motion.div
      ref={ref}
      className="analytics-skill-card"
      initial={reduceMotion ? false : { opacity: 0, y: 35, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : undefined}
      transition={{ duration: reduceMotion ? 0 : 0.65, ease: "easeOut" }}
      whileHover={reduceMotion ? undefined : { y: -5 }}
    >
      <div className="analytics-ring">
        <svg
          viewBox="0 0 120 120"
          role="progressbar"
          aria-label={`${name} self-assessed proficiency`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
        >
          <circle cx="60" cy="60" r={radius} className="analytics-ring-track" />
          <motion.circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: reduceMotion ? offset : circumference }}
            animate={{ strokeDashoffset: inView ? offset : circumference }}
            transition={{ duration: reduceMotion ? 0 : 1.7, ease: "easeOut", delay: 0.15 }}
            className="analytics-ring-progress"
          />
        </svg>

        <div className="analytics-ring-value">
          <AnimatedCounter value={percent} suffix="%" />
        </div>
      </div>

      <h3>{name}</h3>
      <p>{description}</p>
    </motion.div>
  );
}

function PortfolioAnalytics() {
  return (
    <section className="portfolio-analytics section" aria-labelledby="analytics-title">
      <div className="container">
        <Reveal>
          <div className="analytics-heading">
            <span className="analytics-eyebrow">SKILLS & ACHIEVEMENTS</span>
            <h2 id="analytics-title">
              Development
              <span className="text-gradient"> Analytics.</span>
            </h2>
            <p>A snapshot of my development expertise, projects, and professional experience.</p>
          </div>
        </Reveal>

        <div className="analytics-skills-grid">
          {ANALYTICS_SKILLS.map((skill) => (
            <CircularProgress key={skill.name} {...skill} />
          ))}
        </div>

        <div className="analytics-stats-grid">
          {ANALYTICS_STATS.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.12}>
              <motion.div
                className="analytics-stat-card"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.25 }}
              >
                <span className="analytics-stat-value">
                  <AnimatedCounter
                    value={parseInt(stat.value, 10)}
                    suffix={stat.value.replace(/[0-9]/g, "")}
                    digits={stat.value.startsWith("0") ? 2 : 1}
                  />
                </span>
                <span className="analytics-stat-label">{stat.label}</span>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <p className="analytics-disclaimer">Skill percentages are personal self-assessments.</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* About & Expertise                                                   */
/* ------------------------------------------------------------------ */

function About() {
  return (
    <section id="about" className="section section-anchor about-section">
      <div className="container about-grid">
        <Reveal>
          <Eyebrow number="01">A LITTLE ABOUT ME</Eyebrow>
          <h2 className="section-title">
            Building With <span className="text-gradient">Purpose.</span>
            <br />
            Designing With Intention.
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="about-content">
          <p>
            I'm <strong>Aamir Israr</strong>, a BS Computer Science graduate from PMAS Arid Agriculture University. I enjoy working across the product stack—from the React Native interface you touch to the backend API and data model that power it.
          </p>
          <p>
            My work spans AI-assisted mobile apps, React websites, .NET services, and practical desktop systems. I've gained industry experience at CloudGate Technologies and Safex Solutions, alongside independent and university projects.
          </p>
          <div className="about-facts">
            <div><span>06</span><small>Documented Projects</small></div>
            <div><span>02</span><small>Professional Teams</small></div>
            <div><span>BSCS</span><small>2022–2026</small></div>
          </div>
          <a className="text-link" href="#experience">
            More About My Experience <ArrowRight size={17} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}


function Expertise() {
  return (
    <section id="expertise" className="section section-anchor expertise-section">
      <div className="container">
        <SectionHeading number="02" eyebrow="WHAT I DO" title="My" highlight="Expertise.">
          From fluid frontends to the systems behind them, I build products with attention to how they look, work, and scale.
        </SectionHeading>

        <div className="expertise-grid">
          {EXPERTISE.map(({ icon: Icon, ...item }, index) => (
            <Reveal key={item.index} delay={index * 0.07} className="expertise-grid-item">
              <article className={`expertise-card expertise-${item.color}`}>
                <div className="expertise-card-top">
                  <div className="expertise-icon">
                    <Icon size={24} strokeWidth={1.7} />
                  </div>
                  <span>{item.index}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <div className="tags">
                  {item.tools.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

function ProjectVisual({ kind }) {
  switch (kind) {
    case "plant":
      return (
        <div className="visual-content visual-plant">
          <div className="visual-phone">
            <div className="visual-phone-header"><span className="p-dot" /> PlantCare<span>✦</span></div>
            <div className="plant-orb"><Sprout size={56} strokeWidth={1.2} /></div>
            <div className="visual-phone-text">Your Plant is Thriving</div>
            <div className="visual-progress"><span /></div>
            <div className="visual-phone-meta"><span>Light</span><span>Water</span><span>Health</span></div>
          </div>
          <span className="visual-floating-label">AI Plant Analysis <Sparkles size={14} /></span>
        </div>
      );

    case "learning":
      return (
        <div className="visual-content visual-learning">
          <div className="visual-dashboard">
            <div className="dash-top"><BookOpen size={20} /><span>LearnSpace</span><span>•••</span></div>
            <div className="dash-kicker">CONTINUE LEARNING</div>
            <div className="dash-title">Build New Skills, step by step.</div>
            <div className="dash-course">
              <div className="dash-course-icon"><Code2 size={20} /></div>
              <div>
                <strong>Web Development</strong>
                <small>Lesson 08 / 12</small>
                <div className="dash-bar"><span /></div>
              </div>
            </div>
            <div className="dash-tiles">
              <span>Courses<br /><b>12</b></span>
              <span>Progress<br /><b>76%</b></span>
            </div>
          </div>
        </div>
      );

    case "cab":
      return (
        <div className="visual-content visual-cab">
          <div className="visual-browser">
            <div className="browser-top"><span /><span /><span /><i>Primecab.Solutions</i></div>
            <div className="browser-navbar">PRIMECAB <span>Home&nbsp;&nbsp; Services&nbsp;&nbsp; Contact</span></div>
            <div className="browser-hero">
              <small>BUSINESS MOBILITY SOLUTIONS</small>
              <h4>Every journey,<br />Better Connected.</h4>
              <div className="fake-button">Explore Services <ArrowUpRight size={12} /></div>
            </div>
          </div>
        </div>
      );

    case "hotel":
      return (
        <div className="visual-content visual-hotel">
          <div className="visual-mini-panel">
            <div className="mini-title">Hotel Manager<span>● ● ●</span></div>
            <div className="mini-grid">
              <div><small>Reservations</small><strong>28</strong></div>
              <div><small>Available rooms</small><strong>12</strong></div>
            </div>
            <div className="mini-table">
              <div><span>ROOM</span><span>STATUS</span></div>
              <div><span>Suite 204</span><b>Checked in</b></div>
              <div><span>Room 118</span><b>Reserved</b></div>
              <div><span>Suite 301</span><b>Available</b></div>
            </div>
          </div>
        </div>
      );

    case "rental":
      return (
        <div className="visual-content visual-rental">
          <div className="rental-circle rental-one" />
          <div className="rental-circle rental-two" />
          <div className="rental-card">
            <div className="rental-header">RENTAL MANAGEMENT <span>2024</span></div>
            <div className="rental-car">▰<span>↗</span></div>
            <div className="rental-bottom">
              <div><small>BOOKINGS</small><strong>Manage rentals</strong></div>
              <ChevronRight size={22} />
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="visual-content visual-safety">
          <div className="safety-circuit">
            <ShieldCheck size={64} strokeWidth={1.2} />
            <div className="safety-nodes"><span>FIRE</span><span>SMOKE</span><span>ENTRY</span></div>
          </div>
          <div className="safety-line safety-line-one" />
          <div className="safety-line safety-line-two" />
        </div>
      );
  }
}

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className={`project-visual project-${project.visual}`}>
        <div className="visual-top-label">
          <span>{project.category.toUpperCase()}</span>
          <span>{project.number} / 06</span>
        </div>
        <ProjectVisual kind={project.visual} />
        <div className="concept-tag">ILLUSTRATIVE VISUAL</div>
      </div>

      <div className="project-info">
        <div className="project-small">
          <span>{project.period}</span>
          <span className="project-category">{project.category}</span>
        </div>
        <h3>{project.name}</h3>
        <p className="project-subtitle">{project.subtitle}</p>
        <p className="project-description">{project.description}</p>
        <ul className="project-highlights">
          {project.highlights.map((highlight) => (
            <li key={highlight}><Check size={13} />{highlight}</li>
          ))}
        </ul>
        <div className="project-tech">
          {project.stack.map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </div>
        {project.github && (
          <a className="project-code-link" href={project.github} target="_blank" rel="noopener noreferrer">
            Explore Public Repository <ExternalLink size={16} />
          </a>
        )}
      </div>
    </article>
  );
}

function Projects() {
  const [filter, setFilter] = useState("All");
  const visibleProjects = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((project) => project.category === filter)),
    [filter]
  );

  return (
    <section id="projects" className="section section-anchor projects-section">
      <div className="container">
        <SectionHeading number="03" eyebrow="THINGS I'VE BUILT" title="Selected" highlight="work.">
          A collection of real personal, university, and client-facing projects that reflect the technologies I use and problems I enjoy solving.
        </SectionHeading>

        <div className="filter-bar" role="group" aria-label="Filter projects by category">
          {FILTERS.map((option) => (
            <button
              type="button"
              key={option}
              aria-pressed={filter === option}
              className={filter === option ? "filter-pill is-active" : "filter-pill"}
              onClick={() => setFilter(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="projects-grid" aria-live="polite">
          {visibleProjects.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </div>

        <Reveal className="github-cta">
          <div className="github-cta-icon"><Terminal size={23} /></div>
          <div>
            <h3>Curious About The Code?</h3>
            <p>Explore more development work and repositories on GitHub.</p>
          </div>
          <a className="button button-secondary" href={PROFILE.github} target="_blank" rel="noopener noreferrer">
            Explore GitHub <ArrowUpRight size={17} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

function Experience() {
  return (
    <section id="experience" className="section section-anchor experience-section">
      <div className="container">
        <SectionHeading number="04" eyebrow="MY JOURNEY" title="Experience &" highlight="Education.">
          Professional team experience supported by a foundation in computer science and hands-on project development.
        </SectionHeading>

        <div className="experience-layout">
          <div className="experience-list">
            {JOBS.map((job, index) => (
              <Reveal key={job.employer} delay={index * 0.1}>
                <article className="experience-item">
                  <div className="experience-marker"><BriefcaseBusiness size={18} /></div>
                  <div className="experience-body">
                    <div className="experience-top">
                      <div>
                        <span className="experience-company">{job.employer}</span>
                        <h3>{job.role}</h3>
                      </div>
                      <span className="experience-duration">{job.duration}</span>
                    </div>
                    <p>{job.description}</p>
                    <div className="experience-tags">
                      {job.stack.map((tool) => (
                        <span key={tool}>{tool}</span>
                      ))}
                    </div>
                    <div className="experience-place"><MapPin size={14} />{job.place}</div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.16} className="education-card">
            <div className="education-icon"><GraduationCap size={27} /></div>
            <span className="education-kicker">EDUCATION</span>
            <h3>Bachelor of Science in Computer Science</h3>
            <p>PMAS Arid Agriculture University</p>
            <div className="education-dates"><CalendarDays size={16} /> 2022 – 2026</div>
            <div className="education-divider" />
            <p className="education-note">
              Academic projects in mobile development, web engineering, databases, desktop applications, and digital logic design.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Contact & Footer                                                    */
/* ------------------------------------------------------------------ */

const CONTACT_FORM_ENDPOINT =
  "https://formspree.io/f/mljgpvvw";

function Contact() {
  const [copied, setCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formStatus, setFormStatus] = useState({
    type: "",
    message: "",
  });

  useEffect(() => {
    if (!copied) return;

    const timer = setTimeout(() => {
      setCopied(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSending) return;

    if (CONTACT_FORM_ENDPOINT.includes("YOUR_FORM_ID")) {
      setFormStatus({
        type: "error",
        message: "Please configure your Formspree endpoint.",
      });
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSending(true);
    setFormStatus({ type: "", message: "" });

    try {
      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Message delivery failed.");
      }

      form.reset();

      setFormStatus({
        type: "success",
        message: "Thank you! Your message has been sent successfully.",
      });
    } catch {
      setFormStatus({
        type: "error",
        message: "Unable to send. Please try again or email me directly.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="section section-anchor contact-section"
    >
      <div className="container">
        <Reveal>
          <div className="contact-panel">
            <div
              className="contact-glow"
              aria-hidden="true"
            />

            <div className="contact-inner">
              <Eyebrow number="05">
                LET'S CONNECT
              </Eyebrow>

              <h2>
                Have a question{" "}
                <span className="text-gradient">
                  or project idea?
                </span>
              </h2>

              <p>
                Have a project, collaboration, job opportunity,
                or general question? Feel free to get in touch.
              </p>

              {/* CONTACT FORM */}
              <form
                className="portfolio-contact-form"
                onSubmit={handleSubmit}
              >
                <div
                  className="contact-honeypot"
                  aria-hidden="true"
                >
                  <label htmlFor="contact-website">
                    Leave empty
                  </label>
                  <input
                    id="contact-website"
                    type="text"
                    name="_gotcha"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="contact-form-grid">

                  {/* NAME */}
                  <div className="contact-field">
                    <label htmlFor="contact-name">
                      Full Name *
                    </label>

                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      autoComplete="name"
                      minLength={2}
                      maxLength={100}
                      required
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="contact-field">
                    <label htmlFor="contact-email">
                      Email Address *
                    </label>

                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      maxLength={254}
                      required
                    />
                  </div>

                  {/* SUBJECT */}
                  <div className="contact-field contact-field-full">
                    <label htmlFor="contact-subject">
                      Subject *
                    </label>

                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      placeholder="What would you like to discuss?"
                      maxLength={150}
                      required
                    />
                  </div>

                  {/* MESSAGE */}
                  <div className="contact-field contact-field-full">
                    <label htmlFor="contact-message">
                      Your Message *
                    </label>

                    <textarea
                      id="contact-message"
                      name="message"
                      rows={6}
                      minLength={10}
                      maxLength={5000}
                      placeholder="Tell me about your question or project..."
                      required
                    />
                  </div>
                </div>

                {/* SEND BUTTON */}
                <div className="contact-form-bottom">
                  <span className="contact-form-help">
                    I'll be happy to hear from you.
                  </span>

                  <button
                    type="submit"
                    className="button button-primary contact-send"
                    disabled={isSending}
                  >
                    {isSending ? "Sending..." : "Send Message"}

                    {!isSending && (
                      <ArrowUpRight size={18} />
                    )}
                  </button>
                </div>

                {/* SUCCESS / ERROR */}
                {formStatus.message && (
                  <p
                    className={`contact-form-status contact-form-status--${formStatus.type}`}
                    role={
                      formStatus.type === "error"
                        ? "alert"
                        : "status"
                    }
                  >
                    {formStatus.message}
                  </p>
                )}
              </form>

              {/* EXISTING CONTACT OPTIONS */}
              <div className="contact-actions">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="button button-secondary"
                >
                  <Mail size={18} />
                  Email Directly
                  <ArrowUpRight size={17} />
                </a>

                <button
                  type="button"
                  className="button button-secondary"
                  onClick={copyEmail}
                >
                  {copied ? (
                    <Check size={17} />
                  ) : (
                    <MousePointer2 size={17} />
                  )}

                  {copied ? "Email Copied" : "Copy Email"}
                </button>
              </div>

              <div className="contact-email">
                {PROFILE.email}
              </div>

              <div className="contact-profiles">
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub <ArrowUpRight size={14} />
                </a>

                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn <ArrowUpRight size={14} />
                </a>

                <span>
                  <MapPin size={14} />
                  {PROFILE.location}
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <a href="#home" className="footer-logo">Aamir<span>.</span></a>
        <span>Designed & developed with React.</span>
        <span>© {new Date().getFullYear()} {PROFILE.name}</span>
        <a href="#home" aria-label="Back to top">Back to top ↑</a>
      </div>
    </footer>
  );
}

function WhatsAppButton() {
  return (
    <a
      href={PROFILE.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={30} />
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* App                                                                 */
/* ------------------------------------------------------------------ */

export default function App() {
  return (
    <div className="portfolio-shell">
      <Navbar />
      <main>
        <Hero />
        <PortfolioAnalytics />
        <About />
        <Expertise />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}