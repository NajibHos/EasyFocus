
const Alert = ({height, type}) => {

  return (
    <div className={`${height} w-full flex justify-center items-center`}>
      <h2 className="text-lg font-description font-medium
      text-red-600">
        No {type} are available
      </h2>
    </div>
  )
}

export default Alert