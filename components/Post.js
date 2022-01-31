import React from "react";
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

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Post = (props) => {
  const { post } = props;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Grid item xs={12} md={6}>
      <Card>
        <Box sx={{ display: "flex" }}>
          {/* <Avatar sx={{ height: "80px", width: "80px" }}> */}
            <CardMedia
              component="img"
              sx={{ width: 120, height: 120, display: { xs: "none", sm: "block" } }}
              image="../images/treeroots.jpg"
              alt={"post.imageLabel"}
            />
         {/*  </Avatar> */}
          <CardContent sx={{display: "block" }}>
            <Typography component="h2" variant="h5">
              {"user.name"}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {"post.date"}
            </Typography>
            <Typography variant="subtitle1" paragraph sx={{ overflow: "true" }} >
              {
                "post.body. bodypost.bodypost.bodypost.body"
              }
            </Typography>
          </CardContent>
        </Box>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>comments in here</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron
              and set aside for 10 minutes.
            </Typography>
          </CardContent>
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
