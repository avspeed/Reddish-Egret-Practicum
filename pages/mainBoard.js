import React, { useEffect, useState } from "react";
import { storage, db } from "../config/fire-config";
import { useRouter } from "next/router";
import { useAuth } from "../components/context/authUserContext";
import Post from "../components/Post";

var s = new Date(1504095567183).toLocaleDateString("en-US")


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
          posts.push({...doc.data(), postId: doc.id});
        });
        setPosts(posts);
        // console.log("doc", docs.docs);
      });
    }
  }, [authUser]);
console.log("all posts", posts)

  return (
    <>
      
      <div style={{position: "absolute", left: '80%'}}>Profile screenshot</div>
      {posts.map((post) => (
        <Post key={post.postId} post={post}/>
      ))}
    </>
  );
};

export default MainBoard;
