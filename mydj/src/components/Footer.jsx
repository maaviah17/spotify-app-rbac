import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-5">
      <Link to="/" className="font-head font-black text-xl tracking-tight">
        My<span className="text-green">DJ</span>
      </Link>
      <span className="text-muted text-[0.83rem]">© 2025 MyDJ. All rights reserved.</span>
      <div className="flex gap-7">
        {['Privacy', 'Terms', 'Support'].map(l => (
          <a key={l} href="#" className="text-muted text-[0.83rem] hover:text-text transition-colors duration-200">
            {l}
          </a>
        ))}
      </div>
    </footer>
  )
}
