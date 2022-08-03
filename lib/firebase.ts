import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import LZString from "lz-string";

const firebaseConfig = {
  apiKey: "AIzaSyCOEt6Zh_PZvs7xdkRVsLKedZojU3NVYJc",
  authDomain: "saur-f7386.firebaseapp.com",
  projectId: "saur-f7386",
  storageBucket: "saur-f7386.appspot.com",
  messagingSenderId: "1019838351162",
  appId: "1:1019838351162:web:a3606e7d329760dbb7b203",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const firestore = getFirestore();
export const storage = getStorage();
export const googleAuthProvider = new GoogleAuthProvider();

export const uploadPicture = async (picture: string, pictureId?: string) => {
  picture = LZString.compressToBase64(picture);
  const docRef = doc(firestore, `pictures/${pictureId}`);
  await setDoc(docRef, { picture });
};
