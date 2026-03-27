// src/pages/Tutorial.tsx
export default function Tutorial() {
  return (
    <div className="w-full max-w-4xl text-left">
      <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-6">
        Big O Crash Course
      </h1>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
        Learn how to analyze algorithms from scratch. Follow the modules below to master Time and Space complexity.
      </p>

      <div className="space-y-4">
        {/* Module 1 */}
        <div className="bg-white dark:bg-[#161616] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-start">
          <div className="bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4 shrink-0">1</div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">What is Big O Notation?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Understanding worst-case scenarios, dropping constants, and reading the notation.</p>
          </div>
        </div>

        {/* Module 2 */}
        <div className="bg-gray-50 dark:bg-[#121212] p-6 rounded-xl border border-gray-200 dark:border-gray-800 flex items-start opacity-70">
          <div className="bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4 shrink-0">2</div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Constant and Linear Time</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Analyzing simple loops, array lookups, and basic math operations. (Coming soon)</p>
          </div>
        </div>
      </div>
    </div>
  );
}