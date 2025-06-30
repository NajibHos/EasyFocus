import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {

  // getting current theme or light theme by default
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // applying current theme on mount and theme change
  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem('theme', theme);

  }, [theme])

  // toggling between dark and light theme
  const toggleTheme = () => {
    // updater function. here "t" is the previous value
    setTheme(t => t === 'light' ? 'dark' : 'light');
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>
    {children}
  </ThemeContext.Provider>

}

// custom hook for consuming theme context
export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider