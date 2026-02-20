import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PlayerCard from './PlayerCard'

export default function HeroSection() {
  const { user } = useAuth()

  return (
    <section className="relative min-h-screen grid place-items-center px-20 pt-28 pb-20 overflow-hidden">
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute w-[900px] h-[900px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%]"
        style={{ background: 'radial-gradient(circle, rgba(45,216,122,.12) 0%, transparent 65%)' }}
      />

      <div className="relative z-10 max-w-[1500px] px-16 w-full grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-16 items-center">

        {/* Left */}
        <div>
          {/* Live tag */}
          <div
            className="inline-flex items-center gap-2.5 bg-green/[0.08] border border-green/20 rounded-full px-4 py-1.5 mb-7"
            style={{ animation: 'fadeUp 0.6s 0.1s both' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse2" />
            <span className="text-green text-[11px] uppercase tracking-[0.1em] font-medium">Now Live — Stream Anything</span>
          </div>

          <h1
            className="font-head font-black leading-[0.95] tracking-[-0.04em]"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', animation: 'fadeUp 0.7s 0.2s both' }}
          >
            Drop Your<br />
            <span className="text-green">Sound.</span><br />
            <span style={{ WebkitTextStroke: '1.5px rgba(236,245,240,.2)', color: 'transparent' }}>
              Own the
            </span><br />
            Stage.
          </h1>

          <p
            className="mt-7 max-w-[500px] text-muted leading-[1.75] text-[1.05rem]"
            style={{ animation: 'fadeUp 0.7s 0.35s both' }}
          >
            MyDJ is where artists upload, fans discover, and music lives.
            Upload your tracks, build albums, and reach listeners who actually care.
          </p>

          <div
            className="mt-11 flex gap-4 items-center"
            style={{ animation: 'fadeUp 0.7s 0.5s both' }}
          >
            <Link
              to={user ? '/music' : '/register'}
              className="relative overflow-hidden bg-green text-bg font-head font-bold text-base tracking-[0.04em] px-9 py-4 rounded-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(45,216,122,.35)]"
            >
              {user ? 'Go to Library' : 'Start Uploading'}
            </Link>

            {!user && (
              <Link
                to="/login"
                className="group text-text text-[0.95rem] flex items-center gap-2 hover:text-green transition-colors duration-200"
              >
                Already a fan?
                <svg className="transition-transform duration-200 group-hover:translate-x-1" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            )}
          </div>
        </div>

        {/* Right: Player */}
        <div style={{ animation: 'fadeIn 0.9s 0.4s both' }}>
          <PlayerCard />
        </div>

      </div>
    </section>
  )
}