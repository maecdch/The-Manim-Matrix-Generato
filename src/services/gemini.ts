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
    -   Include all necessary imports (e.g., \`from manim import *\`).
    -   Define a class that inherits from \`Scene\` (e.g., \`class MatrixScene(Scene):\`).
    -   Ensure the code is syntactically correct and runnable.
    -   Add comments explaining complex steps.
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
