// frontend/src/components/CodeEditor.tsx
import EditorComponent from 'react-simple-code-editor';
import Prism from 'prismjs';

import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/themes/prism-tomorrow.css';

// 🐛 THE FIX: Safely extract the component for Vite
const Editor = (EditorComponent as any).default || EditorComponent;

export default function CodeEditor({ code, setCode, language  }: any) {
  
  const highlightCode = (code: string) => {
    const grammar = Prism.languages[language] || Prism.languages.javascript;
    return Prism.highlight(code, grammar, language);
  };

  const placeholderText = `# Paste your code here\ndef fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n - 1) + fibonacci(n - 2)`;

  return (
    // 🚨 FIX: Added max-h-[500px], overflow-y-auto, and custom-scrollbar
    <div className="w-full bg-transparent font-mono text-sm relative max-h-[500px] overflow-y-auto custom-scrollbar rounded-b-md">
      <Editor
        value={code}
        onValueChange={(code: any) => setCode(code)}
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