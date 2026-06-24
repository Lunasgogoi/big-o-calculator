import React from 'react';

interface AnalysisStep {
  label: string;
  text: string;
}

interface AnalysisCardProps {
  timeComplexity: string;
  spaceComplexity: string;
  steps: AnalysisStep[];
  proTip?: string;
}

const AnalysisCard: React.FC<AnalysisCardProps> = ({ timeComplexity, spaceComplexity, steps, proTip }) => {
  return (
    <div className="bg-white dark:bg-[#262626]/50 border border-gray-200 dark:border-gray-700 rounded-xl p-6 md:p-8 shadow-sm dark:shadow-none transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        
        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/50 p-4 rounded-lg transition-colors duration-300">
          <p className="text-blue-700 dark:text-blue-400 text-sm font-semibold uppercase tracking-wider mb-1">Time Complexity</p>
          <p className="text-2xl font-bold text-blue-900 dark:text-white">{timeComplexity}</p>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/50 p-4 rounded-lg transition-colors duration-300">
          <p className="text-green-700 dark:text-green-400 text-sm font-semibold uppercase tracking-wider mb-1">Space Complexity</p>
          <p className="text-2xl font-bold text-green-900 dark:text-white">{spaceComplexity}</p>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-5">Step-by-Step Breakdown</h3>
      <ol className="space-y-4 text-gray-700 dark:text-gray-400 mb-8">
        {steps.map((step, index) => (
          <li key={index} className="flex items-start">
            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold mr-3 mt-0.5 transition-colors duration-300">
              {index + 1}
            </span>
            <p className="leading-relaxed">
              <strong className="text-gray-900 dark:text-gray-300">{step.label}:</strong> {step.text}
            </p>
          </li>
        ))}
      </ol>

      {proTip && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 dark:border-yellow-600 p-4 rounded-r-lg transition-colors duration-300">
          <p className="text-yellow-800 dark:text-yellow-500 font-bold text-sm mb-1">Pro Tip 💡</p>
          <p className="text-yellow-800 dark:text-yellow-200/80 text-sm leading-relaxed">{proTip}</p>
        </div>
      )}
    </div>
  );
};

export default AnalysisCard;