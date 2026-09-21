import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Code2,
  FileText,
  Github,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import { EXPERIENCE_ITEMS, PROFILE, PROJECTS, SKILL_CATEGORIES } from "./data";
import type { Project } from "./types";
import ContactFormModal from "./components/ContactFormModal";
import ProjectModal from "./components/ProjectModal";
import ResumeModal from "./components/ResumeModal";

const navigation = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState("about");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)),
      { rootMargin: "-30% 0px -60% 0px" },
    );
    navigation.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#09090b] text-zinc-100 selection:bg-cyan-300 selection:text-zinc-950">
      <motion.div className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-cyan-300 to-violet-300" style={{ scaleX }} />
      <div className="grid-bg pointer-events-none fixed inset-0 opacity-70" />
      <div className="pointer-events-none fixed left-1/2 top-[-16rem] h-[32rem] w-[48rem] -translate-x-1/2 rounded-full bg-cyan-300/[.07] blur-[120px]" />

      <header className="sticky top-0 z-50 border-b border-white/[.07] bg-[#09090b]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <button onClick={() => scrollTo("about")} className="text-xl font-black tracking-tight text-white" aria-label="Back to top">
            NAM<span className="text-cyan-300">.</span>
          </button>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
            {navigation.map(({ id, label }) => (
              <button key={id} onClick={() => scrollTo(id)} className={`relative py-2 font-mono text-xs transition ${activeSection === id ? "text-cyan-300" : "text-zinc-400 hover:text-white"}`}>
                {label}
                {activeSection === id && <motion.span layoutId="nav" className="absolute inset-x-0 bottom-0 h-px bg-cyan-300" />}
              </button>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <button onClick={() => setResumeOpen(true)} className="flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 font-mono text-xs text-zinc-200 transition hover:border-cyan-300/60 hover:text-white">
              <FileText className="h-4 w-4 text-cyan-300" /> Resume
            </button>
            <button onClick={() => setContactOpen(true)} className="rounded-lg bg-cyan-200 px-4 py-2.5 font-mono text-xs font-bold text-cyan-950 transition hover:bg-cyan-300">
              Contact
            </button>
          </div>
          <button onClick={() => setMobileMenuOpen((value) => !value)} className="rounded-lg border border-white/10 p-2 text-zinc-300 md:hidden" aria-label="Toggle navigation" aria-expanded={mobileMenuOpen}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-white/[.07] bg-[#09090b] md:hidden">
              <div className="space-y-1 px-5 py-5">
                {navigation.map(({ id, label }) => <button key={id} onClick={() => scrollTo(id)} className="block w-full rounded-lg px-3 py-3 text-left font-mono text-sm text-zinc-300 hover:bg-white/5">{label}</button>)}
                <div className="grid grid-cols-2 gap-3 pt-3">
                  <button onClick={() => { setMobileMenuOpen(false); setResumeOpen(true); }} className="rounded-lg border border-white/15 py-3 font-mono text-xs">Resume</button>
                  <button onClick={() => { setMobileMenuOpen(false); setContactOpen(true); }} className="rounded-lg bg-cyan-200 py-3 font-mono text-xs font-bold text-cyan-950">Contact</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="relative z-10">
        <section id="about" className="mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.4fr_.6fr]">
          <div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/[.06] px-3 py-1.5 font-mono text-xs text-emerald-200">
              <Sparkles className="h-3.5 w-3.5" /> Open to internship and fresher opportunities
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08 }} className="max-w-4xl text-5xl font-black leading-[.98] tracking-[-.045em] text-white sm:text-6xl lg:text-8xl">
              I turn coursework into <span className="text-cyan-300">working software.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .16 }} className="mt-7 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
              I'm {PROFILE.vietnameseName}, a Computer Science student at HCMUT building practical web, mobile, and developer tools. I care about clear system design, reliable APIs, and interfaces that help people finish real tasks.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .24 }} className="mt-9 flex flex-wrap gap-3">
              <button onClick={() => scrollTo("projects")} className="flex items-center gap-2 rounded-lg bg-cyan-200 px-6 py-3.5 font-mono text-xs font-bold text-cyan-950 transition hover:bg-cyan-300">
                Explore my work <ArrowRight className="h-4 w-4" />
              </button>
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-lg border border-white/15 bg-black/20 px-6 py-3.5 font-mono text-xs text-white transition hover:border-cyan-300/50">
                <Github className="h-4 w-4" /> GitHub profile
              </a>
            </motion.div>
          </div>

          <motion.aside initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .22 }} className="rounded-3xl border border-white/10 bg-white/[.035] p-6 shadow-2xl shadow-black/30 backdrop-blur">
            <p className="font-mono text-[10px] uppercase tracking-[.22em] text-cyan-300">Candidate snapshot</p>
            <div className="mt-6 space-y-5">
              <Snapshot icon={<GraduationCap />} label="Education" value="B.S. Computer Science · HCMUT" note={`${PROFILE.graduation} · GPA ${PROFILE.gpa}`} />
              <Snapshot icon={<Code2 />} label="Focus" value="Full-stack & product engineering" note="Web · Mobile · Developer tools" />
              <Snapshot icon={<MapPin />} label="Based in" value={PROFILE.location} note="Available for on-site / hybrid roles" />
            </div>
          </motion.aside>
        </section>

        <section id="projects" className="border-y border-white/[.07] bg-black/20 px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading kicker="Selected work" title="Projects with a real problem behind them" description="No placeholder products or invented metrics. These case studies reflect work I have designed, built, tested, or am actively developing." />
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {PROJECTS.map((project, index) => (
                <motion.article key={project.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: index * .07 }} onClick={() => setSelectedProject(project)} className="group flex min-h-[420px] cursor-pointer flex-col rounded-2xl border border-white/10 bg-[#111114] p-7 transition hover:-translate-y-1 hover:border-cyan-300/40">
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-mono text-[10px] uppercase tracking-[.18em] text-cyan-300">{project.eyebrow}</p>
                    <ArrowUpRight className="h-5 w-5 text-zinc-600 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan-300" />
                  </div>
                  <h3 className="mt-7 text-2xl font-bold tracking-tight text-white">{project.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-zinc-400">{project.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.slice(0, 5).map((tag) => <span key={tag} className="rounded border border-white/10 bg-white/[.035] px-2.5 py-1 font-mono text-[10px] text-zinc-300">{tag}</span>)}
                  </div>
                  <div className="mt-auto border-t border-white/[.07] pt-6">
                    <div className="flex items-center gap-2 text-xs text-zinc-300"><CheckCircle2 className="h-4 w-4 text-emerald-300" /> {project.status}</div>
                    <button className="mt-5 font-mono text-xs font-bold text-cyan-300">View case study →</button>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="mx-auto max-w-5xl px-5 py-24 sm:px-8">
          <SectionHeading kicker="Experience & education" title="Learning by shipping" description="A concise timeline focused on work I can explain, demonstrate, and improve." />
          <div className="mt-14 border-l border-white/10 pl-7 sm:pl-10">
            {EXPERIENCE_ITEMS.map((item, index) => (
              <article key={item.id} className="relative pb-14 last:pb-0">
                <span className={`absolute -left-[35px] top-1.5 h-3.5 w-3.5 rounded-full border-[3px] border-[#09090b] sm:-left-[47px] ${index === 0 ? "bg-cyan-300" : "bg-violet-300"}`} />
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                  <div><h3 className="text-xl font-bold text-white">{item.role}</h3><p className="mt-1 font-mono text-xs text-cyan-300">{item.company}</p></div>
                  <span className="w-fit rounded-md border border-white/10 bg-white/[.03] px-3 py-1.5 font-mono text-[10px] text-zinc-400">{item.duration}</span>
                </div>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-400">{item.description}</p>
                <ul className="mt-5 space-y-3">
                  {item.highlights.map((highlight) => <li key={highlight} className="flex max-w-3xl items-start gap-3 text-sm leading-6 text-zinc-300"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-300" />{highlight}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="border-y border-white/[.07] bg-black/20 px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading kicker="Technical foundation" title="Tools I have used in real coursework and projects" description="I prefer an honest skills map over progress bars or arbitrary proficiency percentages." />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SKILL_CATEGORIES.map((category) => (
                <div key={category.title} className="rounded-2xl border border-white/10 bg-white/[.03] p-6">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-[.15em] text-cyan-300">{category.title}</h3>
                  <ul className="mt-5 space-y-3">{category.skills.map((skill) => <li key={skill} className="flex items-center gap-2 text-sm text-zinc-300"><span className="h-1.5 w-1.5 rounded-full bg-violet-300" />{skill}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 text-center sm:px-8">
          <div className="rounded-3xl border border-cyan-300/20 bg-gradient-to-br from-cyan-300/[.08] via-transparent to-violet-300/[.06] px-6 py-20">
            <BookOpen className="mx-auto h-8 w-8 text-cyan-300" />
            <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-black tracking-tight text-white sm:text-5xl">Looking for a junior developer who learns in public and ships?</h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-zinc-400">I'm preparing for graduation in April 2027 and looking for opportunities to contribute, receive strong engineering feedback, and grow with a product team.</p>
            <button onClick={() => setContactOpen(true)} className="mt-8 inline-flex items-center gap-2 rounded-lg bg-cyan-200 px-7 py-4 font-mono text-xs font-bold text-cyan-950 hover:bg-cyan-300"><Mail className="h-4 w-4" /> Start a conversation</button>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/[.07] bg-black/20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 py-9 text-center sm:px-8 md:flex-row md:text-left">
          <div><p className="font-bold text-white">{PROFILE.name}</p><p className="mt-1 text-xs text-zinc-500">Computer Science student · Software developer</p></div>
          <div className="flex items-center gap-5 font-mono text-xs text-zinc-400"><a href={`mailto:${PROFILE.email}`} className="hover:text-cyan-300">Email</a><a href={PROFILE.github} target="_blank" rel="noreferrer" className="hover:text-cyan-300">GitHub</a><button onClick={() => setResumeOpen(true)} className="hover:text-cyan-300">Resume</button></div>
          <p className="font-mono text-[10px] text-zinc-600">© {new Date().getFullYear()} Built with React & TypeScript</p>
        </div>
      </footer>

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      <ContactFormModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}

function Snapshot({ icon, label, value, note }: { icon: ReactNode; label: string; value: string; note: string }) {
  return <div className="flex gap-4 border-b border-white/[.07] pb-5 last:border-0 last:pb-0"><div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-300/15 bg-cyan-300/[.06] text-cyan-300 [&>svg]:h-5 [&>svg]:w-5">{icon}</div><div><p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">{label}</p><p className="mt-1 text-sm font-semibold text-white">{value}</p><p className="mt-1 text-xs text-zinc-500">{note}</p></div></div>;
}

function SectionHeading({ kicker, title, description }: { kicker: string; title: string; description: string }) {
  return <div className="max-w-3xl"><p className="font-mono text-xs font-bold uppercase tracking-[.2em] text-cyan-300">{kicker}</p><h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl">{title}</h2><p className="mt-5 text-sm leading-7 text-zinc-400 sm:text-base">{description}</p></div>;
}
