// src/data/guideData.ts

export interface ComplexityItem {
  id: string;
  title: string;
  badgeText: string;
  badgeColor: 'green' | 'blue' | 'orange' | 'red';
  description: string;
  code: string;
  examplesList?: string;
}

export const timeComplexities: ComplexityItem[] = [
  {
    id: "o-1",
    title: "O(1) - Constant Time",
    badgeText: "O(1)",
    badgeColor: "green",
    description: "The algorithm takes the same amount of time regardless of input size. This is the best possible time complexity.",
    code: `// Accessing an array element by index
function getFirstElement(arr) {
  return arr[0];  // Always takes the same time
}

// Hash table lookup
function getValue(map, key) {
  return map.get(key);  // O(1) average case
}`,
    examplesList: "Array access, hash table lookup, simple arithmetic operations"
  },
  {
    id: "o-logn",
    title: "O(log n) - Logarithmic Time",
    badgeText: "O(log n)",
    badgeColor: "blue",
    description: "The algorithm's runtime grows logarithmically with input size. This means doubling the input size only increases the runtime by a constant amount. Very efficient for large datasets.",
    code: `// Binary search in a sorted array
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    examplesList: "Binary search, balanced tree operations, divide-and-conquer algorithms"
  },
  {
    id: "o-n",
    title: "O(n) - Linear Time",
    badgeText: "O(n)",
    badgeColor: "orange",
    description: "The runtime grows linearly with the input size. If you double the input, the runtime doubles. This is common for algorithms that need to look at every element once.",
    code: `// Finding the maximum value in an array
function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

// Linear search
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,
    examplesList: "Linear search, iterating through an array, finding min/max"
  },
  {
    id: "o-nlogn",
    title: "O(n log n) - Linearithmic Time",
    badgeText: "O(n log n)",
    badgeColor: "orange",
    description: "This complexity appears in efficient sorting algorithms. It's worse than linear but much better than quadratic for large inputs.",
    code: `// Merge sort
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
    examplesList: "Merge sort, quick sort (average case), heap sort"
  },
  {
    id: "o-n2",
    title: "O(n²) - Quadratic Time",
    badgeText: "O(n²)",
    badgeColor: "red",
    description: "The runtime is proportional to the square of the input size. Common in algorithms with nested loops. Performance degrades quickly with larger inputs.",
    code: `// Bubble sort
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// Finding all pairs in an array
function findAllPairs(arr) {
  const pairs = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      pairs.push([arr[i], arr[j]]);
    }
  }
  return pairs;
}`,
    examplesList: "Bubble sort, selection sort, insertion sort, nested loops"
  },
  {
    id: "o-2n",
    title: "O(2ⁿ) - Exponential Time",
    badgeText: "O(2ⁿ)",
    badgeColor: "red",
    description: "The runtime doubles with each addition to the input. This is very inefficient and should be avoided for large inputs. Common in recursive algorithms that solve problems by breaking them into multiple subproblems.",
    code: `// Naive recursive Fibonacci
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Generating all subsets of a set
function getAllSubsets(arr) {
  if (arr.length === 0) return [[]];
  
  const first = arr[0];
  const rest = arr.slice(1);
  const subsetsWithoutFirst = getAllSubsets(rest);
  const subsetsWithFirst = subsetsWithoutFirst.map(
    subset => [first, ...subset]
  );
  
  return [...subsetsWithoutFirst, ...subsetsWithFirst];
}`,
    examplesList: "Recursive Fibonacci, generating all subsets, solving Tower of Hanoi"
  }
];

export const spaceComplexities: ComplexityItem[] = [
  {
    id: "space-o1",
    title: "O(1) Space - Constant Space",
    badgeText: "O(1)",
    badgeColor: "green",
    description: "",
    code: `// Uses only a fixed number of variables
function sum(arr) {
  let total = 0;  // O(1) space
  for (let num of arr) {
    total += num;
  }
  return total;
}`
  },
  {
    id: "space-on",
    title: "O(n) Space - Linear Space",
    badgeText: "O(n)",
    badgeColor: "orange",
    description: "",
    code: `// Creates a new array of size n
function double(arr) {
  const result = [];  // O(n) space
  for (let num of arr) {
    result.push(num * 2);
  }
  return result;
}`
  },
  {
    id: "space-on-stack",
    title: "O(n) Space - Recursive Call Stack",
    badgeText: "O(n)",
    badgeColor: "orange",
    description: "",
    code: `// Recursive calls use stack space
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);  // O(n) stack space
}`
  }
];