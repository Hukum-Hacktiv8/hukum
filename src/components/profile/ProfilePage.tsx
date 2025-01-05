import { LuUserRoundCog } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { CgRename } from "react-icons/cg";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { AiOutlineHome } from "react-icons/ai";
import { cookies } from "next/headers";
import { verifyJoseToken } from "@/app/utils/jwt";
import { getUserByEmail } from "@/app/models/user";
import { ObjectId } from "mongodb";
import ProfilePicture from "./ProfilePicture";

type CredentialModel = {
  education: [];
  certification: string;
};

type profileModel = {
  address: string;
  birth: string;
};

type userModel = {
  _id: ObjectId;
  name: string;
  email: string;
  role: string;
  profile: profileModel;
  specialization?: string;
  credentials?: CredentialModel;
  profilePicture?: string;
};

const fetchUserFromCookies = async (): Promise<userModel | undefined> => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    if (!token) return undefined;

    // Validasi token
    const tokenData = (await verifyJoseToken(token.value)) as { id: string; email: string };
    const user = await getUserByEmail(tokenData.email);

    if (!user) {
      throw new Error("User not found");
    }

    return user as userModel;
  } catch (error) {
    console.log(error);
  }
};

const ProfilePage = async () => {
  const user = await fetchUserFromCookies();

  return (
    <>
      <div className="min-h-[50vh]">
        {/* // ? untuk navbar supaya kelihatan */}
        <div className="bg-slate-900 h-16 w-full"></div>
        <main className="px-5 py-5 md:px-20 md:py-10 min-h-[50vh] flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-5">User Information</h1>
          <div className="card shadow-xl w-fit border p-5 flex flex-col gap-5">
            <div className="flex">
              {/* //todo: profile image */}
              <div className="rounded-md flex flex-col gap-2 w-1/5">
                <ProfilePicture profileId={user?._id.toString()} profilePicture={user?.profilePicture ?? "/user.jpg"} />
              </div>
              {/* End Profile Image */}

              {/* Personal and Profile Information */}
              <div className="rounded-md grow flex flex-col gap-2 ml-5">
                {/* Personal Information */}
                <h1 className="text-2xl font-bold mb-3">Personal Information</h1>
                <div className="flex">
                  <div className="flex flex-col gap-2 mr-5">
                    <label className="flex gap-1 items-center">
                      <CgRename className="text-xl" />
                      <span>Name</span>
                    </label>
                    <label className="flex gap-1 items-center">
                      <MdOutlineEmail className="text-xl" />
                      <span>Email</span>
                    </label>
                    <label className="flex gap-1 items-center">
                      <LuUserRoundCog className="text-xl" />
                      <span>Role</span>
                    </label>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label>: {user?.name}</label>
                    <label>: {user?.email}</label>
                    <label>: {user?.role}</label>
                  </div>
                </div>
                {/* End Personal Information */}

                {/* Profile Information */}
                <h1 className="text-2xl font-bold mt-5 mb-3">Profile Information</h1>
                <div className="flex">
                  {/* Start Address Information */}
                  <div className="flex gap-5">
                    <label className="flex gap-1">
                      <AiOutlineHome className="text-xl" />
                      <span>Address</span>
                    </label>
                    <label>: {user?.profile.address}</label>
                  </div>
                </div>
                {/* End Profile Information */}

                {/* Start Birth Information */}
                <div className="flex">
                  {/* Start Address Information */}
                  <div className="flex gap-5">
                    <label className="flex gap-1 items-center">
                      <LiaBirthdayCakeSolid className="text-xl" />
                      <span>Birthday</span>
                    </label>
                    <label>: {user?.profile.birth}</label>
                  </div>
                </div>
              </div>
              {/* End Personal and Profile Information */}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProfilePage;
