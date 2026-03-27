# backend/core/parser.py
import tree_sitter_python as tspython
import tree_sitter_c as tsc
import tree_sitter_cpp as tscpp
from tree_sitter import Language, Parser

# Load the compiled grammars
PY_LANGUAGE = Language(tspython.language())
C_LANGUAGE = Language(tsc.language())
CPP_LANGUAGE = Language(tscpp.language())

class CodeParser:
    def __init__(self):
        # Map frontend language strings to Tree-sitter languages
        self.languages = {
            "python": PY_LANGUAGE,
            "c": C_LANGUAGE,
            "cpp": CPP_LANGUAGE,
            "c++": CPP_LANGUAGE 
        }

    def parse_code(self, code: str, language: str = "python"):
        """Parses the code into an AST based on the selected language."""
        # Fall back to Python if the language isn't found
        lang = self.languages.get(language.lower(), PY_LANGUAGE)
        
        # 🚨 THE FIX: New syntax for Tree-sitter v0.22+ 🚨
        # We now pass the language directly when creating the Parser!
        parser = Parser(lang)
        
        tree = parser.parse(bytes(code, "utf8"))
        return tree.root_node

# Create a singleton instance to use in main.py
code_parser = CodeParser()