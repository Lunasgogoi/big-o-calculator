export default function ComplexityCard({ title, lightBg, lightText, darkBg, darkText, name, description }: any) {
  return (
    <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:border-gray-300 dark:hover:border-gray-700 transition shadow-sm dark:shadow-none">
      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${lightBg} ${lightText} dark:${darkBg} dark:${darkText}`}>
        {title}
      </span>
      <h4 className="text-gray-900 dark:text-white font-bold mb-1">{name}</h4>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
    </div>
  );
}