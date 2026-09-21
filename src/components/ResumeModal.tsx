import { AnimatePresence, motion } from "motion/react";
import { Download, ExternalLink, FileText, X } from "lucide-react";

export default function ResumeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const resumeUrl = "Nam_Nguyen_Dinh_CV.pdf";

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-title"
        >
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            aria-label="Close resume"
          />

          <motion.article
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            className="relative flex h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#111114] shadow-2xl"
          >
            <header className="flex shrink-0 flex-col justify-between gap-3 border-b border-white/[.07] px-4 py-4 sm:flex-row sm:items-center sm:px-6">
              <div>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-cyan-300" />
                  <h2 id="resume-title" className="font-bold text-white">Nguyen Dinh Nam - CV</h2>
                </div>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[.14em] text-zinc-500">
                  One-page A4 · ATS-friendly PDF
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={resumeUrl}
                  download="Nguyen_Dinh_Nam_CV.pdf"
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-cyan-200 px-4 py-2.5 font-mono text-xs font-bold text-cyan-950 transition hover:bg-cyan-300 sm:flex-none"
                >
                  <Download className="h-4 w-4" /> Download A4 PDF
                </a>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-white/10 p-2.5 text-zinc-400 transition hover:border-cyan-300/40 hover:text-white"
                  aria-label="Open PDF in a new tab"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
                <button
                  onClick={onClose}
                  className="rounded-lg border border-white/10 p-2.5 text-zinc-400 transition hover:text-white"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </header>

            <div className="min-h-0 flex-1 bg-zinc-800 p-2 sm:p-4">
              <iframe
                src={`${resumeUrl}#view=FitH&toolbar=0&navpanes=0`}
                title="Nguyen Dinh Nam CV preview"
                className="h-full w-full rounded-md bg-white"
              />
            </div>
          </motion.article>
        </div>
      )}
    </AnimatePresence>
  );
}
