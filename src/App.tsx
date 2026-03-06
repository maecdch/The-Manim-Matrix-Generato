/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import MatrixRain from './components/MatrixRain';
import CodeViewer from './components/CodeViewer';
import HelpModal from './components/HelpModal';
import { generateManimScript } from './services/gemini';
import { Terminal, Play, Copy, RefreshCw, Zap, HelpCircle, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const EXAMPLE_JSON = `{
  "title": "Neural Network Backpropagation",
  "scenes": [
    {
      "id": 1,
      "narration": "The gradient descends the error surface.",
      "math": "w_{new} = w_{old} - \\eta \\cdot \\nabla E",
      "visuals": "Show a 3D surface plot with a ball rolling down."
    },
    {
      "id": 2,
      "narration": "Updating weights layer by layer.",
      "visuals": "Highlight connections in a network turning green."
    }
  ]
}`;

export default function App() {
  const [inputJson, setInputJson] = useState(EXAMPLE_JSON);
  const [outputCode, setOutputCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const handleGenerate = async () => {
    if (!inputJson.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const code = await generateManimScript(inputJson);
      setOutputCode(code);
    } catch (err) {
      setError(err instanceof Error ? err.message : '发生未知错误');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputCode);
    // Could add a toast here
  };

  return (
    <div className="min-h-screen bg-black text-[#00FF41] font-mono relative overflow-hidden flex flex-col">
      <MatrixRain />
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
      
      {/* Header */}
      <header className="relative z-10 border-b border-[#00FF41] bg-black/80 backdrop-blur-sm p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Terminal className="w-6 h-6 animate-pulse" />
          <h1 className="text-xl font-bold tracking-[0.2em] glitch-text" data-text="MANIM // MATRIX // GEN">
            MANIM // MATRIX // GEN
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-xs text-[#003B00] uppercase tracking-widest hidden md:block">
            系统状态：在线 // v1.0.4
          </div>
          <button
            onClick={() => setIsHelpOpen(true)}
            className="text-[#00FF41] hover:text-white transition-colors"
            title="系统手册"
          >
            <HelpCircle className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 p-4 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-80px)]">
        
        {/* Input Section */}
        <div className="flex flex-col gap-4 h-full">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-[#00FF41]"></span>
              输入流 (JSON)
            </h2>
            <div className="flex gap-3">
              <button 
                onClick={() => setInputJson('')}
                className="text-xs text-[#003B00] hover:text-[#00FF41] transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                清空
              </button>
              <button 
                onClick={() => setInputJson(EXAMPLE_JSON)}
                className="text-xs text-[#00FF41] hover:text-white hover:underline opacity-70"
              >
                加载示例
              </button>
            </div>
          </div>
          
          <div className="flex-1 relative group">
            <div className="absolute -inset-0.5 bg-[#00FF41] opacity-20 blur group-hover:opacity-40 transition duration-500 rounded-sm"></div>
            <textarea
              value={inputJson}
              onChange={(e) => setInputJson(e.target.value)}
              className="relative w-full h-full bg-black border border-[#003B00] p-4 text-sm focus:outline-none focus:border-[#00FF41] focus:shadow-[0_0_15px_rgba(0,255,65,0.3)] transition-all resize-none rounded-sm custom-scrollbar"
              placeholder="// 在此粘贴您的 TechVision-Script-Gen JSON..."
              spellCheck={false}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            disabled={loading}
            className={`
              relative overflow-hidden py-4 px-6 font-bold uppercase tracking-widest text-black
              ${loading ? 'bg-[#003B00] cursor-not-allowed' : 'bg-[#00FF41] hover:bg-white hover:shadow-[0_0_20px_#00FF41]'}
              transition-all duration-300 clip-path-polygon
            `}
            style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
          >
            <div className="flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>矩阵处理中...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 fill-current" />
                  <span>初始化序列</span>
                </>
              )}
            </div>
          </motion.button>
        </div>

        {/* Output Section */}
        <div className="flex flex-col gap-4 h-full">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-[#00FF41] animate-pulse"></span>
              输出缓冲区 (Python)
            </h2>
            {outputCode && (
              <button 
                onClick={copyToClipboard}
                className="flex items-center gap-2 text-xs border border-[#00FF41] px-3 py-1 hover:bg-[#00FF41] hover:text-black transition-colors"
              >
                <Copy className="w-3 h-3" />
                复制
              </button>
            )}
          </div>

          <div className="flex-1 min-h-[400px]">
            {error ? (
              <div className="h-full w-full border border-red-500 bg-red-900/10 p-4 text-red-500 font-mono text-sm flex items-center justify-center text-center">
                <div>
                  <div className="text-xl mb-2">系统错误</div>
                  {error}
                </div>
              </div>
            ) : outputCode ? (
              <CodeViewer code={outputCode} />
            ) : (
              <div className="h-full w-full border border-[#003B00] bg-black/50 flex flex-col items-center justify-center text-[#003B00] gap-4">
                <div className="w-16 h-16 border border-[#003B00] flex items-center justify-center rounded-full">
                  <Play className="w-8 h-8 opacity-50" />
                </div>
                <p className="text-sm uppercase tracking-widest">等待数据流...</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}


