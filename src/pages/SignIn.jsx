import { useEffect } from "react";
import { useAuth } from "../utils/AuthProvider";
import { useNavigate } from "react-router-dom";

const SignIn = () => {

  // getting user status from AuthContext
  const { authStatus, user, logInUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    //if user is available then navigate user to dashboard
    if (user) {
      navigate('/dashboard');
    }
  }, [user]) // user status is the dependency here

  // function to handle user sign-in
  const signIn = async (formData) => {
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      await logInUser({email, password});
    } catch (error) {
      console.error("LogIn error: " + error.message);
    }
  }

  return (
    <div className="h-[90vh] w-full flex justify-center items-center dark:bg-dark-bg">
      <div className="h-full w-[90%] flex flex-col justify-center
       items-center gap-16 lg:max-2xl:gap-12">
        <div className="h-auto w-full flex flex-col justify-center items-center
         gap-4">
          <div className="h-auto w-full text-center">
            <h2 className="text-2xl font-description font-medium text-zinc-900
             dark:text-zinc-200">
              Sign In
            </h2>
          </div>
          <div className="h-auto w-full text-center">
            <h2 className={`text-base font-main font-medium
              ${!authStatus && 'text-zinc-600 dark:text-zinc-400'}
              ${authStatus === 'success' && 'text-green-600'}
              ${authStatus === 'failed' && 'text-red-600'}  `}>
              {
                !authStatus && 'Enter Correct Credentials to Sign In'
              }
              {
                authStatus === 'success' && 'Sign In Successful'
              }
              {
                authStatus === 'failed' && 'Invalid Credentials'
              }
            </h2>
          </div>
        </div>
        <div className="h-auto w-full md:w-[70%] lg:w-[50%]">
          <form action={signIn}
          className="h-auto w-full flex flex-col justify-center
           items-center gap-8">
            <div className="h-auto w-full flex flex-col justify-center
             items-center gap-2">
              <div className="h-auto w-full text-left">
                <h2 className="text-base font-medium font-description
                 text-zinc-800 dark:text-zinc-200">
                  Email
                </h2>
              </div>
              <div className="h-auto w-full">
                <input type="email" placeholder="mail@gmail.com" className="input
                 w-full text-base font-description font-medium border border-zinc-400
                 text-zinc-800 dark:text-zinc-200 bg-transparent"
                 name='email' />
              </div>
              <div className="h-auto w-full text-left">
                <h2 className="text-base font-medium font-description
                 text-zinc-800 dark:text-zinc-200">
                  Email: <span
                  className="text-lg">najibhossn@gmail.com</span>
                </h2>
              </div>
            </div>
            <div className="h-auto w-full flex flex-col justify-center
             items-center gap-2">
              <div className="h-auto w-full text-left">
                <h2 className="text-base font-medium font-description
                 text-zinc-800 dark:text-zinc-200">
                  Password
                </h2>
              </div>
              <div className="h-auto w-full">
                <input type="password" placeholder="password" className="input
                 w-full text-base font-description font-medium border border-zinc-400
                 text-zinc-800 dark:text-zinc-200 bg-transparent"
                 name='password' />
              </div>
              <div className="h-auto w-full text-left">
                <h2 className="text-base font-medium font-description
                 text-zinc-800 dark:text-zinc-200">
                  Password: <span className="text-lg">Pass1234</span>
                </h2>
              </div>
            </div>
            <div className="h-auto w-full mt-4 lg:max-2xl:mt-0">
              <button type="submit" className="w-full py-2 text-base font-medium
               font-description rounded cursor-pointer text-white
               dark:text-zinc-950 bg-zinc-900 dark:bg-white ">
                Submit
              </button>
            </div>
          </form>
        </div>
       </div>
    </div>
  )
}

export default SignIn