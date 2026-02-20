import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { usePlayer } from '../context/PlayerContext'
import BottomPlayer from '../components/BottomPlayer'

export default function AlbumDetail() {
  const { albumId } = useParams()
  const { user } = useAuth()
  const { playTrack, currentTrack, playing, togglePlay } = usePlayer()
  const navigate = useNavigate()

  const [album, setAlbum] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await fetch(`/api/music/albums/${albumId}`, { credentials: 'include' })
        if (res.status === 401) { navigate('/login'); return }
        const data = await res.json()
        setAlbum(data.album)
      } catch {
        setError('Failed to load album.')
      } finally {
        setLoading(false)
      }
    }
    fetch_()
  }, [albumId])

  const fmt = (s) => {
    if (!s || isNaN(s)) return '--:--'
    return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
  }

  const handlePlayAll = () => {
    if (!album?.songs?.length) return
    playTrack(album.songs[0], album.songs)
  }

  const isAlbumPlaying = album?.songs?.some(s => s._id === currentTrack?._id) && playing

  return (
    <div className="min-h-screen bg-bg text-text font-body pb-28">

      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-bg/80 backdrop-blur-lg border-b border-border px-8 py-4 flex items-center justify-between">
        <Link to="/music" className="font-head font-black text-xl tracking-tight">
          My<span className="text-green">DJ</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            to="/albums"
            className="text-muted text-xs hover:text-text transition-colors uppercase tracking-widest flex items-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Albums
          </Link>
          <Link to="/profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-green/20 border border-green/30 flex items-center justify-center font-head font-bold text-xs text-green uppercase">
              {user?.username?.[0]}
            </div>
          </Link>
        </div>
      </nav>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-green border-t-transparent animate-spin" />
          <p className="text-muted text-sm">Loading album…</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="max-w-[700px] mx-auto px-8 pt-10">
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3">
            {error}
          </div>
        </div>
      )}

      {album && (
        <div className="max-w-[1500px] mx-auto px-8 py-10">

          {/* Album header */}
          <div className="flex flex-col sm:flex-row gap-8 items-start mb-10">

            {/* Cover */}
            <div className="w-48 h-48 flex-shrink-0 rounded-2xl bg-surface border border-border flex items-center justify-center relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,.5)]">
              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage: 'linear-gradient(#2dd87a 1px, transparent 1px), linear-gradient(90deg, #2dd87a 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />
              <div
                className="absolute inset-0"
                style={{ background: 'radial-gradient(circle at 40% 60%, rgba(45,216,122,.2), transparent 65%)' }}
              />
              <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#2dd87a" strokeWidth="1" className="opacity-50">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="3"/>
                <line x1="12" y1="2" x2="12" y2="9"/>
              </svg>
            </div>

            {/* Meta */}
            <div className="flex flex-col justify-end">
              <p className="text-[11px] text-green uppercase tracking-widest font-semibold mb-2">Album</p>
              <h1 className="font-head font-black text-5xl tracking-tight leading-none mb-4">
                {album.title}
              </h1>
              <div className="flex items-center gap-2 text-sm text-muted mb-6">
                <span className="font-medium text-text">{album.artist?.username}</span>
                <span>·</span>
                <span>{album.songs?.length || 0} track{album.songs?.length !== 1 ? 's' : ''}</span>
              </div>

              {/* Play all button */}
              {album.songs?.length > 0 && (
                <button
                  onClick={handlePlayAll}
                  className="inline-flex items-center gap-3 bg-green text-bg font-head font-bold text-sm uppercase tracking-widest px-7 py-3.5 rounded-xl hover:bg-green-light transition-all duration-200 hover:-translate-y-px hover:shadow-[0_8px_30px_rgba(45,216,122,.3)] w-fit"
                >
                  {isAlbumPlaying ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#080c0a">
                        <rect x="6" y="4" width="4" height="16" rx="1"/>
                        <rect x="14" y="4" width="4" height="16" rx="1"/>
                      </svg>
                      Pause
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#080c0a">
                        <path d="M5 3l14 9-14 9V3z"/>
                      </svg>
                      Play All
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Track list */}
          {album.songs?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center bg-surface border border-border rounded-2xl">
              <div className="text-4xl">🎵</div>
              <h3 className="font-head font-bold text-lg">No tracks in this album</h3>
              <p className="text-muted text-sm">Upload tracks and add them to this album.</p>
            </div>
          ) : (
            <div className="bg-surface border border-border rounded-2xl overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-[2rem_1fr_4rem] gap-4 px-6 py-3 border-b border-border">
                <span className="text-muted text-xs uppercase tracking-widest">#</span>
                <span className="text-muted text-xs uppercase tracking-widest">Title</span>
                <span className="text-muted text-xs uppercase tracking-widest text-right">Duration</span>
              </div>

              {album.songs.map((song, i) => {
                const active = currentTrack?._id === song._id
                const thisPlaying = active && playing
                return (
                  <div
                    key={song._id}
                    onClick={() => active ? togglePlay() : playTrack(song, album.songs)}
                    className={`grid grid-cols-[2rem_1fr_4rem] gap-4 px-6 py-4 items-center cursor-pointer group transition-colors duration-150 border-b border-border/50 last:border-b-0 ${
                      active ? 'bg-green/[0.06]' : 'hover:bg-white/[0.03]'
                    }`}
                  >
                    {/* Index */}
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
                        active ? 'bg-green/20 border-green/30' : 'bg-border/50 border-border group-hover:border-green/20'
                      }`}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                          stroke={active ? '#2dd87a' : '#5e7a6a'} strokeWidth="2">
                          <path d="M9 18V5l12-2v13"/>
                          <circle cx="6" cy="18" r="3"/>
                          <circle cx="18" cy="16" r="3"/>
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <p className={`font-medium text-sm truncate ${active ? 'text-green' : 'text-text'}`}>
                          {song.title}
                        </p>
                        <p className="text-muted text-xs mt-0.5 truncate">
                          {song.artist?.username || album.artist?.username}
                        </p>
                      </div>
                    </div>

                    {/* Duration */}
                    <span className="text-muted text-sm text-right font-mono">
                      {fmt(song.duration)}
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
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