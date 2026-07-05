export default function ComplexityCard({
  title,
  name,
  description,
}) {
  return (
    <div className="min-w-0 bg-[#fffdf8] dark:bg-[#151515] border border-[#d8e2d7] dark:border-gray-800 rounded-lg p-5 transition-colors hover:border-[#c5d4c5] dark:hover:border-gray-700 shadow-sm shadow-slate-200/50 dark:shadow-none">
      <span className="inline-flex max-w-full items-center rounded-md border border-teal-200 bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700 dark:border-teal-900/60 dark:bg-teal-950/40 dark:text-teal-300">
        {title}
      </span>
      <h4 className="text-slate-900 dark:text-white font-bold mt-4 mb-1">{name}</h4>
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
