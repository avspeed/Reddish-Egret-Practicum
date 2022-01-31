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





function editProfile() {


  const { authUser } = useAuth();
  //const [userName, setUserName] = useState("");
  //const [lang, setLang] = useState("");
  //const [location, setLocation] = useState("");
  //const [countryOrg, setCountryOrg] = useState("");
  //const [hobbies, setHobbies] = useState([]);
  //const [image, setImage] = useState("");
  //const [url, setUrl] = useState(null);
  const [user, setUser] = useState([{
    id: "",
    userName: "",
    countryOrg: "",
    hobbies: [],
    language: "",
    location: "",
    url: "",

  }]

  )







  useEffect(() => {
    if (authUser) {
      fire.firestore().collection("users")
        .doc(authUser.uid)
        .get()
        .then((snapshot) => {
          const currentuser = snapshot.data();
          setUser(currentuser)
          console.log(user)

        });



    }
  }, [authUser])





  return (
    <>


      <h2>Profile</h2>

      <img src={user.url} alt="avatar" height="300"
        width="400" />
      <p>{user.userName}</p>
      <p>{user.lang}</p>
      <p>{user.location}</p>
      <p>{user.country}</p>









    </>
  );
}

export default editProfile;














//////////////////////////

{/*// Popup function to redirect after updating profile
const popUp = () => {
  alert("Updated Successfully!!");
  /* setTimeout(() => {
    alert("Profile Updated Successfully");
  }, 3000); 
};

export default function ProfilePage() {
  const { authUser } = useAuth();
  const router = useRouter();

  //useState hooks for form elements
  const [userName, setUserName] = useState("");
  const [lang, setLang] = useState("");
  const [location, setLocation] = useState("");
  const [countryOrg, setCountryOrg] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(null);
  const [user, setUser] = useState();
  




  //To choose the image file
  const handleImageChange = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      setImage(e.target.files[0]);

      const uploadTask = storage.ref(`images/${image.name}`).put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref(`images/${image.name}`)
            //.child(image.name)
            .getDownloadURL()
            .then((url) => {
              setUrl(url);
            });
        }
      );
    }
  };
  // To delete the selected image file
  const removeSelectedImage = () => {
    setImage("");
    setUrl("");
  };

  // Form submission function
  const handleClick = (event) => {
    console.log(`user data successfully added to db under ${authUser.uid}`);
    event.preventDefault();
    /*  // image upload to firebase/storage
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref(`images/${image.name}`)
          //.child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
          });
      }
    ); 

    fire.firestore().collection("users").doc(authUser.uid).set({
      userName: userName,
      language: lang,
      location: location,
      country: countryOrg,
      url: url,
      hobbies: hobbies,
    });
    //popUp();
    //router.push("/mainBoard") 
  };

  const selectedTags = (tags) => {
    setHobbies(tags);
  };

  return (
      <>
      { user !==null ? 
    <div>
      <fieldset>
        <div style={{ display: "block" }}>
          <input
            type="file"
            accept="image/*"
            name="photo"
            style={{ margin: "20px" }}
            onChange={handleImageChange}
          />

          <img
            src={url || "http://via.placeholder.com/400x300"}
            height="300"
            width="400"
          />

          <button onClick={removeSelectedImage}>Remove This Image</button>
          <br />
        </div>
        <br />
        <div>
          <label htmlFor="userName">User name</label>&nbsp;&nbsp;
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(target) => setUserName(target.target.value)}
          />
        </div>
        <div>
          <label>Language:</label>&nbsp;
          <select
            value={lang}
            onChange={(target) => setLang(target.target.value)}
          >
            {Languages.map((language, index) => (
              <option key={index}>{language.value} </option>
            ))}
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="location">Location</label>&nbsp;&nbsp;
          <input
            type="text"
            id="location"
            value={location}
            onChange={(target) => setLocation(target.target.value)}
          />
        </div>
        <br />
        <div>
          <label>Country:</label>&nbsp;
          <CountryDropdown
            value={countryOrg}
            onChange={(target) => setCountryOrg(target)}
          />
        </div>
        <br />
        <TagsInput selectedTags={selectedTags} />
        <br />
        <button type="submit" onClick={handleClick}>
          Save
        </button>
        &nbsp;
        <button onClick={() => router.push("/mainBoard")}>Cancel</button>
      </fieldset>
    </div>
 : null}
    </>
  );
}
*/}









