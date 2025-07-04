
const CardsSkeleton = () => {
  return (
      <div className="h-auto w-full grid grid-cols-1 md:grid-cols-2
       lg:grid-cols-3 gap-8">
      <div className="skeleton h-[160px] w-full bg-zinc-200
       dark:bg-zinc-900"></div>
      <div className="skeleton h-[160px] w-full bg-zinc-200
       dark:bg-zinc-900"></div>
      <div className="skeleton h-[160px] w-full bg-zinc-200
       dark:bg-zinc-900"></div>
      <div className="skeleton h-[160px] w-full bg-zinc-200
       dark:bg-zinc-900"></div>
      <div className="skeleton h-[160px] w-full bg-zinc-200
       dark:bg-zinc-900"></div>
      <div className="skeleton h-[160px] w-full bg-zinc-200
       dark:bg-zinc-900"></div>
      </div>
  )
}

export default CardsSkeleton