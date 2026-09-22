import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface NavbarProps {
  isDark: boolean
  setIsDark: (v: boolean) => void
  soundEnabled: boolean
  setSoundEnabled: (v: boolean) => void
  playClick: () => void
}

const navLinks = [
  { label: '/works', href: '#works' },
  { label: '/about', href: '#about' },
  { label: '/playground', href: '#playground' },
  { label: '/contact', href: '#contact' },
]

export default function Navbar({ isDark, setIsDark, soundEnabled, setSoundEnabled, playClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl"
    >
      <div
        className={`
          flex items-center justify-between px-4 py-2.5 rounded-full border-2 border-black
          ${scrolled
            ? 'bg-[#F4F1EA]/95 dark:bg-[#121212]/95 backdrop-blur-md shadow-[4px_4px_0px_#000]'
            : 'bg-[#F4F1EA] dark:bg-[#1a1a1a] shadow-[4px_4px_0px_#000]'
          }
          transition-all duration-200
        `}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-[#CCFF00] border-2 border-black rounded-full flex items-center justify-center shadow-[2px_2px_0px_#000] group-hover:-translate-y-0.5 transition-transform">
            <span className="font-display font-700 text-xs text-black">mA</span>
          </div>
          <span className="font-display font-semibold text-sm dark:text-[#F4F1EA] hidden sm:block">mAct</span>
          <span className="flex items-center gap-1.5 text-xs text-black/60 dark:text-white/50 hidden sm:flex">
            <span className="w-2 h-2 rounded-full bg-green-500 pulse-dot inline-block" />
            <span className="font-mono text-[10px]">Available ⚡</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={playClick}
                className="font-mono text-xs px-3 py-1.5 rounded-full border border-transparent hover:border-black hover:bg-[#CCFF00] dark:text-white dark:hover:text-black transition-all duration-150"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Sound toggle */}
          <button
            onClick={() => { setSoundEnabled(!soundEnabled); playClick() }}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border-2 border-black text-[10px] font-mono font-semibold bg-[#E2D4F9] dark:bg-[#2a2a2a] dark:text-white shadow-[2px_2px_0px_#000] hover:-translate-y-0.5 active:translate-y-0 transition-transform"
            title="Toggle sound"
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>

          {/* 3D light switch dark mode */}
          <button
            onClick={() => { setIsDark(!isDark); playClick() }}
            className="relative w-12 h-6 rounded-full border-2 border-black switch-track overflow-hidden shadow-[2px_2px_0px_#000]"
            aria-label="Toggle dark mode"
          >
            <motion.div
              animate={{ x: isDark ? 22 : 2 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="absolute top-0.5 w-4 h-4 rounded-full switch-thumb flex items-center justify-center text-[8px]"
            >
              {isDark ? '🌙' : '☀️'}
            </motion.div>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-8 h-8 border-2 border-black rounded-full flex items-center justify-center bg-[#FFD166] shadow-[2px_2px_0px_#000] dark:text-black"
          >
            <span className="text-xs">{menuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mt-2 bg-[#F4F1EA] dark:bg-[#1a1a1a] border-2 border-black rounded-2xl shadow-[4px_4px_0px_#000] overflow-hidden"
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => { setMenuOpen(false); playClick() }}
                className="block px-6 py-3 font-mono text-sm border-b border-black/10 dark:border-white/10 last:border-0 hover:bg-[#CCFF00] dark:text-white dark:hover:text-black transition-colors"
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
