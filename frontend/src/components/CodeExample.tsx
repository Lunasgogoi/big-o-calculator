export default function CodeExample({ title, badgeTitle, lightBg, lightText, darkBg, darkText, code, explanation }: any) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-gray-900 dark:text-white font-bold">{title}</h4>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${lightBg} ${lightText} dark:${darkBg} dark:${darkText}`}>
          {badgeTitle}
        </span>
      </div>
      <div className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 mb-2">
        <pre className="text-sm font-mono text-gray-800 dark:text-gray-300 overflow-x-auto">
          <code>{code}</code>
        </pre>
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{explanation}</p>
    </div>
  );
}