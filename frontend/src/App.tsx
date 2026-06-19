// src/App.tsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {Toaster} from 'react-hot-toast'

// We only need the layout components and our new AppRoutes!
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  // 1. Initialize state by checking localStorage FIRST
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark'; // Returns true if 'dark' was saved, false otherwise
  });

  const [code, setCode] = useState('');
  const [language,setlanguage]= useState('python');
  // 2. Apply dark mode AND save it to localStorage whenever it changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark'); // Save preference
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light'); // Save preference          <strong className="text-gray-900 dark:text-white">Calculate</strong>
    }
  }, [isDarkMode]);

  return (
    <Router>
      <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-[#1e1e1e] text-gray-800 dark:text-gray-300 font-sans flex flex-col items-center px-4 pb-20">
        
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background:isDarkMode ? '#333' : '#fff',
            color : isDarkMode ? '#fff' : '#333',
            border: isDarkMode ? '1px solid #444' : '1px solid #eee',
          }
        }}
        />

        {/* The Navbar stays at the top of EVERY page */}
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} setCode={setCode} setLanguage={setlanguage} language={language} />

        {/* Our routing logic is now safely tucked away in its own file! */}
        <main className="w-full max-w-4xl flex-grow">
          <AppRoutes setCode={setCode} code={code} language={language} setLanguage={setlanguage} />
        </main>
        
        {/* The Footer stays at the bottom of EVERY page */}
        <footer className="w-full max-w-4xl mt-20 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 transition-colors duration-300">
          Big O Calc — Free algorithm complexity analyzer \ <a href="https://github.com/Lunasgogoi/big-o-calculator" target="_blank" rel="noreferrer noopener" className="hover:underline">GitHub</a></footer>
      </div>
    </Router>
  );
}