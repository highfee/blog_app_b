import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";
let blogId = location.search.split("=")[1];

const q = query(collection(db, "blogs"), where("_id", "==", blogId));
const getBlog = async () => {
  const blog = await getDocs(q);
  return blog;
};
const blog = getBlog();
blog.forEach((doc) => {
  console.log(doc.id, " => ", doc.data());
  document.body.innerHTML = doc.data().body;
  document.title = doc.data().title;
});
