LOOP_NODE_TYPES = {"for_statement", "for_range_loop", "while_statement", "do_statement"}


def code_bytes(raw_code: str) -> bytes:
    return bytes(raw_code, "utf8")


def node_text(node, source: bytes) -> str:
    return source[node.start_byte:node.end_byte].decode("utf8")


def walk(node):
    yield node
    for child in node.children:
        yield from walk(child)


def has_loop(node) -> bool:
    return any(child.type in LOOP_NODE_TYPES for child in walk(node))


def collect_identifiers(node, source: bytes) -> set[str]:
    identifiers = set()
    identifier_types = {
        "identifier",
        "field_identifier",
        "type_identifier",
        "namespace_identifier",
    }

    for child in walk(node):
        if child.type in identifier_types:
            identifiers.add(node_text(child, source).lower())

    return identifiers


def contains_text_in_node(node, source: bytes, needles: list[str]) -> bool:
    text = node_text(node, source).lower()
    return any(needle in text for needle in needles)
