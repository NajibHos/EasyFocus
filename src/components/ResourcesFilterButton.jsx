
const ResourcesFilterButton = ({data, activeFilter, setActiveFilter, action}) => {

  const isActive = activeFilter === data.title;

  return (
    <button type="button" className={`text-base font-medium
     font-description border rounded border-stone-300 dark:border-zinc-900
     w-auto px-4 py-2 cursor-pointer
     ${isActive ?
      ('text-white bg-stone-900 dark:text-zinc-950 dark:bg-white'
      ) : ('text-zinc-900 bg-transparent dark:bg-zinc-950 dark:text-white')}`}
     onClick={() => {
      setActiveFilter(data.title);
      action(data.title);
     }}
    >
      {data.title}
    </button>
  )
}

export default ResourcesFilterButton