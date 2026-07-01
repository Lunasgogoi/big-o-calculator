import React from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'c++' }) => {
  return (
    <div className="min-w-0 rounded-lg overflow-hidden border border-[#d8e2d7] dark:border-gray-700 bg-[#f2f5f0] dark:bg-[#161616] shadow-lg shadow-slate-200/40 dark:shadow-xl my-6 transition-colors duration-300">
      <div className="bg-[#e6ece6] dark:bg-[#252525] px-4 py-2 flex items-center justify-end border-b border-[#cbd8cb] dark:border-gray-700 transition-colors duration-300">
        <span className="text-xs text-gray-500 dark:text-gray-400 font-mono uppercase font-bold tracking-wider">{language}</span>
      </div>
      <div className="min-w-0 overflow-x-auto p-5 custom-scrollbar">
        <pre className="m-0 text-sm font-mono text-slate-800 dark:text-gray-300 leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
