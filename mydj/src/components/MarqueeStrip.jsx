const ITEMS = ['Upload Tracks', 'Build Albums', 'Reach Listeners', 'Grow Your Fan Base', 'Stream Instantly', 'Artist Dashboard']

export default function MarqueeStrip() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div className="relative z-10 py-3 border-t border-b border-border overflow-hidden">
      <div className="flex w-max animate-marquee">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-10 font-head text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-muted whitespace-nowrap">
            {item}
            <span className="text-green text-lg">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
