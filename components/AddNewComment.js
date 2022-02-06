import React, { useState } from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import { useAuth } from "./context/authUserContext";

export default function AddNeWComment() {
  const [comment, setComment] = useState("");

  const { authUser } = useAuth();

  const saveComment = () => {
    console.log(comment);
    setComment('')
  };
  
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

      <Button variant="contained" onClick={saveComment} endIcon={<SendIcon />}>
        Send
      </Button>
    </Stack>
  );
}
