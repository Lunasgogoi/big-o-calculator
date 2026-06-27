export interface Lesson {
  id: number;
  category: string;
  title: string;
  description: string;
  codeSnippet?: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  analysisSteps?: { label: string; text: string }[];
  proTip?: string;
  extraBlocks?: { title: string; code?: string; text?: string; complexityBadge?: string }[];
  comparisonTable?: { headers: string[]; rows: (string | React.ReactNode)[][] };
  keyTakeaway?: { title?: string; text: string[] };
}

export const tutorialLessons: Lesson[] = [
  {
    id: 1,
    category: "Basics",
    title: "Constant Time - O(1)",
    description: "An algorithm has constant time complexity when its execution time is not dependent on the input size. No matter how large the input gets, the operation takes the exact same amount of time.",
    codeSnippet: `function getFirstElement(array) {\n  return array[0];\n}`,
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    analysisSteps: [
      { label: "Array Access", text: "Looking up a specific index in an array is an instantaneous operation in memory." }
    ],
    extraBlocks: [
      {
        title: "Other O(1) Operations",
        code: `// Math operations\nconst sum = a + b;\n\n// Object property lookup\nconst val = myObject["key"];\n\n// Variable assignment\nlet x = 10;`,
        text: "These operations execute in a single step.",
        complexityBadge: "O(1)"
      }
    ],
    keyTakeaway: {
      text: ["**O(1)** represents the ultimate efficiency. Whenever possible, optimize your algorithms to perform lookups in constant time using Hash Maps (Objects/Dictionaries)."]
    }
  },
  {
    id: 2,
    category: "Basics",
    title: "Simple Loops - O(n)",
    description: "Linear time complexity implies that the execution time grows directly in proportion to the size of the input. If the input is 10 times larger, it takes 10 times longer.",
    codeSnippet: `function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    analysisSteps: [
      { label: "The Loop", text: "The loop iterates exactly 'n' times, where 'n' is the length of the array." }
    ],
    extraBlocks: [
      {
        title: "for...of loop",
        code: `function countOccurrences(arr, target) {
  let count = 0;
  for (const item of arr) {
    if (item === target) count++;
  }
  return count;
}`,
        text: "Different syntax, same underlying linear complexity.",
        complexityBadge: "O(n)"
      }
    ],
    proTip: "When determining Big O, we drop constants. A loop that runs 2n times is simply O(n)."
  },
  {
    id: 3,
    category: "Basics",
    title: "Nested Loops - O(n²)",
    description: "Quadratic time usually occurs when you have a loop inside of another loop. For every element in the first loop, the algorithm loops through the entire input again.",
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
    ],
    keyTakeaway: {
      text: ["Nested loops are a massive performance bottleneck. An input of 10,000 items requires 100,000,000 operations! Always look for ways to flatten nested loops using Sets or Hash Maps."]
    }
  },
  {
    id: 4,
    category: "Intermediate",
    title: "Logarithmic Patterns - O(log n)",
    description: "Logarithmic time occurs when an algorithm consistently cuts the input size in half. It is incredibly efficient for large datasets.",
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
    ],
    extraBlocks: [
      {
        title: "Mathematical Halving",
        code: `let count = 0;\nfor (let i = n; i > 1; i /= 2) {\n  count++;\n}`,
        text: "Any loop that increments by multiplying or dividing by a constant factor is Logarithmic.",
        complexityBadge: "O(log n)"
      }
    ],
    proTip: "If you have 1,000,000 items, an O(n) algorithm takes 1,000,000 steps. An O(log n) algorithm takes just 20 steps!"
  },
  {
    id: 5,
    category: "Basics",
    title: "Combining Steps",
    description: "When calculating complexity, sequential blocks of code are added together. However, you must be careful about using the same variables for different inputs.",
    codeSnippet: `function processItems(arrA, arrB) {
  // Step 1
  for (let i = 0; i < arrA.length; i++) {
    console.log(arrA[i]);
  }
  // Step 2
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
    keyTakeaway: {
      text: [
        "**Rule of Addition:** If your algorithm is in the form 'do this, then when you are all done, do that', you add the runtimes.",
        "**Different Inputs:** Do NOT say O(n) for the code above! Because the arrays could be different sizes, you must represent them with different variables: O(a + b)."
      ]
    }
  },
  {
    id: 6,
    category: "Intermediate",
    title: "Recursion",
    description: "Recursive algorithms call themselves. Their time complexity is determined by the number of function calls, and their space complexity is determined by the maximum depth of the call stack.",
    codeSnippet: `function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    analysisSteps: [
      { label: "Time", text: "The function calls itself 'n' times." },
      { label: "Space", text: "It pushes 'n' frames onto the memory call stack before returning, requiring O(n) space." }
    ],
    extraBlocks: [
      {
        title: "Multiple Branches (Danger!)",
        code: `function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}`,
        text: "Because it branches twice per call, the tree grows exponentially.",
        complexityBadge: "O(2ⁿ)"
      }
    ]
  },
  {
    id: 7,
    category: "Advanced",
    title: "Divide & Conquer",
    description: "Algorithms like Merge Sort recursively divide the input into smaller chunks, process them, and merge them back together.",
    codeSnippet: `// Merge Sort Conceptual Paradigm
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}`,
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    analysisSteps: [
      { label: "Division", text: "Splitting the array in half takes O(log n) recursive levels." },
      { label: "Merging", text: "At each of those log(n) levels, merging the sub-arrays takes O(n) time." }
    ],
    proTip: "O(n log n) is mathematically the fastest possible worst-case time complexity for any comparison-based sorting algorithm."
  },
  {
    id: 8,
    category: "Intermediate",
    title: "Best, Average & Worst Case",
    description: "Algorithms can perform differently depending on how the input data is arranged. We usually care most about the Worst Case (Big O).",
    codeSnippet: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,
    timeComplexity: "O(n) Worst / O(1) Best",
    spaceComplexity: "O(1)",
    comparisonTable: {
      headers: ["Scenario", "Notation", "Complexity", "Why?"],
      rows: [
        ["Best Case", "Omega (Ω)", "O(1)", "Target is the very first item."],
        ["Average Case", "Theta (Θ)", "O(n/2) → O(n)", "Target is somewhere in the middle."],
        ["Worst Case", "Big O (O)", "O(n)", "Target is at the end, or doesn't exist."]
      ]
    },
    keyTakeaway: {
      title: "Why focus on Big O?",
      text: ["In industry, we design systems to survive the worst possible scenarios to prevent crashes and timeouts under heavy load. That's why Big O (Worst Case) is the industry standard metric."]
    }
  },
  {
    id: 9,
    category: "Advanced",
    title: "Dynamic Programming (1D)",
    description: "Dynamic programming solves complex problems by breaking them down into overlapping subproblems and caching the results (Memoization).",
    codeSnippet: `function climbStairs(n, memo = {}) {
  if (n <= 2) return n;
  
  // Return cached result if we've seen it before
  if (memo[n]) return memo[n];
  
  // Calculate and store in cache
  memo[n] = climbStairs(n - 1, memo) + climbStairs(n - 2, memo);
  return memo[n];
}`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    analysisSteps: [
      { label: "Without Memoization", text: "This would branch like Fibonacci, taking O(2ⁿ) time." },
      { label: "With Memoization", text: "We only calculate each step once, dropping the time down to O(n)." }
    ]
  },
  {
    id: 10,
    category: "Advanced",
    title: "Dynamic Programming (2D)",
    description: "Similar to 1D DP, but applied to 2D grids, matrices, or problems with two shifting variables (like Longest Common Subsequence).",
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
      { label: "Combinations", text: "We only ever calculate each unique grid state (m, n) exactly once." },
      { label: "Space", text: "The call stack depth maxes out at m + n." }
    ]
  },
  {
    id: 11,
    category: "Advanced",
    title: "Tree Traversal",
    description: "Visiting every node in a tree data structure. The complexity depends on whether the tree is balanced.",
    extraBlocks: [
      {
        title: "Depth First Search (DFS)",
        code: `function inorder(root) {
  if (!root) return;
  inorder(root.left);
  console.log(root.val);
  inorder(root.right);
}`,
        complexityBadge: "O(n) Time | O(h) Space"
      }
    ],
    comparisonTable: {
      headers: ["Traversal Type", "Time", "Space (Balanced)", "Space (Worst)"],
      rows: [
        ["DFS (In/Pre/Post)", "O(n)", "O(log n)", "O(n) (Linked List)"],
        ["BFS (Level Order)", "O(n)", "O(n/2) → O(n)", "O(1) (Linked List)"]
      ]
    },
    keyTakeaway: {
      text: [
        "Time is always **O(n)** because you must visit every node.",
        "Space complexity is determined by the height of the tree **O(h)**. In a perfectly balanced tree, h = log(n). In a completely unbalanced tree (a straight line), h = n."
      ]
    }
  },
  {
    id: 12,
    category: "Advanced",
    title: "Graph Traversal",
    description: "Unlike trees, graphs can have cycles. If you don't keep track of the nodes you've visited, you will get stuck in an infinite loop.",
    codeSnippet: `function bfsGraph(graph, startNode) {
  const queue = [startNode];
  const visited = new Set([startNode]); // Crucial for graphs!
  
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
      { label: "V = Vertices", text: "We add and remove every node (vertex) from the queue exactly once." },
      { label: "E = Edges", text: "We iterate through every edge (connection) in the adjacency list exactly once." }
    ]
  },
  {
    id: 13,
    category: "Advanced",
    title: "Amortized Analysis",
    description: "Amortized time is the average time taken per operation over a sequence of operations, smoothing out rare, expensive spikes.",
    codeSnippet: `const array = [];
for (let i = 0; i < 100; i++) {
  // Most pushes are instantaneous O(1)
  // Occasionally, memory fills up and the array must be resized O(n)
  array.push(i); 
}`,
    timeComplexity: "O(1) Amortized",
    spaceComplexity: "O(n)",
    keyTakeaway: {
      text: [
        "When an array runs out of memory, it allocates a new block of memory double the size, and copies all old elements over. That single step is O(n).",
        "However, because the array doubled in size, it will be a VERY long time before it needs to resize again. Averaged out, `push()` is considered an **O(1)** operation."
      ]
    }
  },
  {
    id: 14,
    category: "Intermediate",
    title: "Data Structure Complexity",
    description: "Choosing the right data structure changes the Big O of your operations drastically.",
    extraBlocks: [
      {
        title: "Array",
        code: `const arr = [10, 20, 30];\narr.unshift(5); // O(n) - shifts all elements right\narr[2];         // O(1) - instant index access`
      },
      {
        title: "Linked List",
        code: `// head -> 10 -> 20 -> 30\n// Accessing index 2 requires traversing from the head.\n// Prepending is instant (just update the head pointer).`
      }
    ],
    comparisonTable: {
      headers: ["Operation", "Array", "Linked List", "Hash Map"],
      rows: [
        ["Access by index", "O(1)", "O(n)", "—"],
        ["Search / Contains", "O(n)", "O(n)", "O(1) avg"],
        ["Insert at start", "O(n)", "O(1)", "—"],
        ["Insert at end", "O(1)*", "O(n)**", "O(1)*"],
        ["Delete", "O(n)", "O(1)***", "O(1) avg"]
      ]
    },
    keyTakeaway: {
      text: [
        "**Array** is best when you need random access or iteration.",
        "**Linked List** is best when you frequently insert/delete at the beginning or at known positions.",
        "**Hash Map** is best when you need fast lookups by key."
      ]
    },
    proTip: "* Amortized. ** O(1) if you maintain a tail pointer. *** If you already have a reference to the node."
  },
  {
    id: 15,
    category: "Basics",
    title: "Space Complexity",
    description: "Space complexity measures the total amount of extra memory an algorithm requires to run as the input size grows.",
    extraBlocks: [
      {
        title: "O(1) Space - In-Place",
        code: `function reverseInPlace(arr) {
  let left = 0, right = arr.length - 1;
  while(left < right) {
    let temp = arr[left];
    arr[left++] = arr[right];
    arr[right--] = temp;
  }
}`,
        text: "Uses only 3 integer variables, regardless of array size.",
        complexityBadge: "O(1)"
      },
      {
        title: "O(n) Space - Extra Allocation",
        code: `function copyArray(arr) {
  const newArr = [];
  for(let i=0; i<arr.length; i++) newArr.push(arr[i]);
  return newArr;
}`,
        text: "Creates a brand new array of the same size as the input.",
        complexityBadge: "O(n)"
      }
    ],
    proTip: "Modifying inputs directly (in-place) saves space, but is often considered bad practice in functional programming. Trade-offs matter!"
  },
  {
    id: 16,
    category: "Advanced",
    title: "Memoization & Optimization",
    description: "In algorithmic interviews, you can almost always trade space for time. Using additional memory (like a Hash Map) allows you to avoid nested loops.",
    extraBlocks: [
      {
        title: "Brute Force Two Sum",
        code: `function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) return [i, j];
    }
  }
}`,
        complexityBadge: "Time: O(n²) | Space: O(1)"
      },
      {
        title: "Optimized Two Sum",
        code: `function twoSumOptimized(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const needed = target - nums[i];
    if (map.has(needed)) return [map.get(needed), i];
    map.set(nums[i], i);
  }
}`,
        complexityBadge: "Time: O(n) | Space: O(n)"
      }
    ],
    keyTakeaway: {
      text: [
        "If you have an **O(n²)** algorithm, always ask yourself: *'Can I use a Hash Map to make this O(n)?'* The answer is usually yes.",
        "By storing elements we've already seen in a Hash Map, we turn an O(n) inner loop into an O(1) lookup."
      ]
    }
  }
];