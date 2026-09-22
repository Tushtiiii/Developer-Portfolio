import { useRef } from "react"
import { motion } from "framer-motion"

interface HeroProps {
  playClick: () => void
}

const techTags = [
  "React ⚛️",
  "TypeScript 🔷",
  "Node.js 🟢",
  "Spring Boot ☕",
  "PostgreSQL 🐘",
  "Tailwind CSS 🎨",
  "Vercel ▲",
  "Docker 🐳",
  "Next.js ⏭️",
  "MongoDB 🍃",
  "Figma 🎯",
  "GraphQL 🔺",
  "Redis ⚡",
  "AWS ☁️",
]

const stats = [
  { value: "3+", label: "Yrs Experience" },
  { value: "20+", label: "Projects shipped" },
  { value: "100%", label: "Organic code" },
]

// Absolute positions across the hero — desktop only via CSS
const stickers = [
  {
    emoji: "⭐",
    label: "Built with Code ⚡",
    bg: "#CCFF00",
    rotate: -8,
    style: { top: "18%", right: "2%" },
  },
  {
    emoji: "🟢",
    label: "Open to Work",
    bg: "#FF70A6",
    rotate: 6,
    style: { top: "55%", right: "15%" },
  },
  {
    emoji: "🌟",
    label: "100% Organic Code",
    bg: "#FFD166",
    rotate: -4,
    style: { bottom: "28%", right: "4%" },
  },
  {
    emoji: "🚀",
    label: "Full-Stack Dev",
    bg: "#E2D4F9",
    rotate: 7,
    style: { top: "30%", right: "28%" },
  },
]

export default function Hero({ playClick }: HeroProps) {
  const constraintsRef = useRef<HTMLDivElement>(null)

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Drag constraint — inset so stickers stay away from all edges */}
      <div
        ref={constraintsRef}
        className="absolute inset-16 pointer-events-none"
      />

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-4 pt-28 pb-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center">
          {/* Left: copy */}
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-3 mb-7"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#70D6FF] border-2 border-black rounded-full shadow-[3px_3px_0px_#000] font-mono text-xs font-semibold">
                👋 hey there!
              </span>
              <span className="font-mono text-xs text-black/40 dark:text-white/30">
                creative dev &amp; ui designer
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="font-display font-bold text-[clamp(2.6rem,7vw,5.5rem)] leading-[1.04] dark:text-white mb-7"
            >
              I'm{" "}
              <span className="relative inline-block">
                <span className="relative z-10">mAct</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                  className="absolute -bottom-1 left-0 w-full h-4 bg-[#CCFF00] -z-0 -rotate-1 origin-left"
                />
              </span>{" "}
              <span className="text-[#FF70A6]">—</span>
              <br />I build{" "}
              <span className="relative inline-block">
                <span className="relative z-10">pixel-perfect</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
                  className="absolute -bottom-1 left-0 w-full h-3 bg-[#FF70A6]/50 -z-0 rotate-1 origin-left"
                />
              </span>
              <br />
              <span className="text-[#70D6FF]">web experiences</span>
              <span className="font-mono text-[clamp(1.4rem,4vw,2.8rem)] text-black/20 dark:text-white/15">
                {" "}
                &amp;{" "}
              </span>
              <span className="italic">web apps.</span>
            </motion.h1>

            {/* Sub-copy */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22 }}
              className="font-mono text-sm text-black/55 dark:text-white/45 max-w-md mb-10 leading-relaxed"
            >
              Crafting Gen Z aesthetics, Neo-Brutalist UIs, and Y2K nostalgia —
              one component at a time. Based in{" "}
              <span className="text-black dark:text-white font-semibold">
                India 🇮🇳
              </span>
              .
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.32 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <a
                href="#works"
                onClick={playClick}
                className="brutalist-btn inline-flex items-center gap-2 px-7 py-3.5 bg-black text-[#CCFF00] font-display font-bold text-sm border-2 border-black shadow-[4px_4px_0px_#CCFF00]"
              >
                View Projects 🚀
              </a>
              <a
                href="#"
                onClick={playClick}
                className="brutalist-btn inline-flex items-center gap-2 px-7 py-3.5 bg-[#FF70A6] text-black font-display font-bold text-sm border-2 border-black shadow-[4px_4px_0px_#000] rounded-full -rotate-1 hover:rotate-0 transition-all"
              >
                Grab Resume 📄
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="flex gap-6 flex-wrap"
            >
              {stats.map((s, i) => (
                <div key={i} className="flex flex-col">
                  <span className="font-display font-bold text-2xl dark:text-white">
                    {s.value}
                  </span>
                  <span className="font-mono text-[11px] text-black/40 dark:text-white/30">
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: visual block — desktop only */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="w-64 h-64 xl:w-80 xl:h-80 bg-[#CCFF00] border-2 border-black shadow-[8px_8px_0px_#000] flex items-center justify-center relative overflow-hidden">
              {/* Grid overlay */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              <div className="relative z-10 text-center">
                <div className="text-6xl mb-3">👨‍💻</div>
                <div className="font-display font-bold text-xl text-black">
                  mAct.dev
                </div>
                <div className="font-mono text-xs text-black/60 mt-1">
                  creative web dev
                </div>
              </div>
              {/* Corner sticker */}
              <div className="absolute bottom-3 right-3 px-2 py-1 bg-black font-mono text-[10px] text-[#CCFF00] font-bold">
                v2.0.26
              </div>
            </div>

            {/* Decorative offset square */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-black -z-10 bg-[#FF70A6]/20" />
          </motion.div>
        </div>
      </div>

      {/* Floating draggable stickers — scattered across hero */}
      {stickers.map((s, i) => (
        <motion.div
          key={i}
          drag
          dragConstraints={constraintsRef}
          dragElastic={0.15}
          dragMomentum={true}
          whileDrag={{ scale: 1.12, zIndex: 50, cursor: "grabbing" }}
          whileTap={{ scale: 1.08 }}
          initial={{ opacity: 0, scale: 0.4, rotate: s.rotate }}
          animate={{ opacity: 1, scale: 1, rotate: s.rotate }}
          transition={{
            duration: 0.55,
            delay: 0.5 + i * 0.12,
            type: "spring",
            stiffness: 220,
            damping: 18,
          }}
          className="absolute cursor-grab select-none z-20 hidden lg:block"
          style={s.style}
        >
          <div
            className="flex items-center gap-1.5 px-3 py-2 border-2 border-black shadow-[3px_3px_0px_#000] font-mono text-xs font-bold whitespace-nowrap"
            style={{ background: s.bg }}
          >
            <span className="text-sm">{s.emoji}</span>
            {s.label}
          </div>
        </motion.div>
      ))}

      {/* Mobile sticker row */}
      <div className="lg:hidden flex flex-wrap gap-2 px-4 pb-4 max-w-6xl mx-auto w-full">
        {stickers.map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-1 px-2.5 py-1.5 border-2 border-black font-mono text-[10px] font-bold"
            style={{ background: s.bg, rotate: `${s.rotate}deg` }}
          >
            <span>{s.emoji}</span>
            {s.label}
          </div>
        ))}
      </div>

      {/* Marquee ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="relative overflow-hidden border-y-2 border-black bg-black py-3"
      >
        <div className="flex animate-marquee gap-4 whitespace-nowrap">
          {[...techTags, ...techTags].map((tag, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 px-4 py-1 bg-[#CCFF00] border border-black rounded-full font-mono text-xs font-semibold text-black shrink-0"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
