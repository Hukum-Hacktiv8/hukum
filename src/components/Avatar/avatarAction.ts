import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// UserModel butuh ObjectId
import { ObjectId } from "mongodb";
// pengganti readpayload
import { verifyJoseToken } from "@/app/utils/jwt";
import { getUserByEmail } from "@/app/models/user";

type Profile = {
  address: string;
  birth: string;
};

type UserModel = {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  role: string;
  profile: Profile;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
};

// ? untuk handle Logout
export const handleLogout = async () => {
  if (cookies().get("token")) cookies().delete("token");
  return redirect("/login");
};

export const fetchUserFromCookies = async (): Promise<UserModel | undefined> => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token"); // Contoh: "Bearer <token>"

    if (!token) return undefined;

    // Validasi token
    const tokenData = (await verifyJoseToken(token.value)) as UserModel;
    const user = await getUserByEmail(tokenData.email);

    console.log("user", user);

    if (!user) {
      throw new Error("User not found");
    }

    return user as UserModel;
  } catch (error) {
    // Tangani token expired atau invalid
    console.error("Error fetching user from header:", error);

    redirect("/login");
  }
};
