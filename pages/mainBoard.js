import React, { useEffect, useState } from "react";
import { storage, db } from "../config/fire-config";
import { useRouter } from "next/router";
import { useAuth } from "../components/context/authUserContext";
import Post from "../components/Post";

var s = new Date(1504095567183).toLocaleDateString("en-US");

const MainBoard = () => {
  const [posts, setPosts] = useState([]);
  const [usersLikes, setUsersLikes] = useState([]);

  const { authUser, loading } = useAuth();

  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed
  /*  useEffect(() => {
    if (!loading && authUser) router.push("/");
  }, [authUser, loading, router]); */

  useEffect(() => {
    if (authUser) {
      //fetch all posts and subscribe for updates
      db.collection("posts").onSnapshot((docs) => {
        let posts = [];
        docs.forEach((doc) => {
          posts.push({ ...doc.data(), postId: doc.id });
        });
        setPosts(posts);
        console.log("get docs");
      })
      
      //fetch post the authUser liked
      db.collection("likes")
        .where("userId", "==", authUser.uid)
        /* .where("postId", "==", postId) */
        .get()
        .then((querySnapshot) => {
          let usersLikes = [];
          querySnapshot.forEach((doc) => {
            usersLikes.push(doc.data().postId);
          });
          setUsersLikes(usersLikes);
          console.log("get likes");
        })
        .then(() => {
          checkForLikedPosts(posts)
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
      /* setPosts(checkForLikedPosts(posts)) */
    }
  }, [authUser]);
  /*   console.log("all posts", posts);
  console.log("likes", usersLikes);
  console.log(loading, authUser); */
  function checkForLikedPosts(posts) {
    posts.forEach((post) => {
      if (usersLikes.some((id) => id === post.postId)) {
        post.liked = true;
      } else {
        post.liked = false;
      }
    });
    return posts;
  }
  /*  console.log("liked posts", checkForLikedPosts(posts)) */

  /* if (posts && usersLikes) {
    checkForLikedPosts(posts);
  } */
  console.log("userlikes", usersLikes);
  console.log("all posts", posts);

  return (
    <>
      <div style={{ position: "absolute", left: "80%" }}>
        Profile screenshot
      </div>
      {posts.map((post) => (
        <Post key={post.postId} post={post} />
      ))}
    </>
  );
};

export default MainBoard;
