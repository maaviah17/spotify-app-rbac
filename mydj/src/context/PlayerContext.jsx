import { createContext, useContext, useState, useRef, useEffect } from 'react'

const PlayerContext = createContext(null)

export function PlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null)
  const [queue, setQueue] = useState([])
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)

  const playTrack = (track, trackList = []) => {
    setCurrentTrack(track)
    setQueue(trackList)
    setPlaying(true)
    setProgress(0)
  }

  const togglePlay = () => setPlaying(p => !p)

  const playNext = () => {
    const idx = queue.findIndex(t => t._id === currentTrack?._id)
    const next = queue[idx + 1]
    if (next) playTrack(next, queue)
  }

  const playPrev = () => {
    const idx = queue.findIndex(t => t._id === currentTrack?._id)
    const prev = queue[idx - 1]
    if (prev) playTrack(prev, queue)
  }

  // Sync audio element
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentTrack) return
    audio.src = currentTrack.audioUrl
    audio.play().catch(() => {})

    const onTime     = () => setProgress(audio.currentTime)
    const onDuration = () => setDuration(audio.duration)
    const onEnded    = () => playNext()

    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onDuration)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onDuration)
      audio.removeEventListener('ended', onEnded)
    }
  }, [currentTrack])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    playing ? audio.play().catch(() => {}) : audio.pause()
  }, [playing])

  return (
    <PlayerContext.Provider value={{
      currentTrack, queue, playing, progress, duration,
      setProgress, setDuration, audioRef,
      playTrack, togglePlay, playNext, playPrev,
    }}>
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => useContext(PlayerContext)
// ```

// **Summary of files changed:**
// ```
// src/
//   App.jsx                    ← updated (added GlobalPlayer)
//   context/PlayerContext.jsx  ← updated (audio logic moved here)
//   components/GlobalPlayer.jsx ← new
//   components/BottomPlayer.jsx ← updated (leaner, no audio logic)