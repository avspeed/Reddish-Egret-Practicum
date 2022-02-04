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
import toast, { Toaster } from "react-hot-toast";


// Popup function to redirect after updating profile
const popUp = () => {
  toast.success("Updated Successfully!");
};

export default function ProfilePage() {
  const { authUser } = useAuth();
  console.log(authUser);
  const router = useRouter();

  const [user, setUser] = useState({
    userName: "",
    country: "",
    hobbies: [],
    image: "",
    language: "",
    location: "",
    url: "",
  });


  //To choose the image file
  const handleImageChange = async (e) => {
    if (e.target.files[0]) {
      const userImage = e.target.files[0];
      console.log(userImage)

      const uploadTask = storage.ref(`images/${userImage.name}`).put(userImage);

      uploadTask.on(
        "state_changed",
        (snapshot) => { },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref(`images/${userImage.name}`)
            .getDownloadURL()
            .then((url) => {
              console.log(user)
              setUser({ ...user, image: userImage.name, url: url });
            });
        }
      );
    }

  };
  console.log(user);
  // To delete the selected image file
  const removeSelectedImage = () => {
    setUser({ ...user, image: "" });
    setUser({ ...user, url: "" });
  };

  // Form submission function
  const handleProfileUpload = async (event) => {
    console.log(`user data successfully added to db under ${authUser.uid}`);
    //write data to firestore db
    fire.firestore().collection("users").doc(authUser.uid).set({
      userName: user.userName,
      language: user.language,
      location: user.location,
      country: user.country,
      url: user.url,
      hobbies: user.hobbies,
      image: user.image,
    });
    popUp();
  };

  const selectedTags = (tags) => {
    let updatedUser = user;
    updatedUser.hobbies = [...tags];
    setUser(updatedUser);
  };

  useEffect(() => {
    if (authUser) {
      try {
        //read data from firestore db, find user by uid into 'users' collection
        db.collection("users")
          .doc(authUser.uid)
          .get()
          .then((snapshot) => {
            const user = snapshot.data();
            if (user) {
              setUser(user);
            }
          });
      } catch (e) {
        console.error(e);
      }
    }
  }, [authUser]);

  return (
    <div>
      <div>
        <Toaster />
      </div>
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
            src={user.url || "http://via.placeholder.com/400x300"}
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
            value={user.userName}
            onChange={(target) =>
              setUser({ ...user, userName: target.target.value })
            }
          />
        </div>
        <div>
          <label>Language:</label>&nbsp;
          <select
            value={user.language}
            onChange={(target) =>
              setUser({ ...user, language: target.target.value })
            }
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
            value={user.location}
            onChange={(target) =>
              setUser({ ...user, location: target.target.value })
            }
          />
        </div>
        <br />
        <div>
          <label>Country:</label>&nbsp;
          <CountryDropdown
            value={user.country}
            onChange={(target) => {
              console.log(target);
              setUser({ ...user, country: target });
            }}
          />
        </div>
        <br />
        <TagsInput selectedTags={selectedTags} hobbies={user.hobbies} />
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
