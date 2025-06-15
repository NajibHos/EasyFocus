import { ExternalLink, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

const ResourceCards = ({data, setActiveFilter, removeResource}) => {

  const navigate = useNavigate();

  return (
    <div className="h-[180px] w-full  flex flex-col justify-center
     items-center gap-6 p-5 rounded-xl bg-zinc-950
     border border-zinc-700" >
      <div className="h-auto w-full flex flex-col justify-center
       items-center gap-2">
        <div className="h-auto w-full text-left cursor-pointer"
        onClick={() => {
          navigate(
            `/resource-view/${data.$id}` // dynamic route with document id
          );
        }} >
          <h2 className="text-lg font-medium font-description
          text-zinc-200 truncate hover:underline">
            {data.title}
          </h2>
        </div>
        <div className="h-auto w-full text-left cursor-pointer"
        onClick={() => {
          navigate(
            `/resource-view/${data.$id}` // dynamic route with document id
          );
        }} >
          <h2 className={`text-lg font-medium font-description
          ${data.status === 'read' ? 'text-green-600' : 'text-red-600'}`}>
            {data.status}
          </h2>
        </div>
      </div>
      <div className="h-auto w-full flex justify-start items-center
       gap-6">
        <div className="h-auto w-auto">
          <button type="button" className="cursor-pointer"
          onClick={() => {
            navigate(
            `/resource-view/${data.$id}` // dynamic route with document id
            )
          }} >
            <ExternalLink size={22} className="text-blue-600" />
          </button>
        </div>
        <div className="h-auto w-auto">
          <button type="button" className="cursor-pointer"
          onClick={() => {
            removeResource(data.$id, data.category); // removing doc
            setActiveFilter(data.category); // assigning note category
          }}>
            <Trash2 size={22} className="text-red-600" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResourceCards