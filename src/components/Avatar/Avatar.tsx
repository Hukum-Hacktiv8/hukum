import Link from "next/link";
import { useEffect, useState } from "react";
import {
  HiOutlineUser,
  // HiOutlineLogout
} from "react-icons/hi";

type UserLogin = {
  username: string;
};

const Avatar = () => {
  const [userLogin, setUserLogin] = useState(null as UserLogin | null);

  const fetchUserLogin = async (): Promise<void> => {
    const response = await fetch("/api/userlogin", {
      method: "GET",
    });
    console.log(response);
    const responseJson = await response.json();
    setUserLogin(responseJson);
  };

  useEffect(() => {
    fetchUserLogin();
  }, []);

  return (
    <div className="relative dropdown dropdown-end flex items-center p-1">
      {!userLogin ? (
        <Link href="/login" className="flex items-center rounded-md text-white/80 hover:text-white transition-colors cursor-pointer">
          {/* <button className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors">
          <HiOutlineUser className="text-xl" />
        </button> */}
          Login
        </Link>
      ) : (
        <div className="text-white flex gap-2 bg-transparent btn btn-ghost">
          <HiOutlineUser className="text-xl" />
          Hallo, {userLogin?.username}
        </div>
      )}
    </div>
  );
};

export default Avatar;
