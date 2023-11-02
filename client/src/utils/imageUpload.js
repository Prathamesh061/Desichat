export const checkImage = (file) => {
  let err = "";
  if (!file) return (err = "File does not exist.");

  if (file.size > 1024 * 1024)
    // 1mb
    err = "The largest image size is 1mb.";

  if (file.type !== "image/jpeg" && file.type !== "image/png")
    err = "Image format is incorrect.";

  return err;
};

export const imageUpload = async (images) => {
  let imgArr = [];
  for (const item of images) {
    const formData = new FormData();

    formData.append("file", item);

    formData.append("upload_preset", "ml_default");
    formData.append("cloud_name", "mohinishjoshi");

    let assetType = item.type.match(/video/i) ? "video" : "image";

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/mohinishjoshi/${assetType}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    imgArr.push({ public_id: data.public_id, url: data.secure_url });
  }
  return imgArr;
};

export function dataURLtoBlob(dataURL) {
  let byteString = atob(dataURL.split(",")[1]);
  let mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
  let ab = new ArrayBuffer(byteString.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}
