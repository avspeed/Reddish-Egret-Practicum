import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import "@fontsource/roboto/400.css";
import { Avatar } from "@mui/material";


export default function Comment({ comment }) {
  const { author, commentBody, createdAt, userImageUrl } = comment;
  const dateCreatedAt = new Date(createdAt.toDate());
  return (
    <Card sx={{margin: "5px"}}>
      <CardContent sx={{display: "flex", flexWrap: "wrap"}}>
        <Avatar>
          <CardMedia
            component="img"
            height="40"
            image={userImageUrl}
            alt="avatar"
          />
        </Avatar>
        <Typography gutterBottom variant="h5" component="div">
          {author}
        </Typography>
        <Typography gutterBottom variant="subtitle2" component="span" sx={{alignSelf: "center"}}>
          posted ad {dateCreatedAt.toLocaleString()}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{width: "100%", marginTop: "5px"}}>
          {commentBody}
        </Typography>
      </CardContent>
    </Card>
  );
}
