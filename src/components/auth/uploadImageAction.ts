export const UploadImage = async (data: File | null) => {
  try {
    let dataPicture = null;
    if (data) {
      dataPicture = new FormData();
      dataPicture.set("picture", data);
    }

    const res = await fetch("/api/uploadImage", {
      method: "POST",
      body: dataPicture,
    });
    const cldRes = await res.json();
    // console.log("cldRes nih: ", cldRes);

    return cldRes;
  } catch (error) {
    console.log(error);
  }
};
