import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'

const socials = [
  {
    label: 'GitHub',
    icon: '🐙',
    href: 'github.com/Tushtiiii',
    bg: '#121212',
    text: '#fff',
    rotate: -3,
  },
  {
    label: 'LinkedIn',
    icon: '💼',
    href: 'linkedin.com/in/tushtee-kothare-807575293',
    bg: '#0077B5',
    text: '#fff',
    rotate: 2,
  },
  {
    label: 'X / Twitter',
    icon: '𝕏',
    href: '#',
    bg: '#000',
    text: '#fff',
    rotate: -2,
  },
  {
    label: 'Email',
    icon: '📧',
    href: 'mailto:tushteekotharegmail.com',
    bg: '#FF70A6',
    text: '#000',
    rotate: 4,
  },
];


export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const confettiRef = useRef<HTMLButtonElement>(null)

  const fireConfetti = () => {
    const rect = confettiRef.current?.getBoundingClientRect()
    const x = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5
    const y = rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.5

    confetti({
      particleCount: 180,
      spread: 120,
      origin: { x, y },
      colors: ['#CCFF00', '#FF70A6', '#70D6FF', '#FFD166', '#E2D4F9', '#CDB4DB'],
      scalar: 1.2,
      gravity: 0.8,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    fireConfetti()
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contact" className="max-w-6xl mx-auto px-4 py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-12"
      >
        <span className="font-mono text-xs text-black/40 dark:text-white/30">05</span>
        <h2 className="font-display font-bold text-3xl sm:text-4xl dark:text-white">
          Don't Be Shy{' '}
          <span>👋</span>
        </h2>
        <div className="flex-1 h-0.5 bg-black/10 dark:bg-white/10" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Contact form — sticky note style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="lg:col-span-3"
        >
          <div className="bg-[#FFD166] border-2 border-black shadow-[6px_6px_0px_#000] p-6 relative">
            {/* Sticky note fold */}
            <div
              className="absolute top-0 right-0 w-8 h-8 bg-[#F4C842] border-l-2 border-b-2 border-black"
              style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
            />

            <div className="mb-5">
              <h3 className="font-display font-bold text-xl text-black">Got a cool project?</h3>
              <p className="font-mono text-xs text-black/60 mt-1 leading-relaxed">
                Or just want to swap tech hot takes? Hit me up! I respond within 24h. 🟢
              </p>
            </div>

            {sent ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="py-12 text-center"
              >
                <div className="text-5xl mb-3">🎉</div>
                <p className="font-display font-bold text-black text-lg">Message sent!</p>
                <p className="font-mono text-xs text-black/60 mt-1">I'll get back to you ASAP ⚡</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <label className="font-mono text-[10px] text-black/60 uppercase tracking-widest block mb-1">Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your name..."
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-white border-2 border-black px-3 py-2.5 font-mono text-sm text-black placeholder:text-black/30 focus:outline-none focus:shadow-[3px_3px_0px_#000] transition-shadow"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="font-mono text-[10px] text-black/60 uppercase tracking-widest block mb-1">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-white border-2 border-black px-3 py-2.5 font-mono text-sm text-black placeholder:text-black/30 focus:outline-none focus:shadow-[3px_3px_0px_#000] transition-shadow"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-mono text-[10px] text-black/60 uppercase tracking-widest block mb-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your project, idea, or just say hi..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-white border-2 border-black px-3 py-2.5 font-mono text-sm text-black placeholder:text-black/30 focus:outline-none focus:shadow-[3px_3px_0px_#000] transition-shadow resize-none"
                  />
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    type="submit"
                    className="brutalist-btn flex items-center gap-2 px-6 py-3 bg-black text-[#CCFF00] font-display font-bold text-sm border-2 border-black shadow-[4px_4px_0px_#000]"
                  >
                    Send it 🚀
                  </button>
                  <span className="font-mono text-[10px] text-black/40">Usually replies in 24h</span>
                </div>
              </form>
            )}
          </div>
        </motion.div>

        {/* Right sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="lg:col-span-2 flex flex-col gap-5"
        >
          {/* Social stickers */}
          <div>
            <p className="font-mono text-[10px] text-black/40 dark:text-white/30 uppercase tracking-widest mb-4">
              Find me on
            </p>
            <div className="flex flex-wrap gap-3">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  whileHover={{ scale: 1.08, rotate: 0 }}
                  initial={{ rotate: s.rotate }}
                  className="flex items-center gap-2 px-4 py-2.5 border-2 border-black font-mono text-sm font-bold shadow-[3px_3px_0px_#000] transition-shadow"
                  style={{ background: s.bg, color: s.text }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-base">{s.icon}</span>
                  {s.label}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick info */}
          <div className="bg-[#E2D4F9] border-2 border-black shadow-[4px_4px_0px_#000] p-5 dark:text-black">
            <h4 className="font-display font-bold text-sm mb-3">Quick Facts 📋</h4>
            <ul className="font-mono text-xs space-y-2 text-black/70">
              <li>📍 India (IST, UTC+5:30)</li>
              <li>⚡ Available for freelance</li>
              <li>🕐 Response time: &lt; 24h</li>
              <li>🤝 Open to collaborations</li>
              <li>💼 Open to full-time roles</li>
            </ul>
          </div>

          {/* Confetti easter egg */}
          <motion.button
            ref={confettiRef}
            onClick={fireConfetti}
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 border-2 border-black bg-[#70D6FF] font-display font-bold text-sm shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 active:translate-y-0 transition-transform dark:text-black"
          >
            Click for Confetti 🎉
          </motion.button>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-16 pt-8 border-t-2 border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-[#CCFF00] border-2 border-black rounded-full flex items-center justify-center">
            <span className="font-display font-bold text-[10px] text-black">Tea</span>
          </div>
          <span className="font-mono text-xs text-black/40 dark:text-white/30">
            Tushtee - Creative Web Developer
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] text-black/30 dark:text-white/20">
            Built with React + Tailwind + Framer Motion ⚡
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 pulse-dot" />
          <span className="font-mono text-[10px] text-black/40 dark:text-white/30">Available for builds</span>
        </div>
      </motion.div>
    </section>
  )
}
