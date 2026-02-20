import { createContext, useContext, useState, useRef } from 'react'

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
    if (!queue.length) return
    const idx = queue.findIndex(t => t._id === currentTrack?._id)
    const next = queue[idx + 1]
    if (next) playTrack(next, queue)
  }

  const playPrev = () => {
    if (!queue.length) return
    const idx = queue.findIndex(t => t._id === currentTrack?._id)
    const prev = queue[idx - 1]
    if (prev) playTrack(prev, queue)
  }

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