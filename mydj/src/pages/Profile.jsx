import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { usePlayer } from '../context/PlayerContext'

export default function Profile() {
  const { user, logout } = useAuth()
  const { currentTrack } = usePlayer()
  const navigate = useNavigate()
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    setLoggingOut(true)
    await logout()
    navigate('/')
  }

  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'Recently'

  const isArtist = user?.role === 'artist'

  return (
    <div className={`min-h-screen bg-bg text-text font-body ${currentTrack ? 'pb-28' : ''}`}>

      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-bg/80 backdrop-blur-lg border-b border-border px-8 py-4 flex items-center justify-between">
        <Link to="/music" className="font-head font-black text-xl tracking-tight">
          My<span className="text-green">DJ</span>
        </Link>
        <Link
          to="/music"
          className="text-muted text-xs hover:text-text transition-colors uppercase tracking-widest flex items-center gap-2"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Back to Library
        </Link>
      </nav>

      <div className="max-w-[700px] mx-auto px-6 py-14">

        {/* Profile card */}
        <div className="bg-surface border border-border rounded-2xl overflow-hidden mb-6">

          {/* Cover banner */}
          <div
            className="h-32 w-full relative"
            style={{
              background: isArtist
                ? 'linear-gradient(135deg, #0e1a13, #1a3d2a, #0e1a13)'
                : 'linear-gradient(135deg, #0e1411, #1a2d20, #0e1411)',
            }}
          >
            {/* Grid texture */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: 'linear-gradient(#2dd87a 1px, transparent 1px), linear-gradient(90deg, #2dd87a 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
            {/* Glow */}
            <div
              className="absolute inset-0"
              style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(45,216,122,.15) 0%, transparent 70%)' }}
            />
          </div>

          {/* Avatar + info */}
          <div className="mt-12 px-8 pb-8">
            {/* Avatar overlapping banner */}
            <div className="flex items-end justify-between -mt-10 mb-5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green to-green-dark border-4 border-surface flex items-center justify-center font-head font-black text-3xl text-bg uppercase shadow-lg">
                {user?.username?.[0]}
              </div>
              {isArtist && (
                <Link
                  to="/upload"
                  className="bg-green text-bg font-head font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-lg hover:bg-green-light transition-colors"
                >
                  + Upload
                </Link>
              )}
            </div>

            <h1 className="font-head font-black text-2xl tracking-tight">{user?.username}</h1>
            <p className="text-muted text-sm mt-0.5">{user?.email}</p>

            <div className="flex items-center gap-3 mt-3">
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full border ${
                isArtist
                  ? 'bg-green/10 border-green/25 text-green'
                  : 'bg-surface border-border text-muted'
              }`}>
                {isArtist ? '🎵 Artist' : '🎧 Listener'}
              </span>
              <span className="text-muted text-xs">Joined {joinedDate}</span>
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Link
            to="/music"
            className="bg-surface border border-border rounded-xl p-5 hover:border-green/40 transition-all duration-200 group"
          >
            <div className="w-9 h-9 rounded-lg bg-bg border border-border grid place-items-center mb-3 group-hover:border-green/30 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5e7a6a" strokeWidth="2">
                <path d="M9 18V5l12-2v13"/>
                <circle cx="6" cy="18" r="3"/>
                <circle cx="18" cy="16" r="3"/>
              </svg>
            </div>
            <p className="font-head font-bold text-sm">All Tracks</p>
            <p className="text-muted text-xs mt-0.5">Browse the library</p>
          </Link>

          <Link
            to="/albums"
            className="bg-surface border border-border rounded-xl p-5 hover:border-green/40 transition-all duration-200 group"
          >
            <div className="w-9 h-9 rounded-lg bg-bg border border-border grid place-items-center mb-3 group-hover:border-green/30 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5e7a6a" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </div>
            <p className="font-head font-bold text-sm">Albums</p>
            <p className="text-muted text-xs mt-0.5">Browse all albums</p>
          </Link>

          {isArtist && (
            <Link
              to="/upload"
              className="bg-surface border border-border rounded-xl p-5 hover:border-green/40 transition-all duration-200 group col-span-2"
            >
              <div className="w-9 h-9 rounded-lg bg-bg border border-border grid place-items-center mb-3 group-hover:border-green/30 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5e7a6a" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
              </div>
              <p className="font-head font-bold text-sm">Upload Music</p>
              <p className="text-muted text-xs mt-0.5">Upload a new track or create an album</p>
            </Link>
          )}
        </div>

        {/* Account info */}
        <div className="bg-surface border border-border rounded-2xl overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-border">
            <p className="font-head font-bold text-sm">Account Details</p>
          </div>
          {[
            { label: 'Username',  value: user?.username },
            { label: 'Email',     value: user?.email },
            { label: 'Role',      value: isArtist ? 'Artist' : 'Listener' },
            { label: 'Member since', value: joinedDate },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between px-6 py-4 border-b border-border/50 last:border-b-0">
              <span className="text-muted text-sm">{label}</span>
              <span className="text-sm font-medium">{value}</span>
            </div>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full border border-red-500/20 text-red-400 font-head font-bold text-sm uppercase tracking-widest py-3.5 rounded-xl hover:bg-red-500/10 hover:border-red-500/40 transition-all duration-200 disabled:opacity-50"
        >
          {loggingOut ? 'Signing out…' : 'Sign Out'}
        </button>

      </div>
    </div>
  )
}