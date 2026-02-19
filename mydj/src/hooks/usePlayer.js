import { useState, useEffect, useRef } from 'react'

export function usePlayer(durationSeconds = 243) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(42) // percent
  const timerRef = useRef(null)

  useEffect(() => {
    if (playing) {
      timerRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(timerRef.current)
            setPlaying(false)
            return 100
          }
          return p + 0.08
        })
      }, 100)
    } else {
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [playing])

  const toggle = () => setPlaying(p => !p)

  const currentSeconds = Math.round((progress / 100) * durationSeconds)
  const currentTime = `${Math.floor(currentSeconds / 60)}:${String(currentSeconds % 60).padStart(2, '0')}`
  const totalTime = `${Math.floor(durationSeconds / 60)}:${String(durationSeconds % 60).padStart(2, '0')}`

  return { playing, toggle, progress, currentTime, totalTime }
}
