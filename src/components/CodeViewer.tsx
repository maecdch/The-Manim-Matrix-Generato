import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeViewerProps {
  code: string;
}

const CodeViewer: React.FC<CodeViewerProps> = ({ code }) => {
  return (
    <div className="relative h-full w-full bg-black border border-[#00FF41] overflow-hidden rounded-sm shadow-[0_0_10px_rgba(0,255,65,0.2)]">
      <div className="absolute top-0 left-0 right-0 bg-[#003B00] border-b border-[#00FF41] px-4 py-1 flex justify-between items-center z-10">
        <span className="text-[#00FF41] text-xs font-mono uppercase tracking-widest">output_buffer.py</span>
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00FF41] opacity-50"></div>
          <div className="w-2 h-2 rounded-full bg-[#00FF41] opacity-50"></div>
          <div className="w-2 h-2 rounded-full bg-[#00FF41] opacity-50"></div>
        </div>
      </div>
      <div className="pt-8 h-full overflow-auto custom-scrollbar">
        <SyntaxHighlighter
          language="python"
          style={vscDarkPlus}
          customStyle={{
            background: 'transparent',
            padding: '1rem',
            fontSize: '0.9rem',
            fontFamily: '"JetBrains Mono", monospace',
          }}
          showLineNumbers={true}
          lineNumberStyle={{ color: '#003B00', minWidth: '2em' }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeViewer;
