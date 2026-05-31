// src/pages/Examples.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { examplesData } from '../data/examplesData';

// Helper function to match your screenshot colors
const getBadgeStyles = (color: string) => {
  switch (color) {
    case 'green': return 'bg-green-900/30 text-green-500 border-green-900/50';
    case 'orange': return 'bg-orange-900/30 text-orange-500 border-orange-900/50';
    case 'red': return 'bg-red-900/30 text-red-500 border-red-900/50';
    case 'blue': return 'bg-blue-900/30 text-blue-500 border-blue-900/50';
    default: return 'bg-gray-800 text-gray-300 border-gray-700';
  }
};

export default function Examples() {
  return (
    <div className="max-w-4xl mx-auto w-full pt-8 pb-24 text-gray-200">
      
      {/* Page Header */}
      <div className="mb-16">
        <h1 className="text-4xl font-bold mb-4 font-serif text-white">Algorithm Examples & Complexity Analysis</h1>
        <p className="text-gray-400 text-lg">Learn from real-world examples of common algorithms and their Big O complexities</p>
      </div>

      {/* Main Content Loop */}
      {examplesData.map((category, catIndex) => (
        <div key={catIndex} className="mb-20">
          <h2 className="text-2xl font-bold mb-8 font-serif text-white border-b border-gray-800 pb-2">
            {category.categoryName}
          </h2>
          
          <div className="flex flex-col gap-8">
            
            {/* Render Code Examples if they exist */}
            {category.examples?.map((algo) => (
              <div key={algo.id} className="border border-gray-800 rounded-xl p-6 bg-[#121212]">
                <h3 className="text-xl font-bold mb-3 text-white">{algo.title}</h3>
                
                {/* Badges */}
                <div className="flex flex-wrap gap-3 mb-5 text-sm font-bold">
                  {algo.badges.map((badge, bIndex) => (
                    <span key={bIndex} className={`px-3 py-1 rounded-full border ${getBadgeStyles(badge.color)}`}>
                      {badge.label}: {badge.value}
                    </span>
                  ))}
                </div>

                {algo.description && (
                  <p className="text-gray-400 mb-6">{algo.description}</p>
                )}

                <div className="bg-[#1e1e1e] border border-gray-800 rounded-xl p-4 mb-5">
                  <pre className="text-sm font-mono text-gray-300 overflow-x-auto whitespace-pre">
                    <code>{algo.code}</code>
                  </pre>
                </div>

                <div className="space-y-2 text-sm text-gray-400">
                  <p><strong className="text-gray-200">Analysis:</strong> {algo.analysis}</p>
                  {algo.useCase && (
                    <p><strong className="text-gray-200">Use case:</strong> {algo.useCase}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Render Tables if they exist */}
            {category.tables?.map((table, tIndex) => (
              <div key={tIndex} className="border border-gray-800 rounded-xl p-6 bg-[#121212]">
                <h3 className="text-xl font-bold mb-6 text-white">{table.title}</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-gray-800 text-gray-400">
                        <th className="pb-3 font-medium">Operation</th>
                        <th className="pb-3 font-medium">{table.hasWorstCase ? 'Average Case' : 'Time Complexity'}</th>
                        {table.hasWorstCase && <th className="pb-3 font-medium">Worst Case</th>}
                        {!table.hasWorstCase && <th className="pb-3 font-medium">Description</th>}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/50">
                      {table.rows.map((row, rIndex) => (
                        <tr key={rIndex}>
                          <td className="py-4 text-gray-300">{row.operation}</td>
                          <td className="py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getBadgeStyles(row.color)}`}>
                              {row.time}
                            </span>
                          </td>
                          {table.hasWorstCase && row.worstTime && row.worstColor && (
                            <td className="py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getBadgeStyles(row.worstColor)}`}>
                                {row.worstTime}
                              </span>
                            </td>
                          )}
                          {!table.hasWorstCase && (
                            <td className="py-4 text-gray-400">{row.description}</td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {table.note && (
                  <p className="mt-6 text-sm text-gray-400"><strong className="text-gray-200">Note:</strong> {table.note}</p>
                )}
              </div>
            ))}

          </div>
        </div>
      ))}

      {/* Footer Section */}
      <div className="mt-24 border-t border-gray-800 pt-12 mb-12">
        <h2 className="text-2xl font-bold mb-4 font-serif text-white">Try These Examples</h2>
        <p className="text-gray-400 mb-6 leading-relaxed">
          Want to verify these complexity analyses? Copy any of the code examples above and paste them into our <Link to="/" className="text-emerald-500 hover:text-emerald-400 font-medium">Big O Calculator</Link> to see the AI's analysis. You can also modify the code and see how the complexity changes!
        </p>
        <p className="text-gray-400 leading-relaxed">
          For more in-depth explanations of Big O notation concepts, visit our <Link to="/guide" className="text-emerald-500 hover:text-emerald-400 font-medium">comprehensive guide</Link>. If you have questions, check out our <Link to="/faq" className="text-emerald-500 hover:text-emerald-400 font-medium">FAQ page</Link>.
        </p>
      </div>

    </div>
  );
}