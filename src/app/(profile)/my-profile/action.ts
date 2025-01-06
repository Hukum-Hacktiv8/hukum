"use server";

import { cookies } from "next/headers";
import { verifyJoseToken } from "@/utils/jwt";
import { getUserByEmail } from "@/models/user";
import { UserType } from "./types/profileTypes";
import { NextResponse } from "next/server";

// todo: harusnya dari sini untuk ngambil cookies dan cari data usernya
export const fetchUserLogin = async (): Promise<UserType | undefined | null> => {
  try {
    const token = cookies().get("token");
    if (!token) {
      return null;
    }

    const tokenData = await verifyJoseToken<{ id: string; email: string; username: string }>(token.value);

    const email = tokenData.email;
    const user = await getUserByEmail(email);

    console.log("user: ", user);
    if (!user) NextResponse.redirect("/login");

    return user;
  } catch (error) {
    console.log(error);
  }
};
