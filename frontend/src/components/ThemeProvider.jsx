import { useState, useEffect } from "react";
import { ThemeContext } from "../hooks/useTheme";

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(()=>{
        return localStorage.getItem('theme') || 'dark';
    });

    useEffect(()=>{
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    },[theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
    };

    return(
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

