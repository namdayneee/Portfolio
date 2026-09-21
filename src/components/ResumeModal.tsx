import { AnimatePresence, motion } from "motion/react";
import { Download, Github, Mail, MapPin, X } from "lucide-react";
import type { ReactNode } from "react";
import { EXPERIENCE_ITEMS, PROFILE, PROJECTS, SKILL_CATEGORIES } from "../data";

export default function ResumeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="resume-title">
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-md print-hidden" aria-label="Close resume" />
          <motion.article id="resume-sheet" initial={{ opacity: 0, y: 18, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: .98 }} className="resume-scrollbar relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#111114] shadow-2xl">
            <header className="print-hidden flex items-center justify-between border-b border-white/[.07] px-5 py-4 sm:px-7">
              <div><p className="font-mono text-[10px] uppercase tracking-[.18em] text-cyan-300">Resume preview</p><p className="mt-1 text-sm text-zinc-400">Use your browser's print dialog to save as PDF.</p></div>
              <div className="flex gap-2"><button onClick={() => window.print()} className="flex items-center gap-2 rounded-lg bg-cyan-200 px-4 py-2.5 font-mono text-xs font-bold text-cyan-950 hover:bg-cyan-300"><Download className="h-4 w-4" /> Save as PDF</button><button onClick={onClose} className="rounded-lg border border-white/10 p-2.5 text-zinc-400 hover:text-white" aria-label="Close"><X className="h-5 w-5" /></button></div>
            </header>

            <div className="overflow-y-auto p-6 sm:p-10">
              <div className="print-border flex flex-col justify-between gap-5 border-b border-white/10 pb-7 sm:flex-row">
                <div><h1 id="resume-title" className="print-dark text-3xl font-black text-white sm:text-4xl">{PROFILE.name}</h1><p className="print-accent mt-2 font-mono text-sm font-bold uppercase tracking-[.12em] text-cyan-300">Computer Science Student · Software Developer</p><p className="print-muted mt-3 max-w-xl text-sm leading-6 text-zinc-400">Final-year Computer Science student building practical full-stack, mobile, and developer-tool projects. Interested in junior software engineering roles with strong mentorship and real product responsibility.</p></div>
                <div className="print-muted space-y-2 text-xs text-zinc-400"><a href={`mailto:${PROFILE.email}`} className="flex items-center gap-2"><Mail className="h-4 w-4 text-cyan-300" />{PROFILE.email}</a><a href={PROFILE.github} className="flex items-center gap-2"><Github className="h-4 w-4 text-cyan-300" />github.com/namdayneee</a><p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-cyan-300" />{PROFILE.location}</p></div>
              </div>

              <div className="mt-8 grid gap-9 md:grid-cols-[.72fr_1.28fr]">
                <aside className="print-border space-y-8 md:border-r md:border-white/10 md:pr-8">
                  <ResumeSection title="Education">
                    <h3 className="print-dark font-bold text-white">B.S. Computer Science</h3><p className="print-muted mt-1 text-sm text-zinc-400">Ho Chi Minh City University of Technology (HCMUT)</p><p className="print-muted mt-2 font-mono text-xs text-zinc-500">2022 — Expected Apr 2027</p><p className="print-accent mt-2 font-mono text-xs font-bold text-cyan-300">GPA: {PROFILE.gpa}</p>
                  </ResumeSection>
                  <ResumeSection title="Technical skills">
                    <div className="space-y-4">{SKILL_CATEGORIES.map((category) => <div key={category.title}><h3 className="print-accent font-mono text-[10px] font-bold uppercase text-violet-300">{category.title}</h3><p className="print-muted mt-1 text-xs leading-5 text-zinc-400">{category.skills.join(" · ")}</p></div>)}</div>
                  </ResumeSection>
                  <ResumeSection title="Languages">
                    <p className="print-muted text-xs leading-6 text-zinc-400">Vietnamese — Native<br />English — Working proficiency</p>
                  </ResumeSection>
                </aside>

                <div className="space-y-8">
                  <ResumeSection title="Experience">
                    <div className="space-y-7">{EXPERIENCE_ITEMS.slice(0, 1).map((item) => <div key={item.id}><div className="flex flex-col justify-between gap-1 sm:flex-row"><div><h3 className="print-dark font-bold text-white">{item.role}</h3><p className="print-accent mt-1 text-xs font-semibold text-cyan-300">{item.company}</p></div><p className="print-muted font-mono text-[10px] text-zinc-500">{item.duration}</p></div><p className="print-muted mt-3 text-xs leading-5 text-zinc-400">{item.description}</p><ul className="print-muted mt-3 list-disc space-y-1.5 pl-4 text-xs leading-5 text-zinc-400">{item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></div>)}</div>
                  </ResumeSection>
                  <ResumeSection title="Selected projects">
                    <div className="space-y-6">{PROJECTS.map((project) => <div key={project.id}><div className="flex flex-col justify-between gap-1 sm:flex-row"><h3 className="print-dark font-bold text-white">{project.title}</h3><p className="print-muted font-mono text-[10px] text-zinc-500">{project.tags.slice(0, 4).join(" · ")}</p></div><p className="print-muted mt-2 text-xs leading-5 text-zinc-400">{project.description}</p><p className="print-muted mt-2 text-xs leading-5 text-zinc-400">• {project.highlights[0]}</p></div>)}</div>
                  </ResumeSection>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      )}
    </AnimatePresence>
  );
}

function ResumeSection({ title, children }: { title: string; children: ReactNode }) {
  return <section><h2 className="print-border print-accent mb-4 border-b border-white/10 pb-2 font-mono text-xs font-bold uppercase tracking-[.15em] text-cyan-300">{title}</h2>{children}</section>;
}
