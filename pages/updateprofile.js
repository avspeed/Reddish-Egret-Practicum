import React, { useState } from "react";
import fire from "../config/fire-config";
import { storage } from "../config/fire-config";
import { CountryDropdown } from "react-country-region-selector";
import Languages from "../components/Languages";

import firebase from "firebase/app";
import "firebase/firestore";

export default function ProfilePage() {
  //useState hooks for form elements
  const [userName, setUserName] = useState('')
  const [lang, setLang] = useState("");
  const [location, setLocation] = useState("");
  const [countryOrg, setCountryOrg] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");

  const handleImgUpload = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  {
    /*const updateProfile = (event) => {
    event.preventDefault();
    fire.collection('profilePage').set({
        Language:Lang,
        Country:country,
    })

    
  };*/
  }
  console.log("image:", image);
  //Below line of code to upload image to firestore
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).add(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images/${image.name}")
          //.child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
          });
      }
    );
  };

  const handleClick = (event) => {
    console.log("user data successfully added to db");
    event.preventDefault();
    //TODO add user id
    fire.firestore().collection("users").doc('userUid').set({
      userName: userName,
      language: lang,
      location: location,
      country: countryOrg,
      img: "link to img",
      hobbies: [],
    });
  };
  
  return (
    <div>
      <form>
        <div style={{ display: "block" }}>
          <input
            style={{ margin: "20px" }}
            type="text"
            onChange={handleImgUpload}
          />
          <button onClick={handleUpload}>Upload</button>
          <img
            src={url || "http://via.placeholder.com/400x300"}
            alt="Uploaded images"
            height="300"
            width="400"
          />
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
          <select value={lang} onChange={(target)=> setLang(target.target.value)}>
            {Languages.map((language, index) => (
              <option key={index}>{language.value}</option>
            ))}
          </select>
          {/*<select>
                <option>English</option>
                <option>Spanish</option>
                <option>Mandarin</option>
                <option>Arabic</option>
                <option>French</option>
        </select>*/}
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
          <label>Country:</label>&nbsp;&nbsp;
          {/*<select id="countries" name="countries" >
                <option>Syria</option>
                <option>Afghan</option>
                <option>Bangladesh</option>
                <option>Nepal</option>
        
                
    </select> */}
          <CountryDropdown
            value={countryOrg}
            onChange={(target) => setCountryOrg(target)}
          />
        </div>
        <br />
        <label htmlFor="interests">Hobbies:</label>&nbsp;&nbsp;
        <input type="text" id="interests" />
        <br />
        <button type="submit" onClick={handleClick}>
          Update profile
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button type="submit">Cancel</button>
      </form>
    </div>
  );
}
