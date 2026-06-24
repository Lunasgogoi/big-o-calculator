import React from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'javascript' }) => {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#161616] shadow-lg dark:shadow-xl my-6 transition-colors duration-300">
      <div className="bg-gray-200 dark:bg-[#252525] px-4 py-2 flex items-center justify-between border-b border-gray-300 dark:border-gray-700 transition-colors duration-300">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400 dark:bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400 dark:bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-400 dark:bg-green-500/80"></div>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400 font-mono uppercase">{language}</span>
      </div>
      <div className="p-5 overflow-x-auto">
        <pre className="text-sm font-mono text-gray-800 dark:text-gray-300 leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;