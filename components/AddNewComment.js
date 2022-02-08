import React, { useState } from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { db } from "../config/fire-config";
import firebase from "firebase";



export default function AddNeWComment({ postId, currentUser }) {
  const [comment, setComment] = useState("");
  const { url, userName } = currentUser;

  //create reference to the post to be updated
  const postRef = db.collection("posts").doc(postId);
  
  const saveComment = (postId) => {
    const time = new Date();
    try {
      db.collection("comments").doc().set({
        postId: postId,
        author: userName,
        commentBody: comment,
        createdAt: time,
        userImageUrl: url,
      });
    } catch (error) {
      console.log(error);
    }
    //update the comments counter for this post
    postRef.update({
      commentCount: firebase.firestore.FieldValue.increment(1),
    });
    //reset the comment to empty string
    setComment("");
  };

  console.log("add comment get rendered");
  return (
    <Stack>
      <TextField
        id="standard-basic"
        label="Leave your comment"
        multiline
        variant="filled"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <Button
        variant="contained"
        onClick={() => saveComment(postId)}
        endIcon={<SendIcon />}
      >
        Send
      </Button>
    </Stack>
  );
}
