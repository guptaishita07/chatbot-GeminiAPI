import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getGeminiResponse = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (err) {
    console.error("Gemini API error:", err);
    return "Sorry, I couldn’t process that.";
  }
};
