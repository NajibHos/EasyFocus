import { ExternalLink, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

const NoteCards = ({data, removeNote, setActiveFilter}) => {

  const navigate = useNavigate();

  return (
    <div className="h-[160px] w-full  flex flex-col justify-center
     items-center gap-5 p-6 border rounded bg-zinc-950
     border-zinc-900" >
      <div className="h-auto w-full flex flex-col justify-center
       items-center gap-2">
        <div className="h-auto w-full text-left cursor-pointer"
        onClick={() => {
          navigate(
            `/note-view/${data.$id}`, // dynamic route with document id
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
            `/note-view/${data.$id}`, // dynamic route with document id
          );
        }} >
          <h2 className="text-base font-medium font-description
          text-zinc-400 truncate">
            {data.description}
          </h2>
        </div>
      </div>
      <div className="h-auto w-full flex justify-start items-center
       gap-5">
        <div className="h-auto w-auto">
          <button type="button" className="cursor-pointer"
          onClick={() => {
            navigate(
              `/note-view/${data.$id}`, // dynamic route with document id
            );
          }} >
            <ExternalLink size={22} className="text-blue-600" />
          </button>
        </div>
        <div className="h-auto w-auto">
          <button type="button" className="cursor-pointer"
          onClick={() => {
            removeNote(data.$id, data.category); // removing current note
            setActiveFilter(data.category); // updating note category
          }} >
            <Trash2 size={22} className="text-red-600" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default NoteCards