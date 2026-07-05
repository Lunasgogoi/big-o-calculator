import EditorComponent from 'react-simple-code-editor';
import Prism from 'prismjs';

import 'prismjs/components/prism-python';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/themes/prism-tomorrow.css';

const editorModule = EditorComponent;
const Editor = editorModule.default ?? EditorComponent;

export default function CodeEditor({ code, setCode, language }) {
  const highlightCode = (code) => {
    const grammar = Prism.languages[language] || Prism.languages.python;
    return Prism.highlight(code, grammar, language);
  };

  const placeholderText = `# Paste your code here\ndef fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n - 1) + fibonacci(n - 2)`;

  return (
    <div className="w-full bg-transparent font-mono text-sm relative max-h-[500px] overflow-y-auto custom-scrollbar">
      <Editor
        value={code}
        onValueChange={setCode}
        highlight={highlightCode}
        padding={20}
        placeholder={placeholderText}
        style={{
          fontFamily: '"Fira Code", "JetBrains Mono", Consolas, monospace',
          fontSize: 14,
          lineHeight: 1.7,
          minHeight: '320px',
          backgroundColor: 'transparent',
        }}
        textareaClassName="focus:outline-none code-editor-textarea"
      />
    </div>
  );
}
