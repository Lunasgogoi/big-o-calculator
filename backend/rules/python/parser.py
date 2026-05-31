from tree_sitter import Language, Parser
from typing import Any, cast
import tree_sitter_python as tspython
import tree_sitter_cpp as tscpp

# Initialize both language schemas
PY_LANGUAGE = Language(tspython.language())
CPP_LANGUAGE = Language(tscpp.language())

def parse_code(raw_code: str, language: str):
    """
    Dynamically switches the AST parser based on the frontend selection.
    """
    # cast to Any to satisfy static analyzers that may not recognize
    # the dynamically provided set_language attribute on Parser
    parser = cast(Any, Parser())
    if language.lower() == "cpp" or language.lower() == "c++":
        parser.set_language(CPP_LANGUAGE)
    else:
        parser.set_language(PY_LANGUAGE)
        
    code_bytes = bytes(raw_code, "utf8")
    return parser.parse(code_bytes)