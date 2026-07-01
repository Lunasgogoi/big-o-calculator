// src/pages/Guide.tsx
import { Link } from 'react-router-dom';
import { timeComplexities, spaceComplexities } from '../data/guideData';

const badgeStyles = 'inline-flex w-fit items-center rounded-md border border-teal-200 bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700 dark:border-teal-900/60 dark:bg-teal-950/40 dark:text-teal-300';

export default function Guide() {
  return (
    <div className="max-w-4xl mx-auto w-full min-w-0 pt-8 pb-24 text-slate-700 dark:text-gray-300">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 font-serif text-slate-900 dark:text-white">Big O Notation: A Comprehensive Guide</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">Master algorithm complexity analysis with this complete guide</p>
      </div>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 font-serif text-slate-900 dark:text-white">What is Big O Notation?</h2>
        <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
          <p>Big O notation describes how an algorithm's runtime or memory use grows as the input size grows.</p>
          <p>In practice, it gives you a compact way to answer: "How does this algorithm behave when the input gets much larger?"</p>
          <p>Big O focuses on the <em className="text-slate-800 dark:text-gray-300">rate of growth</em>, so constants and smaller terms are usually ignored for large inputs.</p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 font-serif text-slate-900 dark:text-white">Growth Comparison</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Best', val: 'O(1), O(log n)' },
            { label: 'Good', val: 'O(n)' },
            { label: 'Fair', val: 'O(n log n)' },
            { label: 'Poor', val: 'O(n^2), O(2^n)' },
          ].map((g) => (
            <div key={g.label} className="bg-[#fffdf8] dark:bg-[#151515] p-4 rounded-lg border border-[#d8e2d7] dark:border-gray-800 text-center shadow-sm shadow-slate-200/50 dark:shadow-none">
              <p className="text-xs font-bold text-gray-500 dark:text-gray-500 uppercase">{g.label}</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">{g.val}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 font-serif text-slate-900 dark:text-white">Common Time Complexities</h2>
        <p className="mb-8 text-gray-600 dark:text-gray-400">Here are the most common time complexities you'll encounter, ordered from best to worst performance:</p>

        <div className="space-y-12">
          {timeComplexities.map((item) => (
            <div key={item.id} className="min-w-0">
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{item.title}</h3>
              <span className={`${badgeStyles} mb-4`}>
                {item.badgeText}
              </span>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{item.description}</p>

              <div className="min-w-0 overflow-hidden bg-[#f2f5f0] dark:bg-[#171717] rounded-lg my-5 border border-[#d8e2d7] dark:border-gray-800">
                <pre className="m-0 max-w-full overflow-x-auto p-5 font-mono text-sm leading-relaxed text-slate-800 dark:text-gray-300 whitespace-pre custom-scrollbar">
                  <code>{item.code}</code>
                </pre>
              </div>

              {item.examplesList && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong className="text-slate-900 dark:text-gray-200">Examples:</strong> {item.examplesList}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 font-serif text-slate-900 dark:text-white">Space Complexity</h2>
        <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
          <p>While time complexity measures how long an algorithm takes to run, <strong className="text-slate-900 dark:text-gray-200">space complexity</strong> measures how much memory it uses.</p>
          <p>When analyzing space complexity, distinguish auxiliary memory from memory already used by the input.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-slate-900 dark:text-gray-200">Auxiliary space:</strong> Extra space used by the algorithm.</li>
            <li><strong className="text-slate-900 dark:text-gray-200">Input space:</strong> Space required to store the input.</li>
            <li><strong className="text-slate-900 dark:text-gray-200">Total space:</strong> Auxiliary space plus input space.</li>
          </ul>
        </div>

        <div className="space-y-6">
          {spaceComplexities.map((item) => (
            <div
              key={item.id}
              className="min-w-0 overflow-hidden rounded-lg border border-[#d8e2d7] dark:border-gray-800 bg-[#fffdf8] dark:bg-[#151515] shadow-sm shadow-slate-200/50 dark:shadow-none"
            >
              <div className="px-6 py-5">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
              </div>

              <div className="border-t border-[#d8e2d7] dark:border-gray-800">
                <pre className="m-0 max-w-full overflow-x-auto p-6 text-sm leading-relaxed text-slate-800 dark:text-gray-300 custom-scrollbar">
                  <code>{item.code}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 font-serif text-slate-900 dark:text-white">Best, Average, and Worst Case</h2>
        <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
          <p>Algorithms can have different performance characteristics depending on the input:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-slate-900 dark:text-gray-200">Best case:</strong> The input that makes the algorithm perform optimally.</li>
            <li><strong className="text-slate-900 dark:text-gray-200">Average case:</strong> Expected performance for typical inputs.</li>
            <li><strong className="text-slate-900 dark:text-gray-200">Worst case:</strong> The input that makes the algorithm perform most poorly.</li>
          </ul>
          <p>When people discuss Big O, they usually mean worst-case behavior because it gives a useful upper bound.</p>
        </div>

        <div className="border border-[#d8e2d7] dark:border-gray-800 rounded-lg p-6 bg-[#f2f5f0] dark:bg-[#121212]">
          <h4 className="font-bold text-slate-900 dark:text-white mb-4">Example: Quick Sort</h4>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <li><strong className="text-slate-900 dark:text-gray-200">Best case:</strong> O(n log n) - pivot divides array evenly</li>
            <li><strong className="text-slate-900 dark:text-gray-200">Average case:</strong> O(n log n) - typical random input</li>
            <li><strong className="text-slate-900 dark:text-gray-200">Worst case:</strong> O(n^2) - already sorted array with poor pivot selection</li>
          </ul>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 font-serif text-slate-900 dark:text-white">Rules for Calculating Big O</h2>
        <ol className="list-decimal pl-6 space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
          <li><strong className="text-slate-900 dark:text-gray-200">Drop constants:</strong> O(2n) becomes O(n), O(500) becomes O(1)</li>
          <li><strong className="text-slate-900 dark:text-gray-200">Drop non-dominant terms:</strong> O(n^2 + n) becomes O(n^2), O(n + log n) becomes O(n)</li>
          <li><strong className="text-slate-900 dark:text-gray-200">Different inputs use different variables:</strong> If two inputs have different sizes, use variables like O(a + b) or O(a * b)</li>
          <li><strong className="text-slate-900 dark:text-gray-200">Sequential steps add:</strong> If you do A then B, it is O(A + B)</li>
          <li><strong className="text-slate-900 dark:text-gray-200">Nested steps multiply:</strong> If you do B for each A, it is O(A * B)</li>
        </ol>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 font-serif text-slate-900 dark:text-white">Practical Tips</h2>
        <ul className="list-disc pl-6 space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
          <li>Always consider the worst-case scenario when designing systems.</li>
          <li>For small inputs, a simple O(n^2) algorithm can be faster than a complex O(n log n) one because constants still matter.</li>
          <li>Space-time tradeoffs are common: you can often use more memory to reduce runtime.</li>
          <li>Make it work first, then optimize when performance actually matters.</li>
          <li>Use our <Link to="/" className="text-emerald-600 dark:text-emerald-500 hover:underline">calculator</Link> to check your complexity estimate.</li>
          <li>Practice with <Link to="/examples" className="text-emerald-600 dark:text-emerald-500 hover:underline">real examples</Link> to build intuition.</li>
        </ul>
      </section>

      <section className="border-t border-[#d8e2d7] dark:border-gray-800 pt-12 mb-12">
        <h2 className="text-2xl font-bold mb-4 font-serif text-slate-900 dark:text-white">Next Steps</h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          Now that you understand Big O notation, try analyzing real code. Visit our <Link to="/examples" className="text-emerald-600 dark:text-emerald-500 hover:underline">examples page</Link> to see common algorithms analyzed, or use our <Link to="/" className="text-emerald-600 dark:text-emerald-500 hover:underline">calculator</Link> to analyze your own code. If you have questions, check out our <Link to="/faq" className="text-emerald-600 dark:text-emerald-500 hover:underline">FAQ</Link>.
        </p>
      </section>
    </div>
  );
}
