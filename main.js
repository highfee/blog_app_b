import "./style.css";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { add } from "./createBlog";

const blogCollectionRef = collection(db, "blogs");

document.addEventListener("DOMContentLoaded", initApp);

let blogs = [];

const getBlogs = async () => {
  const data = await getDocs(blogCollectionRef);
  blogs = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

async function initApp() {
  await getBlogs();
  generateBlogCards();
}

document.querySelector("nav").innerHTML = `
  <div>
    <input type="title" id="title" placeholder="Blog title"/>
    <textarea id="body" rows="30" placeholder="Blog body"></textarea>
    <section>
    <label> Select blog image<input type="file" accept=".jpg, .png, .gif, .webp" id="image" /></label>
    <img id="testing" style="display: none"/>
    </section>
    
    <button id="addBtn">Add</button>
  </div>
`;

document.querySelector("#app").innerHTML += `
    <div class="blogs"></div>
`;
let url = "";
let image;
document.querySelector("#image").addEventListener("change", (e) => {
  url = URL.createObjectURL(e.target.files[0]);
  document.querySelector("#testing").setAttribute("src", url);
  document.querySelector("#testing").style.display = "block";
  image = e.target.files[0];
});

const generateBlogCards = () => {
  blogs.map((blog, i) => {
    document.querySelector(".blogs").innerHTML += `
    <div class="card">
        <div class="card_image">
         
          <img src=${blog.url} alt="" />
        </div>
        <div class="card_body">
           <a href="blog.html?id=${blog._id}">${blog.title}</a>
          <p class="slug">
            ${blog.slug}  
          </p>
        </div>
        <div class="link">
          <a href="blog.html?id=${blog._id}">
            Read More <span>&gt;</span></div>
          </a>
        </div>
    </div>
    `;
  });
};

document.querySelector("#addBtn").onclick = () => {
  add(
    document.querySelector("#addBtn"),
    document.querySelector("#title"),
    document.querySelector("#body"),
    image
  );
};
