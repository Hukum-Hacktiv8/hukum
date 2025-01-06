import { readDetail } from "@/models/blogpost";

export const GET = async (
  _request: Request,
  { params }: { params: { id: string } }
) => {
  const id = params.id;
  const data = await readDetail(id);

  return Response.json({
    statusCode: 200,
    data,
  });

  //   return Response.json(data);
};
