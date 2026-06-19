// src/pages/Guide.tsx
// import React from 'react';
import { Link } from 'react-router-dom';
import { timeComplexities, spaceComplexities } from '../data/guideData';

const getBadgeStyles = (color: string) => {
  switch (color) {
    case 'green': return 'bg-green-50 text-green-600 border-green-200 dark:bg-green-900/30 dark:text-green-500 dark:border-green-900/50';
    case 'orange': return 'bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-900/30 dark:text-orange-500 dark:border-orange-900/50';
    case 'red': return 'bg-red-50 text-red-600 border-red-200 dark:bg-red-900/30 dark:text-red-500 dark:border-red-900/50';
    case 'blue': return 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/30 dark:text-blue-500 dark:border-blue-900/50';
    default: return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
  }
};

export default function Guide() {
  return (
    <div className="max-w-4xl mx-auto w-full pt-8 pb-24 text-gray-700 dark:text-gray-300">

      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 font-serif text-gray-900 dark:text-white">Big O Notation: A Comprehensive Guide</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">Master algorithm complexity analysis with this complete guide</p>
      </div>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 font-serif text-gray-900 dark:text-white">What is Big O Notation?</h2>
        <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
          <p>Big O notation is a mathematical notation that describes the limiting behavior of a function when the argument tends towards a particular value or infinity. In computer science, we use it to classify algorithms according to how their run time or space requirements grow as the input size grows.</p>
          <p>Think of Big O notation as a way to express the <strong className="text-gray-900 dark:text-gray-200">worst-case scenario</strong> for your algorithm's performance. It answers the question: "How does my algorithm's performance scale when I double, triple, or 10x my input size?"</p>
          <p>Big O notation focuses on the <em className="text-gray-800 dark:text-gray-300">rate of growth</em> rather than exact numbers. We ignore constants and lower-order terms because they become insignificant as the input size grows very large.</p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 font-serif text-gray-900 dark:text-white">Growth Comparison</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Best', color: 'text-green-400', val: 'O(1), O(log n)' },
            { label: 'Good', color: 'text-blue-400', val: 'O(n)' },
            { label: 'Fair', color: 'text-orange-400', val: 'O(n log n)' },
            { label: 'Poor', color: 'text-red-400', val: 'O(n²), O(2ⁿ)' }
          ].map((g) => (
            <div key={g.label} className="bg-white dark:bg-[#121212] p-4 rounded-xl border border-gray-200 dark:border-gray-800 text-center">
              <p className="text-xs font-bold text-gray-500 uppercase">{g.label}</p>
              <p className={`text-lg font-bold ${g.color}`}>{g.val}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 font-serif text-gray-900 dark:text-white">Common Time Complexities</h2>
        <p className="mb-8 text-gray-600 dark:text-gray-400">Here are the most common time complexities you'll encounter, ordered from best to worst performance:</p>

        <div className="space-y-12">
          {timeComplexities.map((item) => (
            <div key={item.id}>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{item.title}</h3>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border mb-4 ${getBadgeStyles(item.badgeColor)}`}>
                {item.badgeText}
              </span>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{item.description}</p>

              <div className="bg-[#0a0a0a] rounded-xl p-5 my-5 border border-gray-800 shadow-inner">
                <pre className="font-mono text-sm text-gray-300 overflow-x-auto whitespace-pre">
                  <code>{item.code}</code>
                </pre>
              </div>

              {item.examplesList && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong className="text-gray-900 dark:text-gray-200">Examples:</strong> {item.examplesList}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 font-serif text-gray-900 dark:text-white">Space Complexity</h2>
        <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
          <p>While time complexity measures how long an algorithm takes to run, <strong className="text-gray-900 dark:text-gray-200">space complexity</strong> measures how much memory it uses. The same Big O notation applies.</p>
          <p>When analyzing space complexity, we consider:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-gray-900 dark:text-gray-200">Auxiliary space:</strong> Extra space used by the algorithm (not including input)</li>
            <li><strong className="text-gray-900 dark:text-gray-200">Input space:</strong> Space required to store the input</li>
            <li><strong className="text-gray-900 dark:text-gray-200">Total space:</strong> Auxiliary space + Input space</li>
          </ul>
        </div>

        <div className="space-y-6">
          {spaceComplexities.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-gray-800 bg-[#121212]"
            >
              <div className="px-6 py-5">
                <h3 className="text-xl font-bold text-white">
                  {item.title}
                </h3>
              </div>

              <div className="border-t border-gray-800">
                <pre className="overflow-x-auto p-6 text-sm text-gray-300">
                  <code>{item.code}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 font-serif text-gray-900 dark:text-white">Best, Average, and Worst Case</h2>
        <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
          <p>Algorithms can have different performance characteristics depending on the input:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-gray-900 dark:text-gray-200">Best case:</strong> The input that makes the algorithm perform optimally (denoted Ω - Omega)</li>
            <li><strong className="text-gray-900 dark:text-gray-200">Average case:</strong> Expected performance for typical inputs (denoted Θ - Theta)</li>
            <li><strong className="text-gray-900 dark:text-gray-200">Worst case:</strong> The input that makes the algorithm perform most poorly (denoted O - Big O)</li>
          </ul>
          <p>When we talk about Big O notation, we're usually referring to the <strong className="text-gray-900 dark:text-gray-200">worst case</strong> scenario, as it gives us a guarantee that the algorithm will never perform worse than this.</p>
        </div>

        <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 bg-gray-50 dark:bg-[#121212]">
          <h4 className="font-bold text-gray-900 dark:text-white mb-4">Example: Quick Sort</h4>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <li><strong className="text-gray-900 dark:text-gray-200">Best case:</strong> O(n log n) - pivot divides array evenly</li>
            <li><strong className="text-gray-900 dark:text-gray-200">Average case:</strong> O(n log n) - typical random input</li>
            <li><strong className="text-gray-900 dark:text-gray-200">Worst case:</strong> O(n²) - already sorted array with poor pivot selection</li>
          </ul>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 font-serif text-gray-900 dark:text-white">Rules for Calculating Big O</h2>
        <ol className="list-decimal pl-6 space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
          <li><strong className="text-gray-900 dark:text-gray-200">Drop constants:</strong> O(2n) becomes O(n), O(500) becomes O(1)</li>
          <li><strong className="text-gray-900 dark:text-gray-200">Drop non-dominant terms:</strong> O(n² + n) becomes O(n²), O(n + log n) becomes O(n)</li>
          <li><strong className="text-gray-900 dark:text-gray-200">Different inputs use different variables:</strong> If you have two inputs of different sizes, use different variables like O(a + b) or O(a * b)</li>
          <li><strong className="text-gray-900 dark:text-gray-200">Sequential steps add:</strong> If you do A then B, it's O(A + B)</li>
          <li><strong className="text-gray-900 dark:text-gray-200">Nested steps multiply:</strong> If you do B for each A, it's O(A * B)</li>
        </ol>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 font-serif text-gray-900 dark:text-white">Practical Tips</h2>
        <ul className="list-disc pl-6 space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
          <li>Always consider the worst-case scenario when designing systems</li>
          <li>For small inputs, a simpler O(n²) algorithm might be faster than a complex O(n log n) one due to lower constants</li>
          <li>Space-time tradeoffs are common: you can often use more memory to make things faster</li>
          <li>Premature optimization is the root of all evil — make it work first, then optimize if needed</li>
          <li>Use our <Link to="/" className="text-emerald-600 dark:text-emerald-500 hover:underline">calculator</Link> to verify your complexity analysis</li>
          <li>Practice with <Link to="/examples" className="text-emerald-600 dark:text-emerald-500 hover:underline">real examples</Link> to build intuition</li>
        </ul>
      </section>

      <section className="border-t border-gray-200 dark:border-gray-800 pt-12 mb-12">
        <h2 className="text-2xl font-bold mb-4 font-serif text-gray-900 dark:text-white">Next Steps</h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          Now that you understand Big O notation, try analyzing some real code! Visit our <Link to="/examples" className="text-emerald-600 dark:text-emerald-500 hover:underline">examples page</Link> to see common algorithms analyzed, or use our <Link to="/" className="text-emerald-600 dark:text-emerald-500 hover:underline">calculator</Link> to analyze your own code. If you have questions, check out our <Link to="/faq" className="text-emerald-600 dark:text-emerald-500 hover:underline">FAQ</Link>.
        </p>
      </section>

    </div>
  );
}