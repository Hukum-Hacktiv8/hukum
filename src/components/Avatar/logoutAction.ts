"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const handleLogout = async () => {
  if (cookies().get("token")) cookies().delete("token");
  return redirect("/login");
};
