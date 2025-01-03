import { NextRequest, NextResponse } from "next/server";

export const GET = (request: NextRequest) => {
  console.log("masuk sini nih bos");
  const username = request.headers.get("rg-user-username");
  console.log("username: ", username);

  return NextResponse.json(
    {
      username,
    },
    {
      status: 200,
    }
  );
};
