interface CodeExampleProps {
  title: string;
  badgeTitle: string;
  lightBg?: string;
  lightText?: string;
  darkBg?: string;
  darkText?: string;
  code: string;
  explanation: string;
}

export default function CodeExample({
  title,
  badgeTitle,
  code,
  explanation,
}: CodeExampleProps) {
  return (
    <div className="min-w-0 mb-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3">
        <h4 className="text-slate-900 dark:text-white font-bold leading-snug">{title}</h4>
        <span className="inline-flex w-fit shrink-0 items-center rounded-md border border-teal-200 bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700 dark:border-teal-900/60 dark:bg-teal-950/40 dark:text-teal-300">
          {badgeTitle}
        </span>
      </div>
      <div className="min-w-0 overflow-hidden bg-[#f2f5f0] dark:bg-[#171717] border border-[#d8e2d7] dark:border-gray-800 rounded-lg mb-3">
        <pre className="m-0 max-w-full overflow-x-auto p-4 text-sm font-mono leading-relaxed text-slate-800 dark:text-gray-300 custom-scrollbar">
          <code>{code}</code>
        </pre>
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{explanation}</p>
    </div>
  );
} 
