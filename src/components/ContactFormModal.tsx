import { AnimatePresence, motion } from "motion/react";
import { Github, Mail, MapPin, X } from "lucide-react";
import { PROFILE } from "../data";

export default function ContactFormModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="contact-title">
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-md" aria-label="Close contact dialog" />
          <motion.div initial={{ opacity: 0, y: 18, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: .98 }} className="relative w-full max-w-md rounded-2xl border border-white/15 bg-[#111114] p-7 shadow-2xl">
            <button onClick={onClose} className="absolute right-5 top-5 rounded-lg border border-white/10 p-2 text-zinc-400 hover:text-white" aria-label="Close"><X className="h-5 w-5" /></button>
            <p className="font-mono text-[10px] uppercase tracking-[.18em] text-cyan-300">Let's connect</p>
            <h2 id="contact-title" className="mt-3 pr-12 text-2xl font-bold text-white">Start a conversation</h2>
            <p className="mt-4 text-sm leading-7 text-zinc-400">The fastest way to reach me is by email. You can also review my public work and contribution history on GitHub.</p>
            <div className="mt-7 space-y-3">
              <a href={`mailto:${PROFILE.email}?subject=Portfolio%20inquiry`} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.03] p-4 transition hover:border-cyan-300/40"><Mail className="h-5 w-5 text-cyan-300" /><span><span className="block font-mono text-[10px] uppercase text-zinc-500">Email</span><span className="mt-1 block text-sm text-white">{PROFILE.email}</span></span></a>
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.03] p-4 transition hover:border-cyan-300/40"><Github className="h-5 w-5 text-cyan-300" /><span><span className="block font-mono text-[10px] uppercase text-zinc-500">GitHub</span><span className="mt-1 block text-sm text-white">github.com/namdayneee</span></span></a>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.03] p-4"><MapPin className="h-5 w-5 text-cyan-300" /><span><span className="block font-mono text-[10px] uppercase text-zinc-500">Location</span><span className="mt-1 block text-sm text-white">{PROFILE.location}</span></span></div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
