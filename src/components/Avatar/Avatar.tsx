import Link from "next/link";
import { cookies } from "next/headers";
import { verifyJoseToken } from "@/app/utils/jwt";
import { redirect } from "next/navigation";
import { HiOutlineUser, HiOutlineLogout } from "react-icons/hi";
import { ObjectId } from "mongodb";
import { getUserByEmail } from "./action ";

type UserModel = {
  _id: ObjectId;
  email: string;
  username: string;
};

const fetchUserFromCookies = async (): Promise<UserModel | undefined> => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token"); // Contoh: "Bearer <token>"

    if (!token) return undefined;

    // Validasi token
    const tokenData = (await verifyJoseToken(token.value)) as UserModel;
    const user = await getUserByEmail(tokenData.email);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    // Tangani token expired atau invalid
    console.error("Error fetching user from header:", error);

    // Pastikan menggunakan URL absolut
    redirect("/login");
  }
};

const Avatar = async () => {
  const userLogin = await fetchUserFromCookies(); // Ambil data user dari header

  return (
    <div className="relative dropdown dropdown-end flex items-center p-1">
      {!userLogin ? (
        // Jika tidak ada user, tampilkan tombol Login
        <Link href="/login" role="button" className="flex items-center gap-2 rounded-md p-2">
          <div className="text-sm font-medium">Login</div>
        </Link>
      ) : (
        // Jika ada user, tampilkan avatar dan menu profile
        <>
          <div tabIndex={0} role="button" className="flex items-center gap-2 rounded-md">
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content w-8 rounded-full">
                {/* Inisialisasi inisial dari nama pengguna */}
                <span>{userLogin.username.charAt(0).toUpperCase()}</span>
              </div>
            </div>
            <div className="text-sm font-medium">{userLogin.username}</div>
          </div>
          <ul tabIndex={0} className="absolute top-full menu menu-sm dropdown-content bg-white rounded-box z-10 w-40 p-2 shadow">
            <Link href="/profile" className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">
              <div className="flex items-center gap-2">
                <HiOutlineUser className="text-xl" />
                Profile
              </div>
            </Link>
            <hr className="my-1" />
            <form action={handleLogout} method="POST" className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">
              <button type="submit" className="flex items-center gap-2 w-full">
                <HiOutlineLogout className="text-xl" />
                Logout
              </button>
            </form>
          </ul>
        </>
      )}
    </div>
  );
};

export default Avatar;
