import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-5 transition-all duration-300 ${
        scrolled
          ? 'bg-bg/70 backdrop-blur-lg border-b border-border'
          : 'border-b border-transparent'
      }`}
    >
      <Link to="/" className="font-head font-black text-2xl tracking-tight text-text">
        My<span className="text-green">DJ</span>
      </Link>

      <ul className="hidden md:flex gap-9 list-none">
        {[['Features', '#features'], ['For Artists', '#how'], ['Stats', '#stats']].map(([label, href]) => (
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

      <Link
        to="/register"
        className="bg-green text-bg font-head font-bold text-sm uppercase tracking-widest px-6 py-2.5 rounded-sm hover:bg-green-light transition-all duration-200 hover:-translate-y-px"
      >
        Get Started
      </Link>
    </nav>
  )
}
