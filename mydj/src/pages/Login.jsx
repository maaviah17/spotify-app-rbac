import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const navigate  = useNavigate()
  const { login } = useAuth()

  const [form, setForm]               = useState({ identifier: '', password: '' })
  const [errors, setErrors]           = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading]         = useState(false)
  const [showPass, setShowPass]       = useState(false)

  const set = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }))
    setErrors(err => ({ ...err, [field]: '' }))
    setServerError('')
  }

  const validate = () => {
    const e = {}
    if (!form.identifier.trim()) e.identifier = 'Enter your email or username'
    if (!form.password)          e.password   = 'Password is required'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    setServerError('')

    const isEmail = form.identifier.includes('@')
    const payload = {
      password: form.password,
      ...(isEmail ? { email: form.identifier } : { username: form.identifier }),
    }

    try {
      const res =  await fetch(`${import.meta.env.VITE_API_URL || ''}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      })
      const data = await res.json()

      if (!res.ok) {
        setServerError(data.msg || 'Invalid credentials. Please try again.')
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
      <div
        className="hidden lg:flex flex-col justify-between w-[480px] flex-shrink-0 relative overflow-hidden p-12"
        style={{ background: 'linear-gradient(160deg, #0e1a13 0%, #080c0a 60%)' }}
      >
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(#2dd87a 1px, transparent 1px), linear-gradient(90deg, #2dd87a 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Glow */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(45,216,122,.10) 0%, transparent 65%)', transform: 'translate(30%, -30%)' }}
        />

        {/* Logo */}
        <Link to="/" className="relative font-head font-black text-2xl tracking-tight">
          My<span className="text-green">DJ</span>
        </Link>

        {/* Middle copy */}
        <div className="relative">
          <h2 className="font-head font-black text-5xl leading-[0.95] tracking-tight mb-6">
            Welcome<br />
            <span className="text-green">back.</span>
          </h2>
          <p className="text-muted leading-relaxed text-sm max-w-xs">
            Your music is waiting. Pick up where you left off — streams, uploads, your whole world.
          </p>

          {/* Stats grid */}
          <div className="mt-12 grid grid-cols-2 gap-3">
            {[
              { num: '2M+',  label: 'Streams today' },
              { num: '12K',  label: 'Active artists' },
              { num: '50K+', label: 'Tracks live' },
              { num: '180+', label: 'Countries' },
            ].map(s => (
              <div key={s.label} className="bg-surface/60 border border-border rounded-xl p-4 backdrop-blur-sm">
                <p
                  className="font-head font-black text-2xl tracking-tight"
                  style={{
                    background: 'linear-gradient(135deg, #2dd87a, #56e896)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {s.num}
                </p>
                <p className="text-muted text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-muted text-xs">© 2025 MyDJ</p>
      </div>

      {/* ── Right panel: form ── */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-16">

        {/* Mobile logo */}
        <Link to="/" className="lg:hidden font-head font-black text-2xl tracking-tight mb-10">
          My<span className="text-green">DJ</span>
        </Link>

        <div className="w-full max-w-[400px]">
          <h1 className="font-head font-black text-3xl tracking-tight mb-1">Sign in</h1>
          <p className="text-muted text-sm mb-8">
            New here?{' '}
            <Link to="/register" className="text-green hover:text-green-light transition-colors duration-200">
              Create an account
            </Link>
          </p>

          {/* Server error */}
          {serverError && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3 mb-6">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>

            {/* Email or Username */}
            <div>
              <label className="text-[11px] text-muted uppercase tracking-widest block mb-2">
                Email or Username
              </label>
              <input
                type="text"
                placeholder="you@example.com or midnight_pulse"
                value={form.identifier}
                onChange={set('identifier')}
                autoComplete="username"
                className={`w-full bg-surface border rounded-xl px-4 py-3 text-sm text-text outline-none transition-colors duration-200 ${
                  errors.identifier ? 'border-red-500/60' : 'border-border focus:border-green'
                }`}
              />
              {errors.identifier && <p className="text-red-400 text-xs mt-1.5">{errors.identifier}</p>}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] text-muted uppercase tracking-widest">Password</label>
                <a href="#" className="text-[11px] text-muted hover:text-green transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Your password"
                  value={form.password}
                  onChange={set('password')}
                  autoComplete="current-password"
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

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green text-bg font-head font-bold text-sm uppercase tracking-widest py-3.5 rounded-xl mt-1 transition-all duration-200 hover:bg-green-light hover:-translate-y-px hover:shadow-[0_8px_30px_rgba(45,216,122,.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Spinner /> Signing in…
                </span>
              ) : 'Sign In →'}
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-muted text-xs uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <Link
            to="/register"
            className="block w-full text-center border border-border text-text font-head font-bold text-sm uppercase tracking-widest py-3.5 rounded-xl transition-all duration-200 hover:border-green hover:text-green"
          >
            Create New Account
          </Link>
        </div>
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