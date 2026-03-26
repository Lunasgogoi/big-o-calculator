export default function Navbar({ isDarkMode, setIsDarkMode }: any) {
  return (
    <nav className="w-full max-w-4xl flex justify-between items-center py-6 mb-8">
      <div className="text-2xl font-serif font-bold tracking-tight text-gray-900 dark:text-white">Big O Calc</div>
      <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
        <a href="#" className="hover:text-gray-900 dark:hover:text-white transition">Guide</a>
        <a href="#" className="hover:text-gray-900 dark:hover:text-white transition">Examples</a>
        <a href="#" className="hover:text-gray-900 dark:hover:text-white transition">Tutorial</a>
        <a href="#" className="hover:text-gray-900 dark:hover:text-white transition">FAQ</a>
        
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          title="Toggle Theme"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}