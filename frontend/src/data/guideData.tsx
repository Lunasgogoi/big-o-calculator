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
    code: `# Accessing a list element by index
def get_first_element(arr):
    return arr[0]  # Always takes the same time

# Hash table lookup
def get_value(table, key):
    return table.get(key)  # O(1) average case`,
    examplesList: "Array access, hash table lookup, simple arithmetic operations"
  },
  {
    id: "o-logn",
    title: "O(log n) - Logarithmic Time",
    badgeText: "O(log n)",
    badgeColor: "blue",
    description: "The algorithm's runtime grows logarithmically with input size. This means doubling the input size only increases the runtime by a constant amount. Very efficient for large datasets.",
    code: `# Binary search in a sorted array
def binary_search(arr, target):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1`,
    examplesList: "Binary search, balanced tree operations, divide-and-conquer algorithms"
  },
  {
    id: "o-n",
    title: "O(n) - Linear Time",
    badgeText: "O(n)",
    badgeColor: "orange",
    description: "The runtime grows linearly with the input size. If you double the input, the runtime doubles. This is common for algorithms that need to look at every element once.",
    code: `# Finding the maximum value in a list
def find_max(arr):
    best = arr[0]
    for value in arr[1:]:
        if value > best:
            best = value
    return best

# Linear search
def linear_search(arr, target):
    for index, value in enumerate(arr):
        if value == target:
            return index
    return -1`,
    examplesList: "Linear search, iterating through an array, finding min/max"
  },
  {
    id: "o-nlogn",
    title: "O(n log n) - Linearithmic Time",
    badgeText: "O(n log n)",
    badgeColor: "orange",
    description: "This complexity appears in efficient sorting algorithms. It's worse than linear but much better than quadratic for large inputs.",
    code: `# Merge sort
def merge_sort(arr):
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
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    return result + left[i:] + right[j:]`,
    examplesList: "Merge sort, quick sort (average case), heap sort"
  },
  {
    id: "o-n2",
    title: "O(n^2) - Quadratic Time",
    badgeText: "O(n^2)",
    badgeColor: "red",
    description: "The runtime is proportional to the square of the input size. Common in algorithms with nested loops. Performance degrades quickly with larger inputs.",
    code: `# Bubble sort
def bubble_sort(arr):
    for i in range(len(arr)):
        for j in range(0, len(arr) - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

# Finding all pairs in a list
def find_all_pairs(arr):
    pairs = []
    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):
            pairs.append((arr[i], arr[j]))
    return pairs`,
    examplesList: "Bubble sort, selection sort, insertion sort, nested loops"
  },
  {
    id: "o-2n",
    title: "O(2^n) - Exponential Time",
    badgeText: "O(2^n)",
    badgeColor: "red",
    description: "The runtime doubles with each addition to the input. This is very inefficient and should be avoided for large inputs. Common in recursive algorithms that solve problems by breaking them into multiple subproblems.",
    code: `# Naive recursive Fibonacci
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Generating all subsets of a list
def get_all_subsets(arr):
    if not arr:
        return [[]]

    first = arr[0]
    rest = arr[1:]
    subsets_without_first = get_all_subsets(rest)
    subsets_with_first = [
        [first] + subset for subset in subsets_without_first
    ]

    return subsets_without_first + subsets_with_first`,
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
    code: `# Uses only a fixed number of variables
def sum_values(arr):
    total = 0  # O(1) space
    for num in arr:
        total += num
    return total`
  },
  {
    id: "space-on",
    title: "O(n) Space - Linear Space",
    badgeText: "O(n)",
    badgeColor: "orange",
    description: "",
    code: `# Creates a new list of size n
def double(arr):
    result = []  # O(n) space
    for num in arr:
        result.append(num * 2)
    return result`
  },
  {
    id: "space-on-stack",
    title: "O(n) Space - Recursive Call Stack",
    badgeText: "O(n)",
    badgeColor: "orange",
    description: "",
    code: `# Recursive calls use stack space
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)  # O(n) stack space`
  }
];
