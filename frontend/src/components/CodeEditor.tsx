// frontend/src/components/CodeEditor.tsx
import EditorComponent from 'react-simple-code-editor';
import Prism from 'prismjs';

import 'prismjs/components/prism-python';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/themes/prism-tomorrow.css';

// 🐛 THE FIX: Safely extract the component for Vite
type EditorModule = typeof EditorComponent & {
  default?: typeof EditorComponent;
};

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  language: string;
}

const editorModule = EditorComponent as EditorModule;
const Editor = editorModule.default ?? EditorComponent;

export default function CodeEditor({ code, setCode, language }: CodeEditorProps) {
  
  const highlightCode = (code: string) => {
    const grammar = Prism.languages[language] || Prism.languages.python;
    return Prism.highlight(code, grammar, language);
  };

  const placeholderText = `# Paste your code here\ndef fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n - 1) + fibonacci(n - 2)`;

  return (
    // 🚨 FIX: Added max-h-[500px], overflow-y-auto, and custom-scrollbar
    <div className="w-full bg-transparent font-mono text-sm relative max-h-[500px] overflow-y-auto custom-scrollbar rounded-b-md">
      <Editor
        value={code}
        onValueChange={setCode}
        highlight={highlightCode}
        padding={14}
        placeholder={placeholderText}
        style={{
          fontFamily: '"Fira Code", "JetBrains Mono", Consolas, monospace',
          fontSize: 14,
          minHeight: '250px',
          backgroundColor: 'transparent',
        }}
        textareaClassName="focus:outline-none"
      />
    </div>
  );
}
