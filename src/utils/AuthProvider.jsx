import { createContext, useContext, useState, useEffect } from 'react';
import { account } from '../appwrite/appwrite';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [authStatus, setAuthStatus] = useState(''); // store authentication status
  const [user, setUser] = useState(null); // Store user details
  const [userName, setUserName] = useState(null); // Store user Name

  useEffect(() => {
    checkUserStatus();
  }, [])

  // Check user session
  const checkUserStatus = async () => {

    try {
      const currentUser = await account.get();
      setUser(currentUser);
      setUserName(currentUser.name);

    } catch (error) {
      console.error('User Error: ' + error.message);
    }
  }

  // Login function
  const logInUser = async (userInfo) => {

    try {
      // login session
      await account.createEmailPasswordSession(
        userInfo.email, userInfo.password
      );

      // get user and username
      const currentUser = await account.get();
      setAuthStatus('successful'); // set authentication status to successful
      setUser(currentUser);
      setUserName(currentUser.name);

    } catch (error) {
      setAuthStatus('failed'); // set authentication status to failed
      console.error("Login error:", error.message);
    }
  }

  // Logout function
  const logOutUser = async () => {
    try {
      await account.deleteSession("current"); // Delete current session
      setUser(null); // Reset user state
      setUserName(null); // Reset username
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  }

  // logout()

  const contextData =  {
    authStatus,
    user,
    userName,
    logInUser,
    logOutUser
  }

  return (
    <AuthContext.Provider value={contextData}>
      {/* always return children */}
      { children }
    </AuthContext.Provider>
  )
};

// Custom Hook for consuming AuthContext
export const useAuth = () => useContext(AuthContext);
