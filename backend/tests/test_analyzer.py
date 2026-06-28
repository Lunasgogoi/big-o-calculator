import unittest

from core import parser as code_parser
from core.analyzer import analyze_static_complexity


class StaticAnalyzerTests(unittest.TestCase):
    def analyze(self, code: str):
        root_node = code_parser.parse_code(code, "python")
        return analyze_static_complexity(root_node, code, "python")

    def analyze_cpp(self, code: str):
        root_node = code_parser.parse_code(code, "cpp")
        return analyze_static_complexity(root_node, code, "cpp")

    def test_binary_search_beats_base_loop_count(self):
        result = self.analyze(
            """
def binary_search(nums, target):
    left = 0
    right = len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
"""
        )

        self.assertEqual(result.time_complexity, "O(log n)")
        self.assertEqual(result.space_complexity, "O(1)")
        self.assertEqual(result.dominant_rule, "sorting_search")
        self.assertEqual(result.confidence_label, "high")

    def test_nested_loops_fall_back_to_base_rule(self):
        result = self.analyze(
            """
def pairs(nums):
    total = 0
    for i in range(len(nums)):
        for j in range(len(nums)):
            total += nums[i] * nums[j]
    return total
"""
        )

        self.assertEqual(result.time_complexity, "O(N^2)")
        self.assertEqual(result.space_complexity, "O(1)")
        self.assertEqual(result.dominant_rule, "base_loops")
        self.assertEqual(result.confidence_label, "low")

    def test_sliding_window_overrides_naive_nested_loop(self):
        result = self.analyze(
            """
def min_subarray(nums, target):
    left = 0
    current = 0
    best = len(nums) + 1
    for right in range(len(nums)):
        current += nums[right]
        while current >= target:
            best = min(best, right - left + 1)
            current -= nums[left]
            left += 1
    return best
"""
        )

        self.assertEqual(result.time_complexity, "O(n)")
        self.assertEqual(result.space_complexity, "O(1)")
        self.assertEqual(result.dominant_rule, "sliding_window")
        self.assertEqual(result.confidence_label, "high")

    def test_api_metadata_serialization(self):
        result = self.analyze(
            """
def linear(nums):
    for x in nums:
        print(x)
"""
        )

        rules = result.matched_rules_for_api()

        self.assertGreaterEqual(len(rules), 1)
        self.assertIn("confidence", rules[0])
        self.assertIn("confidence_label", rules[0])
        self.assertIn("rule_name", rules[0])

    def test_python_recursive_tree_traversal_uses_height_space(self):
        result = self.analyze(
            """
def inorder(root):
    if not root:
        return
    inorder(root.left)
    print(root.val)
    inorder(root.right)
"""
        )

        self.assertEqual(result.time_complexity, "O(n)")
        self.assertEqual(result.space_complexity, "O(h)")
        self.assertEqual(result.dominant_rule, "binary_tree")

    def test_python_tree_bfs_keeps_linear_frontier_space(self):
        result = self.analyze(
            """
from collections import deque

def level_order(root):
    if not root:
        return []
    q = deque([root])
    values = []
    while q:
        node = q.popleft()
        values.append(node.val)
        if node.left:
            q.append(node.left)
        if node.right:
            q.append(node.right)
    return values
"""
        )

        self.assertEqual(result.time_complexity, "O(n)")
        self.assertEqual(result.space_complexity, "O(n)")
        self.assertEqual(result.dominant_rule, "binary_tree")

    def test_python_graph_bfs_detects_vertex_edge_complexity(self):
        result = self.analyze(
            """
from collections import deque

def bfs(adj):
    visited = set()
    q = deque([0])
    while q:
        node = q.popleft()
        if node in visited:
            continue
        visited.add(node)
        for nxt in adj[node]:
            q.append(nxt)
"""
        )

        self.assertEqual(result.time_complexity, "O(V + E)")
        self.assertEqual(result.space_complexity, "O(V + E)")
        self.assertEqual(result.dominant_rule, "graph_traversal")

    def test_python_bounded_heap_uses_k_complexity(self):
        result = self.analyze(
            """
import heapq

def top_k(nums, k):
    heap = []
    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap
"""
        )

        self.assertEqual(result.time_complexity, "O(n log k)")
        self.assertEqual(result.space_complexity, "O(k)")
        self.assertEqual(result.dominant_rule, "heap")

    def test_python_single_heap_operation_is_logarithmic(self):
        result = self.analyze(
            """
import heapq

def push_one(heap, value):
    heapq.heappush(heap, value)
"""
        )

        self.assertEqual(result.time_complexity, "O(log n)")
        self.assertEqual(result.space_complexity, "O(1)")
        self.assertEqual(result.dominant_rule, "heap")

    def test_python_dsu_without_sort_uses_alpha_complexity(self):
        result = self.analyze(
            """
def find(x, parent):
    if parent[x] != x:
        parent[x] = find(parent[x], parent)
    return parent[x]

def union(a, b, parent):
    root_a = find(a, parent)
    root_b = find(b, parent)
    if root_a != root_b:
        parent[root_a] = root_b
"""
        )

        self.assertEqual(result.time_complexity, "O(E * alpha(V))")
        self.assertEqual(result.space_complexity, "O(V)")
        self.assertEqual(result.dominant_rule, "dsu")

    def test_python_bit_manipulation_loop_is_logarithmic(self):
        result = self.analyze(
            """
def count_bits(n):
    count = 0
    while n:
        n &= n - 1
        count += 1
    return count
"""
        )

        self.assertEqual(result.time_complexity, "O(log n)")
        self.assertEqual(result.space_complexity, "O(1)")
        self.assertEqual(result.dominant_rule, "bit_manipulation")

    def test_python_nested_halving_loops_are_log_squared(self):
        result = self.analyze(
            """
def nested_halving(n):
    total = 0
    while n > 1:
        m = n
        while m > 1:
            total += 1
            m //= 2
        n //= 2
    return total
"""
        )

        self.assertEqual(result.time_complexity, "O((log n)^2)")
        self.assertEqual(result.space_complexity, "O(1)")
        self.assertEqual(result.dominant_rule, "logarithmic")

    def test_cpp_binary_search_beats_base_loop_count(self):
        result = self.analyze_cpp(
            """
int binarySearch(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
"""
        )

        self.assertEqual(result.time_complexity, "O(log n)")
        self.assertEqual(result.space_complexity, "O(1)")
        self.assertEqual(result.dominant_rule, "sorting_search")

    def test_cpp_builtin_sort(self):
        result = self.analyze_cpp(
            """
void sortValues(vector<int>& nums) {
    sort(nums.begin(), nums.end());
}
"""
        )

        self.assertEqual(result.time_complexity, "O(n log n)")
        self.assertEqual(result.space_complexity, "O(1)")
        self.assertEqual(result.dominant_rule, "built_in_sort")

    def test_cpp_nested_loops_fall_back_to_base_rule(self):
        result = self.analyze_cpp(
            """
int pairs(vector<int>& nums) {
    int total = 0;
    for (int i = 0; i < nums.size(); i++) {
        for (int j = 0; j < nums.size(); j++) {
            total += nums[i] * nums[j];
        }
    }
    return total;
}
"""
        )

        self.assertEqual(result.time_complexity, "O(N^2)")
        self.assertEqual(result.space_complexity, "O(1)")
        self.assertEqual(result.dominant_rule, "base_loops")

    def test_cpp_graph_traversal(self):
        result = self.analyze_cpp(
            """
void bfs(vector<vector<int>>& adj) {
    vector<int> visited(adj.size());
    queue<int> q;
    q.push(0);
    visited[0] = 1;
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        for (int next : adj[node]) {
            if (!visited[next]) {
                visited[next] = 1;
                q.push(next);
            }
        }
    }
}
"""
        )

        self.assertEqual(result.time_complexity, "O(V + E)")
        self.assertEqual(result.space_complexity, "O(V + E)")
        self.assertEqual(result.dominant_rule, "graph_traversal")

    def test_cpp_priority_queue_loop(self):
        result = self.analyze_cpp(
            """
void buildHeap(vector<int>& nums) {
    priority_queue<int> pq;
    for (int x : nums) {
        pq.push(x);
    }
}
"""
        )

        self.assertEqual(result.time_complexity, "O(n log n)")
        self.assertEqual(result.space_complexity, "O(n)")
        self.assertEqual(result.dominant_rule, "heap")

    def test_cpp_dsu_kruskal_sort_dominates(self):
        result = self.analyze_cpp(
            """
int find(int x, vector<int>& parent) {
    if (parent[x] == x) return x;
    return parent[x] = find(parent[x], parent);
}

void kruskal(vector<array<int, 3>>& edges, vector<int>& parent) {
    sort(edges.begin(), edges.end());
    for (auto edge : edges) {
        int a = find(edge[1], parent);
        int b = find(edge[2], parent);
        if (a != b) parent[a] = b;
    }
}
"""
        )

        self.assertEqual(result.time_complexity, "O(E log E)")
        self.assertEqual(result.space_complexity, "O(V)")
        self.assertEqual(result.dominant_rule, "dsu")

    def test_cpp_recursive_tree_traversal_uses_height_space(self):
        result = self.analyze_cpp(
            """
void inorder(TreeNode* root) {
    if (!root) return;
    inorder(root->left);
    cout << root->val;
    inorder(root->right);
}
"""
        )

        self.assertEqual(result.time_complexity, "O(n)")
        self.assertEqual(result.space_complexity, "O(h)")
        self.assertEqual(result.dominant_rule, "recursion")


if __name__ == "__main__":
    unittest.main()
