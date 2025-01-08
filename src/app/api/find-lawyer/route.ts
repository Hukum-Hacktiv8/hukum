export const GET = async (request: Request) => {
  const { data } = await request.json();
  console.log("ini masuk");

  // console.log(data, "INI MASUK");
};
