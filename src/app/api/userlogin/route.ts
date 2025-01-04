import { NextRequest, NextResponse } from "next/server";

export const GET = (request: NextRequest) => {
  const username = request.headers.get("rg-user-username");

  return NextResponse.json(
    {
      statusCode: 200,
      username,
    },
    {
      status: 200,
    }
  );
};
