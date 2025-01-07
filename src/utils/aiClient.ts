import { createGroq } from "@ai-sdk/groq";

// Initialize Groq with API Key
// const groq =
createGroq({
  apiKey: "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",
});

// Function to simulate AI response with streaming
export const getAIResponseStream = async (systemPrompt: string, userPrompt: string, onChunk: (chunk: string) => void): Promise<void> => {
  try {
    // Simulate API call using Groq
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer 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`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        stream: false, // API does not support streaming directly, so we simulate it
      }),
    });

    const result = await response.json();

    // Extract the AI's response text
    const text = result.choices[0]?.message?.content || "No response received.";

    // Simulate streaming by chunking the response
    for (const chunk of text.match(/.{1,50}/g) || []) {
      onChunk(chunk); // Pass each chunk to the callback
      await new Promise((resolve) => setTimeout(resolve, 100)); // Increased simulated delay to 100ms
    }
  } catch (error) {
    console.error("Error fetching AI response:", error);
    throw new Error("Failed to fetch AI response.");
  }
};
