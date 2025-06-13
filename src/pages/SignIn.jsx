import { useEffect } from "react";
import { useAuth } from "../utils/AuthProvider";
import { useNavigate } from "react-router-dom";

const SignIn = () => {

  // getting user status from AuthContext
  const {user, logInUser} = useAuth();
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
    <div className="h-[90vh] w-full flex justify-center items-center">
      <div className="h-full w-[90%] flex flex-col justify-center
       items-center gap-16 lg:max-2xl:gap-12">
        <div className="h-auto w-full text-center">
          <h2 className="font-medium font-description text-zinc-200
           text-2xl lg:text-xl">
            Sign In
          </h2>
        </div>
        <div className="h-auto w-full md:max-lg:w-[60%]
         lg:max-2xl:w-[60%]">
          <form action={signIn}
          className="h-auto w-full flex flex-col justify-center
           items-center gap-8">
            <div className="h-auto w-full flex flex-col justify-center
             items-center gap-2">
              <div className="h-auto w-full text-left">
                <h2 className="font-medium font-description text-zinc-200
                  text-base">
                  Email
                </h2>
              </div>
              <div className="h-auto w-full">
                {/* Daisy Ui email validator component */}
                <input type="email" required name="email"
                 placeholder="mail@site.com" className="input validator
                 w-full text-zinc-200 bg-zinc-900 font-medium
                 font-description"/>
              </div>
              <div className="h-auto w-full text-left">
                <h2 className="font-medium font-description text-zinc-200
                 text-base">
                  Email: <span
                  className="text-lg">najibhossn@gmail.com</span>
                </h2>
              </div>
            </div>
            <div className="h-auto w-full flex flex-col justify-center
             items-center gap-2">
              <div className="h-auto w-full text-left">
                <h2 className="font-medium font-description text-zinc-200
                 text-base">
                  Password
                </h2>
              </div>
              <div className="h-auto w-full">
                {/* Daisy Ui password validator component */}
                  <input type="password" className="input validator
                  w-full text-zinc-200 bg-zinc-900 font-medium
                  font-description" name="password"
                  required placeholder="Password" minLength="8"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" />
              </div>
              <div className="h-auto w-full text-left">
                <h2 className="font-medium font-description text-zinc-200
                  text-base">
                  Password: <span className="text-lg">Pass1234</span>
                </h2>
              </div>
            </div>
            <div className="h-auto w-full mt-4 lg:max-2xl:mt-0">
              <button type="submit" className="w-full py-2 bg-white
                text-base font-medium font-description rounded
                text-zinc-950 cursor-pointer">
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