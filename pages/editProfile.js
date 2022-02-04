import React, { useEffect, useState } from "react";
import fire from "../config/fire-config";
import { storage } from "../config/fire-config";
import { CountryDropdown } from "react-country-region-selector";
import Languages from "../components/Languages";
import "@firebase/auth";
import { useRouter } from "next/router";
import { useAuth } from "../components/context/authUserContext";
import TagsInput from "../components/TagsHobbies";
import App from "next/app"
import firebase from 'firebase';
import { ListItem, unstable_composeClasses } from "@mui/material";
import { Typography, Button, Card, CardActions, CardContent, CardMedia, CssBaeseline, Grid, Modal, Container } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CustomizedDialogs from "../components/dialog";
import ProfilePage from './profilepage'

function editProfile() {
  const { authUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState([{
    id: "",
    userName: "",
    countryOrg: "",
    hobbies: [],
    language: "",
    location: "",
    url: "",

  }]);


  //const handleOpen = () => setOpen(true);
  //const handleClose = () => setOpen(false);

  useEffect(() => {
    if (authUser) {
      fire.firestore().collection("users")
        .doc(authUser.uid)
        .get()
        .then((snapshot) => {
          const currentuser = snapshot.data();
          setUser(currentuser);

        });

    }
  }, [authUser]);

  return (

    <Card sx={{ maxWidth: 400 }}>
      <CustomizedDialogs >
        <ProfilePage />
      </CustomizedDialogs>
      <CardMedia
        component="img"
        image={user.url}
        alt="avatar"
      />
      <CardContent>
        <Typography gutterBottom >
          {user.userName}</Typography>
        <Typography gutterBottom >{user.language}</Typography>
        <Typography gutterBottom> {user.location}</Typography>
        <Typography gutterBottom>{user.country}</Typography>
      </CardContent>
    </Card>
  );
}

export default editProfile;













