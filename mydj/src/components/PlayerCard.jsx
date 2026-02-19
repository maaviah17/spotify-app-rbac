import { useMemo } from 'react'
import { usePlayer } from '../hooks/usePlayer'

const TRACKS = [
  { num: '▶', title: 'Neon Reverie', artist: 'Midnight Pulse', dur: '4:03', gradient: 'from-green to-green-dark' },
  { num: '2',  title: 'Glass City',   artist: 'Solin',          dur: '3:21', gradient: 'from-lime to-blue-500' },
  { num: '3',  title: 'Ultraviolet',  artist: 'KAY·Z',          dur: '5:17', gradient: 'from-purple-500 to-pink-500' },
]

const BAR_HEIGHTS = [20,40,60,35,75,50,30,65,45,80,25,55,70,38,62,48,72,32,58,42,
                     68,28,52,76,36,60,44,78,22,56,66,34,74,46,64,26,54,82,30,50]

export default function PlayerCard() {
  const { playing, toggle, progress, currentTime, totalTime } = usePlayer(243)

  const bars = useMemo(() =>
    BAR_HEIGHTS.map((h, i) => ({
      h,
      dur:   (0.8 + Math.random() * 0.8).toFixed(2),
      delay: (Math.random() * 1.5).toFixed(2),
      type:  i < 20 ? 'played' : i === 20 ? 'active' : 'idle',
    })),
  [])

  return (
    <div className="relative rounded-2xl p-7 bg-surface border border-border shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
      style={{ boxShadow: '0 40px 100px rgba(0,0,0,.6), 0 0 0 1px rgba(45,216,122,.05)' }}
    >
      {/* gradient border overlay */}
      <div className="pointer-events-none absolute inset-[-1px] rounded-2xl"
        style={{ background: 'linear-gradient(135deg, rgba(45,216,122,.15), transparent 50%, rgba(168,245,66,.08))' }}
      />

      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green to-green-dark grid place-items-center font-head font-black text-lg text-white">
          M
        </div>
        <div className="flex-1">
          <p className="font-head font-bold text-sm">Midnight Pulse</p>
          <p className="text-xs text-muted mt-0.5">Electronic · Bass</p>
        </div>
        <span className="bg-lime/10 border border-lime/25 text-lime text-[11px] uppercase tracking-widest px-3 py-1 rounded-full">
          Live
        </span>
      </div>

      {/* Waveform */}
      <div className="flex items-center gap-[3px] h-16 mb-5">
        {bars.map((bar, i) => (
          <div
            key={i}
            className={`waveform-bar ${bar.type}`}
            style={{
              height: `${bar.h}%`,
              '--wave-dur':   `${bar.dur}s`,
              '--wave-delay': `-${bar.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggle}
          className="w-11 h-11 rounded-full bg-green border-none grid place-items-center flex-shrink-0 transition-all duration-150 hover:scale-110 hover:shadow-[0_0_24px_rgba(45,216,122,.5)]"
        >
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
              <rect x="3" y="2" width="3" height="12" rx="1"/>
              <rect x="10" y="2" width="3" height="12" rx="1"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
              <path d="M4 2l10 6-10 6V2z"/>
            </svg>
          )}
        </button>

        <div className="flex-1 flex flex-col gap-1.5">
          <div className="h-[3px] bg-border rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-green to-green-dark transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-muted">
            <span>{currentTime}</span>
            <span>{totalTime}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-muted">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <path d="M2 5h3l4-3v10l-4-3H2V5z"/>
            <path d="M10 5a3 3 0 010 4" stroke="currentColor" strokeWidth="1" fill="none"/>
          </svg>
        </div>
      </div>

      {/* Track list */}
      <div className="mt-5 border-t border-border pt-4 flex flex-col gap-1">
        {TRACKS.map((t) => (
          <div
            key={t.title}
            className="flex items-center gap-3 px-2.5 py-2 rounded-lg hover:bg-white/[0.04] transition-colors duration-200"
          >
            <span className="w-4 text-center text-xs text-muted">{t.num}</span>
            <div className={`w-9 h-9 rounded-md flex-shrink-0 bg-gradient-to-br ${t.gradient}`} />
            <div className="flex-1">
              <p className="text-sm font-medium">{t.title}</p>
              <p className="text-xs text-muted mt-0.5">{t.artist}</p>
            </div>
            <span className="text-xs text-muted">{t.dur}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
