
const TodoSkeleton = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center
     items-center gap-5">
      <div className="skeleton h-6 w-full md:w-[80%] lg:w-[60%]"></div>
      <div className="skeleton h-6 w-full md:w-[80%] lg:w-[60%]"></div>
      <div className="skeleton h-6 w-full md:w-[80%] lg:w-[60%]"></div>
    </div>

  )
}

export default TodoSkeleton