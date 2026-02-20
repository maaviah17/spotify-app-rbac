// Reusable skeleton components for loading states

export function TrackRowSkeleton() {
  return (
    <div className="grid grid-cols-[2rem_1fr_1fr_4rem] gap-4 px-6 py-4 items-center border-b border-border/50 last:border-b-0">
      <div className="w-5 h-3 bg-border rounded animate-pulse mx-auto" />
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-border animate-pulse flex-shrink-0" />
        <div className="flex flex-col gap-1.5">
          <div className="w-32 h-3 bg-border rounded animate-pulse" />
          <div className="w-20 h-2.5 bg-border/60 rounded animate-pulse" />
        </div>
      </div>
      <div className="w-24 h-3 bg-border/60 rounded animate-pulse" />
      <div className="w-8 h-3 bg-border/60 rounded animate-pulse ml-auto" />
    </div>
  )
}

export function AlbumCardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="aspect-square rounded-xl bg-surface border border-border animate-pulse" />
      <div className="flex flex-col gap-1.5">
        <div className="w-3/4 h-3 bg-border rounded animate-pulse" />
        <div className="w-1/2 h-2.5 bg-border/60 rounded animate-pulse" />
      </div>
    </div>
  )
}

export function ProfileSkeleton() {
  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden mb-6 animate-pulse">
      <div className="h-32 bg-border/40" />
      <div className="px-8 pb-8">
        <div className="flex items-end justify-between -mt-10 mb-5">
          <div className="w-20 h-20 rounded-2xl bg-border border-4 border-surface" />
        </div>
        <div className="w-40 h-5 bg-border rounded mb-2" />
        <div className="w-52 h-3 bg-border/60 rounded mb-3" />
        <div className="w-24 h-6 bg-border/40 rounded-full" />
      </div>
    </div>
  )
}