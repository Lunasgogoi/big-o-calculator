import { useState } from 'react';
import { tutorialLessons } from '../data/tutorialData.ts';
import CodeBlock from '../components/CodeBlock';
import AnalysisCard from '../components/AnalysisCard';

const Tutorial = () => {
  const [activeLessonId, setActiveLessonId] = useState<number>(1);
  
  const activeLesson = tutorialLessons.find(l => l.id === activeLessonId) || tutorialLessons[0];
  const totalLessons = tutorialLessons.length;

  return (
    <div className="w-full flex flex-col md:flex-row gap-8 pt-6 transition-colors duration-300">
      
      {/* LEFT SIDEBAR */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="md:sticky md:top-6">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Curriculum</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{activeLessonId} of {totalLessons} modules viewed</p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-1 rounded-full overflow-hidden">
              <div 
                className="bg-blue-600 dark:bg-blue-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${(activeLessonId / totalLessons) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Navigation Grouped by Category */}
          <nav className="space-y-6">
            {["Basics", "Intermediate", "Advanced"].map(category => (
              <div key={category}>
                <h3 className="text-xs font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest mb-3 px-2">
                  {category}
                </h3>
                <ul className="space-y-1">
                  {tutorialLessons
                    .filter(lesson => lesson.category === category)
                    .map((lesson) => {
                      const isActive = lesson.id === activeLessonId;
                      return (
                        <li key={lesson.id}>
                          <button
                            onClick={() => setActiveLessonId(lesson.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                              isActive 
                                ? 'bg-blue-50 dark:bg-blue-600/10 text-blue-700 dark:text-blue-400 font-semibold border-l-2 border-blue-600 dark:border-blue-500' 
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 border-l-2 border-transparent'
                            }`}
                          >
                            {lesson.title.split(' - ')[0]}
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
      <main className="flex-1 min-w-0">
        <div className="mb-2">
          <span className="text-blue-600 dark:text-blue-500 font-semibold text-sm uppercase tracking-wider">
            {activeLesson.category}
          </span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
          {activeLesson.title.split(' - ')[0]}
          <span className="text-gray-500 dark:text-gray-500 ml-3 font-normal text-2xl md:text-3xl">
            {activeLesson.title.split(' - ')[1]}
          </span>
        </h1>
        
        <p className="text-gray-700 dark:text-gray-300 text-lg mb-8 leading-relaxed">
          {activeLesson.description}
        </p>

        <CodeBlock code={activeLesson.codeSnippet} />

        <div className="mt-10">
          <AnalysisCard 
            timeComplexity={activeLesson.timeComplexity}
            spaceComplexity={activeLesson.spaceComplexity}
            steps={activeLesson.analysisSteps}
            proTip={activeLesson.proTip}
          />
        </div>
        
        {/* Next/Prev Navigation Buttons */}
        <div className="mt-12 flex justify-between border-t border-gray-200 dark:border-gray-800 pt-8 transition-colors duration-300">
          <button 
            disabled={activeLessonId === 1}
            onClick={() => setActiveLessonId(prev => Math.max(1, prev - 1))}
            className="px-5 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous
          </button>
          
          <button 
            disabled={activeLessonId === totalLessons}
            onClick={() => setActiveLessonId(prev => Math.min(totalLessons, prev + 1))}
            className="px-5 py-2.5 rounded-lg bg-blue-600 dark:bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next Lesson →
          </button>
        </div>
      </main>

    </div>
  );
};

export default Tutorial;