import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { usePlayer } from '../context/PlayerContext'
import BottomPlayer from './BottomPlayer'

export default function GlobalPlayer() {
  const { currentTrack, playing, audioRef } = usePlayer()
  const location = useLocation()

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    playing ? audio.play().catch(() => {}) : audio.pause()
  }, [playing, currentTrack])

  return (
    <>
      <audio ref={audioRef} src={currentTrack?.audioUrl} preload="metadata" />
      {currentTrack && <BottomPlayer />}
    </>
  )
}