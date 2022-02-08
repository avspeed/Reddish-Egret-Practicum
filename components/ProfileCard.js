import React, { useEffect, useState } from "react";
import fire from "../config/fire-config";
import { storage } from "../config/fire-config";
import { CountryDropdown } from "react-country-region-selector";
import Languages from "./Languages";
import "@firebase/auth";
import { useRouter } from "next/router";
import { useAuth } from "./context/authUserContext";
import TagsInput from "./TagsHobbies";
import App from "next/app";
import firebase from "firebase";
import { ListItem, unstable_composeClasses } from "@mui/material";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaeseline,
  Grid,
  Modal,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CustomizedDialogs from "./dialog";
import ProfilePage from "/pages//profilepage";

function ProfileCard({ currentUser }) {
  const { authUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState([
    {
      id: "",
      userName: "",
      countryOrg: "",
      hobbies: [],
      language: "",
      location: "",
      url: "",
    },
  ]);

  //to fetch the logged-in User details and render it on the page
  useEffect(() => {
    if (authUser) {
      fire
        .firestore()
        .collection("users")
        .doc(authUser.uid)
        .get()
        .then((snapshot) => {
          const currentuser = snapshot.data();
          setUser(currentuser);
        });
    }
  }, [authUser]);

  return (
    <Grid item xs={2} columns={1} gridColumn="2" mx='auto' my='10px' >
      <Card sx={{ maxWidth: 375 }}>
        <CustomizedDialogs>
          <ProfilePage />
        </CustomizedDialogs>
        <CardMedia component="img" image={user.url} alt="avatar" />
        <CardContent>
          <Typography gutterBottom>{user.userName}</Typography>
          <Typography gutterBottom>{user.language}</Typography>
          <Typography gutterBottom> {user.location}</Typography>
          <Typography gutterBottom>{user.country}</Typography>
          <Typography gutterBottom>{user.hobbies}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default ProfileCard;
