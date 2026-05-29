import { motion, AnimatePresence } from "motion/react";
import { X, Github, Code2 } from "lucide-react";
import { Project } from "../types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-neutral-950/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden bg-[#131315] border border-outline-variant/30 rounded-2xl flex flex-col shadow-2xl"
        >
          {project.image && (
            <div className="relative h-48 md:h-56 w-full overflow-hidden shrink-0 border-b border-outline-variant/10">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover brightness-75" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131315] to-transparent" />
            </div>
          )}

          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 border border-outline-variant/20 hover:bg-[#131315]/80 bg-neutral-950/40 backdrop-blur rounded-lg text-[#b9cacb] hover:text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] tracking-wider font-mono px-2 py-0.5 bg-[#00dce6]/5 border border-[#00dce6]/20 text-[#00dce6]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-2xl md:text-3xl text-white font-bold">{project.title}</h2>
              <p className="text-[#b9cacb] text-sm md:text-base leading-relaxed">{project.description}</p>
            </div>

            {project.metrics && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-outline-variant/10 py-5">
                {project.metrics.map((metric, i) => (
                  <div key={i} className="bg-neutral-900/50 p-4 border border-outline-variant/20">
                    <div className="text-xs text-[#b9cacb] font-mono uppercase mb-1">{metric.label}</div>
                    <div className="text-xl font-bold text-[#00dce6]">{metric.value}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-3">
              <h3 className="text-lg text-white font-semibold flex items-center gap-2">
                <Code2 className="text-[#d8b9ff] w-5 h-5" /> Chi tiết
              </h3>
              <p className="text-sm text-[#b9cacb] leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.techTags.map((tech, i) => (
                <span
                  key={i}
                  className="text-xs font-mono text-[#b9cacb] bg-neutral-900 border border-outline-variant/20 px-2.5 py-1"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {project.github && (
            <div className="p-4 border-t border-outline-variant/10 bg-neutral-900/60 flex justify-end">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs px-4 py-2 border border-outline-variant/30 hover:border-white text-white flex items-center gap-2 rounded bg-neutral-900"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
