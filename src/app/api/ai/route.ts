import { getAIResponse } from "@/app/utils/aiClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { systemPrompt, userPrompt } = await req.json();

    if (!userPrompt) {
      return NextResponse.json({ error: "User prompt is required" }, { status: 400 });
    }

    const response = await getAIResponse(systemPrompt, userPrompt);
    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
