/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase-setting";

export const uploadAsset = async (
  file: any,
  folder: string,
  isVideo: boolean
) => {
  let extension = "mp4";
  let blob = {};

  const metadata = {
    contentType: "image/jpeg",
  };

  if (isVideo) {
    metadata["contentType"] = "video/mp4";
  } else {
    extension = file.files
      ? file.files[0].name.split(".")[1]
      : file[0].name.split(".")[1];
    blob = file;
  }

  const key = new ArrayBuffer(16).toString();
  const name = `${key}.${extension}`;
  localStorage.setItem("name", name);

  const storageRef = ref(storage);
  const articleImagesRef = ref(storageRef, `${folder}/${name}`);

  await uploadBytes(
    articleImagesRef,
    // ts-ignore
    file.files ? file.files[0] : file[0].name ? file[0] : blob,
    metadata
  );

  const imageUrl = await getDownloadURL(articleImagesRef);

  return imageUrl;
};

export const uploadAssets = async (
  files: any[],
  folder: string,
  isVideo: boolean[]
) => {
  const publicUrls: string[] = [];

  for (const file of files) {
    const imageUrl = await uploadAsset(
      files,
      folder,
      isVideo[files.indexOf(file)]
    );
    publicUrls.push(imageUrl);
  }

  return publicUrls;
};

export const formatter = ({ currency }: { currency: string }) =>
  new Intl.NumberFormat("en-US", {
    currency: currency,
    style: "currency",
    maximumFractionDigits: 2,
  });
