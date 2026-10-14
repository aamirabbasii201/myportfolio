import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
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
  Layers3,
  Mail,
  MapPin,
  Menu,
  Monitor,
  MousePointer2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Sprout,
  Terminal,
  X,
} from "lucide-react";

import { useRef } from "react";

import { FaWhatsapp } from "react-icons/fa";
const PROFILE = {
  name: "Aamir Israr",
  email: "aamirabbaxii201@gmail.com",
  location: "Rawalpindi, Pakistan",
  github: "https://github.com/aamirabbasii201",
  linkedin: "https://www.linkedin.com/in/aamir-abbasi-b0a094220",
  resume: "/Aamir-Israr-CV.pdf",
};

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
    title: "Mobile development",
    copy: "Cross-platform mobile applications with thoughtful navigation, robust state, and native-feeling interactions.",
    tools: ["React Native", "Android", "AsyncStorage", "OP-SQLite"],
    color: "violet",
    index: "01",
  },
  {
    icon: Code2,
    title: "Frontend engineering",
    copy: "Responsive, component-driven interfaces that balance visual polish with clarity and usability.",
    tools: ["React.js", "JavaScript", "HTML5", "CSS3"],
    color: "blue",
    index: "02",
  },
  {
    icon: Database,
    title: "APIs & data",
    copy: "Backend integration and relational data systems, from database modeling to authentication and REST APIs.",
    tools: ["ASP.NET Web API", "C#", "SQL Server", "SQLite"],
    color: "teal",
    index: "03",
  },
  {
    icon: BrainCircuit,
    title: "AI & integrations",
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
    featured: true,
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
    featured: true,
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
    featured: true,
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

function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 26 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();



  const photoDialogRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
<header className={`site-nav ${scrolled ? "site-nav--scrolled" : ""}`}>
  <div className="nav-container container">

    {/* Profile Picture + Name */}
  {/* Profile Picture + Name */}
<div className="wordmark-group">
  <button
    type="button"
    className="wordmark-avatar"
    onClick={() => photoDialogRef.current?.showModal()}
    aria-label="View larger profile picture"
  >
    <img src="/images/profile.jpg" alt="Aamir Israr" />
  </button>

  <a
    href="#home"
    className="wordmark"
    onClick={() => setIsOpen(false)}
  >
    <span>
      Aamir<span className="wordmark-light"> Israr</span>
    </span>
  </a>
</div>
    {/* Desktop Navigation */}
    <nav className="nav-links" aria-label="Primary navigation">
      {NAV_ITEMS.map((item) => (
        <a href={item.href} key={item.href}>
          {item.label}
        </a>
      ))}
    </nav>

    {/* Resume Button */}
    <a href={PROFILE.resume} className="nav-resume" download>
      Resume <Download size={15} strokeWidth={1.9} />
    </a>

    {/* Mobile Menu Toggle */}
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

  {/* Mobile Navigation */}
  {isOpen && (
    <motion.nav
      id="mobile-menu"
      initial={reduceMotion ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mobile-menu"
      aria-label="Mobile navigation"
    >
      {NAV_ITEMS.map((item) => (
        <a
          href={item.href}
          onClick={() => setIsOpen(false)}
          key={item.href}
        >
          {item.label}
          <ArrowUpRight size={17} />
        </a>
      ))}

      <a
        href={PROFILE.resume}
        download
        onClick={() => setIsOpen(false)}
      >
        Download CV <Download size={17} />
      </a>
    </motion.nav>
  )}
</header>



  );


}

function Eyebrow({ number, children }) {
  return <div className="section-eyebrow"><span>{number}</span><i />{children}</div>;
}

function HeroArtwork() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="hero-art" aria-label="Decorative illustration of code and application development">
      <div className="hero-art-glow" />
      <motion.div
        className="hero-code-window"
        initial={reduceMotion ? false : { opacity: 0, y: 24, rotate: 2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="code-topbar"><div className="traffic-dots"><b/><b/><b/></div><span>developer.tsx</span><Code2 size={16}/></div>
        <div className="code-body" aria-hidden="true">
          <div><em>01</em><span className="code-magenta">const</span> <span className="code-cyan">developer</span> = <span>{"{"}</span></div>
          <div><em>02</em>&nbsp;&nbsp;name: <span className="code-lime">"Aamir Israr"</span>,</div>
          <div><em>03</em>&nbsp;&nbsp;focus: <span className="code-lime">"Full Stack"</span>,</div>
          <div><em>04</em>&nbsp;&nbsp;skills: [</div>
          <div><em>05</em>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-lime">"React Native"</span>,</div>
          <div><em>06</em>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-lime">"React.js"</span>,</div>
          <div><em>07</em>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-lime">"ASP.NET API"</span></div>
          <div><em>08</em>&nbsp;&nbsp;],</div>
          <div><em>09</em>&nbsp;&nbsp;build: <span className="code-cyan">(idea)</span> =&gt; <span className="code-lime">"impact"</span></div>
          <div><em>10</em><span>{"}"}</span>;</div>
        </div>
        <div className="code-bottom"><span><span className="online-dot"/> system ready</span><span>UTF-8&nbsp; • &nbsp;React</span></div>
      </motion.div>
      <motion.div className="float-chip chip-react" animate={reduceMotion ? {} : { y: [0,-9,0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}><Layers3 size={18}/> React Native</motion.div>
      <motion.div className="float-chip chip-ai" animate={reduceMotion ? {} : { y: [0,8,0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}><Sparkles size={18}/> AI Integration</motion.div>
      <motion.div className="float-orb" animate={reduceMotion ? {} : { y: [0, -6, 0] }} transition={{ duration: 4.8, repeat: Infinity }} />
    </div>
  );
}

function Hero() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="home" className="hero section-anchor">
      <div className="hero-noise" aria-hidden="true" />
      <div className="hero-ambient hero-ambient-one" aria-hidden="true" />
      <div className="hero-ambient hero-ambient-two" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <motion.div className="hero-status" initial={reduceMotion ? false : {opacity: 0, y: 12}} animate={{opacity: 1, y: 0}} transition={{delay: 0.1}}>
            <span className="status-dot"/> SOFTWARE DEVELOPER · RAWALPINDI, PK
          </motion.div>
          <motion.h1 initial={reduceMotion ? false : {opacity: 0, y: 26}} animate={{opacity: 1, y: 0}} transition={{duration: 0.75, delay: 0.14, ease: [0.22,1,0.36,1]}}>
            Hi, I'm <span className="name-gradient">Aamir.</span><br/>
            I turn ideas into <span className="text-gradient">digital products.</span>
          </motion.h1>
          <motion.p className="hero-description" initial={reduceMotion ? false : {opacity: 0, y: 18}} animate={{opacity: 1, y: 0}} transition={{duration: 0.7, delay: 0.29}}>
            Full-stack software developer building mobile apps, responsive websites, secure APIs, and AI-powered experiences—with the details that make great products feel effortless.
          </motion.p>
          <motion.div className="hero-cta" initial={reduceMotion ? false : {opacity: 0, y: 14}} animate={{opacity: 1, y: 0}} transition={{delay: 0.42}}>
            <a className="button button-primary" href="#projects">Explore My Work <ArrowUpRight size={18}/></a>
            <a className="button button-secondary" href={PROFILE.resume} download>Download CV <Download size={17}/></a>
          </motion.div>
          <div className="hero-shortcuts"><a href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={14}/></a><span>✳</span><a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={14}/></a><span>✳</span><a href={`mailto:${PROFILE.email}`}>Email <ArrowUpRight size={14}/></a></div>
        </div>
        <HeroArtwork />
      </div>
      <div className="container hero-bottom"><span>SCROLL TO EXPLORE</span><ArrowDown size={16}/><span className="hero-bottom-line"/><span>REACT NATIVE / REACT / .NET / AI</span></div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section section-anchor about-section">
      <div className="container about-grid">
        <Reveal>
          <Eyebrow number="01">A LITTLE ABOUT ME</Eyebrow>
          <h2 className="section-title">Building with <span className="text-gradient">purpose.</span><br/>Designing with intention.</h2>
        </Reveal>
        <Reveal delay={0.1} className="about-content">
          <p>I'm <strong>Aamir Israr</strong>, a BS Computer Science graduate from PMAS Arid Agriculture University. I enjoy working across the product stack—from the React Native interface you touch to the backend API and data model that power it.</p>
          <p>My work spans AI-assisted mobile apps, React websites, .NET services, and practical desktop systems. I've gained industry experience at CloudGate Technologies and Safex Solutions, alongside independent and university projects.</p>
          <div className="about-facts">
            <div><span>06</span><small>Documented projects</small></div>
            <div><span>02</span><small>Professional teams</small></div>
            <div><span>BSCS</span><small>2022–2026</small></div>
          </div>
          <a className="text-link" href="#experience">More about my experience <ArrowRight size={17}/></a>
        </Reveal>
      </div>
    </section>
  );
}

function Expertise() {
  return (
    <section id="expertise" className="section section-anchor expertise-section">
      <div className="container">
        <Reveal className="section-heading split-heading">
          <div><Eyebrow number="02">WHAT I DO</Eyebrow><h2 className="section-title">My <span className="text-gradient">expertise.</span></h2></div>
          <p>From fluid frontends to the systems behind them, I build products with attention to how they look, work, and scale.</p>
        </Reveal>
        <div className="expertise-grid">
          {EXPERTISE.map((item, index) => {
            const Icon = item.icon;
            return <Reveal key={item.index} delay={index * 0.07} className="expertise-grid-item">
              <article className={`expertise-card expertise-${item.color}`}>
                <div className="expertise-card-top"><div className="expertise-icon"><Icon size={24} strokeWidth={1.7}/></div><span>{item.index}</span></div>
                <h3>{item.title}</h3><p>{item.copy}</p>
                <div className="tags">{item.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
              </article>
            </Reveal>;
          })}
        </div>

        {/* Floating WhatsApp Button */}
<a
  href="https://wa.me/923126640201?text=Hi%20Aamir%2C%20I%20saw%20your%20portfolio."
  target="_blank"
  rel="noopener noreferrer"
  className="whatsapp-float"
  aria-label="Chat on WhatsApp"
>
  <FaWhatsapp size={30} />
</a>

      </div>
    </section>
  );
}

function ProjectVisual({ kind }) {
  if (kind === "plant") {
    return <div className="visual-content visual-plant"><div className="visual-phone"><div className="visual-phone-header"><span className="p-dot"/> PlantCare<span>✦</span></div><div className="plant-orb"><Sprout size={56} strokeWidth={1.2}/></div><div className="visual-phone-text">Your plant is thriving</div><div className="visual-progress"><span/></div><div className="visual-phone-meta"><span>Light</span><span>Water</span><span>Health</span></div></div><span className="visual-floating-label">AI plant analysis <Sparkles size={14}/></span></div>;
  }
  if (kind === "learning") {
    return <div className="visual-content visual-learning"><div className="visual-dashboard"><div className="dash-top"><BookOpen size={20}/><span>LearnSpace</span><span>•••</span></div><div className="dash-kicker">CONTINUE LEARNING</div><div className="dash-title">Build new skills, step by step.</div><div className="dash-course"><div className="dash-course-icon"><Code2 size={20}/></div><div><strong>Web Development</strong><small>Lesson 08 / 12</small><div className="dash-bar"><span/></div></div></div><div className="dash-tiles"><span>Courses<br/><b>12</b></span><span>Progress<br/><b>76%</b></span></div></div></div>;
  }
  if (kind === "cab") {
    return <div className="visual-content visual-cab"><div className="visual-browser"><div className="browser-top"><span/><span/><span/><i>primecab.solutions</i></div><div className="browser-navbar">PRIMECAB <span>Home&nbsp;&nbsp; Services&nbsp;&nbsp; Contact</span></div><div className="browser-hero"><small>BUSINESS MOBILITY SOLUTIONS</small><h4>Every journey,<br/>better connected.</h4><div className="fake-button">Explore services <ArrowUpRight size={12}/></div></div></div></div>;
  }
  if (kind === "hotel") {
    return <div className="visual-content visual-hotel"><div className="visual-mini-panel"><div className="mini-title">Hotel Manager<span>● ● ●</span></div><div className="mini-grid"><div><small>Reservations</small><strong>28</strong></div><div><small>Available rooms</small><strong>12</strong></div></div><div className="mini-table"><div><span>ROOM</span><span>STATUS</span></div><div><span>Suite 204</span><b>Checked in</b></div><div><span>Room 118</span><b>Reserved</b></div><div><span>Suite 301</span><b>Available</b></div></div></div></div>;
  }
  if (kind === "rental") {
    return <div className="visual-content visual-rental"><div className="rental-circle rental-one"/><div className="rental-circle rental-two"/><div className="rental-card"><div className="rental-header">RENTAL MANAGEMENT <span>2024</span></div><div className="rental-car">▰<span>↗</span></div><div className="rental-bottom"><div><small>BOOKINGS</small><strong>Manage rentals</strong></div><ChevronRight size={22}/></div></div></div>;
  }
  return <div className="visual-content visual-safety"><div className="safety-circuit"><ShieldCheck size={64} strokeWidth={1.2}/><div className="safety-nodes"><span>FIRE</span><span>SMOKE</span><span>ENTRY</span></div></div><div className="safety-line safety-line-one"/><div className="safety-line safety-line-two"/></div>;
}

function Projects() {
  const [filter, setFilter] = useState("All");
  const visibleProjects = useMemo(() => filter === "All" ? PROJECTS : PROJECTS.filter((project) => project.category === filter), [filter]);
  return (
    <section id="projects" className="section section-anchor projects-section">
      <div className="container">
        <Reveal className="section-heading split-heading">
          <div><Eyebrow number="03">THINGS I'VE BUILT</Eyebrow><h2 className="section-title">Selected <span className="text-gradient">work.</span></h2></div>
          <p>A collection of real personal, university, and client-facing projects that reflect the technologies I use and problems I enjoy solving.</p>
        </Reveal>
        <div className="filter-bar" role="group" aria-label="Filter projects by category">
          {FILTERS.map((option) => <button type="button" aria-pressed={filter === option} className={filter === option ? "filter-pill is-active" : "filter-pill"} onClick={() => setFilter(option)} key={option}>{option}</button>)}
        </div>
        <div className="projects-grid" aria-live="polite">
          {visibleProjects.map((project) => <article className="project-card" key={project.id}>
            <div className={`project-visual project-${project.visual}`}>
              <div className="visual-top-label"><span>{project.category.toUpperCase()}</span><span>{project.number} / 06</span></div>
              <ProjectVisual kind={project.visual}/>
              <div className="concept-tag">ILLUSTRATIVE VISUAL</div>
            </div>
            <div className="project-info">
              <div className="project-small"><span>{project.period}</span><span className="project-category">{project.category}</span></div>
              <h3>{project.name}</h3><p className="project-subtitle">{project.subtitle}</p>
              <p className="project-description">{project.description}</p>
              <ul className="project-highlights">{project.highlights.map((highlight) => <li key={highlight}><Check size={13}/>{highlight}</li>)}</ul>
              <div className="project-tech">{project.stack.map((tool) => <span key={tool}>{tool}</span>)}</div>
              {project.github && <a className="project-code-link" href={project.github} target="_blank" rel="noopener noreferrer">Explore public repository <ExternalLink size={16}/></a>}
            </div>
          </article>)}
        </div>
        <Reveal className="github-cta"><div className="github-cta-icon"><Terminal size={23}/></div><div><h3>Curious about the code?</h3><p>Explore more development work and repositories on GitHub.</p></div><a className="button button-secondary" href={PROFILE.github} target="_blank" rel="noopener noreferrer">Explore GitHub <ArrowUpRight size={17}/></a></Reveal>
      </div>
    </section>
  );
}

function Experience() {
  const jobs = [
    { employer: "CloudGate Technologies", role: "Software Developer", duration: "3 months", place: "Rawalpindi, Pakistan", description: "Supported React Native and JavaScript application development, API integrations, debugging, testing, and problem-solving as part of a professional software development team.", stack: ["React Native", "JavaScript", "API Integration"] },
    { employer: "Safex Solutions", role: "Software Development Intern", duration: "2 months", place: "Remote", description: "Contributed to development tasks and application improvements, gaining hands-on practice with collaborative development, debugging, and remote communication.", stack: ["Software Development", "Debugging", "Team Collaboration"] },
  ];
  return (
    <section id="experience" className="section section-anchor experience-section"><div className="container">
      <Reveal className="section-heading split-heading"><div><Eyebrow number="04">MY JOURNEY</Eyebrow><h2 className="section-title">Experience & <span className="text-gradient">education.</span></h2></div><p>Professional team experience supported by a foundation in computer science and hands-on project development.</p></Reveal>
      <div className="experience-layout">
        <div className="experience-list">{jobs.map((job, index) => <Reveal key={job.employer} delay={index * .1}><article className="experience-item"><div className="experience-marker"><BriefcaseBusiness size={18}/></div><div className="experience-body"><div className="experience-top"><div><span className="experience-company">{job.employer}</span><h3>{job.role}</h3></div><span className="experience-duration">{job.duration}</span></div><p>{job.description}</p><div className="experience-tags">{job.stack.map((tool)=><span key={tool}>{tool}</span>)}</div><div className="experience-place"><MapPin size={14}/>{job.place}</div></div></article></Reveal>)}</div>
        <Reveal delay={0.16} className="education-card"><div className="education-icon"><GraduationCap size={27}/></div><span className="education-kicker">EDUCATION</span><h3>Bachelor of Science in Computer Science</h3><p>PMAS Arid Agriculture University</p><div className="education-dates"><CalendarDays size={16}/> 2022 – 2026</div><div className="education-divider"/><p className="education-note">Academic projects in mobile development, web engineering, databases, desktop applications, and digital logic design.</p></Reveal>
      </div>
    </div></section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copyEmail = async () => {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard not supported");
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };
  return (
    <section id="contact" className="section section-anchor contact-section"><div className="container"><Reveal>
      <div className="contact-panel"><div className="contact-glow" aria-hidden="true"/><div className="contact-inner"><Eyebrow number="05">LET'S CONNECT</Eyebrow><h2>Have something <span className="text-gradient">in mind?</span></h2><p>I'm always interested in meaningful software projects, technical conversations, and opportunities to build something useful.</p><div className="contact-actions"><a href={`mailto:${PROFILE.email}`} className="button button-primary"><Mail size={18}/> Send an email <ArrowUpRight size={17}/></a><button type="button" className="button button-secondary" onClick={copyEmail}>{copied ? <Check size={17}/> : <MousePointer2 size={17}/>} {copied ? "Email copied" : "Copy email"}</button></div><div className="contact-email">{PROFILE.email}</div><div className="contact-profiles"><a href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={14}/></a><a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={14}/></a><span><MapPin size={14}/>{PROFILE.location}</span></div></div></div>
    </Reveal></div></section>
  );
}

function Footer() {
  return <footer className="footer"><div className="container footer-inner"><a href="#home" className="footer-logo">Aamir<span>.</span></a><span>Designed & developed with React.</span><span>© {new Date().getFullYear()} Aamir Israr</span><a href="#home" aria-label="Back to top">Back to top ↑</a></div></footer>;
}

export default function App() {
  return <div className="portfolio-shell"><Navbar/><main><Hero/><About/><Expertise/><Projects/><Experience/><Contact/></main><Footer/></div>;
}
