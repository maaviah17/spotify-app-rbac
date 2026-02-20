import { useScrollReveal } from '../hooks/useScrollReveal'

const FEATURES = [
  {
    icon: '🎵',
    name: 'One-Click Upload',
    desc: 'Drag & drop your music, add metadata, and you\'re live within seconds. No friction, no waiting rooms.',
  },
  {
    icon: '💿',
    name: 'Album Builder',
    desc: 'Group your tracks into albums and EPs. Control tracklisting, cover art, and release timing effortlessly.',
  },
  {
    icon: '🎧',
    name: 'High-Quality Stream',
    desc: 'Listeners get crystal-clear playback. Your music sounds exactly how you made it — no compression butchery.',
  },
]

function FeatureCard({ icon, name, desc }) {
  return (
    <div className="group bg-surface p-11 border-r border-border last:border-r-0 hover:bg-[#14141b] transition-colors duration-300">
      <div className="w-13 h-13 rounded-xl bg-bg border border-border grid place-items-center text-2xl mb-6 transition-all duration-300 group-hover:border-green group-hover:-rotate-[4deg] group-hover:scale-105 w-[52px] h-[52px]">
        {icon}
      </div>
      <h3 className="font-head font-bold text-lg mb-3">{name}</h3>
      <p className="text-muted leading-[1.7] text-[0.93rem]">{desc}</p>
    </div>
  )
}

export default function FeaturesSection() {
  const titleRef = useScrollReveal(0)
  const gridRef  = useScrollReveal(100)

  return (
    <section id="features" className="relative z-10">
      <div className="max-w-[1500px] mx-auto px-20 py-28">
        <div ref={titleRef} className="reveal">
          <div className="inline-flex items-center gap-2.5 text-green text-xs uppercase tracking-[0.15em] font-semibold mb-5">
            <span className="w-7 h-[1.5px] bg-green" />
            What You Get
          </div>
          <h2 className="font-head font-black leading-[1.05] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)' }}
          >
            Built for <span className="text-lime">real artists</span>,<br />loved by real fans.
          </h2>
        </div>

        <div
          ref={gridRef}
          className="reveal grid grid-cols-1 md:grid-cols-3 border border-border rounded-xl overflow-hidden mt-16"
        >
          {FEATURES.map(f => <FeatureCard key={f.name} {...f} />)}
        </div>
      </div>
    </section>
  )
}
