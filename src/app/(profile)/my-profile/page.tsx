import { redirect } from "next/navigation";
import { fetchUserLogin } from "./action";
import ProfileComponent from "./MyProfile";
import { UserType } from "./types/profileTypes";

const MyProfile = async () => {
  const user = await fetchUserLogin();
  if (!user) return redirect("/login");

  return (
    <div>
      <ProfileComponent user={user as UserType} />
    </div>
  );
};

export default MyProfile;
