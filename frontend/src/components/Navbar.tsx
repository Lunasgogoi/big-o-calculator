// src/components/Navbar.tsx
import { Link } from 'react-router-dom';

export default function Navbar({ isDarkMode, setIsDarkMode }: any) {
  return (
    <nav className="w-full max-w-4xl flex justify-between items-center py-6 mb-8">
      <Link to="/" className="text-2xl font-serif font-bold tracking-tight text-gray-900 dark:text-white hover:opacity-80 transition">
        Big O Calc
      </Link>
      <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
        <Link to="/guide" className="hover:text-gray-900 dark:hover:text-white transition">Guide</Link>
        <Link to="/examples" className="hover:text-gray-900 dark:hover:text-white transition">Examples</Link>
        <Link to="/tutorial" className="hover:text-gray-900 dark:hover:text-white transition">Tutorial</Link>
        <Link to="/faq" className="hover:text-gray-900 dark:hover:text-white transition">FAQ</Link>
        
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          title="Toggle Theme"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}