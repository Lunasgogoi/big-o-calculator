# backend/core/parser.py
from tree_sitter import Language, Parser
import tree_sitter_python as tspython

class ASTParser:
    def __init__(self):
        """
        Initializes the parsers for supported languages.
        We do this once when the server starts to save time on each request.
        """
        # 1. Load the specific grammar for Python
        self.py_language = Language(tspython.language())
        
        # 2. Create a dictionary of parsers. 
        # (Easy to add "cpp" and "java" here later!)
        self.parsers = {
            "python": Parser(self.py_language)
        }
        
        # 3. Store the language objects for querying later
        self.languages = {
            "python": self.py_language
        }

    def parse_code(self, code: str, language_name: str = "python"):
        """
        Takes raw source code and turns it into a Tree-sitter AST.
        Returns the root node of the tree.
        """
        language_name = language_name.lower()
        if language_name not in self.parsers:
            raise ValueError(f"Language '{language_name}' is not supported yet.")
        
        parser = self.parsers[language_name]
        
        # Tree-sitter requires strings to be converted into bytes before parsing
        code_bytes = bytes(code, "utf8")
        tree = parser.parse(code_bytes)
        
        # We only care about the root node to start our tree traversal
        return tree.root_node

    def get_language(self, language_name: str = "python") -> Language:
        """
        Returns the Language object, which is needed to execute 
        pattern-matching queries (our algorithm fingerprints).
        """
        language_name = language_name.lower()
        if language_name not in self.languages:
            raise ValueError(f"Language '{language_name}' is not supported yet.")
            
        return self.languages[language_name]

# Create a single global instance of our parser to be used across the FastAPI app
code_parser = ASTParser()