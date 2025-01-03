import { OpenAI } from "openai";

const apiKey = "18cf194962aa43b5a8a2373fd33a6fb2";
const baseURL = "https://api.aimlapi.com/v1";

export const api = new OpenAI({
  apiKey,
  baseURL,
});

export const getAIResponse = async (systemPrompt: string, userPrompt: string): Promise<string> => {
  try {
    const completion = await api.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 256,
    });

    const choice = completion?.choices?.[0]?.message?.content;
    if (!choice) {
      throw new Error("No response received from the AI.");
    }

    return choice.trim();
  } catch (error) {
    console.error("Error fetching AI response:", error);
    throw new Error("Failed to fetch AI response.");
  }
};
