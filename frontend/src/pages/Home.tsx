import { useState } from 'react';
import { Link } from 'react-router-dom';
import ComplexityCard from '../components/ComplexityCard';
import CodeExample from '../components/CodeExample';
import ResultPanel from '../components/ResultPanel';
import CodeEditor from '../components/CodeEditor';
import toast from 'react-hot-toast';
import type { AnalysisResult } from '../components/ResultPanel';

interface HomeProps {
  code: string;
  setCode: (code: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
}

export default function Home({ code, setCode, language, setLanguage }: HomeProps) {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCodeChange = (nextCode: string) => {
    setCode(nextCode);
  };

  const handleCalculate = async () => {
    if (!code.trim()) {
      toast.error('Please enter some code to analyze.');
      return;
    } 

    setIsLoading(true);
    setResult(null);

    try {
      const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      
      const response = await fetch(`${backendUrl}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code, language: language }), 
      });

      const data = (await response.json()) as Partial<AnalysisResult> & { detail?: string };

      if (!response.ok) {
        if (response.status === 429) { 
          throw new Error("API rate limit exceeded. Please wait a moment and try again.");
        }
        throw new Error(data.detail || "Failed to analyze code.");
      }

      setResult(data as AnalysisResult); 
      toast.success("Analysis complete!");

    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : "An unexpected error occurred. Is the server running?";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <header className="mb-10">
        <h1 className="text-4xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-4">Big O Calc</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
          Estimate the time and space complexity of your code using Big O notation.
        </p>
      </header>

      <div className="overflow-hidden rounded-xl border border-[#d8e2d7] bg-[#fffdf8] shadow-lg shadow-[#dfe7df]/70 transition-colors duration-300 dark:border-gray-800 dark:bg-[#141414] dark:shadow-2xl dark:shadow-black/20 mb-6">
        <div className="flex flex-col gap-3 border-b border-[#d8e2d7] bg-[#eef4ee]/90 px-5 py-4 text-xs text-gray-500 dark:border-gray-800 dark:bg-[#181818] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Language</span>
            <select 
              title="Select programming language"
              aria-label="Select programming language"
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-[#fffdf8] dark:bg-[#202020] border border-[#cbd8cb] dark:border-gray-700 rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 dark:text-gray-200 hover:border-[#9fb29f] dark:hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500/70 focus:border-transparent transition-all cursor-pointer"
            >
              <option value="python" className="bg-[#fffdf8] dark:bg-[#1e1e1e] text-slate-900 dark:text-gray-200">Python</option>
              <option value="cpp" className="bg-[#fffdf8] dark:bg-[#1e1e1e] text-slate-900 dark:text-gray-200">C++</option>
            </select>
          </div>
          <div className="rounded-full border border-[#d8e2d7] bg-[#fffdf8] px-3 py-1.5 font-medium text-gray-500 dark:border-gray-700 dark:bg-[#202020] dark:text-gray-400">
            {code.length.toLocaleString()} chars
          </div>
        </div>
        
        <CodeEditor code={code} setCode={handleCodeChange} language={language} />
      </div>

      <button 
        onClick={handleCalculate}
        disabled={isLoading}
        className="bg-teal-600 hover:bg-teal-500 disabled:bg-teal-800 text-white font-medium py-2.5 px-6 rounded-lg transition duration-200 mb-8 shadow-md cursor-pointer"
      >
        {isLoading ? 'Analyzing Code...' : 'Estimate'}
      </button>
      
      {result ? <ResultPanel result={result} /> : (
        <div className="border border-dashed border-[#c7d4c8] dark:border-gray-800 rounded-xl p-8 text-center text-gray-600 dark:text-gray-500 bg-[#e9f0e8] dark:bg-[#0f0f0f] mb-20 transition-colors duration-300">
          Paste your code above and click <strong className="text-slate-900 dark:text-white">Estimate</strong> to analyze its likely time and space complexity.
        </div>
      )}

      <div className="space-y-20 w-full max-w-4xl text-left">
        
        <section className="mb-16 mt-16 max-w-3xl text-left">
          <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-6">How to Use This Tool</h2>
          <ol className="list-decimal list-outside space-y-4 text-gray-700 dark:text-gray-400 leading-relaxed pl-5 mb-8">
            <li><strong>Paste your code</strong> into the editor above. Supports Python and C++.</li>
            <li><strong>Click Estimate</strong> to analyze the likely time and space complexity using Big O notation.</li>
            <li><strong>Review the result</strong> to see the estimate, confidence, and static evidence.</li>
          </ol>
          
          <div className="space-y-3">
            <div className="bg-[#f2f5f0] dark:bg-[#121212] border border-[#dfe7df] dark:border-gray-800 p-5 rounded-lg text-sm text-gray-600 dark:text-gray-400 leading-relaxed shadow-sm">
              <span className="font-bold text-slate-800 dark:text-gray-300">Tip:</span> For the most accurate analysis, use standard naming conventions (e.g., <code>adj</code>, <code>dp</code>, <code>pq</code>, <code>dfs</code>). If the engine gets confused by unusual variable names, our AI will attempt to step in and correct the results!
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-6">Common Complexity Classes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <ComplexityCard title="O(1)" lightBg="bg-green-100" lightText="text-green-800" darkBg="bg-green-900/40" darkText="text-green-400" name="Constant" description="Array access, hash lookup" />
            <ComplexityCard title="O(log n)" lightBg="bg-blue-100" lightText="text-blue-800" darkBg="bg-blue-900/40" darkText="text-blue-400" name="Logarithmic" description="Binary search" />
            <ComplexityCard title="O(n)" lightBg="bg-orange-100" lightText="text-orange-800" darkBg="bg-orange-900/40" darkText="text-orange-400" name="Linear" description="Single loop, linear search" />
            <ComplexityCard title="O(n log n)" lightBg="bg-orange-100" lightText="text-orange-800" darkBg="bg-orange-900/40" darkText="text-orange-400" name="Linearithmic" description="Merge sort, quick sort" />
            <ComplexityCard title="O(n^2)" lightBg="bg-red-100" lightText="text-red-800" darkBg="bg-red-900/40" darkText="text-red-400" name="Quadratic" description="Nested loops, bubble sort" />
            <ComplexityCard title="O(2^n)" lightBg="bg-red-100" lightText="text-red-800" darkBg="bg-red-900/40" darkText="text-red-400" name="Exponential" description="Recursive Fibonacci" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Learn the details in our <Link to="/guide" className="text-blue-600 dark:text-blue-500 hover:underline">comprehensive guide</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-6">Popular Examples</h2>
          <div className="min-w-0 bg-[#fffdf8] dark:bg-[#121212] border border-[#d8e2d7] dark:border-gray-800 rounded-lg p-6 shadow-sm shadow-slate-200/50 dark:shadow-none transition-colors duration-300 mb-6 space-y-8">
            <CodeExample 
              title="Binary Search" 
              badgeTitle="O(log n)" lightBg="bg-blue-100" lightText="text-blue-800" darkBg="bg-blue-900/40" darkText="text-blue-400"
              code={`def binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        if arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n\n    return -1`}
              explanation="Halves the search space each iteration -> logarithmic time, constant space."
            />
            <div className="border-t border-[#d8e2d7] dark:border-gray-800 pt-8">
              <CodeExample 
                title="Two Sum (Brute Force vs Hash Map)" 
                badgeTitle="O(n^2) / O(n)" lightBg="bg-red-100" lightText="text-red-800" darkBg="bg-red-900/40" darkText="text-red-400"
                code={`# Brute force: O(n^2)\ndef two_sum(nums, target):\n    for i in range(len(nums)):\n        for j in range(i + 1, len(nums)):\n            if nums[i] + nums[j] == target:\n                return [i, j]\n\n# Optimized: O(n)\ndef two_sum_fast(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i`}
                explanation="A hash map trades O(n) space for an O(n^2) -> O(n) time improvement."
              />
            </div>
            <div className="border-t border-[#d8e2d7] dark:border-gray-800 pt-8">
              <CodeExample 
                title="Merge Sort" 
                badgeTitle="O(n log n)" lightBg="bg-orange-100" lightText="text-orange-800" darkBg="bg-orange-900/40" darkText="text-orange-400"
                code={`def merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n\n    return merge(left, right)`}
                explanation="Divides array into halves (log n levels), merges n elements per level."
              />
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            See more on the <Link to="/examples" className="text-blue-600 dark:text-blue-500 hover:underline">examples page</Link>.
          </p>
        </section>

        <section className="space-y-4 text-gray-700 dark:text-gray-400 leading-relaxed">
          <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-4">What is Big O Notation?</h2>
          <p>Big O notation is a mathematical notation used to describe the performance or complexity of an algorithm. It specifically describes the worst-case scenario and helps you understand how the runtime or space requirements grow as the input size increases.</p>
          <p>Think of it as a way to answer: <em className="text-slate-900 dark:text-gray-300">"If I double my input, how much slower does my code get?"</em> An O(n) algorithm takes twice as long, an O(n^2) algorithm takes four times as long, and an O(log n) algorithm barely notices the difference.</p>
          <p>When analyzing complexity, we focus on the <strong className="text-slate-900 dark:text-gray-200">rate of growth</strong> rather than exact numbers. Constants and lower-order terms are dropped because they become insignificant as the input grows very large. For example, O(2n + 5) simplifies to O(n).</p>
        </section>

        <section className="space-y-4 text-gray-700 dark:text-gray-400 leading-relaxed">
          <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-4">Why Big O Matters</h2>
          <p>Choosing the right algorithm can mean the difference between a program that finishes in milliseconds and one that takes hours. For example, sorting 1 million items with bubble sort (O(n^2)) requires roughly 1 trillion operations, while merge sort (O(n log n)) needs only about 20 million - a 50,000x improvement.</p>
          <p>Big O analysis is essential for coding interviews at top tech companies, competitive programming, and building production systems that need to scale. It gives you a shared vocabulary to discuss algorithm efficiency with other engineers.</p>
        </section>

        <section className="space-y-4 text-gray-700 dark:text-gray-400 leading-relaxed border-t border-[#d8e2d7] dark:border-gray-800 pt-10">
          <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-4">Start Learning</h2>
          <p>New to Big O? Our <Link to="/tutorial" className="text-blue-600 dark:text-blue-500 hover:underline">step-by-step tutorial</Link> walks you through 16 lessons covering everything from constant time to dynamic programming and graph traversal.</p>
          <p>Prefer a reference? Read the <Link to="/guide" className="text-blue-600 dark:text-blue-500 hover:underline">comprehensive guide</Link> for a complete overview of all complexity classes, or explore <Link to="/examples" className="text-blue-600 dark:text-blue-500 hover:underline">real algorithm examples</Link> with detailed analysis. Have questions? Check the <Link to="/faq" className="text-blue-600 dark:text-blue-500 hover:underline">FAQ</Link>.</p>
        </section>

      </div>
    </>
  );
}
