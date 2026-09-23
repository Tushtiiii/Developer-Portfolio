import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Project {
  id: number
  name: string
  tagline: string
  description: string
  highlights?: string[]
  tags: string[]
  stickers: string[]
  color: string
  textColor: string
  tech: string[]
  demo: string
  github: string
  preview: string
}

const projects: Project[] = [
  {
    id: 1,
    name: 'AI Candidate Ranker',
    tagline: 'MERN Stack & Python Ranking Engine',
    description:
      'Built an AI candidate-ranking feature on top of a full-stack MERN recruiter platform with an offline, CPU-only ranking pipeline in Python.',
    highlights: [
      'Built an AI candidate-ranking feature on top of a full-stack MERN recruiter platform (React, Express, MongoDB, JWT auth), adding an offline, CPU-only ranking pipeline in Python',
      'Python pipeline processes 100,000+ candidate records in under 5 minutes without relying on external cloud AI services, scoring career evidence, skills, seniority, location, and availability signals',
      'Added logic to detect and penalize keyword-stuffing and low-signal “honeypot” profiles, and produced schema-validated, reproducible CSV outputs with setup/evaluation documentation',
    ],
    tags: ['🤖 AI Pipeline', 'MERN Stack', 'Python'],
    stickers: ['🤖', '⚡'],
    color: '#CCFF00',
    textColor: '#000',
    tech: ['React', 'Express', 'MongoDB', 'Python', 'JWT'],
    demo: '#',
    github: 'https://github.com/Tushtiiii/ResumeRanker',
    preview: 'from-[#CCFF00] to-[#70D6FF]',
  },
  {
    id: 2,
    name: 'EduGuide',
    tagline: 'AI-Powered Career Guidance Platform',
    description:
      'Full-stack web application exposing REST APIs and an aptitude-based recommendation engine for personalized career recommendations.',
    highlights: [
      'Developed a full-stack web application using Next.js, TypeScript, and MongoDB, exposing REST APIs for aptitude-based career recommendations',
      'Built an aptitude-based recommendation engine to generate personalized career paths from user input data',
      'Implemented dynamic college search and filtering, plus interactive dashboards and career-visualization charts',
    ],
    tags: ['🎓 EdTech', 'Next.js', 'TypeScript'],
    stickers: ['💡', '📊'],
    color: '#FF70A6',
    textColor: '#000',
    tech: ['Next.js', 'TypeScript', 'MongoDB', 'REST API', 'Recharts'],
    demo: '#',
    github: 'https://github.com/Tushtiiii/EduGuide-AI-Powered-Career-Education-Guidance-Platform',
    preview: 'from-[#FF70A6] to-[#E2D4F9]',
  },
  {
    id: 3,
    name: 'CampusMarketplace',
    tagline: 'Full-Stack Student E-Commerce Platform',
    description:
      'Full-stack marketplace enabling students to buy and sell items on campus with secure authentication and product management.',
    highlights: [
      'Developed a full-stack marketplace enabling students to buy and sell items on campus, with secure JWT-based authentication',
      'Designed REST APIs for managing products, users, and transactions',
      'Built product listings, search & filtering, and user dashboards with a responsive, performance-optimized UI',
    ],
    tags: ['🛍️ Campus Market', 'Next.js', 'Node.js'],
    stickers: ['🎒', '🏷️'],
    color: '#70D6FF',
    textColor: '#000',
    tech: ['Next.js', 'Node.js', 'MongoDB', 'JWT Auth', 'REST API'],
    demo: '#',
    github: 'https://github.com/Tushtiiii/CampusMarketplace',
    preview: 'from-[#70D6FF] to-[#FFD166]',
  },
]

function BrowserWindow({ project, isHovered, onHover, onLeave }: {
  project: Project
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="border-2 border-black shadow-[6px_6px_0px_#000] bg-white dark:bg-[#1e1e1e] overflow-hidden flex flex-col justify-between"
    >
      <div>
        {/* Title bar */}
        <div
          className="flex items-center gap-3 px-4 py-2.5 border-b-2 border-black"
          style={{ background: project.color }}
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
        >
          <div className="flex gap-1.5">
            <span className="win-dot bg-[#FF5F56]" />
            <span className="win-dot bg-[#FFBD2E]" />
            <span className="win-dot bg-[#27C93F]" />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="bg-white/40 border border-black/20 rounded-full px-4 py-0.5 font-mono text-xs font-medium text-black">
              {project.name.toLowerCase().replace(/\s+/g, '-')}
            </div>
          </div>
          <div className="flex gap-1.5">
            {project.stickers.map((s) => (
              <span key={s} className="text-base">{s}</span>
            ))}
          </div>
        </div>

        {/* Preview area */}
        <div
          className="relative overflow-hidden cursor-pointer"
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
        >
          <div className={`h-40 bg-gradient-to-br ${project.preview} flex items-center justify-center relative p-4 text-center`}>
            <span className="font-display font-bold text-3xl sm:text-4xl text-black/25 select-none leading-tight">
              {project.name}
            </span>

            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4"
                >
                  <a
                    href={project.demo}
                    className="px-4 py-2 bg-[#CCFF00] border-2 border-white font-mono text-xs font-bold text-black hover:bg-white transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Live Demo →
                  </a>
                  <a
                    href={project.github}
                    className="px-4 py-2 bg-transparent border-2 border-white font-mono text-xs font-bold text-white hover:bg-white/10 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    GitHub ↗
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex flex-col sm:flex-row items-start justify-between mb-3 gap-2">
            <div>
              <h3 className="font-display font-bold text-xl dark:text-white">{project.name}</h3>
              <p className="font-mono text-xs text-black/60 dark:text-white/50">{project.tagline}</p>
            </div>
            <div className="flex flex-wrap gap-1">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 border border-black font-mono text-[10px] font-bold whitespace-nowrap dark:border-white/30 dark:text-white"
                  style={{ background: project.color }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <p className="font-mono text-xs text-black/70 dark:text-white/60 leading-relaxed mb-4">
            {project.description}
          </p>

          {project.highlights && project.highlights.length > 0 && (
            <ul className="mb-4 space-y-2 font-mono text-[11px] text-black/80 dark:text-white/70">
              {project.highlights.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-snug">
                  <span className="text-[#FF70A6] dark:text-[#CCFF00] font-bold select-none shrink-0 mt-0.5">▸</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="p-5 pt-0">
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-black/10 dark:border-white/10">
          {project.tech.map((t) => (
            <span key={t} className="px-2 py-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 font-mono text-[10px] text-black/70 dark:text-white/50 rounded-full font-medium">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section id="works" className="max-w-6xl mx-auto px-4 py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-12"
      >
        <span className="font-mono text-xs text-black/40 dark:text-white/30">03</span>
        <h2 className="font-display font-bold text-3xl sm:text-4xl dark:text-white">
          The Works{' '}
          <span className="text-[#CCFF00] text-stroke-black">🗂️</span>
        </h2>
        <div className="flex-1 h-0.5 bg-black/10 dark:bg-white/10" />
        <span className="hidden sm:block font-mono text-xs bg-[#FFD166] border-2 border-black px-3 py-1 shadow-[2px_2px_0px_#000]">
          {projects.length} featured projects
        </span>
      </motion.div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {projects.map((project) => (
          <BrowserWindow
            key={project.id}
            project={project}
            isHovered={hoveredId === project.id}
            onHover={() => setHoveredId(project.id)}
            onLeave={() => setHoveredId(null)}
          />
        ))}
      </div>

      {/* View more */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex justify-center mt-12"
      >
        <a
          href="#"
          className="brutalist-btn inline-flex items-center gap-2 px-6 py-3 bg-[#E2D4F9] font-display font-bold text-sm border-2 border-black shadow-[4px_4px_0px_#000] dark:text-black"
        >
          See All Projects →
        </a>
      </motion.div>
    </section>
  )
}

