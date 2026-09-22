import { motion } from 'framer-motion'

const services = [
  {
    icon: '🎨',
    title: 'UI/UX Design',
    desc: 'Figma-first design systems, component libraries, and brutalist interfaces that make users say "wait, how?"',
    color: '#CCFF00',
    rotate: -2,
    tags: ['Figma', 'Design Systems', 'Prototyping'],
  },
  {
    icon: '⚛️',
    title: 'Frontend Dev',
    desc: 'Pixel-perfect React & Next.js apps with Framer Motion animations, Tailwind CSS, and obsessive performance tuning.',
    color: '#FF70A6',
    rotate: 1.5,
    tags: ['React', 'Next.js', 'Framer Motion'],
  },
  {
    icon: '⚙️',
    title: 'Backend Dev',
    desc: 'Robust APIs with Spring Boot & Node.js, PostgreSQL data modeling, JWT auth, WebSocket real-time features.',
    color: '#70D6FF',
    rotate: -1,
    tags: ['Spring Boot', 'Node.js', 'PostgreSQL'],
  },
  {
    icon: '🚀',
    title: 'Deployment',
    desc: 'Docker, CI/CD pipelines, Vercel and AWS deployments. From local to live — fast, safe, and repeatable.',
    color: '#E2D4F9',
    rotate: 2,
    tags: ['Docker', 'Vercel', 'AWS'],
  },
]

export default function WhatIDo() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-12"
      >
        <span className="font-mono text-xs text-black/40 dark:text-white/30">01</span>
        <h2 className="font-display font-bold text-3xl sm:text-4xl dark:text-white">
          What I Do{' '}
          <span>⚡</span>
        </h2>
        <div className="flex-1 h-0.5 bg-black/10 dark:bg-white/10" />
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="group relative border-2 border-black bg-white dark:bg-[#1a1a1a] shadow-[5px_5px_0px_#000] p-6 overflow-hidden"
            style={{ transform: `rotate(${s.rotate}deg)` }}
          >
            {/* Colored top accent strip */}
            <div
              className="absolute top-0 left-0 right-0 h-1.5 border-b-2 border-black"
              style={{ background: s.color }}
            />

            <div className="mt-2 mb-4">
              <span className="text-4xl">{s.icon}</span>
            </div>

            <h3 className="font-display font-bold text-xl dark:text-white mb-2">{s.title}</h3>
            <p className="font-mono text-xs text-black/55 dark:text-white/45 leading-relaxed mb-5">
              {s.desc}
            </p>

            <div className="flex flex-wrap gap-2">
              {s.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 border border-black font-mono text-[10px] font-bold dark:border-white/20 dark:text-white"
                  style={{ background: s.color }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Hover corner badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, rotate: 15 }}
              whileInView={{ opacity: 0 }}
              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <div className="px-2 py-1 bg-black text-[#CCFF00] font-mono text-[9px] font-bold border border-black">
                hover ✓
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Bottom strip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.3 }}
        className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 border-2 border-black bg-[#121212] shadow-[4px_4px_0px_#CCFF00]"
      >
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] pulse-dot" />
          <span className="font-mono text-xs text-white">
            Currently <span className="text-[#CCFF00] font-bold">available</span> for freelance &amp; full-time
          </span>
        </div>
        <a
          href="#contact"
          className="brutalist-btn px-5 py-2 bg-[#CCFF00] border-2 border-white font-display font-bold text-xs text-black shadow-[3px_3px_0px_#ffffff60]"
        >
          Let's build something →
        </a>
      </motion.div>
    </section>
  )
}
