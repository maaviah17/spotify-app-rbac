import { useScrollReveal } from '../hooks/useScrollReveal'

const STATS = [
  { num: '50K+',  label: 'Tracks Uploaded',      accent: 'green' },
  { num: '12K',   label: 'Active Artists',        accent: 'lime'  },
  { num: '2M+',   label: 'Streams This Month',   accent: 'green' },
  { num: '180+',  label: 'Countries Listening',  accent: 'lime'  },
]

export default function StatsSection() {
  return (
    <div id="stats" className="relative z-10 bg-surface border-t border-b border-border">
      <div className="max-w-[1500px] mx-auto px-20 py-20 grid grid-cols-2 md:grid-cols-4 gap-12">
        {STATS.map(({ num, label, accent }, i) => {
          const ref = useScrollReveal(i * 100)
          return (
            <div key={label} ref={ref} className="reveal text-center">
              <div
                className="font-head font-black leading-none tracking-[-0.04em] text-5xl"
                style={{
                  fontSize: 'clamp(2.4rem, 4vw, 3.2rem)',
                  background: accent === 'green'
                    ? 'linear-gradient(135deg, #2dd87a, #56e896)'
                    : 'linear-gradient(135deg, #a8f542, #c4f77a)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {num}
              </div>
              <p className="text-muted text-sm mt-1.5 tracking-[0.04em]">{label}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
