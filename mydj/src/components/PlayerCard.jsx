import { useEffect, useState } from 'react'
import { usePlayer } from '../context/PlayerContext'

export default function PlayerCard() {
  const { playTrack, currentTrack, playing, togglePlay } = usePlayer()
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch('/api/music', { credentials: 'include' })
        const data = await res.json()
        setSongs(data.songs?.slice(0, 3) || [])
      } catch {
        // silently fail on landing page
      } finally {
        setLoading(false)
      }
    }
    fetchSongs()
  }, [])

  const fmt = (s) => {
    if (!s || isNaN(s)) return '--:--'
    return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
  }

  const displaySongs = songs.length > 0 ? songs : []

  return (
    <div
      className="relative rounded-2xl p-7 bg-surface border border-border"
      style={{ boxShadow: '0 40px 100px rgba(0,0,0,.6), 0 0 0 1px rgba(45,216,122,.05)' }}
    >
      {/* gradient border overlay */}
      <div
        className="pointer-events-none absolute inset-[-1px] rounded-2xl"
        style={{ background: 'linear-gradient(135deg, rgba(45,216,122,.15), transparent 50%, rgba(168,245,66,.08))' }}
      />

      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green to-green-dark grid place-items-center font-head font-black text-lg text-bg">
          M
        </div>
        <div className="flex-1">
          <p className="font-head font-bold text-sm">
            {currentTrack?.title || (loading ? 'Loading...' : songs[0]?.title || 'No tracks yet')}
          </p>
          <p className="text-xs text-muted mt-0.5">
            {currentTrack?.artist?.username || songs[0]?.artist?.username || 'MyDJ'}
          </p>
        </div>
        <span className="bg-green/10 border border-green/25 text-green text-[11px] uppercase tracking-widest px-3 py-1 rounded-full">
          Live
        </span>
      </div>

      {/* Waveform visualizer */}
      <div className="flex items-center gap-[3px] h-16 mb-5">
        {Array.from({ length: 40 }).map((_, i) => {
          const h = [20,40,60,35,75,50,30,65,45,80,25,55,70,38,62,48,72,32,58,42,
                     68,28,52,76,36,60,44,78,22,56,66,34,74,46,64,26,54,82,30,50][i]
          const isPlayed = i < 20
          const isActive = i === 20
          return (
            <div
              key={i}
              className={`flex-1 rounded-sm transition-colors duration-300 ${
                isActive ? 'bg-green' : isPlayed ? 'bg-green/30' : 'bg-border'
              }`}
              style={{
                height: `${h}%`,
                animation: playing ? `wave ${(0.8 + Math.random() * 0.8).toFixed(2)}s ease-in-out infinite alternate` : 'none',
                animationDelay: `-${(Math.random() * 1.5).toFixed(2)}s`,
                transformOrigin: 'bottom',
              }}
            />
          )
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            if (songs.length === 0) return
            if (currentTrack) togglePlay()
            else playTrack(songs[0], songs)
          }}
          className="w-11 h-11 rounded-full bg-green border-none grid place-items-center flex-shrink-0 transition-all duration-150 hover:scale-110 hover:shadow-[0_0_24px_rgba(45,216,122,.5)]"
        >
          {playing && currentTrack ? (
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

        <div className="flex-1 flex flex-col gap-1.5">
          <div className="h-[3px] bg-border rounded-full overflow-hidden">
            <div className="h-full w-[42%] rounded-full bg-gradient-to-r from-green to-green-light" />
          </div>
          <div className="flex justify-between text-[11px] text-muted">
            <span>1:42</span>
            <span>{fmt(songs[0]?.duration)}</span>
          </div>
        </div>
      </div>

      {/* Track list */}
      {loading ? (
        <div className="mt-5 border-t border-border pt-4 flex items-center justify-center py-6">
          <div className="w-5 h-5 rounded-full border-2 border-green border-t-transparent animate-spin" />
        </div>
      ) : (
        <div className="mt-5 border-t border-border pt-4 flex flex-col gap-1">
          {displaySongs.map((song, i) => (
            <div
              key={song._id}
              onClick={() => playTrack(song, songs)}
              className={`flex items-center gap-3 px-2.5 py-2 rounded-lg hover:bg-white/[0.04] transition-colors duration-200 cursor-pointer ${
                currentTrack?._id === song._id ? 'bg-green/[0.06]' : ''
              }`}
            >
              <span className={`w-4 text-center text-xs ${currentTrack?._id === song._id ? 'text-green' : 'text-muted'}`}>
                {currentTrack?._id === song._id && playing ? '▶' : i + 1}
              </span>
              <div className="w-9 h-9 rounded-md flex-shrink-0 bg-gradient-to-br from-green/20 to-green-dark/20 border border-green/20 grid place-items-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2dd87a" strokeWidth="2">
                  <path d="M9 18V5l12-2v13"/>
                  <circle cx="6" cy="18" r="3"/>
                  <circle cx="18" cy="16" r="3"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${currentTrack?._id === song._id ? 'text-green' : 'text-text'}`}>
                  {song.title}
                </p>
                <p className="text-xs text-muted mt-0.5 truncate">{song.artist?.username}</p>
              </div>
              <span className="text-xs text-muted">{fmt(song.duration)}</span>
            </div>
          ))}

          {displaySongs.length === 0 && (
            <p className="text-muted text-xs text-center py-4">No tracks uploaded yet</p>
          )}
        </div>
      )}
    </div>
  )
}