import React, { useState, useEffect } from "react";
import fire from "../config/fire-config";
import "firebase/firestore";
import { storage, db } from "../config/fire-config";
import { CountryDropdown } from "react-country-region-selector";
import Languages from "../components/Languages";
import "@firebase/auth";
import { useRouter } from "next/router";
import { useAuth } from "../components/context/authUserContext";
import TagsInput from "../components/TagsHobbies";
import Image from "next/image";

// Popup function to redirect after updating profile
const popUp = () => {
  alert("Updated Successfully!!");
};

export default function ProfilePage() {
  const { authUser } = useAuth();
  const router = useRouter();

  const [user, setUser] = useState({
    id: "",
    userName: "",
    country: "",
    hobbies: [],
    language: "",
    location: "",
    url: "",
    image: "",
  });

  //useState hooks for form elements
  const [userName, setUserName] = useState("");
  const [language, setLang] = useState("");
  const [location, setLocation] = useState("");
  const [countryOrg, setCountryOrg] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  //To choose the image file
  const handleImageChange = async (e) => {
    if (e.target.files[0]) {
      const userImage = e.target.files[0];
      console.log(e.target.files[0]);
      setImage(userImage);
      console.log(image);
      const uploadTask = storage.ref(`images/${userImage.name}`).put(userImage);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref(`images/${userImage.name}`)
            //.child(image.name)
            .getDownloadURL()
            .then((url) => {
              console.log(url);
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
  const handleProfileUpload = async (event) => {
    console.log(`user data successfully added to db under ${authUser.uid}`);
    /*  event.preventDefault(); */

    fire.firestore().collection("users").doc(authUser.uid).set({
      userName: userName,
      language: language,
      location: location,
      country: countryOrg,
      url: url,
      hobbies: hobbies,
      image: image.name,
    });
    popUp();
    router.push("/mainBoard");
  };

  const selectedTags = (tags) => {
    console.log(tags)
    console.log(user)
    let updatedUser = user
    updatedUser.hobbies = [...tags]
    
    setUser(updatedUser);
  };

  useEffect(() => {
    if (authUser) {
      try {
        db.collection("users")
          .doc(authUser.uid)
          .get()
          .then((snapshot) => {
            const user = snapshot.data();
            console.log(user);
            setUser(user);
            setUserName(user.userName);
            setLang(user.language);
            setLocation(user.location);
            setCountryOrg(user.country);
            setHobbies(user.hobbies);
            setUrl(user.url);
            setImage(user.image);
          });
      } catch (e) {
        console.error(e);
      }
      /* console.log(user); */
      /*  const dbRef = fire.database().ref()
      dbRef.child('users').child(authUser.uid).get().then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      }); */
      /* db.collection("users").onSnapshot((snap) => {
        const collection = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(collection);
      }); */
    }
  }, [authUser]);
 console.log(user)
  console.log("profile rendered");
  return (
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

          <Image
            src={url || "http://via.placeholder.com/400x300"}
            placeholder="blur"
            blurDataURL="http://via.placeholder.com/400x300"
            alt="avatar"
            width={400}
            height={300}
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
            value={language}
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
        <TagsInput selectedTags={selectedTags} hobbies={hobbies} />
        <br />
        <button type="submit" onClick={handleProfileUpload}>
          Save
        </button>
        &nbsp;
        <button onClick={() => router.push("/mainBoard")}>Cancel</button>
      </fieldset>
    </div>
  );
}
