import { useAuth } from "../utils/AuthProvider"
import { useNavigate } from "react-router-dom";
import { CircleCheck, NotebookPen, ExternalLink,
BookCheck} from "lucide-react"

const Dashboard = () => {

  const {userName} = useAuth();
  const navigate = useNavigate();

  return (
    <div className="h-auto py-12 lg:h-[90vh] lg:py-0 w-full
     flex justify-center items-center dark:bg-dark-bg">
      <div className="h-full w-[90%] flex flex-col justify-center
       items-center gap-16 lg:max-2xl:gap-12">
        <div className="h-auto w-full text-center">
          <h2 className="text-2xl font-medium
           font-description text-zinc-900 dark:text-zinc-200">
            Dashboard
          </h2>
        </div>
        <div className="h-auto w-full flex flex-col justify-center
         items-center gap-2">
            <div className="h-auto w-full text-left">
              <h2 className="text-lg font-medium font-description
               text-zinc-700 dark:text-zinc-400">
                Welcome <span className="text-zinc-900 dark:text-zinc-200">
                  {userName}
                </span>
              </h2>
            </div>
            <div className="h-auto w-full text-left">
              <h2 className="text-lg font-medium font-description
               text-zinc-700 dark:text-zinc-400">
                Have a good day!
              </h2>
            </div>
        </div>
        <div className="h-auto w-full grid grid-cols-1 lg:grid-cols-3
         gap-8">
          <div className="h-[280px] lg:h-[260px] w-full flex flex-col
           justify-center items-center gap-5 border border-stone-300
           dark:border-zinc-700 rounded-xl">
            <div className="h-auto w-full px-8 flex justify-start
             items-center">
              <h2 className="text-zinc-900 dark:text-zinc-200">
                <CircleCheck size={42} />
              </h2>
            </div>
            <div className="h-auto w-full px-8 flex justify-start
             items-center">
              <h2 className="text-lg font-medium font-description
               text-zinc-800 dark:text-zinc-300">
                Tasks
              </h2>
            </div>
            <div className="h-auto w-full px-8 flex justify-start
             items-center">
              <h2 className="text-base font-medium font-description
               text-zinc-600 dark:text-zinc-400">
                For all your todos and reminders
              </h2>
            </div>
            <div className="h-auto w-full px-8 flex justify-start
            items-center">
              <div className="h-auto w-auto">
                <button type="button" className="cursor-pointer"
                  onClick={() => {
                    navigate('/todos')
                  }} >
                  <ExternalLink size={38} className="text-blue-600" />
                </button>
              </div>
            </div>
          </div>
          <div className="h-[280px] lg:h-[260px] w-full flex flex-col
           justify-center items-center gap-5 border border-stone-300
           dark:border-zinc-700 rounded-xl">
            <div className="h-auto w-full px-8 flex justify-start
             items-center">
              <h2 className="text-zinc-900 dark:text-zinc-200">
                <NotebookPen size={42} />
              </h2>
            </div>
            <div className="h-auto w-full px-8 flex justify-start
             items-center">
              <h2 className="text-lg font-medium font-description
              text-zinc-800 dark:text-zinc-300">
                Notes
              </h2>
            </div>
            <div className="h-auto w-full px-8 flex justify-start
             items-center">
              <h2 className="text-base font-medium font-description
              text-zinc-600 dark:text-zinc-400">
                For your thoughts and ideas
              </h2>
            </div>
            <div className="h-auto w-full px-8 flex justify-start
            items-center">
              <div className="h-auto w-auto">
                <button type="button" className="cursor-pointer"
                  onClick={() => {
                    navigate('/notes')
                  }} >
                  <ExternalLink size={38} className="text-blue-600" />
                </button>
              </div>
            </div>
          </div>
          <div className="h-[280px] lg:h-[260px] w-full flex flex-col
           justify-center items-center gap-5 border border-stone-300
           dark:border-zinc-700 rounded-xl">
            <div className="h-auto w-full px-8 flex justify-start
             items-center">
              <h2 className="text-zinc-900 dark:text-zinc-200">
                <BookCheck size={42} />
              </h2>
            </div>
            <div className="h-auto w-full px-8 flex justify-start
             items-center">
              <h2 className="text-lg font-medium font-description
              text-zinc-800 dark:text-zinc-300">
                Study Resources
              </h2>
            </div>
            <div className="h-auto w-full px-8 flex justify-start
             items-center">
              <h2 className="text-base font-medium font-description
              text-zinc-600 dark:text-zinc-400">
                For managing your study resources
              </h2>
            </div>
            <div className="h-auto w-full px-8 flex justify-start
            items-center">
              <div className="h-auto w-auto">
                <button type="button" className="cursor-pointer"
                  onClick={() => {
                    navigate('/resources')
                  }} >
                  <ExternalLink size={38} className="text-blue-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
       </div>
    </div>
  )
}

export default Dashboard