import React, { useEffect, useState } from "react";
import { db } from "../config/fire-config";
import { useRouter } from "next/router";
import { useAuth } from "../components/context/authUserContext";

import Post from "../components/Post";
import ProfileCard from "../components/ProfileCard";

import Grid from "@mui/material/Grid";

function postsCollection() {
  return new Promise((resolve) => {
    db.collection("posts").onSnapshot((docs) => {
      let posts = [];
      docs.forEach((doc) => {
        posts.push({ ...doc.data(), postId: doc.id });
      });
      resolve(posts);
    });
  });
}
function likesCollection(userUid) {
  return new Promise((resolve) => {
    db.collection("likes")
      .where("userId", "==", userUid)
      .get()
      .then((querySnapshot) => {
        let usersLikes = [];
        querySnapshot.forEach((doc) => {
          usersLikes.push(doc.data().postId);
        });
        resolve(usersLikes);
      });
  });
}
async function checkForLikedPosts(userUid) {
  const posts = await postsCollection();
  const userLikes = await likesCollection(userUid);
  posts.forEach((post) => {
    if (userLikes.some((id) => id === post.postId)) {
      post.liked = true;
    } else {
      post.liked = false;
    }
  });
  return posts;
}

const MainBoard = () => {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    userName: "",
    country: "",
    hobbies: [],
    image: "",
    language: "",
    location: "",
    url: "",
  });

  const { authUser, loading } = useAuth();

  /*  const router = useRouter(); */

  // Listen for changes on loading and authUser, redirect if needed
  /*  useEffect(() => {
    if (!loading && authUser) router.push("/");
  }, [authUser, loading, router]); */

  useEffect(() => {
    if (authUser) {
      //fetch all posts and subscribe for updates
      db.collection("posts").onSnapshot((docs) => {
        checkForLikedPosts(authUser.uid).then((response) => {
          setPosts(response);
        });
      });
      //find current user into collention "users"
      db.collection("users")
          .doc(authUser.uid)
          .get()
          .then((snapshot) => {
            const user = snapshot.data();
            if (user) {
              setCurrentUser(user);
            }
          });
    }
  }, [authUser]);
  console.log("user", currentUser);
  // console.log("all posts", posts);
  return (
    <Grid
      display="grid"
      gridTemplateColumns="repeat(2, 1fr)"
      container
      sx={{ padding: "5px" }}
      columns={2}
    >
      <ProfileCard currentUser={currentUser} />
      <Grid gridRow={1}>
        {posts.map((post) => (
          <Post key={post.postId} post={post} userId={authUser.uid} currentUser={currentUser} />
        ))}
      </Grid>
    </Grid>
  );
};

export default MainBoard;
