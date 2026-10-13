import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react'
import { TRACKS, Track } from '../data/tracks'

interface MusicContextType {
  tracks: Track[]
  currentTrack: Track
  currentTrackIndex: number
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  isMuted: boolean
  isLooping: boolean
  togglePlay: () => void
  playTrack: (index: number) => void
  nextTrack: () => void
  prevTrack: () => void
  seek: (time: number) => void
  setVolume: (v: number) => void
  toggleMute: () => void
  toggleLoop: () => void
}

const MusicContext = createContext<MusicContextType | null>(null)

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(0.8)
  const [isMuted, setIsMuted] = useState(false)
  const [isLooping, setIsLooping] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const currentTrack = TRACKS[currentTrackIndex] || TRACKS[0]

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio()
    audio.src = currentTrack.url
    audio.volume = volume
    audio.loop = isLooping
    audioRef.current = audio

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleLoadedMetadata = () => setDuration(audio.duration || 0)
    const handleEnded = () => {
      if (!audio.loop) {
        nextTrack()
      }
    }
    const handleError = () => {
      console.warn('Audio playback error for track:', currentTrack.title)
      setIsPlaying(false)
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)

    return () => {
      audio.pause()
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
    }
  }, [])

  // Sync track URL change
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const wasPlaying = isPlaying
    audio.src = currentTrack.url
    audio.load()
    setCurrentTime(0)

    if (wasPlaying) {
      audio.play().catch(() => setIsPlaying(false))
    }
  }, [currentTrackIndex])

  // Sync volume & mute
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  // Sync loop
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = isLooping
    }
  }, [isLooping])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Playback error or blocked by autoplay policy:', err)
          setIsPlaying(false)
        })
    }
  }, [isPlaying])

  const playTrack = useCallback(
    (index: number) => {
      if (index === currentTrackIndex) {
        togglePlay()
        return
      }
      setCurrentTrackIndex(index)
      setIsPlaying(true)
      // Slight delay to allow audio.src update
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().catch(() => setIsPlaying(false))
        }
      }, 50)
    },
    [currentTrackIndex, togglePlay]
  )

  const nextTrack = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length)
    setIsPlaying(true)
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => setIsPlaying(false))
      }
    }, 50)
  }, [])

  const prevTrack = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length)
    setIsPlaying(true)
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => setIsPlaying(false))
      }
    }, 50)
  }, [])

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }, [])

  const setVolume = useCallback((v: number) => {
    setVolumeState(v)
    if (v > 0) setIsMuted(false)
  }, [])

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev)
  }, [])

  const toggleLoop = useCallback(() => {
    setIsLooping((prev) => !prev)
  }, [])

  return (
    <MusicContext.Provider
      value={{
        tracks: TRACKS,
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
      }}
    >
      {children}
    </MusicContext.Provider>
  )
}

export const useMusic = () => {
  const context = useContext(MusicContext)
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider')
  }
  return context
}
