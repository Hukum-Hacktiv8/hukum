import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const GET = async () => {
  if (cookies().get("token")) cookies().delete("token");
  redirect("/login");
};
