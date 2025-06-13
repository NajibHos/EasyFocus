
const ResourcesFilterButton = ({data, activeFilter, setActiveFilter, action}) => {

  const isActive = activeFilter === data.title;

  return (
    <button type="button" className={`px-4 py-2 text-base font-medium
     font-description rounded cursor-pointer
    ${isActive ? 'text-zinc-950 bg-white' : 'bg-zinc-950 text-white'}`}
    onClick={() => {
      setActiveFilter(data.title);
      action(data.title);
    }} >
      {data.title}
    </button>
  )
}

export default ResourcesFilterButton