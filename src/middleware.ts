import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyJoseToken } from "./app/utils/jwt";

export const middleware = async (request: NextRequest) => {
  if (request.url.includes("/api/tinggalganti")) {
    const token = cookies().get("token");

    if (!token) {
      return NextResponse.json({
        statusCode: 401,
        error: "Unauthorized",
      });
    }

    const tokenData = await verifyJoseToken<{ id: string; email: string; username: string }>(token.value);
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("rg-user-id", tokenData.id);
    requestHeaders.set("rg-user-email", tokenData.email);
    requestHeaders.set("rg-user-username", tokenData.username);

    return NextResponse.next({
      headers: requestHeaders,
    });
  }
  return NextResponse.next();
};
