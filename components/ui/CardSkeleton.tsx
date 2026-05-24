export function CardSkeleton() {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-4 h-4 rounded-full bg-white/10" />
        <div className="h-5 w-2/3 bg-white/10 rounded" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-1/2 bg-white/10 rounded" />
        <div className="h-4 w-3/4 bg-white/10 rounded" />
      </div>
      <div className="flex gap-2 mt-6">
        <div className="h-9 flex-1 bg-white/10 rounded-2xl" />
        <div className="h-9 w-20 bg-white/10 rounded-2xl" />
      </div>
    </div>
  )
}
