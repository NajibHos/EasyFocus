
const NotePageSkeleton = () => {
  return (
    <div className="h-[90vh] w-full flex justify-center items-center dark:bg-dark-bg">
      <div className="h-full w-full lg:max-2xl:w-[60%]
       flex flex-col justify-center items-center gap-6">
        <div className="skeleton h-6 w-full bg-zinc-200 dark:bg-zinc-900"></div>
        <div className="skeleton h-6 w-full bg-zinc-200 dark:bg-zinc-900"></div>
        <div className="skeleton h-6 w-full bg-zinc-200 dark:bg-zinc-900"></div>
      </div>
    </div>
  )
}

export default NotePageSkeleton