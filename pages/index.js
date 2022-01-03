import { useState, useEffect } from "react";
import Head from "next/head";
import fire from "../config/fire-config";
import CreatePost from "../components/CreatePost";
import Header from "../components/mainPage/Header";
import Link from "next/link";
import Emergency from "./mainSections/Resources";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fire
      .firestore()
      .collection("blog")
      .onSnapshot((snap) => {
        const blogs = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogs);
      });
  }, []);
  console.log(blogs)
  return (
    <div>
      <Head>
        <title>UTab App</title>
      </Head>
      <Header />
      
      <h1>Blog</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href="/blog/[id]" as={"/blog/" + blog.id}>
              <a>{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>
      <CreatePost />
      <Link href={"/mainSections/Resources"}>
       <h3>Legal Help</h3>
      </Link>
    </div>
  );
};
export default Home;
