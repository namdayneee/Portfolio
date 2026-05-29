import { motion, AnimatePresence } from "motion/react";
import { X, Mail, MapPin, Briefcase, Award, GraduationCap, Download, CheckCircle } from "lucide-react";
import { useState } from "react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const triggerDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
      
      // Simulate real file download
      const content = `NAM NGUYEN DINH - Resume / CV\n\nEmail: dinhnam.tech@gmail.com\nLocation: Ho Chi Minh City, Vietnam\nLinkedIn: linkedin.com/in/nam-nguyen-dinh\nWebsite: Portfolio Website\n\nEDUCATION:\n- Ho Chi Minh University of Technology (HCMUT)\n  B.S. in Computer Science (2020 - 2024)\n  GPA: 3.6/4.0 | Specialization in Software Engineering & Distributed Systems\n\nEXPERIENCE:\n- Full-Stack Intern @ EyeCode Technology Solutions (June 2023 - Present)\n  * Optimized rendering speeds by 40%\n  * Authored automated test suite coverage up to 85%\n  * Constructed secure API integrations\n\nTECHNICAL STACK:\n- Languages: JavaScript, TypeScript, Go, HTML/CSS\n- Frontend: React.js, React Native, Tailwind CSS, Redux\n- Backend: Node.js, Express, Go, REST APIs\n- Databases: PostgreSQL, Prisma, MongoDB, Redis\n- DevOps & AI: Docker, Cursor, Clerk Auth, Gemini AI Integration\n\nCERTIFICATIONS & ACHIEVEMENTS:\n- Certified Scrum Professional (CSP)\n- Gemini Certified Student Developer\n- Outstanding Student Scholar Award, HCMUT`;
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Nam_Nguyen_Dinh_CV_FullStack.txt";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setTimeout(() => setDownloaded(false), 3000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-950/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-[#131315] border border-outline-variant/30 rounded-2xl flex flex-col shadow-2xl"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-outline-variant/10 bg-surface-container-lowest/55">
              <div>
                <h2 className="font-headline-lg text-xl md:text-2xl text-white flex items-center gap-2">
                  <GraduationCap className="text-[#00dce6] w-6 h-6" /> Resume / CV
                </h2>
                <p className="text-xs text-[#b9cacb] font-mono mt-1">NAM_NGUYEN_DINH_CV_2024.pdf</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={triggerDownload}
                  disabled={downloading}
                  className="font-mono text-xs px-4 py-2 border border-primary-fixed-dim/40 hover:border-primary-fixed-dim bg-primary-fixed-dim/10 hover:bg-primary-fixed-dim/20 text-[#00dce6] transition-all flex items-center gap-2 rounded-lg disabled:opacity-40"
                >
                  {downloading ? (
                    <>
                      <div className="w-3 h-3 border-2 border-primary-fixed-dim border-t-transparent rounded-full animate-spin" />
                      Downloading...
                    </>
                  ) : downloaded ? (
                    <>
                      <CheckCircle className="w-4.5 h-4.5" />
                      Saved!
                    </>
                  ) : (
                    <>
                      <Download className="w-4.5 h-4.5" />
                      Download CV
                    </>
                  )}
                </button>
                <button
                  onClick={onClose}
                  className="p-2 border border-outline-variant/20 hover:bg-neutral-800 rounded-lg text-on-surface-variant hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Resume Content (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-8 select-text">
              {/* Top Title/Contact */}
              <div className="flex flex-col md:flex-row md:justify-between items-start border-b border-outline-variant/10 pb-6 gap-4">
                <div>
                  <h1 className="text-3xl font-bold font-headline-lg text-white mb-2 tracking-tight">Nam Nguyen Dinh</h1>
                  <p className="text-[#00dce6] font-mono text-sm tracking-widest font-semibold uppercase">Full-Stack Software Engineer</p>
                  <p className="text-xs text-on-surface-variant max-w-lg mt-2">
                    Meticulous developer specializing in robust frontends (React) and performant backend architectures (Node.js, Go). Focused on delivering intuitive web/mobile automation.
                  </p>
                </div>
                
                <div className="space-y-2 text-sm text-on-surface-variant font-mono">
                  <div className="flex items-center gap-2 hover:text-[#00dce6] transition-colors">
                    <Mail className="w-4.5 h-4.5 text-[#00dce6]/70" />
                    <a href="mailto:dinhnam.tech@gmail.com">dinhnam.tech@gmail.com</a>
                  </div>
                  <div className="flex items-center gap-2 hover:text-[#00dce6] transition-colors">
                    <Briefcase className="w-4.5 h-4.5 text-[#00dce6]/70" />
                    <span>linkedin.com/in/namnd</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4.5 h-4.5 text-[#00dce6]/70" />
                    <span>Ho Chi Minh City, Vietnam</span>
                  </div>
                </div>
              </div>

              {/* Grid sections */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Profile/Skills Panel (1 col) */}
                <div className="space-y-6 md:border-r md:border-outline-variant/10 md:pr-6">
                  {/* Education */}
                  <div>
                    <h3 className="font-headline-lg text-xs text-[#00dce6] border-b border-outline-variant/10 pb-2 mb-4 tracking-widest uppercase font-bold">Education</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="font-bold text-white text-base">B.S. in Computer Science</div>
                        <div className="text-sm font-semibold text-on-surface-variant mt-0.5">Ho Chi Minh University of Technology</div>
                        <div className="text-xs text-neutral-500 font-mono mt-1">2020 — 2024</div>
                        <div className="text-xs text-[#00dce6] font-mono mt-2 bg-[#00dce6]/5 border border-[#00dce6]/10 px-2 py-1 inline-block rounded">GPA: 3.6 / 4.0</div>
                      </div>
                    </div>
                  </div>

                  {/* Skills lists */}
                  <div>
                    <h3 className="font-headline-lg text-xs text-[#00dce6] border-b border-outline-variant/10 pb-2 mb-4 tracking-widest uppercase font-bold">Skills</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs text-[#d8b9ff] font-mono uppercase font-bold mb-1.5">Languages</div>
                        <p className="text-sm text-on-surface-variant">JavaScript, TypeScript, Go (Golang), HTML, CSS, SQL</p>
                      </div>
                      <div>
                        <div className="text-xs text-[#d8b9ff] font-mono uppercase font-bold mb-1.5">Frontend</div>
                        <p className="text-sm text-on-surface-variant">React.js, React Native, Redux Toolkit, Tailwind CSS, Motion Animations</p>
                      </div>
                      <div>
                        <div className="text-xs text-[#d8b9ff] font-mono uppercase font-bold mb-1.5">Backend & DB</div>
                        <p className="text-sm text-on-surface-variant">Node.js, Express, REST APIs, PostgreSQL, Prisma, MongoDB, Redis</p>
                      </div>
                      <div>
                        <div className="text-xs text-[#d8b9ff] font-mono uppercase font-bold mb-1.5">Tools & AI</div>
                        <p className="text-sm text-on-surface-variant">Cursor AI, Gemini SDK, Clerk Auth, Git, Docker, Agile (Scrum)</p>
                      </div>
                    </div>
                  </div>

                  {/* Honors / Achievements */}
                  <div>
                    <h3 className="font-headline-lg text-xs text-[#00dce6] border-b border-outline-variant/10 pb-2 mb-4 tracking-widest uppercase font-bold">Achievements</h3>
                    <ul className="space-y-3 text-xs text-on-surface-variant">
                      <li className="flex gap-2">
                        <Award className="w-4 h-4 text-[#00dce6] shrink-0" />
                        <span>Certified Scrum Professional (CSP)</span>
                      </li>
                      <li className="flex gap-2">
                        <Award className="w-4 h-4 text-[#00dce6] shrink-0" />
                        <span>Google Gemini Certified Student Scholar</span>
                      </li>
                      <li className="flex gap-2">
                        <Award className="w-4 h-4 text-[#00dce6] shrink-0" />
                        <span>Outstanding Student Academic Scholarship, HCMUT</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Right Work Experience & Projects (2 col) */}
                <div className="md:col-span-2 space-y-6">
                  {/* Experience */}
                  <div>
                    <h3 className="font-headline-lg text-xs text-[#00dce6] border-b border-outline-variant/10 pb-2 mb-4 tracking-widest uppercase font-bold">Work Experience</h3>
                    <div className="space-y-6">
                      <div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-1">
                          <h4 className="text-base font-bold text-white">Full-Stack Intern</h4>
                          <span className="text-xs text-neutral-500 font-mono">June 2023 — Present</span>
                        </div>
                        <div className="text-sm font-semibold text-[#00dce6]/90 mb-2">EyeCode Technology Solutions</div>
                        <p className="text-xs text-on-surface-variant mb-3 leading-relaxed">
                          Working within the core engineering workspace, developing highly polished user-facing services and integrating AI architectures.
                        </p>
                        <ul className="list-disc pl-4 space-y-1.5 text-xs text-on-surface-variant">
                          <li>Redesigned admin portals with virtualized rendering, improving load performance by over 40%.</li>
                          <li>Constructed end-to-end unit testing frameworks with Jest, elevating test coverage boundaries up to 85% successfully.</li>
                          <li>Leveraged Express APIs alongside JWT authentication logic to safely coordinate multi-tenant dashboard profiles.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Projects */}
                  <div>
                    <h3 className="font-headline-lg text-xs text-[#00dce6] border-b border-outline-variant/10 pb-2 mb-4 tracking-widest uppercase font-bold">Selected Projects</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="text-sm font-bold text-white">HCMUT-LostFound</h4>
                          <span className="text-[10px] font-mono text-[#00dce6] px-1.5 py-0.5 bg-[#00dce6]/5 border border-[#00dce6]/10 rounded">React Native | Node.js</span>
                        </div>
                        <p className="text-xs text-on-surface-variant leading-relaxed mb-1.5">
                          Cross-platform campus-focused companion application resolving lost asset discoveries. Integrates real-time map beacons and instant messaging channels.
                        </p>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="text-sm font-bold text-white">E-commerce Platform</h4>
                          <span className="text-[10px] font-mono text-[#d8b9ff] px-1.5 py-0.5 bg-[#d8b9ff]/5 border border-[#d8b9ff]/10 rounded">React | MERN | Stripe</span>
                        </div>
                        <p className="text-xs text-on-surface-variant leading-relaxed">
                          Full-scale web retail engine boasting extensive query indexing filters, visual performance dashboards, and automated transactions via secure Stripe hook checkouts.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer button */}
            <div className="p-4 border-t border-outline-variant/10 bg-neutral-900/60 flex justify-end">
              <button
                onClick={onClose}
                className="font-mono text-xs px-6 py-2 border border-outline-variant/30 hover:border-[#00dce6] hover:bg-neutral-800 transition-colors text-white"
              >
                Close Resume
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
