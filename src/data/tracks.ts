export interface Track {
  id: string
  title: string
  artist: string
  genre: string
  emoji: string
  accentColor: string
  url: string
}

/**
 * 🎵 MUSIC PLAYLIST CONFIGURATION
 * -------------------------------------------------------------
 * HOW TO ADD YOUR OWN MUSIC:
 * 1. Place your audio file (.mp3, .wav, or .ogg) inside the `public/music/` directory.
 *    For example: `public/music/my-song.mp3`
 * 
 * 2. Add an entry to the `TRACKS` array below with its path:
 *    url: '/music/my-song.mp3'
 * 
 * You can also use any direct online audio stream or MP3 URL!
 */
export const TRACKS: Track[] = [
  {
    id: 'lofi-chill',
    title: 'lo-fi beats to ship to',
    artist: 'Late Night Coding · Chillhop',
    genre: 'Lo-Fi Chill',
    emoji: '🎧',
    accentColor: 'from-[#FF70A6] to-[#70D6FF]',
    url: `${import.meta.env.BASE_URL}music/lofi-chill.wav`,
  },
  {
    id: 'synthwave-drive',
    title: 'midnight terminal',
    artist: 'Neon Cyberpunk · Synthwave',
    genre: 'Synthwave',
    emoji: '⚡',
    accentColor: 'from-[#CCFF00] to-[#70D6FF]',
    url: `${import.meta.env.BASE_URL}music/synthwave-drive.wav`,
  },
  {
    id: 'coffee-rain',
    title: 'coffee & rainy window',
    artist: 'Ambient Jazz · Cozy Room',
    genre: 'Cozy Rain',
    emoji: '☕',
    accentColor: 'from-[#FFD166] to-[#FF70A6]',
    url: `${import.meta.env.BASE_URL}music/coffee-rain.wav`,
  },
]
