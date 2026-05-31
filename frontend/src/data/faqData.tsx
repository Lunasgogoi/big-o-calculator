// src/data/faqData.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

export interface FAQCategory {
  categoryName: string;
  questions: FAQItem[];
}

export const faqData: FAQCategory[] = [
  {
    categoryName: "General Questions",
    questions: [
      {
        question: "What exactly is Big O notation?",
        answer: (
          <div className="space-y-4">
            <p>Big O notation is a mathematical way to describe how the runtime or space requirements of an algorithm grow as the input size increases. It gives us an upper bound on the growth rate, focusing on the worst-case scenario. For example, O(n) means the algorithm's runtime grows linearly with the input size.</p>
            <p>The "O" stands for "order of" and represents the order of growth. We use it to classify algorithms and compare their efficiency without worrying about specific hardware or implementation details.</p>
          </div>
        )
      },
      {
        question: "Why do we drop constants in Big O notation?",
        answer: (
          <div className="space-y-4">
            <p>We drop constants because Big O notation focuses on how algorithms scale with large inputs, not their exact runtime. For example, an algorithm that takes 2n steps and one that takes 100n steps are both O(n) because they both scale linearly.</p>
            <p>When n is very large (say, 1 million), the difference between 2n and 100n is insignificant compared to the difference between O(n) and O(n²). The constant factor of 100 vs 2 matters less than the fundamental growth rate.</p>
            <p>That said, in practice, constants do matter! An O(n) algorithm with a huge constant might be slower than an O(n log n) algorithm for realistic input sizes. Big O is about theoretical scalability, not always practical performance.</p>
          </div>
        )
      },
      {
        question: "What's the difference between time complexity and space complexity?",
        answer: (
          <div className="space-y-4">
            <p><strong className="text-gray-200">Time complexity</strong> measures how the runtime of an algorithm grows with input size. It answers: "How many operations does this algorithm perform?"</p>
            <p><strong className="text-gray-200">Space complexity</strong> measures how much memory an algorithm uses as input size grows. It answers: "How much extra memory does this algorithm need?"</p>
            <p>For example, an algorithm that creates a copy of an input array has O(n) space complexity, while one that only uses a few variables has O(1) space complexity. Often there's a trade-off: you can use more memory to make things faster (or vice versa).</p>
          </div>
        )
      },
      {
        question: "Is O(2n) the same as O(n)?",
        answer: (
          <div className="space-y-4">
            <p>Yes! In Big O notation, O(2n) simplifies to O(n) because we drop constant factors. Both grow linearly with the input size.</p>
            <p>However, don't confuse O(2n) with O(2ⁿ). The latter is exponential time complexity, which is completely different and much worse. O(2ⁿ) means the runtime doubles with each additional input element, making it impractical for large inputs.</p>
          </div>
        )
      }
    ]
  },
  {
    categoryName: "Understanding Complexities",
    questions: [
      {
        question: "Which Big O complexity is the best?",
        answer: (
          <div className="space-y-4">
            <p>From best to worst, common complexities are:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li><strong className="text-gray-200">O(1)</strong> — Constant: Best possible, doesn't grow with input</li>
              <li><strong className="text-gray-200">O(log n)</strong> — Logarithmic: Excellent for large datasets</li>
              <li><strong className="text-gray-200">O(n)</strong> — Linear: Good, scales proportionally</li>
              <li><strong className="text-gray-200">O(n log n)</strong> — Linearithmic: Acceptable for sorting</li>
              <li><strong className="text-gray-200">O(n²)</strong> — Quadratic: Poor for large inputs</li>
              <li><strong className="text-gray-200">O(2ⁿ)</strong> — Exponential: Very poor, only works for tiny inputs</li>
              <li><strong className="text-gray-200">O(n!)</strong> — Factorial: Extremely poor, almost never acceptable</li>
            </ol>
            <p>However, "best" depends on context. For small inputs, a simple O(n²) algorithm might be faster in practice than a complex O(n log n) one due to lower overhead.</p>
          </div>
        )
      },
      {
        question: "How do I know if my nested loops are O(n²)?",
        answer: (
          <div className="space-y-4">
            <p>If you have two nested loops that both iterate through the entire input, you typically have O(n²) complexity. For example:</p>
            <div className="bg-[#1e1e1e] border border-gray-800 rounded-xl p-4">
              <pre className="text-sm font-mono text-gray-300">
<code>{`for i in range(n):     # Runs n times
  for j in range(n):   # Runs n times for each i`}</code>
              </pre>
            </div>
            <p>However, if the inner loop doesn't always run n times, the complexity might be different. For example:</p>
            <div className="bg-[#1e1e1e] border border-gray-800 rounded-xl p-4">
              <pre className="text-sm font-mono text-gray-300">
<code>{`for i in range(n):     # Runs n times
  for j in range(i):   # Runs i times (0, 1, 2, ..., n-1)`}</code>
              </pre>
            </div>
            <p>This is still O(n²) because we drop the constant factor of 1/2 and the lower-order term.</p>
          </div>
        )
      },
      {
        question: "What does O(log n) mean in practical terms?",
        answer: (
          <div className="space-y-4">
            <p>O(log n) means that each operation reduces the problem size by a constant factor (usually half). This is incredibly efficient because even with huge inputs, you only need a small number of operations.</p>
            <p>For example, with binary search on 1 million items, you need at most log₂(1,000,000) ≈ 20 comparisons. Double the input to 2 million items, and you only need one more comparison (21 total). This is why logarithmic algorithms scale so well.</p>
            <p>Common O(log n) algorithms include binary search, balanced tree operations, and many divide-and-conquer algorithms.</p>
          </div>
        )
      },
      {
        question: "Can an algorithm have different time and space complexity?",
        answer: (
          <div className="space-y-4">
            <p>Absolutely! Time and space complexity are independent. For example:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-gray-200">Merge sort:</strong> O(n log n) time, O(n) space — fast but uses extra memory</li>
              <li><strong className="text-gray-200">Bubble sort:</strong> O(n²) time, O(1) space — slow but memory efficient</li>
              <li><strong className="text-gray-200">Hash table lookup:</strong> O(1) time, O(n) space — very fast but needs storage</li>
            </ul>
            <p>Often there's a trade-off: you can use more memory to achieve better time complexity, or save memory at the cost of slower performance. The best choice depends on your specific constraints.</p>
          </div>
        )
      }
    ]
  },
  {
    categoryName: "Using Big O Calc",
    questions: [
      {
        question: "What programming languages does Big O Calc support?",
        answer: (
          <div className="space-y-4">
            <p>Big O Calc supports most popular programming languages including Python, JavaScript, Java, C++, C#, Ruby, Go, and more. The AI analyzes the algorithmic structure of your code, which is similar across languages.</p>
            <p>For best results, submit clean, well-formatted code with clear logic. The tool focuses on algorithmic patterns like loops, recursion, and data structure operations rather than language-specific syntax.</p>
          </div>
        )
      },
      {
        question: "How accurate is the Big O Calc analysis?",
        answer: (
          <div className="space-y-4">
            <p>Big O Calc uses advanced AI to analyze code patterns and provide complexity estimates. It's very accurate for common algorithmic patterns and standard implementations.</p>
            <p>However, like any automated tool, it may occasionally misinterpret complex or unusual code. Always use the analysis as a learning aid and verification tool, not as a replacement for understanding the underlying concepts.</p>
            <p>If you get an unexpected result, try simplifying your code or breaking it into smaller functions to analyze separately.</p>
          </div>
        )
      },
      {
        question: "Is my code stored or shared when I use Big O Calc?",
        answer: (
          <div className="space-y-4">
            <p>No! Your code is analyzed in real-time and immediately discarded. We don't store, log, or share any code you submit. Your privacy and code confidentiality are important to us.</p>
            <p>The tool is completely free to use and doesn't require registration, so there's no account or history associated with your usage.</p>
          </div>
        )
      },
      {
        question: "Can I analyze code snippets or does it need to be complete programs?",
        answer: (
          <div className="space-y-4">
            <p>You can analyze code snippets! You don't need a complete, runnable program. Focus on the algorithmic part you want to analyze — a single function, loop, or algorithm is perfect.</p>
            <p>For best results:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Include the complete logic of the algorithm you're analyzing</li>
              <li>Remove unnecessary boilerplate or setup code</li>
              <li>Make sure loops and recursive calls are clear</li>
              <li>Include comments if the logic is complex</li>
            </ul>
          </div>
        )
      },
      {
        question: "What if I disagree with the complexity analysis?",
        answer: (
          <div className="space-y-4">
            <p>If you believe the analysis is incorrect, consider these steps:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Review our <Link to="/guide" className="text-emerald-500 hover:text-emerald-400">Big O Guide</Link> to verify your understanding</li>
              <li>Check the <Link to="/examples" className="text-emerald-500 hover:text-emerald-400">examples page</Link> for similar algorithms</li>
              <li>Simplify your code and resubmit to isolate the issue</li>
              <li>Manually trace through your algorithm with different input sizes</li>
            </ol>
            <p>Remember that Big O describes worst-case behavior. Your algorithm might perform better on average, but the worst case determines the Big O classification.</p>
          </div>
        )
      }
    ]
  },
  {
    categoryName: "Practical Applications",
    questions: [
      {
        question: "When should I care about Big O notation?",
        answer: (
          <div className="space-y-4">
            <p>You should care about Big O when:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Working with large datasets (thousands or millions of items)</li>
              <li>Building systems that need to scale</li>
              <li>Optimizing performance-critical code</li>
              <li>Preparing for technical interviews</li>
              <li>Choosing between different algorithms or data structures</li>
              <li>Debugging performance issues</li>
            </ul>
            <p>For small, fixed-size inputs or code that runs infrequently, Big O optimization might not be necessary. Focus on code clarity and correctness first, then optimize if performance becomes an issue.</p>
          </div>
        )
      },
      {
        question: "How do I improve my algorithm's Big O complexity?",
        answer: (
          <div className="space-y-4">
            <p>Common strategies to improve complexity:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-gray-200">Use better data structures:</strong> Hash tables for O(1) lookup instead of arrays</li>
              <li><strong className="text-gray-200">Avoid nested loops:</strong> Can you solve it in one pass instead of two?</li>
              <li><strong className="text-gray-200">Use divide-and-conquer:</strong> Break problems into smaller subproblems</li>
              <li><strong className="text-gray-200">Add memoization:</strong> Cache results to avoid redundant calculations</li>
              <li><strong className="text-gray-200">Sort first:</strong> Sometimes sorting enables more efficient algorithms</li>
              <li><strong className="text-gray-200">Use binary search:</strong> Replace linear search when data is sorted</li>
            </ul>
            <p>Check our <Link to="/examples" className="text-emerald-500 hover:text-emerald-400">examples page</Link> to see how different approaches affect complexity.</p>
          </div>
        )
      },
      {
        question: "Is O(n) always better than O(n²)?",
        answer: (
          <div className="space-y-4">
            <p>For large inputs, yes. But for small inputs, not necessarily! Here's why:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-gray-200">Constants matter for small n:</strong> An O(n²) algorithm with very low overhead might be faster than an O(n) algorithm with high setup costs when n is small</li>
              <li><strong className="text-gray-200">Simplicity matters:</strong> A simple O(n²) algorithm might be easier to implement and maintain than a complex O(n) one</li>
              <li><strong className="text-gray-200">Real-world constraints:</strong> If your input is always small (say, n &lt; 100), the difference might be negligible</li>
            </ul>
            <p>Always consider your specific use case. Big O tells you about scalability, not absolute performance.</p>
          </div>
        )
      }
    ]
  }
];