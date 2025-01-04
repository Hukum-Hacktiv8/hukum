"use client";

import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineUser } from "react-icons/hi";
import { RiLoginBoxLine, RiLogoutBoxLine } from "react-icons/ri";

type UserLogin = {
  statusCode: number;
  username: string;
};

const Avatar = ({ token }: { token: RequestCookie | undefined }) => {
  const [userLogin, setUserLogin] = useState<UserLogin | null>(null);
  const router = useRouter();

  const fetchUserLogin = async (): Promise<void> => {
    try {
      const response = await fetch("/api/userlogin", {
        method: "GET",
      });

      const responseJson = await response.json();

      // if (responseJson.username) {
      //   localStorage.setItem("username", responseJson.username);
      // }

      setUserLogin(responseJson);
    } catch (error) {
      console.log(error);

      setUserLogin(null);
    }
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await fetch("/api/userlogout");
      await fetchUserLogin();
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(token);
    fetchUserLogin();
  }, [token]);

  return (
    <div className="relative dropdown dropdown-end flex items-center p-1">
      {/* // ? kalau usernya sudah login dan status codenya sudah benar */}
      {!userLogin || userLogin?.statusCode !== 200 ? (
        <Link href="/login" className="flex items-center rounded-md text-white/80 hover:text-white transition-colors cursor-pointer gap-1">
          <RiLoginBoxLine />
          Login
        </Link>
      ) : (
        <>
          <div className="dropdown dropdown-hover">
            <div tabIndex={0} role="button" className="flex text-white/80 hover:text-white hover:bg-white/10 transition-colors m-1 p-2 rounded-md">
              <HiOutlineUser className="text-xl" />
              Hallo, {userLogin?.username}
            </div>
            <ul tabIndex={0} className="dropdown-content menu text-white/80 hover:text-white bg-white/10 transition-colors rounded-box z-[1] w-52 p-2 shadow">
              <li>
                <Link href="/profile" className="flex gap-1">
                  <HiOutlineUser className="text-xl" />
                  <span>Profile</span>
                </Link>
              </li>
              <hr></hr>
              <li>
                <a onClick={handleLogout}>
                  <RiLogoutBoxLine className="text-xl" />
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Avatar;
