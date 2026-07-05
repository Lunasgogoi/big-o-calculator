import { Link, NavLink } from 'react-router-dom';

export default function Navbar({ isDarkMode, setIsDarkMode, setCode, setLanguage }) {
  const navLinkClass = ({ isActive }) =>
    [
      'rounded-lg px-3 py-2 font-medium transition-colors',
      isActive
        ? 'bg-emerald-500/10 text-emerald-600 dark:bg-teal-500/15 dark:text-teal-300'
        : 'text-slate-600 hover:bg-[#e7eee7] hover:text-slate-950 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white',
    ].join(' ');

  return (
    <nav className="w-full max-w-4xl flex justify-between items-center gap-4 pt-6 pb-6 border-b border-[#dfe7df] dark:border-gray-800 mb-8 transition-colors duration-300">
      <Link 
        to="/" 
        onClick={() => {
          setCode('');
          setLanguage('python');
        }} 
        className="text-2xl font-serif font-bold tracking-tight text-slate-900 dark:text-white hover:opacity-80 transition"
      >
        Big O Calc
      </Link>
      <div className="flex items-center gap-2 text-sm">
        <NavLink to="/guide" className={navLinkClass}>Guide</NavLink>
        <NavLink to="/examples" className={navLinkClass}>Examples</NavLink>
        <NavLink to="/tutorial" className={navLinkClass}>Tutorial</NavLink>
        <NavLink to="/faq" className={navLinkClass}>FAQ</NavLink>
        
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="ml-2 rounded-lg bg-[#e9f0e8] px-3 py-2 font-medium text-slate-700 transition-colors hover:bg-[#dfe8de] dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 cursor-pointer"
          aria-label="Toggle theme"
          title="Toggle Theme"
        >
          {isDarkMode ? 'Light' : 'Dark'}
        </button>
      </div>
    </nav>
  );
}
