import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import {
  Code,
  Users,
  ArrowUpRight,
  Sparkles,
  CheckCircle,
  Menu,
  X,
  FileText,
  ShoppingBag,
} from "lucide-react";

import { PROJECTS, SKILL_CATEGORIES, EXPERIENCE_ITEMS } from "./data";
import { Project } from "./types";

import ResumeModal from "./components/ResumeModal";
import ProjectModal from "./components/ProjectModal";
import ContactFormModal from "./components/ContactFormModal";

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  // Custom mouse glow reference to prevent infinite React re-renders
  const glowRef = useRef<HTMLDivElement>(null);

  // Typewriter effect states
  const words = ["Nam Nguyen Dinh.", "Full-Stack Developer.", "Software Engineer."];
  const [wordIdx, setWordIdx] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Scroll Progress Bar for cool feedback
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Typewriter machine loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentWord = words[wordIdx];
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText((prev) => prev.slice(0, -1));
      }, 50);
    } else {
      timer = setTimeout(() => {
        setTypedText((prev) => currentWord.slice(0, prev.length + 1));
      }, 100);
    }

    // Handle transitions
    if (!isDeleting && typedText === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && typedText === "") {
      setIsDeleting(false);
      setWordIdx((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, wordIdx]);

  // Handle cursor mouse glow coordinates dynamically
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Update navbar section highlight based on intersection ratios
  useEffect(() => {
    const sections = ["about", "tech", "projects", "experience"];
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // triggers when section dominates screen
      threshold: 0
    };

    const observerCallbacks = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallbacks, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#09090b] text-[#e5e1e4] selection:bg-[#00dce6]/30 selection:text-white overflow-x-hidden font-sans">
      {/* Scroll Progress line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#00dce6] to-[#d8b9ff] z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Floating Background Glow Filter */}
      <div
        ref={glowRef}
        className="fixed pointer-events-none w-[450px] h-[450px] bg-gradient-to-r from-[#00dce6]/5 to-[#d8b9ff]/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px] z-0 transition-opacity duration-300"
        style={{ left: "-9999px", top: "-9999px" }}
      />

      {/* Dot Grid Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-15" 
           style={{ 
             backgroundImage: "radial-gradient(ellipse at center, rgba(58, 73, 75, 0.15) 1px, transparent 2px)", 
             backgroundSize: "28px 28px" 
           }} 
      />

      {/* Interactive Top Header Nav Bar */}
      <header className="sticky top-0 z-40 bg-[#09090b]/80 backdrop-blur-md border-b border-outline-variant/10 select-none">
        <div className="max-w-7xl mx-auto px-6 h-18 flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            onClick={() => scrollToSection("about")}
            className="text-2xl font-bold font-headline-lg tracking-tight text-white cursor-pointer hover:text-[#00dce6] transition-colors"
          >
            Nam<span className="text-[#00dce6]">.</span>
          </motion.div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 font-mono text-xs tracking-wider">
            {[
              { id: "about", val: "About" },
              { id: "tech", val: "Tech Stack" },
              { id: "projects", val: "Projects" },
              { id: "experience", val: "Experience" }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`py-1.5 transition-colors cursor-pointer relative ${
                  activeSection === link.id ? "text-[#00dce6] font-bold" : "text-[#b9cacb] hover:text-white"
                }`}
              >
                {link.val}
                {activeSection === link.id && (
                  <motion.span 
                    layoutId="navUnderline" 
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00dce6]" 
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Resume opener and Contact buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setIsResumeOpen(true)}
              className="font-mono text-xs px-5 py-2.5 bg-neutral-950 hover:bg-neutral-900 border border-outline-variant/35 text-white hover:border-[#00dce6] transition-all cursor-pointer rounded-lg flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-[#00dce6]" />
              Resume
            </button>
          </div>

          {/* Mobile hamburger menu */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 border border-outline-variant/20 hover:bg-neutral-900 text-on-surface-variant hover:text-white rounded"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-outline-variant/10 bg-[#09090b]"
            >
              <div className="px-6 py-5 flex flex-col gap-4 font-mono text-sm tracking-wider">
                {[
                  { id: "about", val: "About" },
                  { id: "tech", val: "Tech Stack" },
                  { id: "projects", val: "Projects" },
                  { id: "experience", val: "Experience" }
                ].map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`py-1 text-left ${activeSection === link.id ? "text-[#00dce6] font-bold" : "text-[#b9cacb]"}`}
                  >
                    {link.val}
                  </button>
                ))}
                <div className="pt-2 border-t border-outline-variant/10 flex gap-3">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsResumeOpen(true);
                    }}
                    className="flex-1 font-mono text-xs py-2.5 bg-neutral-900 border border-outline-variant/20 text-center text-white"
                  >
                    Resume
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsContactOpen(true);
                    }}
                    className="flex-1 font-mono text-xs py-2.5 bg-[#00dce6] text-[#00373a] text-center font-bold"
                  >
                    Contact
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section id="about" className="relative z-10 min-h-[calc(100vh-72px)] flex items-center py-16 px-6">
        <div className="max-w-4xl mx-auto w-full space-y-8">
          <div>
            <span className="font-mono text-xs font-semibold px-3 py-1.5 bg-[#00dce6]/5 border border-[#00dce6]/20 rounded-full text-[#00dce6] inline-flex items-center gap-1.5 animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              Available for Internship 2024
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-headline-lg tracking-tight text-white leading-none">
              Hi, I'm <span className="text-[#00dce6]">{typedText}</span>
              <span className="text-[#00dce6] animate-pulse">|</span>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold font-headline-lg text-[#e5e1e4] max-w-3xl opacity-90 leading-tight">
              Final-Year Computer Science Student @ HCMUT | Full-Stack Developer.
            </p>
          </div>

          <p className="text-sm sm:text-base leading-relaxed text-[#b9cacb] max-w-2xl font-sans opacity-95">
            I build scalable applications and AI-enhanced software. Certified Scrum Professional &amp; Gemini Certified Student, focused on bridging the gap between sophisticated algorithms and user-centric interfaces.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => scrollToSection("projects")}
              className="font-mono text-xs px-8 py-4 bg-[#e3fdff] text-[#00373a] hover:bg-[#00dce6] transition-colors font-bold tracking-wider rounded cursor-pointer"
            >
              View Projects
            </button>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs px-8 py-4 border border-outline-variant/30 hover:border-[#00dce6] text-white bg-neutral-950/40 hover:bg-neutral-900 transition-colors tracking-wider rounded flex items-center gap-2 cursor-pointer"
            >
              <Code className="w-4 h-4 text-[#00dce6]" />
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Technical Arsenal Section */}
      <section id="tech" className="relative z-10 py-24 px-6 border-t border-outline-variant/10 bg-neutral-950/30">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="space-y-3">
            <h2 className="text-3 tracking-wider font-mono font-extrabold text-[#00dce6] uppercase">Skills Base</h2>
            <div className="flex items-center gap-4">
              <h3 className="text-2xl sm:text-3xl font-bold font-headline-lg text-white">Technical Arsenal</h3>
              <div className="h-[1px] bg-outline-variant/20 flex-1 hidden sm:block" />
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SKILL_CATEGORIES.map((category, index) => (
              <div
                key={index}
                className="bg-[#131315]/55 border border-outline-variant/15 hover:border-[#00dce6]/40 p-8 rounded-2xl transition-all duration-300 relative group overflow-hidden"
              >
                {/* Visual node light effect */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#00dce6]/5 to-transparent blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />
                
                <h4 className="text-xs font-mono font-bold text-[#00dce6] tracking-widest uppercase mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#d8b9ff] animate-ping" />
                  {category.title}
                </h4>

                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill, skillIdx) => (
                    <span
                      key={skillIdx}
                      className="text-xs font-mono px-3.5 py-1.5 bg-neutral-950 text-[#b9cacb] border-l-2 border-[#d8b9ff] rounded hover:text-white hover:border-[#00dce6] transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-24 px-6 border-t border-b border-outline-variant/10">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Grid Header */}
          <div className="flex justify-between items-end gap-4">
            <div className="space-y-3">
              <h2 className="text-3 tracking-wider font-mono font-extrabold text-[#00dce6] uppercase">Showcase</h2>
              <h3 className="text-2xl sm:text-3xl font-bold font-headline-lg text-white">Selected Works</h3>
            </div>
            <div className="font-mono text-xs text-[#b9cacb]">/03 Projects</div>
          </div>

          {/* Projects bento representation */}
          <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-6 h-auto md:h-[750px]">
            {/* Project 1: Featured (Lost & Found) - Left 8 columns */}
            <div 
              onClick={() => setSelectedProject(PROJECTS[0])}
              className="md:col-span-8 md:row-span-2 bg-[#131315]/50 hover:bg-[#131315]/80 border border-outline-variant/15 hover:border-[#00dce6]/60 rounded-2xl overflow-hidden group flex flex-col cursor-pointer transition-all duration-300"
            >
              {PROJECTS[0].image && (
                <div className="h-1/2 md:h-3/5 overflow-hidden relative border-b border-outline-variant/10 shrink-0">
                  <img
                    src={PROJECTS[0].image}
                    alt={PROJECTS[0].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-neutral-950/20" />
                </div>
              )}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex gap-2">
                    {PROJECTS[0].tags.map((tag, i) => (
                      <span key={i} className="text-[9px] font-bold font-mono tracking-wider px-2 py-0.5 bg-[#00dce6]/5 border border-[#00dce6]/20 text-[#00dce6] rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold font-headline-lg text-white group-hover:text-[#00dce6] transition-colors">
                    {PROJECTS[0].title}
                  </h4>
                  <p className="text-[#b9cacb] text-xs sm:text-sm leading-relaxed max-w-xl">
                    {PROJECTS[0].description}
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between text-xs font-mono font-bold text-[#00dce6]/90 group-hover:text-[#00dce6]">
                  <span className="flex items-center gap-1">
                    VIEW CASE STUDY <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </div>

            {/* Project 2: E-commerce - Right 4 columns, card 1 */}
            <div 
              onClick={() => setSelectedProject(PROJECTS[1])}
              className="md:col-span-4 bg-[#131315]/50 hover:bg-[#131315]/85 border border-outline-variant/15 hover:border-[#00dce6]/60 rounded-2xl p-8 cursor-pointer flex flex-col justify-between group transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#00dce6]/10 border border-[#00dce6]/25 flex items-center justify-center text-[#00dce6]">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold font-headline-lg text-white group-hover:text-[#00dce6] transition-colors">{PROJECTS[1].title}</h4>
                <p className="text-xs text-[#b9cacb] leading-relaxed">
                  {PROJECTS[1].description}
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-2 text-[10px] font-mono text-[#b9cacb] opacity-70">
                {PROJECTS[1].techTags.slice(0, 3).map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </div>
            </div>

            {/* Project 3: Intern Hub - Right 4 columns, card 2 */}
            <div 
              onClick={() => setSelectedProject(PROJECTS[2])}
              className="md:col-span-4 bg-[#131315]/50 hover:bg-[#131315]/85 border border-outline-variant/15 hover:border-[#00dce6]/60 rounded-2xl p-8 cursor-pointer flex flex-col justify-between group transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#d8b9ff]/10 border border-[#d8b9ff]/25 flex items-center justify-center text-[#d8b9ff]">
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold font-headline-lg text-white group-hover:text-[#00dce6] transition-colors">{PROJECTS[2].title}</h4>
                <p className="text-xs text-[#b9cacb] leading-relaxed">
                  {PROJECTS[2].description}
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-2 text-[10px] font-mono text-[#b9cacb] opacity-70">
                {PROJECTS[2].techTags.slice(0, 2).map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative z-10 py-24 px-6 bg-neutral-950/20">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="space-y-3">
            <h2 className="text-3 tracking-wider font-mono font-extrabold text-[#00dce6] uppercase">History</h2>
            <h3 className="text-2xl sm:text-3xl font-bold font-headline-lg text-white">Career Experience</h3>
          </div>

          {/* Timeline */}
          <div className="relative border-l border-zinc-800 ml-4 md:ml-8 pl-8 md:pl-10 space-y-16">
            {EXPERIENCE_ITEMS.map((item, index) => (
              <div key={item.id} className="relative group">
                {/* Circle point */}
                <span className={`absolute -left-[45px] md:-left-[49px] top-1.5 w-4 h-4 rounded-full border-4 border-[#09090b] z-10 ${
                  index === 0 ? "bg-[#00dce6] glow-effect shrink-0" : "bg-neutral-700 shrink-0"
                }`} />

                {/* Experience details */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-1.5 mb-3">
                  <div>
                    <h4 className="text-xl font-bold text-white group-hover:text-[#00dce6] transition-colors duration-300">
                      {item.role}
                    </h4>
                    <span className="text-[#00dce6] font-mono text-xs font-semibold">
                      {item.company}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-on-surface-variant bg-neutral-900 border border-outline-variant/10 px-2.5 py-1 inline-block rounded md:self-start">
                    {item.duration}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#b9cacb] leading-relaxed mb-4 max-w-3xl">
                  {item.description}
                </p>

                {/* Highlights bullet checklist */}
                {item.highlights && (
                  <ul className="space-y-2.5">
                    {item.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#b9cacb]">
                        <CheckCircle className="w-4 h-4 text-[#00dce6] mt-0.5 shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Get In Touch Section */}
      <section className="relative z-10 py-16 px-6 max-w-7xl mx-auto text-center">
        <div className="bg-[#131315]/60 hover:bg-[#131315]/80 border-2 border-dashed border-outline-variant/25 hover:border-[#00dce6]/50 bg-gradient-to-br from-[#131315] via-transparent to-transparent py-20 px-8 rounded-3xl transition-all duration-300">
          <h2 className="text-3xl sm:text-4xl font-bold font-headline-lg text-white mb-6 leading-tight">
            Let's build something <br />
            <span className="text-[#00dce6]">exceptional</span> together.
          </h2>
          <button
            onClick={() => setIsContactOpen(true)}
            className="font-mono text-xs px-10 py-5 bg-[#09090b] border border-[#00dce6] hover:bg-[#00dce6] hover:text-[#00373a] text-white transition-all font-bold tracking-widest rounded-lg cursor-pointer"
          >
            GET IN TOUCH
          </button>
        </div>
      </section>

      {/* Footer Details */}
      <footer className="relative z-10 bg-[#0e0e10] border-t border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-bold text-white">
            Nam<span className="text-[#00dce6]">.</span>
          </div>

          <p className="text-xs text-on-surface-variant font-medium">
            © {new Date().getFullYear()} Nam Nguyen Dinh.
          </p>

          <div className="flex gap-6 font-mono text-[10px] tracking-wider uppercase">
            <button
               onClick={() => setIsResumeOpen(true)}
               className="text-on-surface-variant hover:text-[#00dce6] transition-colors cursor-pointer"
            >
              Resume
            </button>
            <a
              href="mailto:dinhnam.tech@gmail.com"
              className="text-on-surface-variant hover:text-[#00dce6] transition-colors"
            >
              Email
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-[#00dce6] transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>

      {/* Modals & Dialog Controllers */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <ContactFormModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}
