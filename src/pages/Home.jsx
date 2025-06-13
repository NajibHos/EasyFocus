import { useNavigate } from "react-router-dom"

const Home = () => {

  const navigate = useNavigate();

  return (
    <div className="h-auto py-12 w-full flex justify-center items-center">
      <div className="h-full w-[90%] lg:w-[60%] flex flex-col
       justify-center items-center gap-10 lg:gap-8">
        <div className="h-auto w-full flex flex-col justify-center
        items-center gap-4">
          <div className="h-auto w-full text-center">
            <h2 className="text-2xl font-logo font-semibold text-white">
              Easy<span className="italic">Focus</span>
            </h2>
          </div>
          <div className="h-auto w-full text-center">
            <h2 className="text-lg font-description font-medium
             text-zinc-200">
              Your Personal Hub for Everyday Productivity
            </h2>
          </div>
        </div>
        <div className="h-auto w-full text-left">
          <p className="text-base font-description font-medium
          text-zinc-400 whitespace-pre-wrap">
            Easy<span className="italic">Focus</span> is a modern, minimal
            productivity tool designed to help individuals stay organized
            and focused. It includes a powerful todo manager, a structured
            note-taking system, and a centralized space to save and
            categorize study resources. <br />
            This project reflects my ability to build complete, practical
            applications using modern web tools. Built for learning,
            experimenting, and professional growth.
          </p>
        </div>
        <div className="h-auto w-full text-left">
          <h2 className="text-base font-description font-medium
          text-zinc-400">
            Built with: <span className="text-zinc-200">
              React, Appwrite, Tailwind CSS, Daisy UI, Lucide React
            </span>
          </h2>
        </div>
        <div className="h-auto w-full flex flex-col justify-center
         items-start gap-4">
          <div className="h-auto w-full text-left">
            <h2 className="text-base font-description font-medium
             text-zinc-400">
              Features:
            </h2>
          </div>
          <div className="h-auto w-full">
            <ul className="h-auto w-full list-disc ml-4 text-left">
              <li>
                <h2 className="text-base font-description font-medium
                text-zinc-200">
                  Todo list with pagination & status controls
                </h2>
              </li>
              <li>
                <h2 className="text-base font-description font-medium
                text-zinc-200">
                  Notes app with filters and categories
                </h2>
              </li>
              <li>
                <h2 className="text-base font-description font-medium
                text-zinc-200">
                  Study resource manager for organizing useful links
                </h2>
              </li>
              <li>
                <h2 className="text-base font-description font-medium
                text-zinc-200">
                  Minimal, modern UI
                </h2>
              </li>
              <li>
                <h2 className="text-base font-description font-medium
                text-zinc-200">
                  Fully responsive design
                </h2>
              </li>
            </ul>
          </div>

        </div>
        <div className="h-auto w-full text-center">
        <button type="button" className="bg-white
          text-base font-medium font-description rounded text-zinc-950
          cursor-pointer w-full lg:w-auto px-0 lg:px-4 py-2"
          onClick={() => {
            navigate('/sign-in')
          }} >
            Visit APP
        </button>
        </div>
      </div>
    </div>
  )
}

export default Home