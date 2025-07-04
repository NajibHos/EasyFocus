
const Alert = ({ height }) => {

  return (
    <div className={`${height} w-full flex justify-center items-center`}>
      <h2 className="text-lg font-description font-medium
       text-red-600">
        No data available
      </h2>
    </div>
  )
}

export default Alert