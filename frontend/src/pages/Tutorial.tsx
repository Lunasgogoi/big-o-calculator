<<<<<<< HEAD
import { useState } from 'react';
import { tutorialLessons } from '../data/tutorialData.ts';
=======
import React, { useState, useEffect } from 'react';
import { tutorialLessons } from '../data/tutorialData';
>>>>>>> 2f75118 (Update tutorial content)
import CodeBlock from '../components/CodeBlock';
import AnalysisCard from '../components/AnalysisCard';

const Tutorial = () => {
  const [activeLessonId, setActiveLessonId] = useState<number>(1);
  
  // 1. Initialize completed lessons from localStorage
  const [completedLessons, setCompletedLessons] = useState<number[]>(() => {
    const saved = localStorage.getItem('completedLessons');
    return saved ? JSON.parse(saved) : [];
  });

  // 2. Save to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  const activeLesson = tutorialLessons.find(l => l.id === activeLessonId) || tutorialLessons[0];
  const totalLessons = tutorialLessons.length;
  const categories = Array.from(new Set(tutorialLessons.map(l => l.category)));
  const isCompleted = completedLessons.includes(activeLesson.id);

  // 3. Toggle completion status
  const toggleComplete = () => {
    setCompletedLessons(prev => 
      prev.includes(activeLesson.id) 
        ? prev.filter(id => id !== activeLesson.id) 
        : [...prev, activeLesson.id]
    );
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-8 pt-6 transition-colors duration-300">
      
      {/* LEFT SIDEBAR */}
      <aside className="w-full md:w-72 flex-shrink-0">
        <div className="md:sticky md:top-6">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hidden md:block">Curriculum</h2>
            {/* UPDATED PROGRESS BAR: Uses completedLessons.length and teal color */}
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{completedLessons.length} of {totalLessons} complete</p>
            <div className="w-full bg-gray-200 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-teal-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${(completedLessons.length / totalLessons) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-6">
            {categories.map(category => (
              <div key={category}>
                <ul className="space-y-1">
                  {tutorialLessons
                    .filter(lesson => lesson.category === category)
                    .map((lesson) => {
                      const isActive = lesson.id === activeLessonId;
                      const isDone = completedLessons.includes(lesson.id);
                      return (
                        <li key={lesson.id}>
                          <button
                            onClick={() => setActiveLessonId(lesson.id)}
                            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 flex items-center space-x-3 ${
                              isActive 
                                ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 font-semibold' 
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                            }`}
                          >
                            {/* UPDATED CHECKMARK LOGIC */}
                            <span className="w-4 flex items-center justify-center flex-shrink-0">
                              {isDone ? (
                                <span className="text-teal-500 font-bold text-base">✓</span>
                              ) : (
                                <span className="opacity-50 text-xs">{lesson.id}.</span>
                              )}
                            </span>
                            <span className="truncate">{lesson.title.split(' - ')[0]}</span>
                          </button>
                        </li>
                      );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 min-w-0 pb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
          {activeLesson.title}
        </h1>
        
        <p className="text-gray-700 dark:text-gray-300 text-lg mb-8 leading-relaxed">
          {activeLesson.description}
        </p>

        {/* Standard Code Snippet */}
        {activeLesson.codeSnippet && (
          <CodeBlock code={activeLesson.codeSnippet} />
        )}

        {/* NEW: Extra Detailed Blocks (Array vs Linked List, for...of loop, etc.) */}
        {activeLesson.extraBlocks?.map((block, index) => (
          <div key={index} className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-3">{block.title}</h3>
            {block.code && <CodeBlock code={block.code} />}
            {(block.text || block.complexityBadge) && (
              <div className="flex items-center space-x-3 mt-3 text-sm text-gray-600 dark:text-gray-400">
                {block.text && <span>{block.text}</span>}
                {block.text && block.complexityBadge && <span>→</span>}
                {block.complexityBadge && (
                  <span className="bg-orange-500/20 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded font-mono font-bold">
                    {block.complexityBadge}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}

        {/* NEW: Comparison Table */}
        {activeLesson.comparisonTable && (
          <div className="mb-10 mt-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Comparison Table</h3>
            <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-xl">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
                  <tr>
                    {activeLesson.comparisonTable.headers.map((header, i) => (
                      <th key={i} className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-[#161616]">
                  {activeLesson.comparisonTable.rows.map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => {
                        // Highlight O(1) in teal for visual pop
                        const isO1 = typeof cell === 'string' && cell.includes('O(1)');
                        return (
                          <td key={j} className={`px-6 py-4 ${j === 0 ? 'text-gray-900 dark:text-gray-200' : 'text-gray-600 dark:text-gray-400 font-mono'} ${isO1 ? 'text-teal-600 dark:text-teal-400 font-bold' : ''}`}>
                            {cell}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Standard Analysis Card */}
        {activeLesson.analysisSteps && (
          <div className="mt-10">
            <AnalysisCard 
              timeComplexity={activeLesson.timeComplexity || ""}
              spaceComplexity={activeLesson.spaceComplexity || ""}
              steps={activeLesson.analysisSteps}
              proTip={activeLesson.proTip}
            />
          </div>
        )}

        {/* NEW: Key Takeaways Section */}
        {activeLesson.keyTakeaway && (
          <div className="mb-10 mt-8 bg-gray-50 dark:bg-gray-900/30 border border-gray-200 dark:border-gray-800 rounded-xl p-6 md:p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {activeLesson.keyTakeaway.title || "Key Takeaway"}
            </h3>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              {activeLesson.keyTakeaway.text.map((paragraph, idx) => {
                // Extremely simple markdown-like bolding parser for "**text**"
                const boldRegex = /\*\*(.*?)\*\*/g;
                if (boldRegex.test(paragraph)) {
                  const parts = paragraph.split(boldRegex);
                  return (
                    <p key={idx}>
                      {parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="text-gray-900 dark:text-white">{part}</strong> : part)}
                    </p>
                  );
                }
                return <p key={idx}>{paragraph}</p>;
              })}
            </div>
          </div>
        )}
        
        {/* Next/Prev & MARK COMPLETE Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200 dark:border-gray-800 pt-8 transition-colors duration-300">
          <button 
            disabled={activeLessonId === 1}
            onClick={() => setActiveLessonId(prev => Math.max(1, prev - 1))}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
          >
            ← Prev
          </button>
          
          {/* UPDATED MARK AS COMPLETE BUTTON */}
          <button
            onClick={toggleComplete}
            className={`w-full sm:w-auto px-8 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
              isCompleted
                ? 'bg-transparent border-2 border-teal-500 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20'
                : 'bg-teal-600 hover:bg-teal-500 text-white shadow-lg shadow-teal-500/30'
            }`}
          >
            {isCompleted ? 'Completed ✓' : 'Mark as complete'}
          </button>

          <button 
            disabled={activeLessonId === totalLessons}
            onClick={() => setActiveLessonId(prev => Math.min(totalLessons, prev + 1))}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-gray-800 dark:text-white text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 transition-colors"
          >
            Next →
          </button>
        </div>
      </main>
    </div>
  );
};

export default Tutorial;