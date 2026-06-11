# 🧠 AI-Powered Algorithmic Complexity Analyzer

An intelligent, compiler-grade static code analyzer built to accurately determine the Time (O) and Space complexities of competitive programming and algorithmic code. 

Unlike naive linting tools that simply count nested loops, this engine parses the **Abstract Syntax Tree (AST)** to detect advanced structural paradigms (like Amortized O(n) Sliding Windows, Monotonic Stacks, and Graph Traversals) and uses Google's Gemini AI to explain the underlying logic.

### ✨ Key Features

* **Advanced AST Parsing:** Utilizes `tree-sitter` to read code structure, ignoring syntax formatting and focusing purely on algorithmic execution.
* **Smart Paradigm Detection:** Specifically trained to recognize patterns from advanced DSA sheets (like Striver's A2Z), including:
  * **Amortized Patterns:** Sliding Window, Two Pointers, Monotonic Stack (O(n)).
  * **Dynamic Programming:** Top-Down Memoization (`@cache` / `memo`) and Bottom-Up Tabulation (O(n)).
  * **Graph & Tree Algorithms:** DFS/BFS via queues, sets, and attribute checks (O(V+E), O(log n)).
  * **Data Structures:** Priority Queues / Heaps, Linked List Fast/Slow pointers.
* **Dominant Complexity Ranking:** Intelligently evaluates files containing multiple discrete algorithms and correctly identifies the heaviest Big O complexity.
* **AI-Powered Explanations:** Integrates Google Gemini as a "Senior Staff Engineer" to provide dense, professional insights into *why* the code achieved its complexity.
* **Scalable Architecture:** Designed with a "Deep, Then Wide" philosophy. The core engine dynamically routes languages, making adding new languages (like C++ or Java) seamless.

---

### 🏗️ Project Architecture

The backend is built with FastAPI and utilizes a language-isolated rule engine:

```text
backend/
├── core/
│   ├── ai_client.py       # Gemini API integration and technical prompting
│   └── parser.py          # Tree-sitter dynamic language switcher
├── rules/
│   ├── python/            # Python-specific AST detection rules
│   │   ├── binary_tree.py
│   │   ├── dynamic_programming.py
│   │   ├── graph_traversal.py
│   │   ├── heap.py
│   │   ├── linked_list.py
│   │   ├── monotonic_stack.py
│   │   ├── sliding_window.py
│   │   ├── sorting_search.py
│   │   ├── space_complexity.py
│   │   └── tabulation.py
│   └── cpp/               # C++ rule implementations (WIP)
└── main.py                # Traffic director and Complexity Ranking Pipeline

```
---

## Getting Started
1. Clone the Repository

```
git clone [https://github.com/yourusername/algorithmic-complexity-analyzer.git](https://github.com/yourusername/algorithmic-complexity-analyzer.git)
cd algorithmic-complexity-analyzer
```

2. Backend Setup (FastAPI & Tree-sitter)
Ensure you have Python 3.9+ installed.

```
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
```
Create a .env file in the backend/ directory and add your Google Gemini API key:

```
GEMINI_API_KEY=your_api_key_here
```
Start the FastAPI server:

```
uvicorn main:app --reload
```

3. Frontend Setup (React + Tailwind)
Open a new terminal window.

```
cd frontend
npm install
npm run dev
```
---


##  How It Works (The Edge Cases)
This engine is specifically designed to intercept edge cases that trick standard analyzers:

The O(n^2) Illusion: A while loop inside a for loop normally triggers an O(n^2) flag. If our engine detects continuous pointer arithmetic without resetting (Sliding Window) or .pop() operations on a pushed array (Monotonic Stack), it overrides the generic logic to output Amortized O(n).

The Recursion Trap: Standard recursion is flagged as O(2^n). If the engine detects a wrapper like @cache or a dictionary lookup if n in memo:, it completely restructures the AST read to output O(n).

Graph Bypassing: Detects the signature combination of set() (visited) and deque() (frontier) to bypass generic loops and accurately calculate O(V + E).




🛠️ Tech Stack
Backend: Python, FastAPI, Pydantic, Tree-sitter

Frontend: React, TypeScript, Tailwind CSS, React-Hot-Toast

AI: Google Gemini Pro (google-generativeai)




## Author

