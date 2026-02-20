import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-5 transition-all duration-300 ${
        scrolled
          ? 'bg-bg/70 backdrop-blur-lg border-b border-border'
          : 'border-b border-transparent'
      }`}
    >
      <Link
        to={user ? '/music' : '/'}
        className="font-head font-black text-2xl tracking-tight text-text"
      >
        My<span className="text-green">DJ</span>
      </Link>

      {/* Navigation Links */}
      <ul className="hidden md:flex gap-9 list-none">
        {[
          ['Features', '#features'],
          ['For Artists', '#how'],
          ['Stats', '#stats']
        ].map(([label, href]) => (
          <li key={label}>
            <a
              href={href}
              className="text-muted text-sm uppercase tracking-widest hover:text-text transition-colors duration-200"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      {/* User Section */}
      {user ? (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green/20 border border-green/30 flex items-center justify-center font-head font-bold text-xs text-green uppercase">
              {user?.username?.[0]}
            </div>
            <span className="text-sm text-muted hidden md:block">
              {user?.username}
            </span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="text-muted text-xs hover:text-text transition-colors uppercase tracking-widest"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          to="/register"
          className="bg-green text-bg font-head font-bold text-sm uppercase tracking-widest px-6 py-2.5 rounded-sm hover:bg-green-light transition-all duration-200 hover:-translate-y-px"
        >
          Get Started
        </Link>
      )}
    </nav>
  )
}