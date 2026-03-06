# 🟩 MANIM // MATRIX // GEN

> **"The Matrix is everywhere. It is all around us."**

![Matrix Rain](https://media.giphy.com/media/A06UFEx8jBz8Y/giphy.gif)

## ⚡️ 系统简介 (System Overview)

**Manim Matrix Generator** 是一个专为极客和数学爱好者打造的生产力工具。它利用 Google Gemini AI 的强大能力，将结构化的 JSON 脚本转化为高质量的 **Manim (Mathematical Animation Engine)** Python 代码。

本系统采用沉浸式的 **"黑客矩阵" (Hacker Matrix)** 视觉风格，为您提供一个专注、高效且充满科技感的创作环境。

---

## 🚀 核心特性 (Core Features)

*   **🟢 矩阵美学 (Matrix Aesthetic)**: 全屏数字雨背景、故障风 (Glitch) 标题、霓虹绿配色，带您进入赛博空间。
*   **🤖 AI 驱动 (AI Powered)**: 内置 Gemini-2.5-Flash 模型，精准理解数学描述，自动生成复杂的 Manim 动画逻辑。
*   **🇨🇳 完全中文化 (Localized)**: 全界面中文支持，降低使用门槛，操作更流畅。
*   **📝 实时代码预览 (Live Code View)**: 语法高亮的 Python 代码编辑器，支持一键复制。
*   **DX 开发者体验**: 包含详细的系统手册和示例载入功能。

---

## 🛠 使用指南 (Operation Manual)

### 1. 输入数据流 (Input Stream)
在左侧输入框中粘贴您的 JSON 脚本。格式参考如下：

```json
{
  "title": "神经网络反向传播",
  "scenes": [
    {
      "id": 1,
      "narration": "梯度沿着误差曲面下降。",
      "math": "w_{new} = w_{old} - \\eta \\cdot \\nabla E",
      "visuals": "展示一个3D曲面图，一个小球正在滚落。"
    }
  ]
}
```

### 2. 初始化序列 (Initialize Sequence)
点击 **"初始化序列"** 按钮。系统将连接至 Gemini 神经网络，解析您的意图并生成 Python 代码。

### 3. 执行渲染 (Execute Render)
将生成的代码复制到本地文件（例如 `matrix.py`），并在终端运行 Manim 命令：

```bash
manim -pql matrix.py MatrixScene
```

*   `-p`: 预览 (Preview)
*   `-q`: 质量 (Quality, l=low, h=high, k=4k)

---

## 📦 技术栈 (Tech Stack)

*   **Frontend**: React 19, Vite
*   **Styling**: Tailwind CSS v4, Framer Motion
*   **AI Core**: Google Gemini API (`@google/genai`)
*   **Icons**: Lucide React
*   **Highlighting**: React Syntax Highlighter

---

## ⚠️ 注意事项 (System Warning)

*   本系统依赖 **Gemini API Key**。请确保环境变量 `GEMINI_API_KEY` 已正确配置。
*   生成的代码需要本地安装 **Manim Community Edition** 和 **FFmpeg** 才能运行。

---

> *"Wake up, Neo..."*
