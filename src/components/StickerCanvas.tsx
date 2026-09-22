import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PlacedSticker {
  id: number
  emoji: string
  x: number
  y: number
  rotate: number
  scale: number
}

const stickerPalette = [
  { emoji: '⭐', label: 'Star' },
  { emoji: '☕', label: 'Coffee' },
  { emoji: '🐛', label: 'Bug' },
  { emoji: '🚀', label: 'Rocket' },
  { emoji: '❤️', label: 'Heart' },
  { emoji: '💡', label: 'Idea' },
  { emoji: '🎯', label: 'Target' },
  { emoji: '🔥', label: 'Fire' },
  { emoji: '🌈', label: 'Rainbow' },
  { emoji: '🎮', label: 'Game' },
  { emoji: '💎', label: 'Diamond' },
  { emoji: '🍕', label: 'Pizza' },
]

let stickerIdCounter = 0

export default function StickerCanvas() {
  const [placed, setPlaced] = useState<PlacedSticker[]>([])
  const [selected, setSelected] = useState<string>(stickerPalette[0].emoji)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)
  const constraintRef = useRef<HTMLDivElement>(null)

  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newSticker: PlacedSticker = {
      id: ++stickerIdCounter,
      emoji: selected,
      x,
      y,
      rotate: Math.random() * 40 - 20,
      scale: 0.8 + Math.random() * 0.6,
    }
    setPlaced((prev) => [...prev, newSticker])
    setDrawerOpen(false)
  }, [selected])

  const clearBoard = () => {
    setPlaced([])
  }

  return (
    <section id="playground" className="max-w-6xl mx-auto px-4 py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-8"
      >
        <span className="font-mono text-xs text-black/40 dark:text-white/30">04</span>
        <h2 className="font-display font-bold text-3xl sm:text-4xl dark:text-white">
          Sticker Board{' '}
          <span>🎨</span>
        </h2>
        <div className="flex-1 h-0.5 bg-black/10 dark:bg-white/10" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-mono text-xs text-black/50 dark:text-white/40 mb-6"
      >
        Click anywhere on the board to stamp stickers. Pick from the drawer below ↓
      </motion.div>

      {/* Canvas */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative border-2 border-black shadow-[6px_6px_0px_#000] bg-[#F4F1EA] dark:bg-[#1a1a1a] overflow-hidden"
        style={{ height: '400px' }}
      >
        {/* Dotted pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Title bar strip */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-[#CCFF00] border-b-2 border-black flex items-center gap-3 px-3 z-10 pointer-events-none">
          <span className="win-dot bg-[#FF5F56]" />
          <span className="win-dot bg-[#FFBD2E]" />
          <span className="win-dot bg-[#27C93F]" />
          <span className="font-mono text-[10px] font-bold text-black mx-auto">🎨 sticker-playground.mact.dev</span>
        </div>

        {/* Clickable canvas */}
        <div
          ref={canvasRef}
          className="absolute inset-0 top-8 cursor-crosshair"
          onClick={handleCanvasClick}
        >
          <div ref={constraintRef} className="absolute inset-0" />

          {/* Empty state */}
          {placed.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="text-4xl mb-2 opacity-40">🖱️</div>
                <p className="font-mono text-xs text-black/30 dark:text-white/20">
                  Click to stamp · Drag to move
                </p>
              </div>
            </div>
          )}

          {/* Placed stickers */}
          <AnimatePresence>
            {placed.map((s) => (
              <motion.div
                key={s.id}
                drag
                dragConstraints={constraintRef}
                dragElastic={0.05}
                dragMomentum={false}
                initial={{ scale: 0, rotate: s.rotate, opacity: 0 }}
                animate={{ scale: s.scale, rotate: s.rotate, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                whileDrag={{ scale: s.scale * 1.15, zIndex: 100 }}
                whileHover={{ scale: s.scale * 1.1 }}
                style={{
                  position: 'absolute',
                  left: s.x - 20,
                  top: s.y - 20,
                  cursor: 'grab',
                }}
                className="select-none text-4xl filter drop-shadow-md active:cursor-grabbing"
                onClick={(e) => e.stopPropagation()}
              >
                {s.emoji}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4">
        {/* Sticker drawer toggle */}
        <button
          onClick={() => setDrawerOpen(!drawerOpen)}
          className="brutalist-btn flex items-center gap-2 px-4 py-2 bg-[#FF70A6] border-2 border-black shadow-[3px_3px_0px_#000] font-mono text-xs font-bold"
        >
          {drawerOpen ? '✕ Close drawer' : '🎁 Pick sticker'}
        </button>

        {/* Current selection */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-black/50 dark:text-white/40">Active:</span>
          <span className="text-2xl">{selected}</span>
        </div>

        <div className="sm:ml-auto flex gap-2">
          <span className="font-mono text-xs text-black/40 dark:text-white/30 self-center">
            {placed.length} placed
          </span>
          <button
            onClick={clearBoard}
            disabled={placed.length === 0}
            className="brutalist-btn px-4 py-2 bg-[#FFD166] border-2 border-black shadow-[3px_3px_0px_#000] font-mono text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Clear board 🗑️
          </button>
        </div>
      </div>

      {/* Sticker drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-3 p-4 border-2 border-black bg-white dark:bg-[#1e1e1e] shadow-[4px_4px_0px_#000]">
              <p className="font-mono text-[10px] text-black/40 dark:text-white/30 mb-3 uppercase tracking-widest">Choose your sticker</p>
              <div className="flex flex-wrap gap-3">
                {stickerPalette.map((s) => (
                  <motion.button
                    key={s.emoji}
                    onClick={() => { setSelected(s.emoji); setDrawerOpen(false) }}
                    whileHover={{ scale: 1.2, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-12 h-12 flex items-center justify-center text-2xl border-2 border-black shadow-[2px_2px_0px_#000] transition-all ${
                      selected === s.emoji ? 'bg-[#CCFF00]' : 'bg-white dark:bg-[#2a2a2a]'
                    }`}
                    title={s.label}
                  >
                    {s.emoji}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
