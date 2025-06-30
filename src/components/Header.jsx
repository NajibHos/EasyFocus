import { useTheme } from "../utils/ThemeProvider";
import { useAuth } from "../utils/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { Github, House, LogIn, LogOut, Moon, Sun } from "lucide-react";

const Header = () => {

  const {theme, toggleTheme } = useTheme();
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();

  return (
     <div className="h-[10vh] w-full flex justify-center
      items-center dark:bg-dark-bg">
      <div className="h-full w-[90%] flex justify-between items-center">
        <div className="h-auto w-[40%] flex justify-start items-center">
          <Link to='/'>
          <h2 className="text-3xl  font-semibold font-logo font-heading text-zinc-900
          dark:text-white cursor-pointer">
            Easy
          <span className="italic">Focus</span>
          </h2>
          </Link>
        </div>

        <div className="h-auto w-[40%] flex justify-end items-center
         gap-2">
          {
            !user ? (

              <>

              {
                theme === 'dark' && <button type="button"
                className="text-lg px-4 py-2  rounded-xl cursor-pointer
                bg-transparent text-white hover:bg-stone-800"
                onClick={toggleTheme} >
                  <Sun />
                </button>
              }

              {
                theme === 'light' && <button type="button"
                className="text-lg px-4 py-2  rounded-xl cursor-pointer
                bg-transparent text-zinc-900 hover:text-white hover:bg-stone-800"
                onClick={toggleTheme} >
                  <Moon />
                </button>
              }

              <a href="https://github.com/NajibHos/EasyFocus"
               target="_blank"
               className="text-lg text-zinc-200 cursor-pointer
               hover:text-white px-4 py-2 bg-transparent
               hover:bg-zinc-800 rounded-xl">
                <Github  />
              </a>

              {/* 2 different buttons for smaller and larger screens */}
              <button type="button" className="block md:max-2xl:hidden
               text-lg text-zinc-200 cursor-pointer
               hover:text-white px-4 py-2 bg-transparent
               hover:bg-zinc-800 rounded-xl"
               onClick={() => {
                navigate('/sign-in')
               }} >
                <LogIn />
              </button>

              <button type="button" className="hidden md:max-2xl:block
               text-lg text-zinc-200 font-medium cursor-pointer
               font-description
               hover:text-white px-4 py-2 bg-transparent
               hover:bg-zinc-800 rounded-xl"
               onClick={() => {
                navigate('/sign-in')
               }} >
                Sign in
              </button>
              </>

            ) : (

              <>

                {
                theme === 'dark' && <button type="button"
                className="text-lg px-4 py-2  rounded-xl cursor-pointer
                bg-transparent text-white hover:bg-stone-800"
                onClick={toggleTheme} >
                  <Sun />
                </button>
              }

              {
                theme === 'light' && <button type="button"
                className="text-lg px-4 py-2  rounded-xl cursor-pointer
                bg-transparent text-zinc-900 hover:text-white hover:bg-stone-800"
                onClick={toggleTheme} >
                  <Moon />
                </button>
              }

                {/* 2 different buttons for smaller and larger screens */}
                <button type="button"
                className="block md:max-2xl:hidden
                text-lg text-zinc-200 cursor-pointer
                hover:text-white px-4 py-2 bg-transparent
                hover:bg-zinc-800 rounded-xl"
                onClick={() => {
                  navigate('/dashboard')
                }} >
                  <House />
                </button>

                <button type="button"
                className="hidden md:max-2xl:block
                text-lg text-zinc-200
                font-medium cursor-pointer font-description
                hover:text-white px-4 py-2 bg-transparent
                hover:bg-zinc-800 rounded-xl"
                onClick={() => {
                  navigate('/dashboard')
                }}>
                  Dashboard
                </button>

                <button type="button"
                className="block md:max-2xl:hidden
                text-lg text-zinc-200 cursor-pointer
                hover:text-white px-4 py-2 bg-transparent
                hover:bg-zinc-800 rounded-xl"
                onClick={logOutUser} >
                  <LogOut />
                </button>

                <button type="button"
                className="hidden md:max-2xl:block
                text-lg text-zinc-200 cursor-pointer font-description
                hover:text-white px-4 py-2 bg-transparent
                hover:bg-zinc-800 rounded-xl font-medium"
                onClick={logOutUser} >
                  Sign Out
                </button>
              </>

            )
          }
        </div>
      </div>
    </div>
  )
}

export default Header