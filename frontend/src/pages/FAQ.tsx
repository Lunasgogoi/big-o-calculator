// src/pages/FAQ.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { faqData } from '../data/faqData';

export default function FAQ() {
  return (
    <div className="max-w-4xl mx-auto w-full pt-8 pb-24 text-gray-700 dark:text-gray-300">
      
      <div className="mb-16">
        <h1 className="text-4xl font-bold mb-4 font-serif text-gray-900 dark:text-white">Frequently Asked Questions</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">Common questions about Big O notation and algorithm complexity</p>
      </div>

      {faqData.map((category, catIndex) => (
        <div key={catIndex} className="mb-16">
          <h2 className="text-2xl font-bold mb-8 font-serif text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">
            {category.categoryName}
          </h2>
          
          <div className="space-y-10">
            {category.questions.map((item, qIndex) => (
              <div key={qIndex}>
                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                  {item.question}
                </h3>
                <div className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="border-t border-gray-200 dark:border-gray-800 pt-12 mt-8">
        <h2 className="text-2xl font-bold mb-6 font-serif text-gray-900 dark:text-white">Still Have Questions?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">If your question wasn't answered here, try these resources:</p>
        <ul className="list-disc pl-6 space-y-3 text-gray-600 dark:text-gray-400">
          <li>Read our <Link to="/guide" className="text-emerald-600 dark:text-emerald-500 hover:underline">comprehensive Big O guide</Link> for in-depth explanations</li>
          <li>Explore <Link to="/examples" className="text-emerald-600 dark:text-emerald-500 hover:underline">real algorithm examples</Link> with detailed analysis</li>
          <li>Use our <Link to="/" className="text-emerald-600 dark:text-emerald-500 hover:underline">calculator</Link> to analyze your specific code</li>
        </ul>
      </div>

    </div>
  );
}