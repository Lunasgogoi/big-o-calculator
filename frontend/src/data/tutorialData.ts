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
  comparisonTable?: { headers: string[]; rows: string[][] };
  keyTakeaway?: { title?: string; text: string[] };
}

export const tutorialLessons: Lesson[] = [
  {
    id: 1,
    category: "Basics",
    title: "Constant Time",
    description: "In this lesson, you'll learn how to identify constant time complexity — operations that execute in a fixed amount of time, regardless of how large the input grows.",
    codeSnippet: `int getFirstElement(const vector<int>& arr) {
  return arr[0];
}`,
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    analysisSteps: [
      { label: "Identify the input size", text: "The input is arr, and its size is n = arr.size()." },
      { label: "Count the iterations", text: "There are no loops. The code executes exactly once." },
      { label: "Work per execution", text: "Accessing a vector at a specific index (arr[0]) is an instantaneous operation in memory." }
    ],
    keyTakeaway: {
      title: "Conclusion",
      text: ["An algorithm that performs the exact same number of operations regardless of input size has:", "**Time: O(1)**"]
    },
    extraBlocks: [
      {
        title: "Mathematical Operations",
        code: `int add(int a, int b) {\n  return a + b;\n}`,
        text: "Basic arithmetic is processed in a single CPU tick.",
        complexityBadge: "O(1)"
      },
      {
        title: "Struct Property Lookup",
        code: `int getAge(const User& user) {\n  return user.age;\n}`,
        text: "Finding a value by its struct property or Hash Map key is instantaneous.",
        complexityBadge: "O(1)"
      }
    ]
  },
  {
    id: 2,
    category: "Basics",
    title: "Simple Loops",
    description: "In this lesson, you'll learn how to analyze the time complexity of a single loop — the most fundamental building block of algorithm analysis.",
    codeSnippet: `int sumArray(const vector<int>& arr) {
  int total = 0;
  for (int i = 0; i < arr.size(); i++) {
    total += arr[i];
  }
  return total;
}`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    analysisSteps: [
      { label: "Identify the input size", text: "The input is arr, and its size is n = arr.size()." },
      { label: "Count the loop iterations", text: "The for loop starts at i = 0 and increments by 1 until i < n. So it runs exactly n times." },
      { label: "Work per iteration", text: "Inside the loop, total += arr[i] is a constant-time operation — O(1)." },
      { label: "Multiply", text: "n iterations × O(1) per iteration = O(n)." }
    ],
    keyTakeaway: {
      title: "Conclusion",
      text: ["A single loop that iterates through all n elements with constant work per iteration has:", "**Time: O(n)**"]
    },
    extraBlocks: [
      {
        title: "While loop variant",
        code: `int findMax(const vector<int>& arr) {
  int max_val = arr[0];
  int i = 1;
  while (i < arr.size()) {
    if (arr[i] > max_val) max_val = arr[i];
    i++;
  }
  return max_val;
}`,
        text: "Same pattern: one pass through the array",
        complexityBadge: "O(n)"
      },
      {
        title: "Range-based for loop",
        code: `int countOccurrences(const vector<int>& arr, int target) {
  int count = 0;
  for (int item : arr) {
    if (item == target) count++;
  }
  return count;
}`,
        text: "Different syntax, same complexity",
        complexityBadge: "O(n)"
      }
    ]
  },
  {
    id: 3,
    category: "Basics",
    title: "Nested Loops",
    description: "In this lesson, you'll learn why putting one loop inside another creates quadratic time complexity — a common performance trap.",
    codeSnippet: `void printAllPairs(const vector<int>& arr) {
  for (int i = 0; i < arr.size(); i++) {
    for (int j = 0; j < arr.size(); j++) {
      cout << arr[i] << ", " << arr[j] << endl;
    }
  }
}`,
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    analysisSteps: [
      { label: "Identify the input size", text: "The input is arr, with size n." },
      { label: "Analyze the outer loop", text: "The outer loop runs exactly n times." },
      { label: "Analyze the inner loop", text: "For EVERY single iteration of the outer loop, the inner loop runs n times." },
      { label: "Multiply", text: "n (outer) × n (inner) = n² operations." }
    ],
    keyTakeaway: {
      title: "Conclusion",
      text: ["When loops are nested and both depend on the same input size n, they multiply to create quadratic time:", "**Time: O(n²)**"]
    },
    extraBlocks: [
      {
        title: "Dependent Inner Loop (i + 1)",
        code: `bool hasDuplicates(const vector<int>& arr) {
  for (int i = 0; i < arr.size(); i++) {
    for (int j = i + 1; j < arr.size(); j++) {
      if (arr[i] == arr[j]) return true;
    }
  }
  return false;
}`,
        text: "Inner loop runs fewer times (n/2 on average). However, we drop constants in Big O. n × (n/2) = n²/2.",
        complexityBadge: "O(n²)"
      }
    ]
  },
  {
    id: 4,
    category: "Intermediate",
    title: "Logarithmic Patterns",
    description: "In this lesson, you'll learn how algorithms that repeatedly divide the search space in half achieve highly efficient O(log n) complexity.",
    codeSnippet: `int binarySearch(const vector<int>& arr, int target) {
  int left = 0, right = arr.size() - 1;
  while (left <= right) {
    int mid = left + (right - left) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    analysisSteps: [
      { label: "Identify the pattern", text: "With every iteration of the while loop, 'left' and 'right' converge, cutting the remaining searchable array exactly in half." },
      { label: "Count the iterations", text: "If an array has 16 items, it takes at most 4 divisions (16 → 8 → 4 → 2 → 1) to find the answer." },
      { label: "Apply the math", text: "The number of times you can divide n by 2 is defined mathematically as log₂(n)." }
    ],
    keyTakeaway: {
      title: "Conclusion",
      text: ["Any algorithm that consistently divides the remaining data in half (or multiplies a counter by a constant) has:", "**Time: O(log n)**"]
    },
    extraBlocks: [
      {
        title: "Multiplicative Loops",
        code: `int count = 0;
for (int i = 1; i < n; i *= 2) {
  count++;
}`,
        text: "Because i doubles every step, it reaches n logarithmically.",
        complexityBadge: "O(log n)"
      }
    ]
  },
  {
    id: 5,
    category: "Basics",
    title: "Combining Steps",
    description: "In this lesson, you'll learn how to calculate total time complexity when an algorithm consists of multiple sequential steps or loops.",
    codeSnippet: `void processData(const vector<int>& arr) {
  // Step 1
  for (int i = 0; i < arr.size(); i++) {
    cout << arr[i] << endl;
  }
  
  // Step 2
  for (int j = 0; j < arr.size(); j++) {
    cout << arr[j] << endl;
  }
}`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    analysisSteps: [
      { label: "Analyze Step 1", text: "The first loop runs n times: O(n)." },
      { label: "Analyze Step 2", text: "The second loop runs n times: O(n)." },
      { label: "Combine sequentially", text: "Because the loops are sequential (one after another), we add them: O(n) + O(n) = O(2n)." },
      { label: "Drop Constants", text: "In Big O notation, we ignore constants. O(2n) simplifies to O(n)." }
    ],
    keyTakeaway: {
      title: "Conclusion",
      text: ["Sequential loops are ADDED, not multiplied. Two linear passes still result in:", "**Time: O(n)**"]
    },
    extraBlocks: [
      {
        title: "Different Inputs = Different Variables",
        code: `void merge(const vector<int>& arrA, const vector<int>& arrB) {
  for (int i = 0; i < arrA.size(); i++) { /*...*/ }
  for (int j = 0; j < arrB.size(); j++) { /*...*/ }
}`,
        text: "Because arrA and arrB can be different sizes, we cannot combine them into 'n'.",
        complexityBadge: "O(a + b)"
      }
    ]
  },
  {
    id: 6,
    category: "Intermediate",
    title: "Recursion",
    description: "In this lesson, you'll learn how to determine the complexity of recursive functions by analyzing the call tree and stack depth.",
    codeSnippet: `int factorial(int n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    analysisSteps: [
      { label: "Identify the base case", text: "The recursion stops when n <= 1." },
      { label: "Count the function calls", text: "To calculate factorial(5), it must call factorial(4), then 3, then 2, then 1. That is exactly n calls." },
      { label: "Analyze memory (Space)", text: "Each function call must wait for the next one to finish, meaning n frames are pushed onto the Call Stack in memory." }
    ],
    keyTakeaway: {
      title: "Conclusion",
      text: ["A recursive function that calls itself once per level, reducing n by 1 each time, has:", "**Time: O(n) | Space: O(n)**"]
    },
    extraBlocks: [
      {
        title: "Exponential Recursion (Branching)",
        code: `int fibonacci(int n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,
        text: "Because the function branches TWO times per call, the tree doubles at every level.",
        complexityBadge: "O(2ⁿ)"
      }
    ]
  },
  {
    id: 7,
    category: "Advanced",
    title: "Divide & Conquer",
    description: "In this lesson, you'll learn how algorithms like Merge Sort split inputs and merge them back together to achieve the fastest possible comparison sort time.",
    codeSnippet: `// Merge Sort Conceptual Paradigm
void mergeSort(vector<int>& arr, int left, int right) {
  if (left >= right) return;
  
  int mid = left + (right - left) / 2;
  
  // Recursively divide
  mergeSort(arr, left, mid);
  mergeSort(arr, mid + 1, right);
  
  // Linear merge step
  merge(arr, left, mid, right);
}`,
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    analysisSteps: [
      { label: "The Divide Phase", text: "The array is recursively split in half until chunks are size 1. Splitting takes O(log n) levels." },
      { label: "The Merge Phase", text: "At every single level of the tree, the merge() helper function iterates through all n elements to combine them." },
      { label: "Combine", text: "n work per level × log(n) levels = O(n log n)." }
    ],
    keyTakeaway: {
      title: "Conclusion",
      text: ["Algorithms that recursively divide data in half AND do linear work to reassemble it have:", "**Time: O(n log n)**"]
    },
    proTip: "O(n log n) is mathematically the fastest possible worst-case time complexity for any comparison-based sorting algorithm."
  },
  {
    id: 8,
    category: "Intermediate",
    title: "Best, Average & Worst Case",
    description: "In this lesson, you'll learn why algorithms can perform differently depending on the exact arrangement of the input data.",
    codeSnippet: `int findTarget(const vector<int>& arr, int target) {
  for (int i = 0; i < arr.size(); i++) {
    if (arr[i] == target) return i;
  }
  return -1;
}`,
    timeComplexity: "O(n) Worst / O(1) Best",
    spaceComplexity: "O(1)",
    analysisSteps: [
      { label: "Best Case (Ω)", text: "If the target is the very first element, the loop runs exactly once. Time is O(1)." },
      { label: "Average Case (Θ)", text: "On average, the target is in the middle. The loop runs n/2 times. Dropping constants, time is O(n)." },
      { label: "Worst Case (O)", text: "If the target is at the very end (or not there at all), the loop must check every single item. Time is O(n)." }
    ],
    keyTakeaway: {
      title: "Why do we care about Worst Case?",
      text: ["In industry software engineering, we design systems to survive the worst possible scenarios to prevent servers from crashing under heavy load. That's why Big O (Worst Case) is the standard."]
    },
    extraBlocks: [
      {
        title: "Insertion Sort Example",
        code: `// Best Case: Array is already sorted -> O(n)\n// Worst Case: Array is in reverse order -> O(n²)`
      }
    ]
  },
  {
    id: 9,
    category: "Advanced",
    title: "Dynamic Programming (1D)",
    description: "In this lesson, you'll learn how caching (memoization) reduces exponential recursive time complexities to highly efficient linear time.",
    codeSnippet: `int fibonacciMemo(int n, unordered_map<int, int>& memo) {
  if (n <= 1) return n;
  
  // Check the cache first!
  if (memo.find(n) != memo.end()) return memo[n];
  
  // Do the work, but save it for later
  memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
  return memo[n];
}`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    analysisSteps: [
      { label: "Identify overlapping subproblems", text: "Without the memo object, fib(5) calculates fib(3) twice, fib(2) three times, etc. This causes an O(2ⁿ) explosion." },
      { label: "Analyze the Cache", text: "Because we save every result in 'memo', we only ever calculate each number from 1 to n exactly ONE time." },
      { label: "Calculate Space", text: "The Call Stack goes n levels deep, AND the memo object stores n keys. O(n) + O(n) = O(n) space." }
    ],
    keyTakeaway: {
      title: "Conclusion",
      text: ["By trading memory (a cache) for time, we turned an algorithm that would take millions of years for n=100 into one that runs instantly:", "**Time: O(n)**"]
    }
  },
  {
    id: 10,
    category: "Advanced",
    title: "Dynamic Programming (2D)",
    description: "In this lesson, you'll learn how to analyze algorithms that fill a 2D grid or evaluate two shifting variables.",
    codeSnippet: `int gridTraveler(int m, int n, vector<vector<int>>& memo) {
  // Base cases
  if (m == 1 && n == 1) return 1;
  if (m == 0 || n == 0) return 0;
  
  // Return cached result
  if (memo[m][n] != -1) return memo[m][n];
  
  // Recursively travel down and right
  memo[m][n] = gridTraveler(m - 1, n, memo) + gridTraveler(m, n - 1, memo);
  return memo[m][n];
}`,
    timeComplexity: "O(m * n)",
    spaceComplexity: "O(m * n)",
    analysisSteps: [
      { label: "Identify combinations", text: "The variables 'm' and 'n' change on every recursive call." },
      { label: "Count total unique states", text: "If m=3 and n=3, the maximum number of unique grid coordinates we can calculate is 3 × 3 = 9." },
      { label: "Work per state", text: "Checking the memo and adding two numbers together takes O(1) time." }
    ],
    keyTakeaway: {
      title: "Conclusion",
      text: ["Because memoization ensures we only calculate each grid coordinate exactly once, the time complexity is the area of the grid:", "**Time: O(m × n)**"]
    }
  },
  {
    id: 11,
    category: "Advanced",
    title: "Tree Traversal",
    description: "In this lesson, you'll learn why visiting every node in a tree structure takes linear time, and how the tree's balance affects space complexity.",
    codeSnippet: `struct TreeNode {
  int val;
  TreeNode* left;
  TreeNode* right;
};

void dfsInorder(TreeNode* root) {
  if (root == nullptr) return;
  
  dfsInorder(root->left);
  cout << root->val << endl;
  dfsInorder(root->right);
}`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    analysisSteps: [
      { label: "Time: Count Node Visits", text: "The definition of traversing a tree means visiting every single node. If there are n nodes, we do n operations. Time is always O(n)." },
      { label: "Space: Call Stack Depth", text: "The maximum memory used is determined by how deep the recursion goes. The depth of a tree is called its height (h)." }
    ],
    keyTakeaway: {
      title: "Conclusion",
      text: ["Tree traversal time is always linear. The space depends entirely on the height (h) of the tree:", "**Time: O(n) | Space: O(h)**"]
    },
    extraBlocks: [
      {
        title: "Balanced vs Unbalanced Trees",
        code: `// Balanced Tree: h = log(n) -> O(log n) space
// Unbalanced Tree (Line): h = n -> O(n) space`
      }
    ]
  },
  {
    id: 12,
    category: "Advanced",
    title: "Graph Traversal",
    description: "In this lesson, you'll learn how graph algorithms depend on both the number of Vertices (V) and Edges (E).",
    codeSnippet: `void bfs(const vector<vector<int>>& graph, int start) {
  queue<int> q;
  unordered_set<int> visited; // Crucial for graphs!
  
  q.push(start);
  visited.insert(start);
  
  while (!q.empty()) {
    int node = q.front();
    q.pop();
    
    for (int neighbor : graph[node]) {
      if (visited.find(neighbor) == visited.end()) {
        visited.insert(neighbor);
        q.push(neighbor);
      }
    }
  }
}`,
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    analysisSteps: [
      { label: "V = Vertices", text: "The while loop ensures that every node (Vertex) is added to and removed from the queue exactly once." },
      { label: "E = Edges", text: "The inner for loop iterates over every connection (Edge) originating from the current node." },
      { label: "Combine", text: "Because we process all V vertices, and across all those vertices we check all E edges, the total time is V + E." }
    ],
    keyTakeaway: {
      title: "Conclusion",
      text: ["Graph algorithms process every node and every connection:", "**Time: O(V + E)**"]
    }
  },
  {
    id: 13,
    category: "Advanced",
    title: "Amortized Analysis",
    description: "In this lesson, you'll learn how to average out rare, expensive operations over a long sequence of cheap operations.",
    codeSnippet: `vector<int> dynamicArray;
for (int i = 0; i < 1000; i++) {
  // Usually this takes O(1) time.
  // When memory runs out, vector resizes taking O(n) time.
  dynamicArray.push_back(i);
}`,
    timeComplexity: "O(1) Amortized",
    spaceComplexity: "O(n)",
    analysisSteps: [
      { label: "The Cheap Operation", text: "99% of the time, pushing an item to the end of a vector is instant: O(1)." },
      { label: "The Expensive Operation", text: "When the vector fills up, C++ allocates a new chunk of memory double the size and copies all elements over: O(n)." },
      { label: "The Average", text: "Because the vector doubles, the expensive operation happens less and less frequently. The O(n) cost is 'spread out' over the many O(1) pushes." }
    ],
    keyTakeaway: {
      title: "Conclusion",
      text: ["When an expensive operation is mathematically rare enough, the overall average remains constant:", "**Time: O(1) Amortized**"]
    }
  },
  {
    id: 14,
    category: "Intermediate",
    title: "Data Structure Complexity",
    description: "In this lesson, you'll learn why choosing the right data structure changes the Big O of your operations drastically.",
    extraBlocks: [
      {
        title: "C++ Vector (Array)",
        code: `vector<int> arr = {10, 20, 30, 40, 50};

arr[2];                      // Access by index -> O(1)
arr.push_back(60);           // Append -> O(1) amortized
arr.insert(arr.begin(), 5);  // Prepend -> O(n) (shifts all)
arr.erase(arr.begin() + 2);  // Delete middle -> O(n)`
      },
      {
        title: "Linked List",
        code: `// head -> 10 -> 20 -> 30 -> 40 -> 50

// Access by index -> O(n) (must traverse)
// Prepend -> O(1) (update head pointer)
// Delete at known node -> O(1)
// Search -> O(n) (must traverse)`
      }
    ],
    comparisonTable: {
      headers: ["Operation", "Array", "Linked List", "Hash Map"],
      rows: [
        ["Access by index", "O(1)", "O(n)", "—"],
        ["Search", "O(n)", "O(n)", "O(1) avg"],
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
    proTip: "* Amortized. ** O(1) with tail pointer. *** If you have a reference to the node."
  },
  {
    id: 15,
    category: "Basics",
    title: "Space Complexity",
    description: "In this lesson, you'll learn how to measure the extra memory an algorithm requires as the input size grows.",
    codeSnippet: `vector<int> copyArray(const vector<int>& arr) {
  vector<int> copy; // Extra memory allocated!
  for (int i = 0; i < arr.size(); i++) {
    copy.push_back(arr[i]);
  }
  return copy;
}`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    analysisSteps: [
      { label: "Identify Input Variables", text: "The 'arr' passed into the function by reference does not count towards extra space." },
      { label: "Identify New Allocations", text: "The 'copy' vector grows directly in proportion to the input vector." },
      { label: "Calculate", text: "Because we create 1 new element for every 1 element in the input, the space scales linearly." }
    ],
    keyTakeaway: {
      title: "Conclusion",
      text: ["Creating new arrays, strings, or hash maps proportional to the input size results in:", "**Space: O(n)**"]
    },
    extraBlocks: [
      {
        title: "In-Place Modification (O(1) Space)",
        code: `void reverseInPlace(vector<int>& arr) {
  int left = 0, right = arr.size() - 1;
  while(left < right) {
    int temp = arr[left];
    arr[left++] = arr[right];
    arr[right--] = temp;
  }
}`,
        text: "We only use 3 integer variables (left, right, temp) regardless of how large the array gets.",
        complexityBadge: "O(1) Space"
      }
    ]
  },
  {
    id: 16,
    category: "Advanced",
    title: "Memoization & Optimization",
    description: "In this lesson, you'll learn the ultimate coding interview technique: trading Space for Time using Hash Maps.",
    codeSnippet: `// Problem: Find two numbers in array that add up to target.

// BAD: O(n²) Time
vector<int> twoSumBruteForce(const vector<int>& nums, int target) {
  for (int i = 0; i < nums.size(); i++) {
    for (int j = i + 1; j < nums.size(); j++) {
      if (nums[i] + nums[j] == target) return {i, j};
    }
  }
  return {};
}`,
    extraBlocks: [
      {
        title: "Optimized Solution",
        code: `// GOOD: O(n) Time | O(n) Space
vector<int> twoSumOptimized(const vector<int>& nums, int target) {
  unordered_map<int, int> map;
  for (int i = 0; i < nums.size(); i++) {
    int needed = target - nums[i];
    
    // O(1) Instant Lookup!
    if (map.find(needed) != map.end()) return {map[needed], i};
    
    map[nums[i]] = i;
  }
  return {};
}`,
        text: "By caching elements we've seen, we avoid looping twice.",
        complexityBadge: "O(n) Time"
      }
    ],
    keyTakeaway: {
      title: "The Golden Rule of Algorithms",
      text: [
        "If you have an **O(n²)** algorithm involving nested loops, always ask yourself: *'Can I use a Hash Map to make this O(n)?'*",
        "By storing elements in memory as you iterate, you turn an O(n) inner loop into an O(1) lookup."
      ]
    }
  }
];