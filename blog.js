import "./blog.css";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";
let blogId = location.search.split("=")[1];

const q = query(collection(db, "blogs"), where("_id", "==", blogId));

const getBlog = async () => {
  const container = document.querySelector(".container");
  const data = await getDocs(q);
  let blogs = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  let blog = blogs[0];
  console.log(blog);
  document.title = blog.title;
  container.innerHTML = `
  <section>
  <p class="date">${blog.date}</p>
  <h1 class="title my">${blog.title}</h1>
</section>
<div>
  <img src=${blog.url} alt="" />
</div>
<p class="my">
  ${blog.body}
</p>
  `;
};
getBlog();
