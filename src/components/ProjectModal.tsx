import { AnimatePresence, motion } from "motion/react";
import { ExternalLink, Github, X } from "lucide-react";
import type { Project } from "../types";

export default function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  if (!project) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="project-title">
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-md" aria-label="Close project details" />
        <motion.article initial={{ opacity: 0, y: 20, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: .98 }} className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/15 bg-[#111114] shadow-2xl">
          <div className="border-b border-white/[.07] p-7 sm:p-9">
            <button onClick={onClose} className="absolute right-5 top-5 rounded-lg border border-white/10 p-2 text-zinc-400 hover:text-white" aria-label="Close"><X className="h-5 w-5" /></button>
            <p className="pr-12 font-mono text-[10px] uppercase tracking-[.18em] text-cyan-300">{project.eyebrow}</p>
            <h2 id="project-title" className="mt-4 pr-12 text-3xl font-black tracking-tight text-white">{project.title}</h2>
            <p className="mt-5 text-sm leading-7 text-zinc-400">{project.longDescription}</p>
            <div className="mt-6 flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="rounded border border-white/10 bg-white/[.035] px-2.5 py-1 font-mono text-[10px] text-zinc-300">{tag}</span>)}</div>
          </div>
          <div className="p-7 sm:p-9">
            <h3 className="font-mono text-xs font-bold uppercase tracking-[.16em] text-violet-300">What I worked on</h3>
            <ul className="mt-5 space-y-4">{project.highlights.map((highlight) => <li key={highlight} className="flex gap-3 text-sm leading-7 text-zinc-300"><span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />{highlight}</li>)}</ul>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-lg border border-white/15 px-4 py-3 font-mono text-xs text-white hover:border-cyan-300/50"><Github className="h-4 w-4" /> View source</a>}
              {project.live && <a href={project.live} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-lg bg-cyan-200 px-4 py-3 font-mono text-xs font-bold text-cyan-950 hover:bg-cyan-300"><ExternalLink className="h-4 w-4" /> View project</a>}
            </div>
          </div>
        </motion.article>
      </div>
    </AnimatePresence>
  );
}
