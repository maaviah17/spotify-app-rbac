import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Upload() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('track')

  // Track form state
  const [trackForm, setTrackForm] = useState({ title: '' })
  const [trackFile, setTrackFile] = useState(null)
  const [trackDragging, setTrackDragging] = useState(false)
  const [trackLoading, setTrackLoading] = useState(false)
  const [trackError, setTrackError] = useState('')
  const [trackSuccess, setTrackSuccess] = useState('')

  // Album form state
  const [albumForm, setAlbumForm] = useState({ title: '' })
  const [albumLoading, setAlbumLoading] = useState(false)
  const [albumError, setAlbumError] = useState('')
  const [albumSuccess, setAlbumSuccess] = useState('')

  // ── Track upload ──
  const handleFileDrop = (e) => {
    e.preventDefault()
    setTrackDragging(false)
    const file = e.dataTransfer?.files?.[0] || e.target.files?.[0]
    if (!file) return
    const valid = ['audio/mpeg', 'audio/wav', 'audio/flac', 'audio/aac', 'audio/mp3']
    if (!valid.includes(file.type) && !file.name.match(/\.(mp3|wav|flac|aac)$/i)) {
      setTrackError('Please upload a valid audio file (MP3, WAV, FLAC, AAC)')
      return
    }
    setTrackFile(file)
    setTrackError('')
  }

  const handleTrackSubmit = async (e) => {
    e.preventDefault()
    if (!trackFile)          { setTrackError('Please select an audio file'); return }
    if (!trackForm.title.trim()) { setTrackError('Track title is required'); return }

    setTrackLoading(true)
    setTrackError('')
    setTrackSuccess('')

    const formData = new FormData()
    formData.append('music', trackFile)
    formData.append('title', trackForm.title)

    try {
      const res = await fetch('/api/music/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })
      const data = await res.json()
      if (!res.ok) {
        setTrackError(data.msg || 'Upload failed. Try again.')
        return
      }
      setTrackSuccess(`"${data.music.title}" uploaded successfully!`)
      setTrackForm({ title: '' })
      setTrackFile(null)
    } catch {
      setTrackError('Network error — is your server running?')
    } finally {
      setTrackLoading(false)
    }
  }

  // ── Album create ──
  const handleAlbumSubmit = async (e) => {
    e.preventDefault()
    if (!albumForm.title.trim()) { setAlbumError('Album title is required'); return }

    setAlbumLoading(true)
    setAlbumError('')
    setAlbumSuccess('')

    try {
      const res = await fetch('/api/music/album', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ title: albumForm.title }),
      })
      const data = await res.json()
      if (!res.ok) {
        setAlbumError(data.msg || 'Failed to create album.')
        return
      }
      setAlbumSuccess(`Album "${albumForm.title}" created successfully!`)
      setAlbumForm({ title: '' })
    } catch {
      setAlbumError('Network error — is your server running?')
    } finally {
      setAlbumLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg text-text font-body">

      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-bg/80 backdrop-blur-lg border-b border-border px-8 py-4 flex items-center justify-between">
        <Link to="/music" className="font-head font-black text-xl tracking-tight">
          My<span className="text-green">DJ</span>
        </Link>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-green/20 border border-green/30 flex items-center justify-center font-head font-bold text-xs text-green uppercase">
            {user?.username?.[0]}
          </div>
          <span className="text-sm text-muted hidden md:block">{user?.username}</span>
          <Link
            to="/music"
            className="text-muted text-xs hover:text-text transition-colors uppercase tracking-widest"
          >
            ← Library
          </Link>
        </div>
      </nav>

      <div className="max-w-[700px] mx-auto px-6 py-14">

        {/* Header */}
        <div className="mb-10">
          <p className="text-[11px] text-green uppercase tracking-widest font-semibold mb-1">Artist Studio</p>
          <h1 className="font-head font-black text-4xl tracking-tight">Upload</h1>
          <p className="text-muted text-sm mt-2">Share your music with the world.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-surface border border-border rounded-xl p-1 mb-8">
          {[
            { id: 'track', label: '🎵 Upload Track' },
            { id: 'album', label: '💿 Create Album' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 rounded-lg font-head font-bold text-sm transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-green text-bg'
                  : 'text-muted hover:text-text'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Track Tab ── */}
        {activeTab === 'track' && (
          <form onSubmit={handleTrackSubmit} className="flex flex-col gap-6">

            {/* Drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setTrackDragging(true) }}
              onDragLeave={() => setTrackDragging(false)}
              onDrop={handleFileDrop}
              onClick={() => document.getElementById('fileInput').click()}
              className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                trackDragging
                  ? 'border-green bg-green/10'
                  : trackFile
                  ? 'border-green/50 bg-green/[0.04]'
                  : 'border-border hover:border-green/40 hover:bg-white/[0.02]'
              }`}
            >
              <input
                id="fileInput"
                type="file"
                accept=".mp3,.wav,.flac,.aac,audio/*"
                className="hidden"
                onChange={handleFileDrop}
              />

              {trackFile ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-green/20 border border-green/30 grid place-items-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2dd87a" strokeWidth="2">
                      <path d="M9 18V5l12-2v13"/>
                      <circle cx="6" cy="18" r="3"/>
                      <circle cx="18" cy="16" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-head font-bold text-sm text-green">{trackFile.name}</p>
                    <p className="text-muted text-xs mt-1">{(trackFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setTrackFile(null) }}
                    className="text-muted text-xs hover:text-red-400 transition-colors mt-1"
                  >
                    Remove file
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-surface border border-border grid place-items-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5e7a6a" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-head font-bold text-sm">
                      Drop your audio here
                    </p>
                    <p className="text-muted text-xs mt-1">or click to browse files</p>
                  </div>
                  <div className="flex gap-2 mt-1">
                    {['MP3', 'WAV', 'FLAC', 'AAC'].map(f => (
                      <span key={f} className="bg-bg border border-border text-[11px] uppercase tracking-widest px-2.5 py-1 rounded text-muted">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Title */}
            <div>
              <label className="text-[11px] text-muted uppercase tracking-widest block mb-2">Track Title</label>
              <input
                type="text"
                placeholder="e.g. Neon Reverie"
                value={trackForm.title}
                onChange={e => { setTrackForm(f => ({ ...f, title: e.target.value })); setTrackError('') }}
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text outline-none focus:border-green transition-colors duration-200"
              />
            </div>

            {/* Error / Success */}
            {trackError && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3">
                {trackError}
              </div>
            )}
            {trackSuccess && (
              <div className="bg-green/10 border border-green/30 text-green text-sm rounded-lg px-4 py-3 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {trackSuccess}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={trackLoading}
              className="w-full bg-green text-bg font-head font-bold text-sm uppercase tracking-widest py-4 rounded-xl transition-all duration-200 hover:bg-green-light hover:-translate-y-px hover:shadow-[0_8px_30px_rgba(45,216,122,.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              {trackLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Spinner /> Uploading…
                </span>
              ) : 'Upload Track →'}
            </button>

          </form>
        )}

        {/* ── Album Tab ── */}
        {activeTab === 'album' && (
          <form onSubmit={handleAlbumSubmit} className="flex flex-col gap-6">

            {/* Album visual */}
            <div className="bg-surface border border-border rounded-2xl p-8 flex items-center gap-6">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-green/20 to-green-dark/10 border border-green/20 flex-shrink-0 grid place-items-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2dd87a" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="3"/>
                  <line x1="12" y1="2" x2="12" y2="9"/>
                </svg>
              </div>
              <div>
                <p className="font-head font-bold text-lg">{albumForm.title || 'Untitled Album'}</p>
                <p className="text-muted text-sm mt-1">by {user?.username}</p>
                <p className="text-muted text-xs mt-2">0 tracks · Just now</p>
              </div>
            </div>

            {/* Album title */}
            <div>
              <label className="text-[11px] text-muted uppercase tracking-widest block mb-2">Album Title</label>
              <input
                type="text"
                placeholder="e.g. Midnight Sessions"
                value={albumForm.title}
                onChange={e => { setAlbumForm(f => ({ ...f, title: e.target.value })); setAlbumError('') }}
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text outline-none focus:border-green transition-colors duration-200"
              />
            </div>

            {/* Info note */}
            <div className="bg-surface border border-border rounded-xl px-4 py-3 flex items-start gap-3">
              <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5e7a6a" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <p className="text-muted text-xs leading-relaxed">
                After creating the album, you can add tracks to it from the Albums page.
              </p>
            </div>

            {/* Error / Success */}
            {albumError && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3">
                {albumError}
              </div>
            )}
            {albumSuccess && (
              <div className="bg-green/10 border border-green/30 text-green text-sm rounded-lg px-4 py-3 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {albumSuccess}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={albumLoading}
              className="w-full bg-green text-bg font-head font-bold text-sm uppercase tracking-widest py-4 rounded-xl transition-all duration-200 hover:bg-green-light hover:-translate-y-px hover:shadow-[0_8px_30px_rgba(45,216,122,.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              {albumLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Spinner /> Creating…
                </span>
              ) : 'Create Album →'}
            </button>

          </form>
        )}
      </div>
    </div>
  )
}

function Spinner() {
  return (
    <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
    </svg>
  )
}