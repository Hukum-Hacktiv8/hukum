import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dztilubhi",
  api_key: "439744379624474",
  api_secret: "Eg467bp0pG0fMv_7NKJSr_q7Lrk",
});

const handleUpload = async (dataURI: string) => {
  try {
    const res = await cloudinary.uploader.upload(dataURI, {
      folder: "hacktivist",
      use_filename: true,
      resource_type: "auto",
    });

    return res;
  } catch (error) {
    console.error("Error uploading file to Cloudinary", error);
  }
};

export default handleUpload;
