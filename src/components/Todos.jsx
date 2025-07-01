import { Circle, CircleCheck, Trash2 } from "lucide-react"

const Todos = ({data, action}) => {

  //functions to perform on todo
  const updateTodoStatus = action.updateTodoStatus;
  const removeTodo = action.removeTodo;

  return (
    <div className="h-[50px] w-full flex justify-between items-center
     px-4 border border-zinc-400 rounded bg-transparent">
      <div className="h-auto w-auto">
        {/* toggling between complete and incomplete task */}
        <div className={`h-auto w-auto
          ${data.status === 'completed' ? 'block' : 'hidden'} `}>
            <button className="bg-transparent py-2 cursor-pointer"
            onClick={() => {
              updateTodoStatus(data.$id, 'incomplete'); // id, status
            }} >
              <CircleCheck size={26} className="text-green-600" />
            </button>
        </div>
        <div className={`h-auto w-auto
          ${data.status === 'incomplete' ? 'block' : 'hidden'} `}>
            <button className="bg-transparent py-2 cursor-pointer"
            onClick={() => {
              updateTodoStatus(data.$id, 'completed'); //id, status
            }} >
              <Circle size={26} className="text-zinc-900 dark:text-zinc-200" />
            </button>
        </div>
      </div>
      <div className="h-auto w-[80%] lg:w-[85%] text-left">
        <h2 className={`text-base font-medium font-description truncate
        ${data.status === 'completed' ? ('line-through text-green-600'
        ) : ('text-zinc-900 dark:text-zinc-200')}  `}>
          {data.title}
        </h2>
      </div>
      <div className="h-auto w-auto">
        <button type="button" className="py-2 bg-transparent
        cursor-pointer text-red-600"
        onClick={() => {
          removeTodo(data.$id) // removing current todo
        }} >
          <Trash2 size={26}  />
        </button>
      </div>
    </div>
  )
}

export default Todos