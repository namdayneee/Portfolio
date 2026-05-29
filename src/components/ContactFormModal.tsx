import { motion, AnimatePresence } from "motion/react";
import { X, Mail, Github } from "lucide-react";

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EMAIL = "dinhnam.tech@gmail.com";

export default function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
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
            className="relative w-full max-w-md bg-[#131115] border border-outline-variant/30 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex justify-between items-center p-6 border-b border-outline-variant/10">
              <h3 className="text-xl font-bold text-white">Liên hệ</h3>
              <button
                onClick={onClose}
                className="p-1.5 border border-outline-variant/20 hover:bg-neutral-800 rounded-lg text-[#b9cacb] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-sm text-[#b9cacb] leading-relaxed">
                Gửi email trực tiếp hoặc xem mã nguồn trên GitHub.
              </p>
              <a
                href={`mailto:${EMAIL}?subject=Portfolio%20-%20Liên%20hệ`}
                className="flex items-center gap-3 p-4 bg-neutral-900 border border-outline-variant/20 rounded-xl hover:border-[#00dce6] transition-colors"
              >
                <Mail className="w-5 h-5 text-[#00dce6]" />
                <span className="text-sm text-white font-mono">{EMAIL}</span>
              </a>
              <a
                href="https://github.com/namnd-hcmut"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-neutral-900 border border-outline-variant/20 rounded-xl hover:border-[#00dce6] transition-colors"
              >
                <Github className="w-5 h-5 text-[#00dce6]" />
                <span className="text-sm text-white font-mono">github.com/namnd-hcmut</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
