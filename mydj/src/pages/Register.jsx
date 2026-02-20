import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ROLES = [
  {
    value: 'artist',
    label: 'Artist',
    desc: 'Upload tracks & build albums',
    icon: '🎵',
  },
  {
    value: 'user',
    label: 'Listener',
    desc: 'Discover & stream music',
    icon: '🎧',
  },
]

export default function Register() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({ username: '', email: '', password: '', role: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const set = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }))
    setErrors(err => ({ ...err, [field]: '' }))
    setServerError('')
  }

  const validate = () => {
    const e = {}
    if (!form.username.trim())         e.username = 'Username is required'
    else if (form.username.length < 3) e.username = 'At least 3 characters'
    if (!form.email.trim())            e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.password)                e.password = 'Password is required'
    else if (form.password.length < 6) e.password = 'At least 6 characters'
    if (!form.role)                    e.role = 'Pick a role to continue'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    setServerError('')

    try {
      const res =  await fetch(`${import.meta.env.VITE_API_URL || ''}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) {
        setServerError(data.msg || 'Something went wrong. Try again.')
        return
      }

      login(data.user)
      navigate(data.user.role === 'artist' ? '/upload' : '/music')
    } catch {
      setServerError('Network error — is your server running?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg text-text font-body flex">

      {/* ── Left panel ── */}
      <div className="hidden lg:flex flex-col justify-between w-[480px] flex-shrink-0 relative overflow-hidden p-12"
        style={{ background: 'linear-gradient(160deg, #0e1a13 0%, #080c0a 60%)' }}
      >
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(#2dd87a 1px, transparent 1px), linear-gradient(90deg, #2dd87a 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Glow */}
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(45,216,122,.12) 0%, transparent 65%)', transform: 'translate(-30%, 30%)' }}
        />

        {/* Logo */}
        <Link to="/" className="relative font-head font-black text-2xl tracking-tight">
          My<span className="text-green">DJ</span>
        </Link>

        {/* Middle copy */}
        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-green/10 border border-green/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse2" />
            <span className="text-green text-[11px] uppercase tracking-widest font-medium">Join the community</span>
          </div>
          <h2 className="font-head font-black text-5xl leading-[0.95] tracking-tight mb-6">
            Your sound<br />
            <span className="text-green">starts here.</span>
          </h2>
          <p className="text-muted leading-relaxed text-sm max-w-xs">
            Upload your first track in minutes. Build albums, grow your fanbase, and let the world hear what you've got.
          </p>

          {/* Mini testimonial */}
          <div className="mt-12 bg-surface/60 border border-border rounded-xl p-5 backdrop-blur-sm">
            <p className="text-sm leading-relaxed text-text/80 mb-4">
              "Got my first 500 streams within a week of uploading. MyDJ just hits different."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green to-lime flex items-center justify-center font-head font-bold text-xs text-bg">
                K
              </div>
              <div>
                <p className="text-xs font-medium">KAY·Z</p>
                <p className="text-[11px] text-muted">Electronic Artist</p>
              </div>
            </div>
          </div>
        </div>

        <p className="relative text-muted text-xs">© 2025 MyDJ</p>
      </div>

      {/* ── Right panel: form ── */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-16 overflow-y-auto">
        {/* Mobile logo */}
        <Link to="/" className="lg:hidden font-head font-black text-2xl tracking-tight mb-10">
          My<span className="text-green">DJ</span>
        </Link>

        <div className="w-full max-w-[420px]">
          <h1 className="font-head font-black text-3xl tracking-tight mb-1">Create account</h1>
          <p className="text-muted text-sm mb-8">
            Already have one?{' '}
            <Link to="/login" className="text-green hover:text-green-light transition-colors duration-200">
              Sign in
            </Link>
          </p>

          {serverError && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3 mb-6">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>

            {/* Role picker */}
            <div>
              <label className="text-[11px] text-muted uppercase tracking-widest block mb-2">I am a…</label>
              <div className="grid grid-cols-2 gap-3">
                {ROLES.map(r => (
                  <button
                    type="button"
                    key={r.value}
                    onClick={() => { setForm(f => ({ ...f, role: r.value })); setErrors(e => ({ ...e, role: '' })) }}
                    className={`flex flex-col items-start gap-1.5 p-4 rounded-xl border transition-all duration-200 text-left ${
                      form.role === r.value
                        ? 'border-green bg-green/10'
                        : 'border-border bg-surface hover:border-muted'
                    }`}
                  >
                    <span className="text-xl">{r.icon}</span>
                    <span className="font-head font-bold text-sm">{r.label}</span>
                    <span className="text-[11px] text-muted leading-tight">{r.desc}</span>
                  </button>
                ))}
              </div>
              {errors.role && <p className="text-red-400 text-xs mt-1.5">{errors.role}</p>}
            </div>

            <Field
              label="Username"
              type="text"
              placeholder="e.g. midnight_pulse"
              value={form.username}
              onChange={set('username')}
              error={errors.username}
              autoComplete="username"
            />

            <Field
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={set('email')}
              error={errors.email}
              autoComplete="email"
            />

            {/* Password */}
            <div>
              <label className="text-[11px] text-muted uppercase tracking-widest block mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={set('password')}
                  autoComplete="new-password"
                  className={`w-full bg-surface border rounded-xl px-4 py-3 text-sm text-text outline-none transition-colors duration-200 pr-11 ${
                    errors.password ? 'border-red-500/60' : 'border-border focus:border-green'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text transition-colors"
                  tabIndex={-1}
                >
                  {showPass ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1.5">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green text-bg font-head font-bold text-sm uppercase tracking-widest py-3.5 rounded-xl mt-1 transition-all duration-200 hover:bg-green-light hover:-translate-y-px hover:shadow-[0_8px_30px_rgba(45,216,122,.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Spinner /> Creating account…
                </span>
              ) : 'Create Account →'}
            </button>

          </form>

          <p className="text-muted text-[11px] text-center mt-6 leading-relaxed">
            By signing up you agree to our{' '}
            <a href="#" className="text-text hover:text-green transition-colors">Terms</a>
            {' '}and{' '}
            <a href="#" className="text-text hover:text-green transition-colors">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  )
}

function Field({ label, type, placeholder, value, onChange, error, autoComplete }) {
  return (
    <div>
      <label className="text-[11px] text-muted uppercase tracking-widest block mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className={`w-full bg-surface border rounded-xl px-4 py-3 text-sm text-text outline-none transition-colors duration-200 ${
          error ? 'border-red-500/60' : 'border-border focus:border-green'
        }`}
      />
      {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
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