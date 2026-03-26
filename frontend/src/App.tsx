import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ComplexityCard from './components/ComplexityCard';
import CodeExample from './components/CodeExample';
import ResultPanel from './components/ResultPanel';
import CodeEditor from './components/CodeEditor';

// Define our expected API response
interface AnalysisResult {
  status: string;
  time_complexity: string;
  space_complexity: string;
  analysis_steps: string[];
  ai_suggestion: string;
}

export default function App() {
  const [code, setCode] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // API State
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  // The function that calls our FastAPI backend!
  const handleCalculate = async () => {
    if (!code.trim()) return;
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://localhost:8000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code, language: 'python' }), 
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const data: AnalysisResult = await response.json();
      setResult(data); 
    } catch (err) {
      setError("Failed to connect to the backend. Is FastAPI running on port 8000?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-[#1e1e1e] text-gray-800 dark:text-gray-300 font-sans flex flex-col items-center px-4 pb-20">
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <main className="w-full max-w-4xl">
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">Big O Calc</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
            Calculate the time and space complexity of your code using Big O notation.
          </p>
        </header>

       {/* Editor Section */}
        <div className="bg-white dark:bg-[#161616] rounded-xl border border-gray-300 dark:border-gray-800 p-4 mb-6 shadow-xl dark:shadow-2xl transition-colors duration-300">
          <div className="flex justify-between items-center mb-4 text-xs text-gray-500 border-b border-gray-200 dark:border-gray-800 pb-3">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-700"></div>
              <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-700"></div>
              <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-700"></div>
            </div>
            <div className="font-mono tracking-widest text-gray-400">main.py</div>
            <div>{code.length} / 1,500</div>
          </div>
          
          {/* Our Brand New Syntax Highlighting Editor! */}
          <CodeEditor code={code} setCode={setCode} language="python" />
          
        </div>

        <button 
          onClick={handleCalculate}
          disabled={isLoading}
          className="bg-teal-600 hover:bg-teal-500 disabled:bg-teal-800 text-white font-medium py-2.5 px-6 rounded-lg transition duration-200 mb-8 shadow-md"
        >
          {isLoading ? 'Analyzing AST...' : 'Calculate'}
        </button>

        {/* Error State */}
        {error && (
          <div className="text-red-600 dark:text-red-400 mb-8 p-4 border border-red-300 dark:border-red-900 rounded-lg bg-red-50 dark:bg-red-950/30">
            {error}
          </div>
        )}

        {/* Results State */}
        {result ? (
          <ResultPanel result={result} />
        ) : (
          <div className="border border-dashed border-gray-300 dark:border-gray-800 rounded-xl p-8 text-center text-gray-600 dark:text-gray-500 bg-gray-100 dark:bg-[#0f0f0f] mb-20 transition-colors duration-300">
            Paste your code above and click <strong className="text-gray-900 dark:text-white">Calculate</strong> to analyze its time and space complexity.
          </div>
        )}

        {/* ... The rest of the informational sections go here ... */}
        {/* I've truncated them here to keep the code block small, but they remain exactly the same as the previous step! */}
      </main>
    </div>
  );
}