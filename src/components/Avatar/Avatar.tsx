import {
  HiLogout,
  HiOutlineUser,
  // HiOutlineLogout
} from "react-icons/hi";

const Avatar = () => {
  return (
    <div className="relative dropdown dropdown-end flex items-center p-1">
      <div className="flex items-center rounded-md text-white/80 hover:text-white transition-colors cursor-pointer">
        {/* <button className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors">
          <HiOutlineUser className="text-xl" />
        </button> */}
        <HiLogout />
        Login
      </div>
    </div>
  );
};

export default Avatar;
