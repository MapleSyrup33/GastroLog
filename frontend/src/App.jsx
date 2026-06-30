import { useState, useEffect } from 'react'
import Home from './pages/Home.jsx'
import './styles/App.css'

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleNavigate = (page) => {
    console.log(`Navigating to ${page}`);
  };

  return (
    <>
      <Home 
        theme={theme} 
        onToggleTheme={toggleTheme} 
        onNavigate={handleNavigate} 
      />
    </>
  )
}

export default App

