// src/pages/FAQ.tsx
export default function FAQ() {
  return (
    <div className="w-full max-w-4xl text-left">
      <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-6">
        Frequently Asked Questions
      </h1>
      
      <div className="space-y-6 bg-white dark:bg-[#161616] p-8 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
        
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">How does the calculator work?</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            Our engine uses Tree-sitter to parse your source code into an Abstract Syntax Tree (AST). It then runs a series of heuristic rules to determine loop depth, recursive calls, and recognizable algorithm patterns to calculate the complexity.
          </p>
        </div>

        <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Is my code sent to a server?</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            Yes, your code is securely sent to our backend engine to be parsed and analyzed, and also forwarded to an AI model to generate educational suggestions. We do not store your code snippets permanently.
          </p>
        </div>

      </div>
    </div>
  );
}