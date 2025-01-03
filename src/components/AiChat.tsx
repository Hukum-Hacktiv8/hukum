"use client";

import { useState } from "react";

export default function AiChat() {
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);
  const [userPrompt, setUserPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!userPrompt) return;

    const userMessage = { role: "user", content: userPrompt };
    setChatHistory((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemPrompt: `You are an Indonesian Lawyer, respond with UU and relevant indonesia policies`,
          userPrompt,
        }),
      });

      const data = await res.json();
      const aiMessage = { role: "assistant", content: data.response || "No response received." };
      setChatHistory((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      setChatHistory((prev) => [...prev, { role: "assistant", content: "Failed to fetch response." }]);
    } finally {
      setLoading(false);
      setUserPrompt("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">AI Legal Assistant</h1>
        <div className="h-96 overflow-y-auto border border-gray-300 rounded-md p-4 mb-4 bg-gray-50">
          {chatHistory.map((chat, index) => (
            <div key={index} className={`mb-3 ${chat.role === "user" ? "text-right" : "text-left"}`}>
              <p className={`inline-block px-4 py-2 rounded-lg ${chat.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}>{chat.content}</p>
            </div>
          ))}
          {loading && (
            <div className="text-left">
              <p className="inline-block px-4 py-2 rounded-lg bg-gray-200 text-gray-800">Thinking...</p>
            </div>
          )}
        </div>
        <textarea value={userPrompt} onChange={(e) => setUserPrompt(e.target.value)} placeholder="Describe your legal issue..." rows={3} className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring focus:ring-blue-300" />
        <button onClick={handleSubmit} disabled={loading} className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50">
          {loading ? "Loading..." : "Send"}
        </button>
      </div>
    </div>
  );
}
