import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {Toaster} from 'react-hot-toast'

import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  const [code, setCode] = useState('');
  const [language,setlanguage]= useState('python');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <div className="min-h-screen w-full overflow-x-hidden transition-colors duration-300 bg-[#f4f7f4] dark:bg-[#1e1e1e] text-slate-700 dark:text-gray-300 font-sans flex flex-col items-center px-4 pb-20">
        
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background:isDarkMode ? '#333' : '#fffdf8',
            color : isDarkMode ? '#fff' : '#243142',
            border: isDarkMode ? '1px solid #444' : '1px solid #d8e2d7',
          }
        }}
        />

        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} setCode={setCode} setLanguage={setlanguage} />

        <main className="w-full max-w-4xl min-w-0 flex-grow">
          <AppRoutes setCode={setCode} code={code} language={language} setLanguage={setlanguage} />
        </main>
        
        <footer className="w-full max-w-4xl mt-20 pt-8 border-t border-[#d8e2d7] dark:border-gray-800 text-center text-sm text-slate-500 transition-colors duration-300">
          Big O Calc - Free algorithm complexity analyzer <a href="https://github.com/Lunasgogoi/big-o-calculator" target="_blank" rel="noreferrer noopener" className="hover:underline">GitHub</a></footer>
      </div>
    </Router>
  );
}
