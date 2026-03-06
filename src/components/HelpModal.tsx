import React from 'react';
import { X, Terminal, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-2xl bg-black border border-[#00FF41] shadow-[0_0_30px_rgba(0,255,65,0.15)] relative"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#003B00] bg-[#001a00]">
              <h3 className="text-[#00FF41] font-bold uppercase tracking-widest flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                系统手册
              </h3>
              <button
                onClick={onClose}
                className="text-[#00FF41] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 text-sm text-[#D1FFD7]">
              <section>
                <h4 className="text-[#00FF41] font-bold uppercase mb-2 flex items-center gap-2">
                  <span className="w-1 h-4 bg-[#00FF41]"></span>
                  01 // 输入协议
                </h4>
                <p className="opacity-80 leading-relaxed">
                  将您的 <strong>TechVision-Script-Gen</strong> JSON 脚本粘贴到输入流中。
                  系统接受定义场景、旁白和视觉描述的标准 JSON 结构。
                </p>
              </section>

              <section>
                <h4 className="text-[#00FF41] font-bold uppercase mb-2 flex items-center gap-2">
                  <span className="w-1 h-4 bg-[#00FF41]"></span>
                  02 // 执行操作
                </h4>
                <p className="opacity-80 leading-relaxed mb-4">
                  生成 Python 脚本后，将其复制到本地文件（例如 <code className="text-[#00FF41]">matrix_scene.py</code>）。
                  在终端运行以下命令以渲染动画：
                </p>
                <div className="bg-[#001a00] border border-[#003B00] p-3 font-mono text-[#00FF41] flex items-center gap-3">
                  <Command className="w-4 h-4 opacity-50" />
                  <span>manim -pql matrix_scene.py MatrixScene</span>
                </div>
              </section>

              <section>
                <h4 className="text-[#00FF41] font-bold uppercase mb-2 flex items-center gap-2">
                  <span className="w-1 h-4 bg-[#00FF41]"></span>
                  03 // 先决条件
                </h4>
                <ul className="list-disc list-inside opacity-80 space-y-1 ml-2">
                  <li>Python 3.7+</li>
                  <li>Manim 社区版 (<code className="text-[#00FF41]">pip install manim</code>)</li>
                  <li>LaTeX (可选，用于复杂数学渲染)</li>
                </ul>
              </section>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#003B00] bg-[#001a00] flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#00FF41] text-black font-bold uppercase tracking-wider hover:bg-white transition-colors"
              >
                确认
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default HelpModal;
