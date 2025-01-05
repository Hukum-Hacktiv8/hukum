import { createSubs } from "@/models/subscription";

export const POST = async (request: Request) => {
  const userId = request.headers.get("rg-user-id");
  if (!userId) {
    throw "Please Login First";
  }
  const type = "premium";
  const status = "active";

  await createSubs({ userId, type, status });
  console.log(`masuk kah disni `);

  return Response.json({
    message: "Success Premium ",
  });
};
