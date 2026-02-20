import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function CTASection() {
  const ref = useScrollReveal(0)

  return (
    <section className="relative z-10">
      <div ref={ref} className="reveal relative text-center max-w-[800px] mx-auto px-20 py-28">
        {/* Glow */}
        <div className="pointer-events-none absolute w-[600px] h-[600px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ background: 'radial-gradient(circle, rgba(168,245,66,.08) 0%, transparent 70%)' }}
        />

        <h2
          className="relative font-head font-black leading-[0.95] tracking-[-0.04em]"
          style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)' }}
        >
          <span className="block">Your music</span>
          <span className="block" style={{ WebkitTextStroke: '1.5px rgba(236,245,240,.18)', color: 'transparent' }}>
            deserves to
          </span>
          <span className="block text-green">be heard.</span>
        </h2>

        <p className="text-muted max-w-[440px] mx-auto mt-6 leading-[1.7]">
          Join thousands of artists already sharing their sound on MyDJ. Free to start, forever.
        </p>

        <div className="flex gap-3.5 justify-center flex-wrap mt-10">
          <Link
            to="/register"
            className="bg-green text-bg font-head font-bold text-[0.95rem] tracking-[0.04em] px-8 py-3.5 rounded-sm hover:bg-green-light transition-all duration-200 hover:-translate-y-px hover:shadow-[0_12px_40px_rgba(45,216,122,.35)]"
          >
            Join as Artist
          </Link>
          <Link
            to="/login"
            className="border border-border text-text font-head font-bold text-[0.95rem] tracking-[0.04em] px-8 py-3.5 rounded-sm hover:border-text transition-all duration-200"
          >
            I'm a Listener
          </Link>
        </div>
      </div>
    </section>
  )
}
