import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMusic } from '../context/MusicContext'

interface MusicPlayerProps {
  playClick?: () => void
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export default function MusicPlayer({ playClick }: MusicPlayerProps) {
  const {
    tracks,
    currentTrack,
    currentTrackIndex,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isLooping,
    togglePlay,
    playTrack,
    nextTrack,
    prevTrack,
    seek,
    setVolume,
    toggleMute,
    toggleLoop,
  } = useMusic()

  const [showVolume, setShowVolume] = useState(false)
  const [showHelp, setShowHelp] = useState(false)

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newProgress = Math.max(0, Math.min(1, clickX / rect.width))
    seek(newProgress * duration)
    playClick?.()
  }

  return (
    <div className="border-2 border-black shadow-[6px_6px_0px_#000] p-5 bg-[#F4F1EA] dark:bg-[#111] transition-colors relative flex flex-col justify-between h-full">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[#1DB954] flex items-center justify-center shadow-[1px_1px_0px_#000]">
            <span className="text-[9px] text-white font-bold">▶</span>
          </div>
          <span className="font-mono text-[10px] text-black/60 dark:text-white/50 uppercase tracking-widest font-semibold">
            Now Playing
          </span>
          <span className="w-2 h-2 rounded-full bg-green-500 pulse-dot inline-block ml-1" />
        </div>

        {/* Header Right: Animated Equalizer & Loop Toggle */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              toggleLoop()
              playClick?.()
            }}
            title={isLooping ? 'Looping enabled' : 'Loop disabled'}
            className={`text-xs px-1.5 py-0.5 rounded border border-black font-mono transition-colors ${
              isLooping
                ? 'bg-[#CCFF00] text-black font-bold'
                : 'bg-black/5 dark:bg-white/10 text-black/50 dark:text-white/40'
            }`}
          >
            🔁
          </button>

          {/* Equalizer Bars */}
          <div className="flex items-end gap-1 h-5" title={isPlaying ? 'Playing' : 'Paused'}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`w-1.5 bg-[#1DB954] rounded-xs transition-all duration-300 ${
                  isPlaying ? `bar-${i}` : 'h-1.5'
                }`}
                style={{
                  height: isPlaying ? '100%' : '20%',
                  transformOrigin: 'bottom',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Track Selector Tabs (Quick options: 1, 2, 3) */}
      <div className="flex items-center gap-1.5 mb-3.5 overflow-x-auto pb-1">
        {tracks.map((track, idx) => {
          const isActive = idx === currentTrackIndex
          return (
            <button
              key={track.id}
              onClick={() => {
                playTrack(idx)
                playClick?.()
              }}
              className={`font-mono text-[10px] px-2.5 py-1 rounded-sm border border-black transition-all whitespace-nowrap flex items-center gap-1 ${
                isActive
                  ? 'bg-[#CCFF00] text-black font-bold shadow-[2px_2px_0px_#000] -translate-y-0.5'
                  : 'bg-white dark:bg-[#1f1f1f] text-black/70 dark:text-white/60 hover:bg-[#CCFF00]/40'
              }`}
            >
              <span>{track.emoji}</span>
              <span>{track.genre}</span>
            </button>
          )
        })}
      </div>

      {/* Main Track Display Card */}
      <div className="flex items-center gap-3.5 mb-3.5 bg-white dark:bg-[#1a1a1a] p-3 border border-black shadow-[3px_3px_0px_#000]">
        {/* Album Cover with Vinyl Spin effect */}
        <div
          className={`w-12 h-12 border-2 border-black bg-gradient-to-br ${currentTrack.accentColor} flex items-center justify-center text-2xl shadow-[2px_2px_0px_#000] shrink-0 relative overflow-hidden`}
        >
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{
              repeat: isPlaying ? Infinity : 0,
              duration: 4,
              ease: 'linear',
            }}
            className="flex items-center justify-center w-full h-full"
          >
            {currentTrack.emoji}
          </motion.div>
          {/* Subtle vinyl center spindle */}
          <div className="absolute w-2 h-2 rounded-full bg-black/40 border border-white/50" />
        </div>

        {/* Title and artist */}
        <div className="min-w-0 flex-1">
          <p className="font-display font-bold text-sm dark:text-white truncate" title={currentTrack.title}>
            {currentTrack.title}
          </p>
          <p className="font-mono text-[11px] text-black/50 dark:text-white/40 truncate">
            {currentTrack.artist}
          </p>
        </div>
      </div>

      {/* Timeline Scrubbing Bar */}
      <div className="mb-3.5">
        <div
          onClick={handleSeek}
          className="h-2 bg-black/10 dark:bg-white/10 rounded-full cursor-pointer relative group border border-black/20 overflow-hidden"
          title="Click to seek"
        >
          <div
            className="h-full bg-[#1DB954] transition-all duration-100 group-hover:bg-[#CCFF00]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-1 text-[10px] font-mono text-black/50 dark:text-white/40">
          <span>{formatTime(currentTime)}</span>
          <span className="text-[9px] uppercase tracking-wider text-black/30 dark:text-white/30">
            {currentTrack.genre}
          </span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Playback Controls & Volume */}
      <div className="flex items-center justify-between pt-1">
        {/* Help button */}
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="text-[10px] font-mono px-2 py-1 rounded border border-black/40 bg-white dark:bg-[#222] dark:text-white/70 hover:bg-[#CCFF00] dark:hover:text-black transition-colors"
          title="How to add your own music"
        >
          + Add Music
        </button>

        {/* Central Transport Buttons */}
        <div className="flex items-center gap-2">
          {/* Prev button */}
          <button
            onClick={() => {
              prevTrack()
              playClick?.()
            }}
            aria-label="Previous track"
            className="w-7 h-7 border-2 border-black bg-white dark:bg-[#222] dark:text-white flex items-center justify-center font-bold text-xs shadow-[2px_2px_0px_#000] hover:-translate-y-0.5 active:translate-y-0 transition-transform"
          >
            ⏮
          </button>

          {/* Big Play / Pause button */}
          <button
            onClick={() => {
              togglePlay()
              playClick?.()
            }}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            className="px-3.5 py-1.5 border-2 border-black bg-[#CCFF00] text-black font-mono font-bold text-xs shadow-[3px_3px_0px_#000] hover:-translate-y-0.5 active:translate-y-0 transition-transform flex items-center gap-1.5"
          >
            <span>{isPlaying ? '⏸' : '▶'}</span>
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>

          {/* Next button */}
          <button
            onClick={() => {
              nextTrack()
              playClick?.()
            }}
            aria-label="Next track"
            className="w-7 h-7 border-2 border-black bg-white dark:bg-[#222] dark:text-white flex items-center justify-center font-bold text-xs shadow-[2px_2px_0px_#000] hover:-translate-y-0.5 active:translate-y-0 transition-transform"
          >
            ⏭
          </button>
        </div>

        {/* Volume popover trigger */}
        <div className="relative">
          <button
            onClick={() => setShowVolume(!showVolume)}
            className="text-xs px-2 py-1 rounded border border-black/40 bg-white dark:bg-[#222] dark:text-white hover:bg-black hover:text-white transition-colors"
            title="Volume control"
          >
            {isMuted || volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}
          </button>

          {showVolume && (
            <div className="absolute right-0 bottom-8 z-30 p-2.5 bg-white dark:bg-[#1a1a1a] border-2 border-black shadow-[4px_4px_0px_#000] rounded-sm flex items-center gap-2 w-36">
              <button
                onClick={toggleMute}
                className="text-xs font-mono"
                title="Mute / Unmute"
              >
                {isMuted ? '🔇' : '🔊'}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-1 bg-black/20 accent-[#CCFF00] cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>

      {/* Quick Help Modal/Drawer: How to add your own music */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute inset-2 z-40 bg-[#F4F1EA] dark:bg-[#1a1a1a] border-2 border-black shadow-[4px_4px_0px_#000] p-4 flex flex-col justify-between text-xs"
          >
            <div>
              <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-black/20 dark:border-white/20">
                <span className="font-display font-bold text-sm dark:text-white">
                  🎶 How to Add Music
                </span>
                <button
                  onClick={() => setShowHelp(false)}
                  className="font-mono text-xs px-1.5 py-0.5 border border-black bg-[#FF70A6] text-black font-bold hover:scale-105"
                >
                  ✕
                </button>
              </div>

              <ol className="list-decimal list-inside space-y-1.5 font-mono text-[11px] text-black/80 dark:text-white/80">
                <li>
                  Place your audio files (<code>.mp3</code>, <code>.wav</code>) in{' '}
                  <span className="bg-[#CCFF00] text-black px-1 font-bold">
                    public/music/
                  </span>
                </li>
                <li>
                  Open{' '}
                  <span className="bg-[#CCFF00] text-black px-1 font-bold">
                    src/data/tracks.ts
                  </span>
                </li>
                <li>
                  Add or update the track details:
                  <div className="mt-1 p-1.5 bg-black text-[#CCFF00] text-[9.5px] rounded overflow-x-auto leading-tight">
                    {`{ id: 'my-song', title: 'My Beat', url: '/music/song.mp3' }`}
                  </div>
                </li>
              </ol>
            </div>

            <button
              onClick={() => setShowHelp(false)}
              className="w-full mt-2 py-1 bg-[#CCFF00] border-2 border-black font-mono text-xs font-bold shadow-[2px_2px_0px_#000] text-black hover:-translate-y-0.5 transition-transform"
            >
              Got it! ✨
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
