// src/data/examplesData.ts

export interface Badge {
  label: string;
  value: string;
  color: 'green' | 'orange' | 'red' | 'blue';
}

export interface AlgorithmExample {
  id: string;
  title: string;
  badges: Badge[];
  description?: string;
  code: string;
  analysis: string;
  useCase?: string;
}

export interface OperationRow {
  operation: string;
  time: string;
  color: 'green' | 'orange' | 'red' | 'blue';
  worstTime?: string;
  worstColor?: 'green' | 'orange' | 'red' | 'blue';
  description: string;
}

export interface OperationTable {
  title: string;
  hasWorstCase?: boolean;
  rows: OperationRow[];
  note?: string;
}

export interface ExampleCategory {
  categoryName: string;
  examples?: AlgorithmExample[];
  tables?: OperationTable[];
}

export const examplesData: ExampleCategory[] = [
  {
    categoryName: "Searching Algorithms",
    examples: [
      {
        id: "linear-search",
        title: "Linear Search",
        badges: [
          { label: "Time", value: "O(n)", color: "orange" },
          { label: "Space", value: "O(1)", color: "green" }
        ],
        description: "Linear search checks every element in the array sequentially until it finds the target or reaches the end.",
        code: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]`,
        analysis: "In the worst case, we need to check all n elements, giving us O(n) time complexity. We only use a constant amount of extra space for the loop variable.",
        useCase: "Best for small arrays or unsorted data where you can't use more efficient methods."
      },
      {
        id: "binary-search",
        title: "Binary Search",
        badges: [
          { label: "Time", value: "O(log n)", color: "blue" },
          { label: "Space", value: "O(1)", color: "green" }
        ],
        description: "Binary search works on sorted arrays by repeatedly dividing the search interval in half.",
        code: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
            
    return -1

# Example usage
numbers = [11, 12, 22, 25, 34, 64, 90]  # Must be sorted!`,
        analysis: "Each iteration eliminates half of the remaining elements. With n elements, we need at most log₂(n) iterations, giving us O(log n) time complexity.",
        useCase: "Extremely efficient for searching in sorted arrays. Much faster than linear search for large datasets."
      }
    ]
  },
  {
    categoryName: "Sorting Algorithms",
    examples: [
      {
        id: "bubble-sort",
        title: "Bubble Sort",
        badges: [
          { label: "Time", value: "O(n²)", color: "red" },
          { label: "Space", value: "O(1)", color: "green" }
        ],
        description: "Bubble sort repeatedly steps through the list, compares adjacent elements, and swaps them if they're in the wrong order.",
        code: `def bubble_sort(arr):
    n = len(arr)
    
    for i in range(n):
        # Flag to optimize: stop if no swaps occur
        swapped = False
        
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
                
        if not swapped:
            break
            
    return arr`,
        analysis: "The nested loops give us O(n²) time complexity. The outer loop runs n times, and the inner loop runs up to n times for each iteration.",
        useCase: "Educational purposes and very small datasets. Not recommended for production use."
      },
      {
        id: "merge-sort",
        title: "Merge Sort",
        badges: [
          { label: "Time", value: "O(n log n)", color: "orange" },
          { label: "Space", value: "O(n)", color: "orange" }
        ],
        description: "Merge sort is a divide-and-conquer algorithm that divides the array into halves, sorts them, and merges them back.",
        code: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
        
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
            
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
        analysis: "The array is divided log n times (divide phase), and merging takes O(n) time at each level, giving us O(n log n) total time complexity.",
        useCase: "Excellent for large datasets. Guaranteed O(n log n) performance, but requires extra space."
      },
      {
        id: "quick-sort",
        title: "Quick Sort",
        badges: [
          { label: "Average", value: "O(n log n)", color: "orange" },
          { label: "Worst", value: "O(n²)", color: "red" },
          { label: "Space", value: "O(log n)", color: "blue" }
        ],
        description: "Quick sort picks a pivot element and partitions the array around it, then recursively sorts the partitions.",
        code: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
        
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)`,
        analysis: "Average case is O(n log n) with good pivot selection. Worst case O(n²) occurs when the pivot is always the smallest or largest element.",
        useCase: "Often the fastest sorting algorithm in practice. Used in many standard libraries."
      }
    ]
  },
  {
    categoryName: "Data Structure Operations",
    tables: [
      {
        title: "Array Operations",
        rows: [
          { operation: "Access by index", time: "O(1)", color: "green", description: "Direct memory access" },
          { operation: "Search", time: "O(n)", color: "orange", description: "Must check each element" },
          { operation: "Insert at end", time: "O(1)", color: "green", description: "Amortized constant time" },
          { operation: "Insert at beginning", time: "O(n)", color: "orange", description: "Must shift all elements" },
          { operation: "Delete", time: "O(n)", color: "orange", description: "May need to shift elements" }
        ]
      },
      {
        title: "Hash Table Operations",
        hasWorstCase: true,
        rows: [
          { operation: "Search", time: "O(1)", color: "green", worstTime: "O(n)", worstColor: "orange", description: "" },
          { operation: "Insert", time: "O(1)", color: "green", worstTime: "O(n)", worstColor: "orange", description: "" },
          { operation: "Delete", time: "O(1)", color: "green", worstTime: "O(n)", worstColor: "orange", description: "" }
        ],
        note: "Worst case occurs with many hash collisions. Good hash functions make this rare."
      },
      {
        title: "Binary Search Tree Operations",
        hasWorstCase: true,
        rows: [
          { operation: "Search", time: "O(log n)", color: "blue", worstTime: "O(n)", worstColor: "orange", description: "" },
          { operation: "Insert", time: "O(log n)", color: "blue", worstTime: "O(n)", worstColor: "orange", description: "" },
          { operation: "Delete", time: "O(log n)", color: "blue", worstTime: "O(n)", worstColor: "orange", description: "" }
        ],
        note: "Worst case occurs when the tree becomes unbalanced (like a linked list). Balanced trees (AVL, Red-Black) guarantee O(log n) for all operations."
      }
    ]
  },
  {
    categoryName: "String Algorithms",
    examples: [
      {
        id: "palindrome-check",
        title: "Palindrome Check",
        badges: [
          { label: "Time", value: "O(n)", color: "orange" },
          { label: "Space", value: "O(1)", color: "green" }
        ],
        code: `def is_palindrome(s):
    # Remove non-alphanumeric and convert to lowercase
    s = ''.join(c.lower() for c in s if c.isalnum())
    
    left, right = 0, len(s) - 1
    
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
        
    return True`,
        analysis: "We iterate through the string once to clean it (O(n)), then compare characters from both ends moving toward the center (O(n/2) = O(n))."
      },
      {
        id: "anagram-check",
        title: "Anagram Check",
        badges: [
          { label: "Time", value: "O(n)", color: "orange" },
          { label: "Space", value: "O(n)", color: "orange" }
        ],
        code: `def are_anagrams(s1, s2):
    if len(s1) != len(s2):
        return False
        
    # Count character frequencies
    char_count = {}
    
    for char in s1:
        char_count[char] = char_count.get(char, 0) + 1
        
    for char in s2:
        if char not in char_count:
            return False
        char_count[char] -= 1
        if char_count[char] < 0:
            return False
            
    return True`,
        analysis: "We iterate through both strings once (O(n) each), and use a hash table to store character counts (O(n) space)."
      }
    ]
  },
  {
    categoryName: "Dynamic Programming Examples",
    examples: [
      {
        id: "fib-naive",
        title: "Fibonacci (Naive Recursion)",
        badges: [
          { label: "Time", value: "O(2ⁿ)", color: "red" },
          { label: "Space", value: "O(n)", color: "orange" }
        ],
        code: `def fibonacci_naive(n):
    if n <= 1:
        return n
    return fibonacci_naive(n - 1) + fibonacci_naive(n - 2)
    
# This is VERY slow for large n!`,
        analysis: "Each call spawns two more calls, creating an exponential tree of recursive calls."
      },
      {
        id: "fib-dp",
        title: "Fibonacci (Dynamic Programming)",
        badges: [
          { label: "Time", value: "O(n)", color: "orange" },
          { label: "Space", value: "O(n)", color: "orange" }
        ],
        code: `def fibonacci_dp(n):
    if n <= 1:
        return n
        
    # Memoization: store computed values
    dp = [0] * (n + 1)
    dp[1] = 1
    
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
        
    return dp[n]`,
        analysis: "We compute each Fibonacci number exactly once and store it, reducing exponential time to linear time at the cost of O(n) space."
      },
      {
        id: "fib-optimized",
        title: "Fibonacci (Space Optimized)",
        badges: [
          { label: "Time", value: "O(n)", color: "orange" },
          { label: "Space", value: "O(1)", color: "green" }
        ],
        code: `def fibonacci_optimized(n):
    if n <= 1:
        return n
        
    prev2, prev1 = 0, 1
    
    for i in range(2, n + 1):
        current = prev1 + prev2
        prev2, prev1 = prev1, current
        
    return prev1
    
# Fast and memory efficient!`,
        analysis: "We only need to remember the last two values, reducing space complexity to O(1) while maintaining O(n) time complexity."
      }
    ]
  }
];