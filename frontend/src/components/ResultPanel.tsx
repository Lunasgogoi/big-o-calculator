// src/components/ResultPanel.tsx

export default function ResultPanel({ result }: any) {
  return (
    <div className="border border-teal-500/50 rounded-xl p-8 bg-white dark:bg-[#121212] mb-20 shadow-lg transition-colors duration-300">
      <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-6">Analysis Results</h3>
      
      {/* Time and Space Complexity Blocks */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-50 dark:bg-[#1a1a1a] p-5 rounded-lg border border-gray-200 dark:border-gray-800">
          <span className="block text-gray-500 dark:text-gray-400 text-sm mb-2">Time Complexity</span>
          <span className="text-3xl font-mono font-bold text-teal-600 dark:text-teal-400">
            {result.time_complexity}
          </span>
        </div>
        <div className="bg-gray-50 dark:bg-[#1a1a1a] p-5 rounded-lg border border-gray-200 dark:border-gray-800">
          <span className="block text-gray-500 dark:text-gray-400 text-sm mb-2">Space Complexity</span>
          <span className="text-3xl font-mono font-bold text-teal-600 dark:text-teal-400">
            {result.space_complexity}
          </span>
        </div>
      </div>

      {/* Engine Analysis Steps (New!) */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">How we calculated this:</h4>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          {result.analysis_steps.map((step: string, index: number) => (
            <li key={index} className="flex items-start">
              <span className="text-teal-500 mr-2 font-bold">{index + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* AI Suggestion Box */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
        <span className="text-teal-600 dark:text-teal-500 font-bold mr-2">✨ AI Suggestion:</span>
        <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {result.ai_suggestion}
        </span>
      </div>
    </div>
  );
}