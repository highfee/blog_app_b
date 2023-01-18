import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";
import { v4 as uuidv4 } from "uuid";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

const blogCollectionRef = collection(db, "blogs");

export const add = async (element, title, body, file) => {
  if (!file) {
    return alert("Pls select an image");
  }
  element.innerText = "Adding...";
  const storage = getStorage();
  const storageRef = ref(storage, file.name);
  const uploadTask = uploadBytesResumable(storageRef, file);
  let date = new Date();
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      console.log("Uploading");
    },
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        const create = await addDoc(blogCollectionRef, {
          title: title.value,
          slug: body.value.substr(0, 220),
          body: body.value,
          _id: uuidv4(),
          url: downloadURL,
          date: date.toDateString(),
        });
        location.reload();
      });
    }
  );
};
