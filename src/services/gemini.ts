import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateManimScript(jsonInput: string): Promise<string> {
  const model = "gemini-2.5-flash";
  
  const prompt = `
    You are an expert Manim (Mathematical Animation Engine) developer.
    Your task is to convert the following JSON data (from TechVision-Script-Gen) into a complete, production-grade Python script using Manim.

    **Input JSON:**
    ${jsonInput}

    **Style Requirements (Hacker Matrix Aesthetic):**
    1.  **Colors:** Use a black background (\`config.background_color = "#000000"\`). Use Neon Green (\`#00FF41\`) for primary lines and text. Use Dark Green (\`#003B00\`) for secondary elements.
    2.  **Fonts:** Use a Monospace font if available (e.g., \`font="Monospace"\` or \`font="Consolas"\`).
    3.  **Effects:**
        -   Use \`Write\` animations for text to simulate typing.
        -   Use \`FadeIn\` for objects.
        -   Add "glow" effects where possible (e.g., by duplicating an object, making it thicker/blurrier, and reducing opacity behind the original).
    4.  **Content:**
        -   Visualize the mathematical derivations and internal principles described in the JSON.
        -   If the JSON describes code, format it as code blocks.
        -   If the JSON describes math, use \`MathTex\`.

    **Output Format:**
    -   Return ONLY the Python code.
    -   Ensure the code is syntactically correct and runnable.
    -   Add comments explaining complex steps.
    -   **CRITICAL: You MUST include the following exact lines at the very beginning of the script to configure the LaTeX environment for Chinese support and TinyTeX:**

\`\`\`python
import os
from manim import *

# 强制将 TinyTeX 加入当前运行环境
# 请根据你解压后的实际子目录补全（比如后面可能还有 \\windows）
os.environ["PATH"] += os.pathsep + r"C:\\Users\\mayic\\Downloads\\TinyTeX1\\TinyTeX\\bin"

# 如果遇到 dvisvgm not found，请将 dvisvgm.exe 所在的具体路径也加入上面的 os.environ 中

# 配置支持中文的 LaTeX 模板
my_template = TexTemplate()
my_template.add_to_preamble(r"\\usepackage{ctex}")
# 如果有中文，请在后续的 Tex 或 MathTex 中使用 tex_template=my_template 和 tex_compiler="xelatex"
\`\`\`

    -   Define a class that inherits from \`Scene\` (e.g., \`class MatrixScene(Scene):\`).
    -   **CRITICAL RULE FOR CLEARING SCENES:** When clearing the screen (e.g., between steps), DO NOT use \`self.play(FadeOut(*self.mobjects))\` blindly. If \`self.mobjects\` is empty, this will crash with \`ValueError: At least one mobject must be passed.\`. You MUST check if it's empty first:
        \`\`\`python
        if self.mobjects:
            self.play(FadeOut(*self.mobjects))
        \`\`\`
    -   **CRITICAL RULE FOR CHINESE TEXT:** 
        - If you use \`Tex()\` or \`MathTex()\`, you MUST pass \`tex_template=my_template\` and \`tex_compiler="xelatex"\`.
        - If you use \`Text()\`, you MUST NOT pass \`tex_template\` or \`tex_compiler\` (these arguments are invalid for \`Text()\`). For \`Text()\`, just use the \`font\` argument (e.g., \`Text("中文", font="Microsoft YaHei")\`).
        - Prefer using \`Tex()\` for Chinese text to ensure consistent rendering with the LaTeX template.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    
    // Extract code block if present
    const text = response.text || "";
    const match = text.match(/```python([\s\S]*?)```/);
    return match ? match[1].trim() : text;
  } catch (error) {
    console.error("Error generating script:", error);
    throw new Error("Failed to generate Manim script. Please check your input and try again.");
  }
}
