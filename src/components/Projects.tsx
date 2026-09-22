import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Project {
  id: number
  name: string
  tagline: string
  description: string
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
    name: 'DevFlow',
    tagline: 'Project Management, Reimagined',
    description:
      'A full-stack Kanban + sprint management tool built for dev teams. Real-time updates via WebSocket, JWT auth, role-based access. Ships fast, looks great.',
    tags: ['🔥 Hot', 'Fullstack', 'PostgreSQL'],
    stickers: ['⭐', '🚀'],
    color: '#CCFF00',
    textColor: '#000',
    tech: ['React', 'Spring Boot', 'PostgreSQL', 'WebSocket', 'Docker'],
    demo: '#',
    github: '#',
    preview: 'from-[#CCFF00] to-[#70D6FF]',
  },
  {
    id: 2,
    name: 'NeonMarket',
    tagline: 'Y2K-Inspired E-Commerce',
    description:
      'A retro-futuristic e-commerce platform with brutalist product cards, animated cart, Stripe payments, and a custom CMS. Mobile-first and blazing fast.',
    tags: ['🛒 Commerce', 'Next.js', 'MongoDB'],
    stickers: ['💎', '🛍️'],
    color: '#FF70A6',
    textColor: '#000',
    tech: ['Next.js', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    demo: '#',
    github: '#',
    preview: 'from-[#FF70A6] to-[#E2D4F9]',
  },
  {
    id: 3,
    name: 'PixelGrid',
    tagline: 'Design Collaboration at Scale',
    description:
      'A canvas-based design collaboration tool with multiplayer cursors, real-time co-editing, comment threads, and version history. Figma but for indie teams.',
    tags: ['🎨 Design', 'WebSocket', 'Canvas API'],
    stickers: ['✏️', '🎯'],
    color: '#E2D4F9',
    textColor: '#000',
    tech: ['React', 'Canvas API', 'Node.js', 'Socket.io', 'Redis'],
    demo: '#',
    github: '#',
    preview: 'from-[#E2D4F9] to-[#FFD166]',
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
      className="border-2 border-black shadow-[6px_6px_0px_#000] bg-white dark:bg-[#1e1e1e] overflow-hidden"
    >
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
            mact.dev/{project.name.toLowerCase()}
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
        <div className={`h-44 bg-gradient-to-br ${project.preview} flex items-center justify-center relative`}>
          <span className="font-display font-bold text-5xl text-black/20 select-none">{project.name}</span>

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
        <div className="flex items-start justify-between mb-2 gap-3">
          <div>
            <h3 className="font-display font-bold text-xl dark:text-white">{project.name}</h3>
            <p className="font-mono text-xs text-black/50 dark:text-white/40">{project.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-1 justify-end">
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

        <p className="font-mono text-xs text-black/60 dark:text-white/50 leading-relaxed mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span key={t} className="px-2 py-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 font-mono text-[10px] text-black/60 dark:text-white/40 rounded-full">
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
          {projects.length} projects
        </span>
      </motion.div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        className="flex justify-center mt-10"
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
