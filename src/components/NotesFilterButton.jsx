
const NotesFilterButton = ({data, activeFilter, setActiveFilter, action}) => {

  const isActive = activeFilter === data.title;

  return (
    <button type="button" className={`text-base font-medium
     font-description border rounded border-zinc-900
     w-auto px-4 py-2 cursor-pointer
     ${isActive ? 'text-zinc-950 bg-white' : 'bg-zinc-950 text-white'}`}
     onClick={() => {
      setActiveFilter(data.title); // assigning activeFilter variable
      action(data.title); // invoking the getFilteredNotes function
     }} >
      {data.title}
    </button>
  )
}

export default NotesFilterButton