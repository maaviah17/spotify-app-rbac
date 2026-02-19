import { useScrollReveal } from '../hooks/useScrollReveal'

const STEPS = [
  { num: '01', title: 'Create your account',  text: 'Register as an artist in under a minute. No subscription required to start uploading.' },
  { num: '02', title: 'Upload your tracks',   text: 'Drop your audio files, add a title and genre. Your music hits the platform instantly.' },
  { num: '03', title: 'Build an album',       text: 'Group tracks, add artwork, and release albums or singles — you call the shots.' },
  { num: '04', title: 'Fans find you',        text: 'Listeners browse, stream, and discover your work. Watch your numbers grow.' },
]

export default function HowItWorks() {
  const titleRef  = useScrollReveal(0)
  const stepsRef  = useScrollReveal(100)
  const visualRef = useScrollReveal(200)

  return (
    <section id="how" className="relative z-10">
      <div className="max-w-[1100px] mx-auto px-12 py-28">
        <div ref={titleRef} className="reveal">
          <div className="inline-flex items-center gap-2.5 text-green text-xs uppercase tracking-[0.15em] font-semibold mb-5">
            <span className="w-7 h-[1.5px] bg-green" />
            For Artists
          </div>
          <h2 className="font-head font-black leading-[1.05] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)' }}
          >
            From bedroom to<br /><span className="text-lime">everywhere.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mt-16 items-center">

          {/* Steps */}
          <div ref={stepsRef} className="reveal flex flex-col">
            {STEPS.map(({ num, title, text }) => (
              <div
                key={num}
                className="group flex gap-6 py-7 border-b border-border last:border-b-0"
              >
                <span className="font-head font-black text-[2.8rem] leading-none text-border group-hover:text-green transition-colors duration-300 w-[52px] flex-shrink-0">
                  {num}
                </span>
                <div className="pt-1.5">
                  <h4 className="font-head font-bold text-[1.1rem] mb-2">{title}</h4>
                  <p className="text-muted leading-[1.65] text-[0.92rem]">{text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Upload mockup */}
          <div ref={visualRef} className="reveal bg-surface border border-border rounded-2xl p-9 shadow-[0_40px_80px_rgba(0,0,0,.5)]">
            <p className="font-head font-bold text-sm text-muted uppercase tracking-[0.08em] mb-6">Upload a Track</p>

            <div className="group border-2 border-dashed border-border rounded-xl p-10 text-center mb-6 transition-all duration-300 hover:border-green hover:bg-green/[0.04] cursor-none">
              <div className="text-[2.4rem] mb-3">🎵</div>
              <p className="text-muted text-sm leading-relaxed">
                <strong className="text-green font-medium">Drop your audio here</strong><br />
                or click to browse files
              </p>
              <div className="flex gap-2 flex-wrap justify-center mt-4">
                {['MP3','WAV','FLAC','AAC'].map(f => (
                  <span key={f} className="bg-bg border border-border text-[11px] uppercase tracking-[0.07em] px-2.5 py-1 rounded text-muted">
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <label className="text-[11px] text-muted uppercase tracking-[0.06em] block mb-1.5">Track Title</label>
                <input
                  className="w-full bg-bg border border-border rounded-lg px-3.5 py-2.5 text-text text-[0.9rem] font-body outline-none focus:border-green transition-colors duration-200"
                  placeholder="e.g. Neon Reverie"
                />
              </div>
              <div>
                <label className="text-[11px] text-muted uppercase tracking-[0.06em] block mb-1.5">Genre</label>
                <input
                  className="w-full bg-bg border border-border rounded-lg px-3.5 py-2.5 text-text text-[0.9rem] font-body outline-none focus:border-green transition-colors duration-200"
                  placeholder="e.g. Electronic, Hip-Hop…"
                />
              </div>
            </div>

            <button className="w-full mt-5 bg-green text-bg font-head font-bold text-[0.95rem] uppercase tracking-[0.04em] py-3.5 rounded-lg border-none transition-all duration-200 hover:bg-green-light hover:-translate-y-px">
              Upload Track →
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}
