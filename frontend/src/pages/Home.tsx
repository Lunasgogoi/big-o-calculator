// src/pages/Home.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom'; // Added this to link to our other pages!
import ComplexityCard from '../components/ComplexityCard';
import CodeExample from '../components/CodeExample';
import ResultPanel from '../components/ResultPanel';
import CodeEditor from '../components/CodeEditor';
//import { useEffect } from 'react';

interface AnalysisResult {
  status: string;
  time_complexity: string;
  space_complexity: string;
  analysis_steps: string[];
  ai_suggestion: string;
}

export default function Home({code, setCode,language,setLanguage}: any) {
 
  const [result, setResult] = useState<AnalysisResult | null>(null);


  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async () => {
    if (!code.trim()) return;
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://localhost:8000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code, language: language }), // <-- Sends the dynamic language!
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
    <>
      {/* --- HERO & EDITOR SECTION --- */}
      <header className="mb-10">
        <h1 className="text-4xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">Big O Calc</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
          Calculate the time and space complexity of your code using Big O notation.
        </p>
      </header>

      <div className="bg-white dark:bg-[#161616] rounded-xl border border-gray-300 dark:border-gray-800 p-4 mb-6 shadow-xl dark:shadow-2xl transition-colors duration-300">
        <div className="flex justify-between items-center mb-4 text-xs text-gray-500 border-b border-gray-200 dark:border-gray-800 pb-3">
          <div className="flex space-x-2 items-center">
            <div className="w-3 h-3 rounded-full bg-red-400 dark:bg-gray-700"></div>
            <div className="w-3 h-3 rounded-full bg-amber-400 dark:bg-gray-700"></div>
            <div className="w-3 h-3 rounded-full bg-green-400 dark:bg-gray-700"></div>
            
            {/* The New Language Dropdown! */}
            {/* The Beautifully Styled Language Dropdown */}
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="ml-4 bg-gray-100 dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-700 rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all cursor-pointer"
            >
              <option value="python" className="bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-gray-200">Python</option>
              <option value="cpp" className="bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-gray-200">C++</option>
              <option value="c" className="bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-gray-200">C</option>
            </select>
          </div>
          <div>{code.length} / 1,500</div>
        </div>
        
        {/* Pass the dynamic language down to PrismJS! */}
        <CodeEditor code={code} setCode={setCode} language={language} />
      </div>

      <button 
        onClick={handleCalculate}
        disabled={isLoading}
        className="bg-teal-600 hover:bg-teal-500 disabled:bg-teal-800 text-white font-medium py-2.5 px-6 rounded-lg transition duration-200 mb-8 shadow-md cursor-pointer"
      >
        {isLoading ? 'Analyzing AST...' : 'Calculate'}
      </button>

      {error && <div className="text-red-600 dark:text-red-400 mb-8 p-4 border border-red-300 dark:border-red-900 rounded-lg bg-red-50 dark:bg-red-950/30">{error}</div>}
      
      {result ? <ResultPanel result={result} /> : (
        <div className="border border-dashed border-gray-300 dark:border-gray-800 rounded-xl p-8 text-center text-gray-600 dark:text-gray-500 bg-gray-100 dark:bg-[#0f0f0f] mb-20 transition-colors duration-300">
          Paste your code above and click <strong className="text-gray-900 dark:text-white">Calculate</strong> to analyze its time and space complexity.
        </div>
      )}

      {/* --- INFORMATIONAL CONTENT (Landing Page Overview) --- */}
      <div className="space-y-20 max-w-3xl text-left">
        
        {/* Common Complexity Classes */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-6">Common Complexity Classes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <ComplexityCard title="O(1)" lightBg="bg-green-100" lightText="text-green-800" darkBg="bg-green-900/40" darkText="text-green-400" name="Constant" description="Array access, hash lookup" />
            <ComplexityCard title="O(log n)" lightBg="bg-blue-100" lightText="text-blue-800" darkBg="bg-blue-900/40" darkText="text-blue-400" name="Logarithmic" description="Binary search" />
            <ComplexityCard title="O(n)" lightBg="bg-orange-100" lightText="text-orange-800" darkBg="bg-orange-900/40" darkText="text-orange-400" name="Linear" description="Single loop, linear search" />
            <ComplexityCard title="O(n log n)" lightBg="bg-orange-100" lightText="text-orange-800" darkBg="bg-orange-900/40" darkText="text-orange-400" name="Linearithmic" description="Merge sort, quick sort" />
            <ComplexityCard title="O(n²)" lightBg="bg-red-100" lightText="text-red-800" darkBg="bg-red-900/40" darkText="text-red-400" name="Quadratic" description="Nested loops, bubble sort" />
            <ComplexityCard title="O(2ⁿ)" lightBg="bg-red-100" lightText="text-red-800" darkBg="bg-red-900/40" darkText="text-red-400" name="Exponential" description="Recursive Fibonacci" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Learn the details in our <Link to="/guide" className="text-teal-600 dark:text-teal-500 hover:underline">comprehensive guide</Link>.
          </p>
        </section>

        {/* Popular Examples */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-6">Popular Examples</h2>
          <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm dark:shadow-none transition-colors duration-300 mb-6 space-y-8">
            <CodeExample 
              title="Binary Search" 
              badgeTitle="O(log n)" lightBg="bg-blue-100" lightText="text-blue-800" darkBg="bg-blue-900/40" darkText="text-blue-400"
              code={`function binarySearch(arr, target) {\n  let left = 0, right = arr.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}`}
              explanation="Halves the search space each iteration → logarithmic time, constant space."
            />
            <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
              <CodeExample 
                title="Two Sum (Brute Force vs Hash Map)" 
                badgeTitle="O(n²) / O(n)" lightBg="bg-red-100" lightText="text-red-800" darkBg="bg-red-900/40" darkText="text-red-400"
                code={`// Brute force: O(n²)\nfunction twoSum(nums, target) {\n  for (let i = 0; i < nums.length; i++) {\n    for (let j = i + 1; j < nums.length; j++) {\n      if (nums[i] + nums[j] === target) return [i, j];\n    }\n  }\n}\n\n// Optimized: O(n)\nfunction twoSumFast(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) return [map.get(complement), i];\n    map.set(nums[i], i);\n  }\n}`}
                explanation="A hash map trades O(n) space for O(n²) → O(n) time improvement."
              />
            </div>
            <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
              <CodeExample 
                title="Merge Sort" 
                badgeTitle="O(n log n)" lightBg="bg-orange-100" lightText="text-orange-800" darkBg="bg-orange-900/40" darkText="text-orange-400"
                code={`function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  return merge(left, right);\n}`}
                explanation="Divides array into halves (log n levels), merges n elements per level."
              />
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            See more on the <Link to="/examples" className="text-teal-600 dark:text-teal-500 hover:underline">examples page</Link>.
          </p>
        </section>

        {/* Text Sections */}
        <section className="space-y-4 text-gray-700 dark:text-gray-400 leading-relaxed">
          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-4">What is Big O Notation?</h2>
          <p>Big O notation is a mathematical notation used to describe the performance or complexity of an algorithm. It specifically describes the worst-case scenario and helps you understand how the runtime or space requirements grow as the input size increases.</p>
          <p>Think of it as a way to answer: <em className="text-gray-900 dark:text-gray-300">"If I double my input, how much slower does my code get?"</em> An O(n) algorithm takes twice as long, an O(n²) algorithm takes four times as long, and an O(log n) algorithm barely notices the difference.</p>
          <p>When analyzing complexity, we focus on the <strong className="text-gray-900 dark:text-gray-200">rate of growth</strong> rather than exact numbers. Constants and lower-order terms are dropped because they become insignificant as the input grows very large. For example, O(2n + 5) simplifies to O(n).</p>
        </section>

        <section className="space-y-4 text-gray-700 dark:text-gray-400 leading-relaxed">
          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-4">Why Big O Matters</h2>
          <p>Choosing the right algorithm can mean the difference between a program that finishes in milliseconds and one that takes hours. For example, sorting 1 million items with bubble sort (O(n²)) requires roughly 1 trillion operations, while merge sort (O(n log n)) needs only about 20 million — a 50,000x improvement.</p>
          <p>Big O analysis is essential for coding interviews at top tech companies, competitive programming, and building production systems that need to scale. It gives you a shared vocabulary to discuss algorithm efficiency with other engineers.</p>
        </section>

        <section className="space-y-4 text-gray-700 dark:text-gray-400 leading-relaxed border-t border-gray-200 dark:border-gray-800 pt-10">
          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-4">Start Learning</h2>
          <p>New to Big O? Our <Link to="/tutorial" className="text-teal-600 dark:text-teal-500 hover:underline">step-by-step tutorial</Link> walks you through 16 lessons covering everything from constant time to dynamic programming and graph traversal.</p>
          <p>Prefer a reference? Read the <Link to="/guide" className="text-teal-600 dark:text-teal-500 hover:underline">comprehensive guide</Link> for a complete overview of all complexity classes, or explore <Link to="/examples" className="text-teal-600 dark:text-teal-500 hover:underline">real algorithm examples</Link> with detailed analysis. Have questions? Check the <Link to="/faq" className="text-teal-600 dark:text-teal-500 hover:underline">FAQ</Link>.</p>
        </section>

      </div>
    </>
  );
}