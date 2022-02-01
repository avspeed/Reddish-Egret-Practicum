import React, { useEffect, useState } from "react";
import { storage, db } from "../config/fire-config";
import { useRouter } from "next/router";
import { useAuth } from "../components/context/authUserContext";
import Post from "../components/Post";

const MainBoard = () => {
  const [posts, setPosts] = useState([]);

  const { authUser, loading } = useAuth();

  const router = useRouter();
  console.log(loading, authUser);
  // Listen for changes on loading and authUser, redirect if needed
  /*  useEffect(() => {
    if (!loading && authUser) router.push("/");
  }, [authUser, loading, router]); */

  useEffect(() => {
    if (authUser) {
      console.log("inside here");
      db.collection("posts").onSnapshot((docs) => {
        let posts = [];
        docs.forEach((doc) => {
          posts.push(doc.data());
        });
        setPosts(posts);
        // console.log("doc", docs.docs);
      });
    }
  }, [authUser]);
console.log("all posts", posts)
  console.log("mainboard rendered");
  return (
    <>
      <div>You are logged in</div>
      <div>This is a main board where you see all posts</div>
      <div style={{position: "absolute", rigth: 0}}>Profile screenshot</div>
      {posts.map((post, ind) => (
        <Post key={ind} post={post}/>
      ))}
    </>
  );
};

export default MainBoard;
