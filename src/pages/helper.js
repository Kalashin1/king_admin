import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from '../firebase-settings';

export const uploadAsset = async (file, folder, isVideo) => {
  console.log(file);
  let extension = 'mp4'
  let blob = {};

  const metadata = {
    contentType: 'image/jpeg',
  };

  if (isVideo) {
    metadata['contentType'] = 'video/mp4'
  } else {
    extension = file.files
      ? file.files[0].name.split('.')[1]
      : file[0].name.split('.')[1];
    blob = file
  }

  const key = new ArrayBuffer(16).toString('hex');
  const name = `${key}.${extension}`;
  localStorage.setItem('name', name);

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