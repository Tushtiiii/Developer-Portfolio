import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const techStack = [
  { icon: '⚛️', label: 'React', color: '#70D6FF' },
  { icon: '🔷', label: 'TypeScript', color: '#BDE0FE' },
  { icon: '🟢', label: 'Node.js', color: '#CCFF00' },
  { icon: '🐘', label: 'PostgreSQL', color: '#E2D4F9' },
  { icon: '🎨', label: 'Tailwind', color: '#FFD166' },
  { icon: '▲', label: 'Next.js', color: '#CDB4DB' },
  { icon: '🐳', label: 'Docker', color: '#BDE0FE' },
  { icon: '⏭️', label: 'Vercel', color: '#FFC8DD' },
  { icon: '🍃', label: 'MongoDB', color: '#CCFF00' }
]

function LiveClock() {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  const pad = (n: number) => n.toString().padStart(2, '0')
  return (
    <div>
      <div className="font-mono font-bold text-4xl tracking-widest text-[#CCFF00] tabular-nums select-none">
        {pad(time.getHours())}:{pad(time.getMinutes())}
        <span className="text-[#CCFF00]/50 text-2xl">:{pad(time.getSeconds())}</span>
      </div>
      <div className="font-mono text-xs text-white/50 mt-1.5">
        {time.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}
      </div>
    </div>
  )
}

function AudioBars() {
  return (
    <div className="flex items-end gap-1" style={{ height: 28 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`w-2 bg-[#1DB954] rounded-sm bar-${i}`}
          style={{ height: '100%', transformOrigin: 'bottom' }}
        />
      ))}
    </div>
  )
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export default function About() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)

  return (
    <section id="about" className="max-w-6xl mx-auto px-4 py-20">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-12"
      >
        <span className="font-mono text-xs text-black/40 dark:text-white/30">02</span>
        <h2 className="font-display font-bold text-3xl sm:text-4xl dark:text-white">
          Behind The Screens{' '}
          <span>🖥️</span>
        </h2>
        <div className="flex-1 h-0.5 bg-black/10 dark:bg-white/10" />
      </motion.div>

      {/* Bento Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        transition={{ staggerChildren: 0.09 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start"
      >
        {/* Card 1: Polaroid Bio */}
        <motion.div
          variants={cardVariants}
          className="lg:row-span-2 bg-white dark:bg-[#1e1e1e] border-2 border-black shadow-[6px_6px_0px_#000] p-5 flex flex-col gap-5"
        >
          {/* Polaroid photo */}
          <div className="relative">
            <div
              className="absolute -top-2 left-8 w-14 h-6 rounded-sm z-10 border border-black/10"
              style={{ background: 'rgba(255,253,208,0.88)', transform: 'rotate(-7deg)' }}
            />
            <div
              className="absolute -top-2 right-8 w-14 h-6 rounded-sm z-10 border border-black/10"
              style={{ background: 'rgba(255,253,208,0.88)', transform: 'rotate(6deg)' }}
            />
            <div className="bg-white border-2 border-black p-3 pb-10 shadow-[4px_4px_0px_#00000030]">
              <div className="w-full aspect-square bg-gradient-to-br from-[#E2D4F9] via-[#CDB4DB] to-[#FF70A6] flex items-center justify-center relative overflow-hidden">
                <span className="text-8xl">👨‍💻</span>
                <div className="absolute inset-0 bg-gradient-to-t from-[#FF70A6]/20 to-transparent" />
                {/* Scan-line overlay for Y2K feel */}
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.6) 2px, rgba(0,0,0,0.6) 3px)',
                  }}
                />
              </div>
              {/* Handwritten caption */}
              <p className="text-center font-mono text-[11px] text-black/50 mt-2 italic">
                 building the future ✨
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg dark:text-white mb-2">The Human Behind It All</h3>
            <p className="font-mono text-[11px] text-black/55 dark:text-white/45 leading-relaxed">
              Creative dev obsessed with Gen Z aesthetics, brutalist UIs, and building things that make people go{' '}
              <span className="text-[#FF70A6] font-bold">"wait, HOW?"</span>
            </p>
            <p className="font-mono text-[11px] text-black/55 dark:text-white/45 leading-relaxed mt-2">
              Currently cooking up pixel-perfect experiences with React, &amp; PostgreSQL.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-auto">
            {[ '🎵 Music Head', '☕ Coffee Snob', '🌙 Night Owl'].map((tag) => (
              <span key={tag} className="px-2.5 py-1 bg-[#CCFF00] border border-black font-mono text-[10px] font-bold">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Card 2: Live Clock */}
        <motion.div
          variants={cardVariants}
          className="bg-[#0d0d0d] border-2 border-black shadow-[6px_6px_0px_#000] p-6 flex flex-col justify-between gap-4 min-h-[190px]"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.18em]">Live Clock</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#CCFF00] pulse-dot" />
              <span className="font-mono text-[10px] text-white/30">UTC+5:30</span>
            </div>
          </div>
          <LiveClock />
          <div className="border-t border-white/10 pt-3 flex flex-col gap-1">
            <span className="font-mono text-[11px] text-white/40">📍 Somewhere in India</span>
            <span className="font-mono text-[11px] text-[#CCFF00] font-semibold">⌨️  Coding in progress...</span>
          </div>
        </motion.div>

        {/* Card 3: Now Playing */}
        <motion.div
          variants={cardVariants}
          className="border-2 border-black shadow-[6px_6px_0px_#000] p-5 bg-[#F4F1EA] dark:bg-[#111]"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#1DB954] flex items-center justify-center">
                <span className="text-[8px] text-white">▶</span>
              </div>
              <span className="font-mono text-[10px] text-black/50 dark:text-white/40 uppercase tracking-widest">
                Now Playing
              </span>
            </div>
            <AudioBars />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 border-2 border-black bg-gradient-to-br from-[#FF70A6] to-[#70D6FF] flex items-center justify-center text-2xl shadow-[2px_2px_0px_#000] shrink-0">
              🎵
            </div>
            <div>
              <p className="font-display font-bold text-sm dark:text-white">lo-fi beats to ship to</p>
              <p className="font-mono text-[11px] text-black/50 dark:text-white/40">coding playlist · spotify</p>
            </div>
          </div>
          <div>
            <div className="h-1 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#1DB954] rounded-full"
                initial={{ width: '0%' }}
                whileInView={{ width: '68%' }}
                transition={{ duration: 2, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="font-mono text-[10px] text-black/35 dark:text-white/25">2:14</span>
              <span className="font-mono text-[10px] text-black/35 dark:text-white/25">3:47</span>
            </div>
          </div>
        </motion.div>

        {/* Card 4: Tech Stack */}
        <motion.div
          variants={cardVariants}
          className="sm:col-span-2 bg-white dark:bg-[#1a1a1a] border-2 border-black shadow-[6px_6px_0px_#000] p-6"
        >
          <div className="flex items-center gap-3 mb-5">
            <h3 className="font-display font-bold text-base dark:text-white">My Tech Stack</h3>
            <span className="font-mono text-[10px] text-black/35 dark:text-white/25">hover to peel 🪄</span>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
            {techStack.map((tech) => (
              <motion.div
                key={tech.label}
                onHoverStart={() => setHoveredTech(tech.label)}
                onHoverEnd={() => setHoveredTech(null)}
                whileHover={{
                  scale: 1.18,
                  rotate: -6,
                  y: -8,
                  transition: { type: 'spring', stiffness: 380, damping: 14 },
                }}
                className="flex flex-col items-center gap-1.5 cursor-pointer"
              >
                <div
                  className="w-12 h-12 border-2 border-black flex items-center justify-center text-xl shadow-[2px_2px_0px_#000] transition-colors duration-150"
                  style={{
                    background: hoveredTech === tech.label ? tech.color : '#f9f9f9',
                  }}
                >
                  {tech.icon}
                </div>
                <span className="font-mono text-[9px] text-black/55 dark:text-white/40 text-center leading-tight">
                  {tech.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
