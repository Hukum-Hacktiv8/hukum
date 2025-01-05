"use client";

import Image from "next/image";
import { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";

const ProfilePicture = ({ profileId, profilePicture }: { profileId: string | undefined; profilePicture: string }) => {
  const [imageUrl, setImageUrl] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(profilePicture);
  console.log("profileId: ", profileId);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined | null = event.target.files?.[0];
    if (file) {
      setImageUrl(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("imageUrl: ", imageUrl);
    console.log("previewUrl: ", previewUrl);
    console.log("profileId: ", profileId);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center">
        <div className="relative w-36 aspect-square rounded-md items-center flex justify-center">
          <Image src={previewUrl} className="rounded-xl border object-cover" alt="Image Profile" fill sizes="100vw" />
          <label htmlFor="upload" className="absolute inset-0 flex items-center justify-center bg-black/50 text-white cursor-pointer opacity-0 hover:opacity-100 transition-opacity rounded-md">
            <FiUploadCloud className="text-xl mr-2" />
            Upload Image
          </label>
        </div>
        <button className="btn btn-ghost w-full">Save Changes</button>
        <input type="file" id="upload" className="bg-white border" name="profilePicture" onChange={handleFileChange} hidden />
      </form>
    </>
  );
};

export default ProfilePicture;
