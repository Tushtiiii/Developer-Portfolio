import { motion, AnimatePresence } from 'framer-motion'
import { useMusic } from '../context/MusicContext'

interface FloatingMusicBarProps {
  playClick?: () => void
}

export default function FloatingMusicBar({ playClick }: FloatingMusicBarProps) {
  const { currentTrack, isPlaying, togglePlay, nextTrack, prevTrack } = useMusic()

  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-3 py-2 bg-[#F4F1EA] dark:bg-[#181818] border-2 border-black rounded-full shadow-[4px_4px_0px_#000]"
        >
          {/* Animated Track Disc */}
          <a
            href="#about"
            className="flex items-center gap-2 group cursor-pointer"
            title="Jump to Music Player in About section"
          >
            <div
              className={`w-7 h-7 rounded-full border border-black bg-gradient-to-br ${currentTrack.accentColor} flex items-center justify-center text-xs shadow-[1px_1px_0px_#000]`}
            >
              <span className="animate-spin">{currentTrack.emoji}</span>
            </div>
            <div className="hidden sm:block max-w-[120px]">
              <p className="font-display font-bold text-[11px] truncate dark:text-white leading-tight">
                {currentTrack.title}
              </p>
              <p className="font-mono text-[9px] text-black/50 dark:text-white/40 truncate leading-tight">
                {currentTrack.genre}
              </p>
            </div>
          </a>

          {/* Quick controls */}
          <div className="flex items-center gap-1 pl-1 border-l border-black/20 dark:border-white/20">
            <button
              onClick={() => {
                prevTrack()
                playClick?.()
              }}
              aria-label="Previous track"
              className="w-6 h-6 rounded-full border border-black bg-white dark:bg-[#222] dark:text-white text-[9px] flex items-center justify-center hover:bg-[#CCFF00] dark:hover:text-black transition-colors"
            >
              ⏮
            </button>
            <button
              onClick={() => {
                togglePlay()
                playClick?.()
              }}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className="w-7 h-7 rounded-full border border-black bg-[#CCFF00] text-black text-xs font-bold flex items-center justify-center shadow-[1px_1px_0px_#000] hover:scale-105 active:scale-95 transition-transform"
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button
              onClick={() => {
                nextTrack()
                playClick?.()
              }}
              aria-label="Next track"
              className="w-6 h-6 rounded-full border border-black bg-white dark:bg-[#222] dark:text-white text-[9px] flex items-center justify-center hover:bg-[#CCFF00] dark:hover:text-black transition-colors"
            >
              ⏭
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
