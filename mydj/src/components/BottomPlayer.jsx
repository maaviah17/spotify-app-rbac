import { usePlayer } from '../context/PlayerContext'

export default function BottomPlayer() {
  const {
    currentTrack, playing, togglePlay,
    playNext, playPrev, progress, setProgress,
    duration, setDuration, audioRef,
  } = usePlayer()

  const seek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    const newTime = pct * (audioRef.current?.duration || 0)
    if (audioRef.current) audioRef.current.currentTime = newTime
    setProgress(newTime)
  }

  const fmt = (s) => {
    if (!s || isNaN(s)) return '0:00'
    return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
  }

  const pct = duration ? (progress / duration) * 100 : 0

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-xl border-t border-border">

      {/* Progress bar */}
      <div className="h-1 w-full bg-border cursor-pointer group" onClick={seek}>
        <div
          className="h-full bg-green transition-all duration-100 group-hover:bg-green-light relative"
          style={{ width: `${pct}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-green opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      <div className="flex items-center justify-between px-6 py-3 max-w-[1500px] mx-auto">

        {/* Track info */}
        <div className="flex items-center gap-4 w-[280px]">
          <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-green/30 to-green-dark/20 border border-green/20 flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2dd87a" strokeWidth="2">
              <path d="M9 18V5l12-2v13"/>
              <circle cx="6" cy="18" r="3"/>
              <circle cx="18" cy="16" r="3"/>
            </svg>
          </div>
          <div className="min-w-0">
            <p className="font-head font-bold text-sm truncate">{currentTrack?.title}</p>
            <p className="text-muted text-xs truncate mt-0.5">{currentTrack?.artist?.username || 'Unknown'}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6">
          <button onClick={playPrev} className="text-muted hover:text-text transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/>
            </svg>
          </button>

          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-green flex items-center justify-center hover:bg-green-light transition-all duration-150 hover:scale-105"
          >
            {playing ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#080c0a">
                <rect x="6" y="4" width="4" height="16" rx="1"/>
                <rect x="14" y="4" width="4" height="16" rx="1"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#080c0a">
                <path d="M5 3l14 9-14 9V3z"/>
              </svg>
            )}
          </button>

          <button onClick={playNext} className="text-muted hover:text-text transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zm2.5-6 8.5 6V6z"/>
              <path d="M16 6h2v12h-2z"/>
            </svg>
          </button>
        </div>

        {/* Time */}
        <div className="w-[280px] flex justify-end">
          <span className="text-muted text-xs font-mono">
            {fmt(progress)} / {fmt(duration)}
          </span>
        </div>

      </div>
    </div>
  )
}