import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { AlbumCardSkeleton } from '../components/Skeleton'
import { usePlayer } from '../context/PlayerContext'

export default function Albums() {
  const { user } = useAuth()
  const { playTrack, currentTrack, playing } = usePlayer()
  const navigate = useNavigate()

  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res =await fetch(`${import.meta.env.VITE_API_URL || ''}/api/music/albums`, { credentials: 'include' })
        if (res.status === 401) { navigate('/login'); return }
        const data = await res.json()
        setAlbums(data.albums || [])
      } catch {
        setError('Failed to load albums.')
      } finally {
        setLoading(false)
      }
    }
    fetch_()
  }, [])

  return (
    <div className="min-h-screen bg-bg text-text font-body">

      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-bg/80 backdrop-blur-lg border-b border-border px-8 py-4 flex items-center justify-between">
        <Link to="/music" className="font-head font-black text-xl tracking-tight">
          My<span className="text-green">DJ</span>
        </Link>
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
              {user?.username?.[0]}
            </div>
            <span className="text-sm text-muted hidden md:block">{user?.username}</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-[1500px] mx-auto px-8 py-10">

        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[11px] text-green uppercase tracking-widest font-semibold mb-1">Collection</p>
            <h1 className="font-head font-black text-4xl tracking-tight">Albums</h1>
          </div>
          <Link
            to="/music"
            className="border border-border text-muted text-xs px-4 py-2 rounded-lg hover:border-green hover:text-green transition-all duration-200 font-head font-bold uppercase tracking-widest"
          >
            All Tracks
          </Link>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3 mb-6">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
    {Array.from({ length: 12 }).map((_, i) => (
      <AlbumCardSkeleton key={i} />
    ))}
  </div>
)}

        {/* Empty */}
        {!loading && albums.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
            <div className="text-5xl">💿</div>
            <h3 className="font-head font-bold text-xl">No albums yet</h3>
            <p className="text-muted text-sm max-w-xs">
              Albums will appear here once artists create them.
            </p>
            {user?.role === 'artist' && (
              <Link
                to="/upload"
                className="mt-2 bg-green text-bg font-head font-bold text-sm uppercase tracking-widest px-6 py-3 rounded-lg hover:bg-green-light transition-colors"
              >
                Create First Album
              </Link>
            )}
          </div>
        )}

        {/* Albums grid */}
        {!loading && albums.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {albums.map((album, i) => (
              <Link
                to={`/albums/${album._id}`}
                key={album._id}
                className="group flex flex-col gap-3"
              >
                {/* Cover */}
                <div className="aspect-square rounded-xl bg-surface border border-border group-hover:border-green/30 transition-all duration-300 group-hover:shadow-[0_8px_32px_rgba(45,216,122,.12)] flex items-center justify-center relative overflow-hidden">
                  {/* Background pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage: 'linear-gradient(#2dd87a 1px, transparent 1px), linear-gradient(90deg, #2dd87a 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}
                  />
                  {/* Gradient based on index */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: [
                        'radial-gradient(circle at 30% 70%, rgba(45,216,122,.15), transparent 60%)',
                        'radial-gradient(circle at 70% 30%, rgba(168,245,66,.12), transparent 60%)',
                        'radial-gradient(circle at 50% 50%, rgba(45,216,122,.10), transparent 60%)',
                        'radial-gradient(circle at 20% 80%, rgba(168,245,66,.15), transparent 60%)',
                        'radial-gradient(circle at 80% 20%, rgba(45,216,122,.12), transparent 60%)',
                      ][i % 5],
                    }}
                  />
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2dd87a" strokeWidth="1.2" className="opacity-40 group-hover:opacity-70 transition-opacity">
                    <circle cx="12" cy="12" r="10"/>
                    <circle cx="12" cy="12" r="3"/>
                    <line x1="12" y1="2" x2="12" y2="9"/>
                  </svg>

                  {/* Play overlay on hover */}
                  <div className="absolute inset-0 bg-bg/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-green flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#080c0a">
                        <path d="M5 3l14 9-14 9V3z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="min-w-0">
                  <p className="font-head font-bold text-sm truncate group-hover:text-green transition-colors duration-200">
                    {album.title}
                  </p>
                  <p className="text-muted text-xs truncate mt-0.5">
                    {album.artist?.username || 'Unknown'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && albums.length > 0 && (
          <p className="text-muted text-xs text-center mt-8">
            {albums.length} album{albums.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>
    </div>
  )
}