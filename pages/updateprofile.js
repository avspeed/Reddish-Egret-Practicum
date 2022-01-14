import React, { useState } from "react";

import { storage, fire } from "../config/fire-config";
import { CountryDropdown } from "react-country-region-selector";
import Languages from "../components/Languages";

import firebase from 'firebase/app';
import 'firebase/firestore';

export default function ProfilePage() {
  //useState hooks for form elements
  const [country, setCountry] = useState("");
  const [lang, setLang] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");

  //event handlers
  const selectCountry = (val) => {
    setCountry(val);
  };
  const selectLanguage = (e) => {
    setLang(e.target.value);
  };
  const handleChange = (e) => {
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
    console.log("click")
    event.preventDefault()
    fire.firestore()
      .collection('users')
      .add({
        userName: "userName Alena",
        location: location,
        img: "link to img",
        hobbies: [],
        origin: "origin",
        bio: "bio"
      })
  }

  return (
    <div>
      <form>
        <div style={{ display: "block" }}>
          <input
            style={{ margin: "20px" }}
            type="file"
            onChange={handleChange}
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
          <label>Language:</label>&nbsp;&nbsp;
          <select value={lang} onChange={selectLanguage}>
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
          <input type="text" id="location" />
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
            value={country}
            onChange={(val) => selectCountry(val)}
          />
        </div>
        <br />
        <label htmlFor="interests">Hobbies:</label>&nbsp;&nbsp;
        <input type="text" id="interests" />
        <br />
        <button type="submit" onClick={handleClick}>Update profile</button>&nbsp;&nbsp;&nbsp;&nbsp;
        <button type="submit">Cancel</button>
      </form>
    </div>
  );
}
