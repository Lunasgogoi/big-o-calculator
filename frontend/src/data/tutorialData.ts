export interface Lesson {
  id: number;
  category: string;
  title: string;
  description: string;
  codeSnippet: string;
  timeComplexity: string;
  spaceComplexity: string;
  analysisSteps: { label: string; text: string }[];
  proTip?: string;
}

export const tutorialLessons: Lesson[] = [
  {
    id: 1,
    category: "Basics",
    title: "Constant Time",
    description: "An algorithm is said to have a constant time complexity when it is not dependent on the input size. The execution time remains exactly the same.",
    codeSnippet: `function getFirstElement(array) {\n  return array[0];\n}`,
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    analysisSteps: [
      { label: "Array Access", text: "Looking up an index in an array is an instantaneous operation in memory." }
    ]
  },
  {
    id: 2,
    category: "Basics",
    title: "Simple Loops",
    description: "Linear time complexity implies that the execution time grows directly in proportion to the size of the input.",
    codeSnippet: `function printAll(array) {\n  for (let i = 0; i < array.length; i++) {\n    console.log(array[i]);\n  }\n}`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    analysisSteps: [
      { label: "The Loop", text: "The loop iterates exactly 'n' times, where 'n' is the length of the array." }
    ],
    proTip: "When determining Big O, we drop constants. O(2n) simply becomes O(n)."
  },
  {
    id: 3,
    category: "Basics",
    title: "Nested Loops",
    description: "Quadratic time usually occurs when you have a loop inside of another loop. For every element in the first loop, the algorithm loops through every element again.",
    codeSnippet: `function hasDuplicates(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] === array[j]) return true;
    }
  }
  return false;
}`,
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    analysisSteps: [
      { label: "Outer Loop", text: "Runs 'n' times." },
      { label: "Inner Loop", text: "Runs an average of n/2 times for every iteration of the outer loop." },
      { label: "Total", text: "n * (n/2) results in n²/2 operations. Dropping the constant gives us O(n²)." }
    ]
  },
  {
    id: 4,
    category: "Intermediate",
    title: "Logarithmic Patterns",
    description: "Logarithmic time occurs when an algorithm consistently cuts the input size in half, such as in Binary Search.",
    codeSnippet: `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    analysisSteps: [
      { label: "The Divide", text: "Every iteration, the searchable portion of the array is cut exactly in half." }
    ]
  },
  {
    id: 5,
    category: "Basics",
    title: "Combining Steps",
    description: "When sequential loops run one after the other, their complexities are added, not multiplied.",
    codeSnippet: `function processItems(arrA, arrB) {
  for (let i = 0; i < arrA.length; i++) {
    console.log(arrA[i]);
  }
  for (let j = 0; j < arrB.length; j++) {
    console.log(arrB[j]);
  }
}`,
    timeComplexity: "O(a + b)",
    spaceComplexity: "O(1)",
    analysisSteps: [
      { label: "First Loop", text: "Runs 'a' times based on the length of arrA." },
      { label: "Second Loop", text: "Runs 'b' times based on the length of arrB." }
    ],
    proTip: "Do not say O(n) here! Because the inputs are different sizes, you must represent them with different variables: O(a + b)."
  },
  {
    id: 6,
    category: "Intermediate",
    title: "Recursion",
    description: "Recursive algorithms call themselves. Their complexity depends on how many times they branch.",
    codeSnippet: `function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    analysisSteps: [
      { label: "Call Stack", text: "The function pushes 'n' frames onto the call stack before returning, requiring O(n) space." }
    ]
  },
  {
    id: 7,
    category: "Advanced",
    title: "Divide & Conquer",
    description: "Algorithms like Merge Sort divide the input recursively and then do linear work to merge them back together.",
    codeSnippet: `// Merge Sort Paradigm
// 1. Divide array in half: O(log n) steps
// 2. Merge halves: O(n) work per step
// Total: O(n log n)`,
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    analysisSteps: [
      { label: "Division", text: "Splitting the array takes O(log n) levels." },
      { label: "Merging", text: "At each level, merging the sub-arrays takes O(n) time." }
    ],
    proTip: "O(n log n) is the fastest possible worst-case time complexity for comparison-based sorting algorithms."
  },
  {
    id: 8,
    category: "Intermediate",
    title: "Best, Average & Worst Case",
    description: "Big O usually refers to the worst-case scenario, but an algorithm can perform differently depending on the input arrangement.",
    codeSnippet: `function findItem(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,
    timeComplexity: "O(n) Worst / O(1) Best",
    spaceComplexity: "O(1)",
    analysisSteps: [
      { label: "Best Case", text: "The target is the very first item (Omega(1))." },
      { label: "Worst Case", text: "The target is at the very end, or not in the array at all (Big O(n))." }
    ]
  },
  {
    id: 9,
    category: "Advanced",
    title: "Dynamic Programming (1D)",
    description: "Solving complex problems by breaking them down into simpler 1D subproblems and storing the results.",
    codeSnippet: `function climbStairs(n, memo = {}) {
  if (n <= 2) return n;
  if (memo[n]) return memo[n];
  
  memo[n] = climbStairs(n - 1, memo) + climbStairs(n - 2, memo);
  return memo[n];
}`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    analysisSteps: [
      { label: "Memoization", text: "By caching results in the 'memo' object, we avoid redundant calculations, dropping time from O(2^n) to O(n)." }
    ]
  },
  {
    id: 10,
    category: "Advanced",
    title: "Dynamic Programming (2D)",
    description: "Similar to 1D DP, but applied to grids or matrices, requiring a 2D cache or table.",
    codeSnippet: `function gridTraveler(m, n, memo = {}) {
  const key = m + ',' + n;
  if (key in memo) return memo[key];
  if (m === 1 && n === 1) return 1;
  if (m === 0 || n === 0) return 0;
  
  memo[key] = gridTraveler(m - 1, n, memo) + gridTraveler(m, n - 1, memo);
  return memo[key];
}`,
    timeComplexity: "O(m * n)",
    spaceComplexity: "O(m + n)",
    analysisSteps: [
      { label: "Combinations", text: "We only ever calculate each unique grid state (m, n) exactly once." }
    ]
  },
  {
    id: 11,
    category: "Advanced",
    title: "Tree Traversal",
    description: "Visiting every node in a tree structure. Both Depth First (DFS) and Breadth First (BFS) take linear time.",
    codeSnippet: `function inorder(root) {
  if (!root) return;
  inorder(root.left);
  console.log(root.val);
  inorder(root.right);
}`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    analysisSteps: [
      { label: "Time", text: "Every node is visited exactly once." },
      { label: "Space", text: "The call stack depth equals the height of the tree (h)." }
    ]
  },
  {
    id: 12,
    category: "Advanced",
    title: "Graph Traversal",
    description: "Unlike trees, graphs can have cycles, so we must track visited nodes to avoid infinite loops.",
    codeSnippet: `function bfs(graph, start) {
  const queue = [start];
  const visited = new Set([start]);
  
  while (queue.length > 0) {
    const node = queue.shift();
    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}`,
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    analysisSteps: [
      { label: "Vertices & Edges", text: "We visit every Vertex (V) and iterate through every Edge (E)." }
    ]
  },
  {
    id: 13,
    category: "Advanced",
    title: "Amortized Analysis",
    description: "Amortized time is the average time taken per operation over a sequence of operations.",
    codeSnippet: `const array = [];
// Pushing to an array is usually O(1).
// But if the underlying memory fills up, 
// the array must be copied to a new location: O(n).`,
    timeComplexity: "O(1) Amortized",
    spaceComplexity: "O(n)",
    analysisSteps: [
      { label: "Averaging", text: "Because the O(n) resize happens so rarely, the average cost of a push operation remains O(1)." }
    ]
  },
  {
    id: 14,
    category: "Intermediate",
    title: "Data Structure Complexity",
    description: "Choosing the right data structure changes the Big O of your operations drastically.",
    codeSnippet: `// Array Lookup: O(n)
const arr = [1, 2, 3]; 
arr.includes(3); 

// Hash Set Lookup: O(1)
const set = new Set([1, 2, 3]);
set.has(3);`,
    timeComplexity: "Varies",
    spaceComplexity: "Varies",
    analysisSteps: [
      { label: "Trade-offs", text: "Hash maps provide O(1) lookups but require O(n) memory to store the hashed keys." }
    ]
  },
  {
    id: 15,
    category: "Basics",
    title: "Space Complexity",
    description: "Measures the total amount of extra memory an algorithm requires to run as the input size grows.",
    codeSnippet: `function createMatrix(n) {
  const matrix = [];
  for (let i = 0; i < n; i++) {
    matrix[i] = new Array(n).fill(0);
  }
  return matrix;
}`,
    timeComplexity: "O(n²)",
    spaceComplexity: "O(n²)",
    analysisSteps: [
      { label: "Memory Growth", text: "We are creating an N by N grid, which stores N² variables in memory." }
    ]
  },
  {
    id: 16,
    category: "Advanced",
    title: "Memoization & Optimization",
    description: "Trading space for time by caching expensive computations or using clever data structures.",
    codeSnippet: `// Two Sum Optimization
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
}`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    analysisSteps: [
      { label: "Space-Time Tradeoff", text: "By using an O(n) Hash Map, we avoid nested loops, reducing time complexity from O(n²) to O(n)." }
    ],
    proTip: "If you have a quadratic O(n²) algorithm, ask yourself: 'Can I use a Hash Map to make this O(n)?' The answer is usually yes."
  }
];