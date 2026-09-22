import { useState, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WhatIDo from './components/WhatIDo'
import About from './components/About'
import Projects from './components/Projects'
import StickerCanvas from './components/StickerCanvas'
import Contact from './components/Contact'
import Cursor from './components/Cursor'

export default function App() {
  const [isDark, setIsDark] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const { scrollYProgress } = useScroll()
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    const root = document.documentElement
    if (isDark) root.classList.add('dark')
    else root.classList.remove('dark')
  }, [isDark])

  const playClick = useCallback(() => {
    if (!soundEnabled) return
    try {
      const ctx = new AudioContext()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = 'square'
      osc.frequency.setValueAtTime(440, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.08)
      gain.gain.setValueAtTime(0.15, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1)
      osc.start()
      osc.stop(ctx.currentTime + 0.1)
    } catch (_) {}
  }, [soundEnabled])

  return (
    <>
      <Cursor />

      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 z-[60] bg-black/5 dark:bg-white/5">
        <motion.div
          className="h-full bg-[#CCFF00] origin-left"
          style={{ width: progressWidth }}
        />
      </div>

      <div className="min-h-screen bg-[#F4F1EA] dark:bg-[#121212] grid-bg transition-colors duration-300 overflow-x-hidden cursor-none">
        <Navbar
          isDark={isDark}
          setIsDark={setIsDark}
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
          playClick={playClick}
        />
        <Hero playClick={playClick} />
        <WhatIDo />
        <About />
        <Projects />
        <StickerCanvas />
        <Contact />
      </div>
    </>
  )
}
