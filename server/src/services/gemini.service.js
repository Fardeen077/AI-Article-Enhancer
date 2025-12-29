import { GoogleGenerativeAI } from "@google/generative-ai";

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateWithAi = async (prompt) => {
    const model = genAi.getGenerativeModel({ modle: "free-tiel" });
    const result = await model.generateContent(prompt);
    return result.response.text();
}