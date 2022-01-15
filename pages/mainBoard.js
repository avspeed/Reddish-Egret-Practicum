import React from "react";
import fire from "../config/fire-config";

const MainBoard = () => {

  const handleClick = (event) => {
    console.log("click")
    event.preventDefault()
    fire.firestore()
      .collection('users')
      .add({
        userName: "userName Alena",
        location: "location",
        img: "link to img",
        hobbies: [],
        origin: "origin",
        bio: "bio"
      })
  }
  return (
    <>
      <div>This is a main board where you see all posts</div>
      <button onClick={handleClick}>Click to create user</button>
      </>
  );
};

export default MainBoard;
