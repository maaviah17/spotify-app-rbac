import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { usePlayer } from '../context/PlayerContext'
import { Link } from 'react-router-dom'
import { TrackRowSkeleton } from '../components/Skeleton'
import BottomPlayer from '../components/BottomPlayer'

export default function MusicLibrary() {
  const { user, logout } = useAuth()
  const { playTrack, currentTrack, playing, togglePlay } = usePlayer()
  const navigate = useNavigate()

  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchSongs()
  }, [])

  const fetchSongs = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/music`, { credentials: 'include' })
      if (res.status === 401) { navigate('/login'); return }
      const data = await res.json()
      setSongs(data.songs || [])
    } catch {
      setError('Failed to load music. Try refreshing.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const filtered = songs.filter(s =>
    s.title?.toLowerCase().includes(search.toLowerCase()) ||
    s.artist?.username?.toLowerCase().includes(search.toLowerCase())
  )

  const fmt = (s) => {
    if (!s || isNaN(s)) return '--:--'
    return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
  }

  const isCurrentlyPlaying = (song) =>
    currentTrack?._id === song._id && playing

  return (
    <div className="min-h-screen bg-bg text-text font-body pb-28">

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-40 bg-bg/80 backdrop-blur-lg border-b border-border px-8 py-4 flex items-center justify-between">
        <a href="/" className="font-head font-black text-xl tracking-tight">
          My<span className="text-green">DJ</span>
        </a>

        <div className="flex-1 max-w-sm mx-8">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search tracks, artists…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-surface border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-text outline-none focus:border-green transition-colors duration-200"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user?.role === 'artist' && (
            <button
              onClick={() => navigate('/upload')}
              className="bg-green text-bg font-head font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-lg hover:bg-green-light transition-colors"
            >
              + Upload
            </button>
          )}
         <Link to="/profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
  <div className="w-8 h-8 rounded-full bg-green/20 border border-green/30 flex items-center justify-center font-head font-bold text-xs text-green uppercase">
    {user?.username?.[0] || '?'}
  </div>
  <span className="text-sm text-muted hidden md:block">{user?.username}</span>
</Link>
          <button
            onClick={handleLogout}
            className="text-muted text-xs hover:text-text transition-colors uppercase tracking-widest"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-[1500px] mx-auto px-8 py-10">

        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[11px] text-green uppercase tracking-widest font-semibold mb-1">Library</p>
            <h1 className="font-head font-black text-4xl tracking-tight">All Tracks</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/albums')}
              className="border border-border text-muted text-sm px-4 py-2 rounded-lg hover:border-green hover:text-green transition-all duration-200 font-head font-bold uppercase tracking-widest text-xs"
            >
              Browse Albums
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3 mb-6">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
  <div className="bg-surface border border-border rounded-2xl overflow-hidden">
    <div className="grid grid-cols-[2rem_1fr_1fr_4rem] gap-4 px-6 py-3 border-b border-border">
      <span className="text-muted text-xs uppercase tracking-widest">#</span>
      <span className="text-muted text-xs uppercase tracking-widest">Title</span>
      <span className="text-muted text-xs uppercase tracking-widest">Artist</span>
      <span className="text-muted text-xs uppercase tracking-widest text-right">Duration</span>
    </div>
    {Array.from({ length: 8 }).map((_, i) => (
      <TrackRowSkeleton key={i} />
    ))}
  </div>
)}

        {/* Empty */}
        {!loading && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
            <div className="text-5xl">🎵</div>
            <h3 className="font-head font-bold text-xl">
              {search ? 'No results found' : 'No tracks yet'}
            </h3>
            <p className="text-muted text-sm max-w-xs">
              {search
                ? `Nothing matched "${search}". Try a different search.`
                : 'Be the first to upload a track!'}
            </p>
            {user?.role === 'artist' && !search && (
              <button
                onClick={() => navigate('/upload')}
                className="mt-2 bg-green text-bg font-head font-bold text-sm uppercase tracking-widest px-6 py-3 rounded-lg hover:bg-green-light transition-colors"
              >
                Upload First Track
              </button>
            )}
          </div>
        )}

        {/* Track list */}
        {!loading && filtered.length > 0 && (
          <div className="bg-surface border border-border rounded-2xl overflow-hidden">

            {/* Table header */}
            <div className="grid grid-cols-[2rem_1fr_1fr_4rem] gap-4 px-6 py-3 border-b border-border">
              <span className="text-muted text-xs uppercase tracking-widest">#</span>
              <span className="text-muted text-xs uppercase tracking-widest">Title</span>
              <span className="text-muted text-xs uppercase tracking-widest">Artist</span>
              <span className="text-muted text-xs uppercase tracking-widest text-right">Duration</span>
            </div>

            {/* Rows */}
            {filtered.map((song, i) => {
              const active = currentTrack?._id === song._id
              const thisPlaying = active && playing
              return (
                <div
                  key={song._id}
                  onClick={() => {
                    if (active) togglePlay()
                    else playTrack(song, filtered)
                  }}
                  className={`grid grid-cols-[2rem_1fr_1fr_4rem] gap-4 px-6 py-4 items-center cursor-pointer group transition-colors duration-150 border-b border-border/50 last:border-b-0 ${
                    active ? 'bg-green/[0.06]' : 'hover:bg-white/[0.03]'
                  }`}
                >
                  {/* Index / play indicator */}
                  <div className="flex items-center justify-center w-8">
                    {thisPlaying ? (
                      <PlayingBars />
                    ) : (
                      <>
                        <span className={`text-sm group-hover:hidden ${active ? 'text-green' : 'text-muted'}`}>
                          {i + 1}
                        </span>
                        <svg className="hidden group-hover:block text-text" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M5 3l14 9-14 9V3z"/>
                        </svg>
                      </>
                    )}
                  </div>

                  {/* Title */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center border ${
                      active
                        ? 'bg-green/20 border-green/30'
                        : 'bg-border/50 border-border group-hover:border-green/20'
                    }`}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke={active ? '#2dd87a' : '#5e7a6a'} strokeWidth="2">
                        <path d="M9 18V5l12-2v13"/>
                        <circle cx="6" cy="18" r="3"/>
                        <circle cx="18" cy="16" r="3"/>
                      </svg>
                    </div>
                    <span className={`font-medium text-sm truncate ${active ? 'text-green' : 'text-text'}`}>
                      {song.title}
                    </span>
                  </div>

                  {/* Artist */}
                  <span className="text-muted text-sm truncate">
                    {song.artist?.username || 'Unknown'}
                  </span>

                  {/* Duration */}
                  <span className="text-muted text-sm text-right font-mono">
                    {fmt(song.duration)}
                  </span>
                </div>
              )
            })}
          </div>
        )}

        {/* Count */}
        {!loading && filtered.length > 0 && (
          <p className="text-muted text-xs text-center mt-4">
            {filtered.length} track{filtered.length !== 1 ? 's' : ''}
            {search && ` matching "${search}"`}
          </p>
        )}
      </div>

      <BottomPlayer />
    </div>
  )
}

function PlayingBars() {
  return (
    <div className="flex items-end gap-[2px] h-4">
      {[1, 2, 3].map(i => (
        <div
          key={i}
          className="w-[3px] bg-green rounded-sm"
          style={{
            animation: `wave ${0.8 + i * 0.15}s ease-in-out infinite alternate`,
            height: '100%',
          }}
        />
      ))}
    </div>
  )
}