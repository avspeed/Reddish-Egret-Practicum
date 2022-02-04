import React, { useState } from "react";
import Comment from "./Comment";
import AddNeWComment from "./AddNewComment";
import PropTypes from "prop-types";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import { Box } from "@mui/system";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { autocompleteClasses, Avatar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Badge from "@mui/material/Badge";
import CommentIcon from "@mui/icons-material/Comment";
import { getDomainLocale } from "next/dist/shared/lib/router/router";

import { db } from "../config/fire-config";
import firebase from "firebase";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  /*   transform: !expand ? "rotate(0deg)" : "rotate(360deg)", */
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function commentsLabel(count) {
  if (count === 0) {
    return "no comments";
  }
  if (count > 99) {
    return "more than 99 comments";
  }
  return `${count} comments`;
}

const Post = ({ post }) => {
  const [expanded, setExpanded] = useState(false);
  const [favorite, setFavorite] = useState(post.liked);

  const favoriteClick = async (postId) => {
    const fav = !favorite;
    setFavorite(fav);
    /*   console.log(postId) */
   /*  likePost(postId) */

    const postRef = db.collection("posts").doc(postId);
    if (favorite) {
      postRef.update({
        likeCount: firebase.firestore.FieldValue.increment(-1),
      });
    } else {
      postRef.update({
        likeCount: firebase.firestore.FieldValue.increment(1),
      });
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const dateCreatedAt = new Date(post.createdAt.toDate());
/* console.log(post) */
console.log(favorite)
  return (
    <Grid item xs={12} md={6} sx={{ margin: "10px 0px" }}>
      <Card>
        <Box sx={{ display: "flex" }}>
          <CardMedia
            component="img"
            sx={{
              width: 120,
              height: 120,
              display: { xs: "none", sm: "block" },
            }}
            image={post.userImage}
            alt={"post.imageLabel"}
          />

          <CardContent sx={{ display: "block" }}>
            <Typography component="h2" variant="h5">
              {post.userName}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {/* {new Date(post.createdAt.toDate()).toDateString()} */}
              Posted at {dateCreatedAt.toLocaleString()}
            </Typography>
            <Typography variant="subtitle1" paragraph sx={{ overflow: "true" }}>
              {post.postBody}
            </Typography>
          </CardContent>
        </Box>
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={() => favoriteClick(post.postId)}
          >
            <Badge
              badgeContent={post.likeCount}
              sx={{ fontSize: "9" }}
              color="primary"
              showZero
            >
              <FavoriteIcon sx={{ color: favorite ? "#FF3333" : null }} />
            </Badge>
          </IconButton>

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
            <Badge badgeContent={post.commentCount} color="primary" showZero>
              <CommentIcon aria-label={commentsLabel(post.commentCount)} />
            </Badge>
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Comment />
          </CardContent>
          <AddNeWComment />
        </Collapse>
      </Card>
    </Grid>
  );
};

/* Post.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
}; */
export default Post;
