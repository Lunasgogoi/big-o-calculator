// src/pages/Examples.tsx
import CodeExample from '../components/CodeExample';

export default function Examples() {
  return (
    <div className="w-full max-w-4xl text-left">
      <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-6">
        Algorithm Examples
      </h1>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
        Explore common algorithms, their implementations, and how their Big O complexities are calculated.
      </p>

      <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm dark:shadow-none transition-colors duration-300 mb-6">
        <CodeExample 
          title="Binary Search" 
          badgeTitle="O(log n)" lightBg="bg-blue-100" lightText="text-blue-800" darkBg="bg-blue-900/40" darkText="text-blue-400"
          code={`function binarySearch(arr, target) {\n  let left = 0, right = arr.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}`}
          explanation="Halves the search space each iteration → logarithmic time, constant space."
        />
      </div>

      <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm dark:shadow-none transition-colors duration-300">
        <CodeExample 
          title="Two Sum (Brute Force)" 
          badgeTitle="O(n²)" lightBg="bg-red-100" lightText="text-red-800" darkBg="bg-red-900/40" darkText="text-red-400"
          code={`function twoSum(nums, target) {\n  for (let i = 0; i < nums.length; i++) {\n    for (let j = i + 1; j < nums.length; j++) {\n      if (nums[i] + nums[j] === target) return [i, j];\n    }\n  }\n}`}
          explanation="Contains a nested loop where the inner loop depends on the outer loop → quadratic time."
        />
      </div>
    </div>
  );
}