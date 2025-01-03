"use client";

// ga perlu import font awesome karena pakai react-icons
import {
  HiOutlineUser,
  // ? import outline logout nanti dulu coba dulu bisa apa ga di sini
  // HiOutlineLogout
} from "react-icons/hi";
// import Link from "next/link";
// import { cookies } from "next/headers";

// // UserModel butuh ObjectId
// import { ObjectId } from "mongodb";

// type Profile = {
//   address: string;
//   birth: string;
// };

// type UserModel = {
//   _id: ObjectId;
//   name: string;
//   email: string;
//   password: string;
//   role: string;
//   profile: Profile;
//   createdAt: string;
//   updatedAt: string;
//   imageUrl?: string;
// };

// pengganti readpayload
// import { verifyJoseToken } from "@/app/utils/jwt";

// import { getUserByEmail } from "@/app/models/user";

// import { redirect } from "next/navigation";

// todo: perlu handleLogout dari action.ts
// import { handleLogout } from "./logoutAction";

// const fetchUserFromCookies = async (): Promise<UserModel | undefined> => {
//   try {
//     const cookieStore = cookies();
//     const token = cookieStore.get("token"); // Contoh: "Bearer <token>"

//     if (!token) return undefined;

//     // Validasi token
//     const tokenData = (await verifyJoseToken(token.value)) as UserModel;
//     const user = await getUserByEmail(tokenData.email);

//     console.log("user", user);

//     if (!user) {
//       throw new Error("User not found");
//     }

//     return user;
//   } catch (error) {
//     // Tangani token expired atau invalid
//     console.error("Error fetching user from header:", error);

//     redirect("/login");
//   }
// };

const Avatar = () => {
  return (
    <button className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors">
      <HiOutlineUser className="text-xl" />
    </button>
  );
};

export default Avatar;
