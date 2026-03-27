// src/App.tsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// We only need the layout components and our new AppRoutes!
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Apply dark mode to HTML tag
  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  return (
    <Router>
      <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-[#1e1e1e] text-gray-800 dark:text-gray-300 font-sans flex flex-col items-center px-4 pb-20">
        
        {/* The Navbar stays at the top of EVERY page */}
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

        {/* Our routing logic is now safely tucked away in its own file! */}
        <main className="w-full max-w-4xl flex-grow">
          <AppRoutes />
        </main>
        
        {/* The Footer stays at the bottom of EVERY page */}
        <footer className="w-full max-w-4xl mt-20 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 transition-colors duration-300">
          Big O Calc — Free algorithm complexity analyzer · <a href="#" className="text-teal-600 dark:text-teal-500 hover:underline">Buy me a coffee ☕</a>
        </footer>
      </div>
    </Router>
  );
}