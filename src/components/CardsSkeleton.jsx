
const CardsSkeleton = () => {
  return (
    <div className="h-[400px] lg:max-2xl:h-[400px] w-full flex
     flex-col justify-center items-center gap-5">
      <div className="skeleton h-6 w-full"></div>
      <div className="skeleton h-6 w-full"></div>
      <div className="skeleton h-6 w-full"></div>
    </div>
  )
}

export default CardsSkeleton