
const FilterButtonSkeleton = () => {
  return (
    <div className="h-[40px] w-full flex justify-between items-center">
      <div className="skeleton h-6 w-[32%] bg-zinc-200
       dark:bg-zinc-900"></div>
      <div className="skeleton h-6 w-[32%] bg-zinc-200
       dark:bg-zinc-900"></div>
      <div className="skeleton h-6 w-[32%] bg-zinc-200
       dark:bg-zinc-900"></div>
    </div>
  )
}

export default FilterButtonSkeleton