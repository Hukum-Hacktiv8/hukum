import { createPayment, readPayment } from "@/app/models/payment";

export const POST = async (request: Request) => {
  const data = await request.json();

  const userId = request.headers.get("rg-user-id");

  data.userId = userId;

  await createPayment(data);

  return Response.json({
    statusCode: 201,
    message: "Success Create New Payment Data",
  });
};

export const GET = async (request: Request) => {
  const userId = request.headers.get("rg-user-id");

  if (!userId) {
    throw "Login First";
  }

  //sementara di hardcode dlu tolong perbaiki nanti
  const data = await readPayment(userId);

  return Response.json({
    statusCode: 200,
    data,
  });
};
