
const TodoSkeleton = () => {
  return (
    <>
    <div className="h-[200px] w-full flex flex-col justify-center items-center gap-5">
      <div className="skeleton h-5 w-full md:w-[80%] lg:w-[60%] bg-zinc-900"></div>
      <div className="skeleton h-5 w-full md:w-[80%] lg:w-[60%] bg-zinc-900"></div>
      <div className="skeleton h-5 w-full md:w-[80%] lg:w-[60%] bg-zinc-900"></div>
    </div>
    </>
  )
}

export default TodoSkeleton