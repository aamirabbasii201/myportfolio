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
  Copy,
  Send,
  ChevronRight,
  Code2,
  Database,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Quote,
  Target,
  Layers3,
  Lightbulb,
  Rocket,
  TrendingUp,
  MessageCircle,
  CheckCircle2,
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
  { label: "Testimonials", href: "#testimonials" },
  { label: "Experience", href: "#experience" },
  { label: "Approach", href: "#approach" },
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
    githubAliases: ["plantcareai", "plantcare", "plant-care", "plant-care-ai"],
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
    githubAliases: ["e-learning-platform", "elearning", "e-learning"],
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
    githubAliases: ["primecab", "prime-cab", "primecabsolutions"],
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
    githubAliases: ["hotelmanagement", "hotel-management", "hotelsystem"],
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
    githubAliases: ["carrental", "car-rental", "rentalmanagement"],
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
    githubAliases: ["smarthomesafety", "smart-home", "digital-logic", "homesafety"],
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
  { value: "06", label: "Featured Projects" },
  { value: "04", label: "Core Specialties" },
  { value: "02", label: "Companies Worked With" },
  { value: "05", label: "Months Team Experience" },
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

/** Independent animated edge layer; does not obstruct clickable content. */
function NeonTrace() {
  return <span className="neon-trace" aria-hidden="true" />;
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
        className="hero-photo-frame neon-frame neon-frame--portrait"
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
        <NeonTrace />
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
            Computer Science graduate focused on React Native, React, .NET APIs, and practical AI integrations. I design and build thoughtful digital experiences, from a smooth interface to the data behind it.
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
      className="analytics-skill-card neon-frame"
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
      <NeonTrace />
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
                className="analytics-stat-card neon-frame"
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
                <NeonTrace />
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
/* Technology marquee                                                 */
/* ------------------------------------------------------------------ */

const TECH_STACK = ["React Native", "React.js", "JavaScript", "C# / .NET", "SQL Server", "SQLite", "Firebase", "REST APIs", "AI Integrations", "Git & GitHub"];

function TechMarquee() {
  return (
    <div className="tech-marquee" aria-label="Technologies I work with">
      <div className="container tech-marquee-heading">TOOLS & TECHNOLOGIES I WORK WITH</div>
      <div className="tech-marquee-mask">
        <div className="tech-marquee-track" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div className="tech-marquee-group" key={copy}>
              {TECH_STACK.map((tech) => <span key={`${copy}-${tech}`}><span className="tech-spark">✳</span>{tech}</span>)}
            </div>
          ))}
        </div>
      </div>
    </div>
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

        <Reveal delay={0.1} className="about-content neon-frame neon-frame--about">
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
          <NeonTrace />
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
              <article className={`expertise-card expertise-${item.color} neon-frame`}>
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
                <NeonTrace />
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

// Discover public repository URLs at runtime; never fabricate a repository path.
// Direct links explicitly supplied in PROJECTS take precedence over discovery.
function useGithubRepositories() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    fetch("https://api.github.com/users/aamirabbasii201/repos?per_page=100&type=owner", {
      signal: controller.signal,
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((response) => response.ok ? response.json() : [])
      .then((items) => { if (Array.isArray(items)) setRepositories(items.filter((repo) => !repo.private && repo.html_url)); })
      .catch(() => {});
    return () => controller.abort();
  }, []);
  return repositories;
}

function getProjectGithubLink(project, repositories) {
  if (project.github) return { href: project.github, isDirect: true };
  const normalize = (value) => String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  const aliases = project.githubAliases || [];
  const match = repositories.find((repo) => aliases.some((alias) => {
    const name = normalize(repo.name);
    const search = normalize(alias);
    return name.length >= 5 && search.length >= 6 && (name.includes(search) || search.includes(name));
  }));
  return match
    ? { href: match.html_url, isDirect: true }
    : { href: `${PROFILE.github}?tab=repositories`, isDirect: false };
}

function ProjectCard({ project, githubLink }) {
  return (
    <article className="project-card neon-frame">
      <a
        className="project-card-overlay"
        href={githubLink.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={githubLink.isDirect ? `Open ${project.name} on GitHub` : `Browse Aamir's GitHub repositories for ${project.name}`}
      />
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
        <a className="project-code-link" href={githubLink.href} target="_blank" rel="noopener noreferrer">
          <Github size={16} />
          {githubLink.isDirect ? "View GitHub Repository" : "Browse My GitHub Projects"}
          <ExternalLink size={15} />
        </a>
      </div>
      <NeonTrace />
    </article>
  );
}

function Projects() {
  const repositories = useGithubRepositories();
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
            <ProjectCard project={project} githubLink={getProjectGithubLink(project, repositories)} key={project.id} />
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
/* Testimonials — sample cards for layout preview, not real endorsements */
/* ------------------------------------------------------------------ */

// Replace these with real, permissioned testimonials before publishing.
const TESTIMONIALS = [
  { tag: "MOBILE DEVELOPMENT", title: "Thoughtful app experiences", quote: "Sample feedback: The mobile experience feels purposeful, with clear navigation and attention to the small details that matter.", icon: Smartphone },
  { tag: "FRONTEND DEVELOPMENT", title: "Interfaces built with care", quote: "Sample feedback: Responsive layouts, considered interactions, and clean structure help turn requirements into something people enjoy using.", icon: Code2 },
  { tag: "TEAM COLLABORATION", title: "A practical problem solver", quote: "Sample feedback: Communicates progress clearly, works through technical challenges methodically, and stays focused on delivery.", icon: MessageCircle },
  { tag: "API & DATA", title: "Thinking beyond the screen", quote: "Sample feedback: Understands how frontend components, APIs, and data fit together to create a coherent product.", icon: Database },
];

function TestimonialCard({ item }) {
  const Icon = item.icon;
  return (
    <article className="testimonial-marquee-card neon-frame">
      <div className="testimonial-marquee-top"><Quote size={24} /><span>PORTFOLIO PREVIEW</span></div>
      <p className="testimonial-marquee-copy">{item.quote}</p>
      <div className="testimonial-marquee-divider" />
      <div className="testimonial-marquee-person">
        <span className="testimonial-marquee-avatar"><Icon size={20} /></span>
        <div><strong>{item.title}</strong><small>{item.tag} · SAMPLE</small></div>
      </div>
      <NeonTrace />
    </article>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="section section-anchor testimonials-section">
      <div className="container">
        <SectionHeading number="04" eyebrow="THE HUMAN SIDE OF THE WORK" title="Feedback &" highlight="testimonials.">
          Great work is built on communication, curiosity, and trust. This space is ready for feedback from collaborators and clients.
        </SectionHeading>
        <div className="testimonial-notice"><Sparkles size={17} /><span>Preview testimonials below are illustrative, not verified reviews. Replace with real feedback before publishing.</span></div>
      </div>
      <div className="testimonial-marquee" tabIndex={0} aria-label="Sample testimonial cards. Hover or focus to pause scrolling.">
        <div className="testimonial-marquee-track">
          {[0, 1].map((copy) => (
            <div className="testimonial-marquee-group" key={copy} aria-hidden={copy === 1 ? "true" : undefined}>
              {TESTIMONIALS.map((item) => <TestimonialCard key={item.tag} item={item} />)}
            </div>
          ))}
        </div>
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
        <SectionHeading number="05" eyebrow="MY JOURNEY" title="Experience &" highlight="Education.">
          Professional team experience supported by a foundation in computer science and hands-on project development.
        </SectionHeading>

        <div className="experience-layout">
          <div className="experience-list">
            {JOBS.map((job, index) => (
              <Reveal key={job.employer} delay={index * 0.1}>
                <article className="experience-item">
                  <div className="experience-marker"><BriefcaseBusiness size={18} /></div>
                  <div className="experience-body neon-frame">
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
                    <NeonTrace />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.16} className="education-card neon-frame">
            <div className="education-icon"><GraduationCap size={27} /></div>
            <span className="education-kicker">EDUCATION</span>
            <h3>Bachelor of Science in Computer Science</h3>
            <p>PMAS Arid Agriculture University</p>
            <div className="education-dates"><CalendarDays size={16} /> 2022 – 2026</div>
            <div className="education-divider" />
            <p className="education-note">
              Academic projects in mobile development, web engineering, databases, desktop applications, and digital logic design.
            </p>
            <NeonTrace />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* How I work & philosophy                                            */
/* ------------------------------------------------------------------ */

const WORKFLOW = [
  { number: "01", icon: Lightbulb, title: "Understand", phase: "Explore the problem", copy: "Clarify the goal, user needs, constraints, and what success actually looks like.", outputs: ["Requirements", "User journey", "Success criteria"] },
  { number: "02", icon: Layers3, title: "Design & Build", phase: "Create with intention", copy: "Turn the plan into a modular, responsive implementation with clean integrations and usable interfaces.", outputs: ["Interface structure", "App architecture", "API integration"] },
  { number: "03", icon: Rocket, title: "Refine & Deliver", phase: "Test, improve, ship", copy: "Validate key flows, improve details, and get the project ready for real-world use and iteration.", outputs: ["Functional testing", "Performance review", "Handover"] },
];

function Approach() {
  return (
    <section id="approach" className="section section-anchor developer-approach-section">
      <div className="container">
        <SectionHeading number="06" eyebrow="HOW I APPROACH PROJECTS" title="Less complexity." highlight="More clarity.">
          A simple, collaborative process that keeps a project grounded—from the first question to the final detail.
        </SectionHeading>
        <div className="developer-approach-grid">
          <Reveal className="developer-approach-aside neon-frame">
            <span className="developer-process-kicker"><Target size={16}/> THE WORKING MINDSET</span>
            <h3>Good products begin with the right questions.</h3>
            <p>I like to understand why a feature matters before deciding how to build it. From interface decisions to API design, the goal is dependable software that people can use comfortably.</p>
            <div className="developer-process-points">
              <span><CheckCircle2 size={17}/> Usability before complexity</span>
              <span><CheckCircle2 size={17}/> Clear communication</span>
              <span><CheckCircle2 size={17}/> Thoughtful iteration</span>
            </div>
            <a href="#contact" className="developer-process-contact">Have a project in mind? <ArrowUpRight size={18}/></a>
            <NeonTrace />
          </Reveal>
          <div className="developer-approach-steps">
            {WORKFLOW.map(({ number, icon: Icon, title, phase, copy, outputs }, index) => (
              <Reveal key={number} delay={index * 0.1}>
                <article className="developer-step-card neon-frame">
                  <div className="developer-step-meta"><span>{number} / 03</span><span className="developer-step-icon"><Icon size={21}/></span></div>
                  <div className="developer-step-phase">{phase}</div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  <div className="developer-step-outputs">{outputs.map((output) => <span key={output}><Check size={13}/>{output}</span>)}</div>
                  <NeonTrace />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="developer-approach-finish">
          <Reveal><article className="developer-finish-card neon-frame">
            <div className="developer-finish-top"><span>BEYOND THE CODE</span><TrendingUp size={22}/></div>
            <h3>Build for the <em>next iteration.</em></h3>
            <p>Software is never only about getting a screen to work. It's about maintainable decisions, reliable integrations, and the flexibility to improve what comes next.</p>
            <div className="developer-finish-list"><span><Check size={16}/> Readable components</span><span><Check size={16}/> Practical solutions</span><span><Check size={16}/> Continuous learning</span></div>
            <NeonTrace />
          </article></Reveal>
          <Reveal delay={0.12}><article className="developer-finish-card developer-finish-card--blue neon-frame">
            <div className="developer-finish-top"><span>WHAT SUCCESS LOOKS LIKE</span><CheckCircle2 size={22}/></div>
            <h3>Experiences people <em>can trust.</em></h3>
            <p>The result I'm aiming for: polished interactions on the surface, well-considered systems behind the scenes, and a solution that actually serves its users.</p>
            <div className="developer-finish-list"><span><Check size={16}/> Clear user experience</span><span><Check size={16}/> Connected functionality</span><span><Check size={16}/> Room to grow</span></div>
            <NeonTrace />
          </article></Reveal>
        </div>
      </div>
    </section>
  );
}

function DeveloperStatement() {
  return (
    <section className="developer-statement-section" aria-label="My development philosophy">
      <div className="container developer-statement-inner">
        <div className="developer-statement-editorial">
          <Reveal className="developer-statement-portrait-column">
            <figure className="developer-statement-portrait-frame neon-frame neon-frame--portrait">
              <img
                src="/images/aamir-philosophy-standing.webp"
                alt="Aamir Israr standing in a modern software development workspace"
                loading="lazy"
                decoding="async"
                width="770"
                height="1024"
              />
              <figcaption className="developer-statement-photo-caption">
                <span className="developer-statement-caption-mark" aria-hidden="true" />
                <span><strong>AAMIR ISRAR</strong><small>SOFTWARE DEVELOPER</small></span>
                <Code2 size={20} strokeWidth={1.6} aria-hidden="true" />
              </figcaption>
              <NeonTrace />
            </figure>
            <div className="developer-statement-photo-caption-bottom" aria-hidden="true">
              IDEA <span>·</span> CODE <span>·</span> BUILD <span>·</span> IMPROVE
            </div>
          </Reveal>

          <div className="developer-statement-copy">
            <Reveal>
              <div className="developer-statement-quote">
                <Quote size={32} strokeWidth={1.6} aria-hidden="true" />
                <span>MY DEVELOPMENT PHILOSOPHY</span>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2>Great software doesn't just <em>work.</em> It makes things <span>simpler.</span></h2>
            </Reveal>
            <Reveal delay={0.13}>
              <p className="developer-statement-description">
                I believe meaningful software begins with understanding people and the problems they face.
                From thoughtful interfaces to reliable APIs, I focus on building clear, maintainable solutions
                that create real value and can evolve over time.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="developer-statement-values" aria-label="Development values">
                <span><Target size={17} /> User-focused thinking</span>
                <span><Code2 size={17} /> Clean, scalable code</span>
                <span><TrendingUp size={17} /> Continuous improvement</span>
              </div>
            </Reveal>
            <Reveal delay={0.22}>
              <div className="developer-statement-bottom">
                <span>AAMIR ISRAR / REACT NATIVE & FULL-STACK DEVELOPER</span>
                <a href="#contact">LET'S BUILD SOMETHING <ArrowUpRight size={17} /></a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Contact & Footer                                                    */
/* ------------------------------------------------------------------ */

// Formspree endpoint supplied by the portfolio owner.
const FORM_ENDPOINT = "https://formspree.io/f/mljgpvvw";

function Contact() {
  const [copied, setCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2200);
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
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (!FORM_ENDPOINT) {
      const sender = String(formData.get("name") || "Visitor");
      const reply = String(formData.get("email") || "");
      const subject = String(formData.get("subject") || "Project enquiry");
      const message = String(formData.get("message") || "");
      const body = `${message}\n\nFrom: ${sender}\nReply to: ${reply}`;
      window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setFormStatus({
        type: "info",
        message: "Your email app should open with your project brief. Please press Send there to deliver it.",
      });
      return;
    }

    setIsSending(true);
    setFormStatus({ type: "", message: "" });
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Message delivery failed");
      form.reset();
      setFormStatus({ type: "success", message: "Message sent successfully. Thank you for reaching out!" });
    } catch {
      setFormStatus({ type: "error", message: "Couldn't submit the form. Please email me directly instead." });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="section section-anchor contact-section reach-section">
      <div className="container">
        <Reveal>
          <div className="reach-eyebrow">
            <Eyebrow number="07">LET'S CONNECT</Eyebrow>
            <span className="reach-eyebrow-rule" />
            <span>OPEN TO CONVERSATIONS & COLLABORATION</span>
          </div>
        </Reveal>

        <div className="reach-layout">
          <Reveal className="reach-left">
            <p className="reach-pretitle">HAVE AN IDEA WORTH BUILDING?</p>
            <h2>Let's build<br /><em>something</em><br /><span>remarkable.</span></h2>
            <p className="reach-description">
              Whether you're planning a mobile app, a modern website, or an API-powered product,
              I'd love to hear what you're working on. Choose the channel that suits you best.
            </p>

            <div className="reach-channels" aria-label="Contact Aamir Israr">
              <a href={PROFILE.whatsapp} className="reach-channel reach-channel--whatsapp neon-frame" target="_blank" rel="noopener noreferrer">
                <span className="reach-channel-icon"><FaWhatsapp size={23} aria-hidden="true" /></span>
                <span className="reach-channel-copy"><strong>Chat on WhatsApp</strong><small>Quick questions & project discussions</small></span>
                <ArrowUpRight className="reach-channel-arrow" size={18} aria-hidden="true" />
                <NeonTrace />
              </a>

              <div className="reach-channel reach-channel--email neon-frame">
                <a href={`mailto:${PROFILE.email}`} className="reach-channel-main">
                  <span className="reach-channel-icon"><Mail size={22} aria-hidden="true" /></span>
                  <span className="reach-channel-copy"><strong>{PROFILE.email}</strong><small>Detailed enquiries and opportunities</small></span>
                </a>
                <button type="button" className="reach-copy" onClick={copyEmail} aria-label={copied ? "Email address copied" : "Copy email address"} title={copied ? "Copied!" : "Copy email"}>
                  {copied ? <Check size={17} /> : <Copy size={17} />}
                </button>
                <NeonTrace />
              </div>

              <a href={PROFILE.linkedin} className="reach-channel reach-channel--linkedin neon-frame" target="_blank" rel="noopener noreferrer">
                <span className="reach-channel-icon"><Linkedin size={22} aria-hidden="true" /></span>
                <span className="reach-channel-copy"><strong>Connect on LinkedIn</strong><small>Professional networking & career opportunities</small></span>
                <ArrowUpRight className="reach-channel-arrow" size={18} aria-hidden="true" />
                <NeonTrace />
              </a>

              <a href={PROFILE.github} className="reach-channel reach-channel--github neon-frame" target="_blank" rel="noopener noreferrer">
                <span className="reach-channel-icon"><Github size={22} aria-hidden="true" /></span>
                <span className="reach-channel-copy"><strong>Explore my GitHub</strong><small>Repositories, projects & code</small></span>
                <ArrowUpRight className="reach-channel-arrow" size={18} aria-hidden="true" />
                <NeonTrace />
              </a>
            </div>

            <div className="reach-location"><MapPin size={15} aria-hidden="true" /><span>{PROFILE.location}</span></div>
          </Reveal>

          <Reveal className="reach-form-reveal" delay={0.12}>
            <div className="reach-form-card neon-frame">
              <div className="reach-form-header">
                <span className="reach-form-heading-icon"><BriefcaseBusiness size={22} strokeWidth={1.7} /></span>
                <span><small>LET'S TALK ABOUT YOUR IDEA</small><strong>Send a Project Brief</strong></span>
                <Sparkles className="reach-form-sparkle" size={20} aria-hidden="true" />
              </div>

              <form className="reach-form" onSubmit={handleSubmit}>
                <div className="reach-honeypot" aria-hidden="true">
                  <label htmlFor="reach-website">Leave empty</label>
                  <input id="reach-website" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
                </div>
                <div className="reach-field-row">
                  <div className="reach-field"><label htmlFor="reach-name">Full name <span>*</span></label><input id="reach-name" name="name" type="text" autoComplete="name" placeholder="Your full name" minLength={2} maxLength={100} required /></div>
                  <div className="reach-field"><label htmlFor="reach-email">Email address <span>*</span></label><input id="reach-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" maxLength={254} required /></div>
                </div>
                <div className="reach-field"><label htmlFor="reach-subject">Subject <span>*</span></label><input id="reach-subject" name="subject" type="text" placeholder="What would you like to build?" maxLength={150} required /></div>
                <div className="reach-field"><label htmlFor="reach-message">Project details <span>*</span></label><textarea id="reach-message" name="message" placeholder="Tell me about the project, your goals and any useful details…" rows={6} minLength={10} maxLength={5000} required /></div>
                <div className="reach-form-footer">
                  <p>No pressure, just a conversation about what we can build.</p>
                  <button type="submit" disabled={isSending} className="reach-submit"><span>{isSending ? "Sending…" : "Send Message"}</span><Send size={18} aria-hidden="true" /></button>
                </div>
                {formStatus.message && <p className={`reach-form-status reach-form-status--${formStatus.type}`} role={formStatus.type === "error" ? "alert" : "status"}>{formStatus.message}</p>}
              </form>
              <NeonTrace />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const FOOTER_SOCIALS = [
  { label: "GitHub", href: PROFILE.github, Icon: Github, external: true },
  { label: "LinkedIn", href: PROFILE.linkedin, Icon: Linkedin, external: true },
  { label: "Email", href: `mailto:${PROFILE.email}`, Icon: Mail, external: false },
  { label: "WhatsApp", href: PROFILE.whatsapp, Icon: FaWhatsapp, external: true },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-main">
        <div className="footer-identity">
          <a href="#home" className="footer-logo">Aamir<span>.</span></a>
          <p>Building thoughtful digital products with React Native, React, APIs, and a commitment to the details.</p>
        </div>
        <div className="footer-links-group">
          <span className="footer-group-label">QUICK LINKS</span>
          <div className="footer-quick-links"><a href="#about">About</a><a href="#projects">Projects</a><a href="#testimonials">Testimonials</a><a href="#contact">Contact</a></div>
        </div>
        <div className="footer-social-group">
          <span className="footer-group-label">LET'S CONNECT</span>
          <div className="footer-social-icons">
            {FOOTER_SOCIALS.map(({ label, href, Icon, external }) => (
              <a key={label} href={href} aria-label={label} title={label} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
                <Icon size={21} />
              </a>
            ))}
          </div>
          <a className="footer-email-link" href={`mailto:${PROFILE.email}`}>{PROFILE.email}<ArrowUpRight size={14}/></a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</span>
        <span>Designed & developed with React.</span>
        <a href="#home">Back to top <ArrowUpRight size={15}/></a>
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
        <TechMarquee />
        <About />
        <Expertise />
        <Projects />
        <Testimonials />
        <Experience />
        <Approach />
        <DeveloperStatement />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}