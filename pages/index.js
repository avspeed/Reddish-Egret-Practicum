import { useState } from "react";
import Link from "next/link";
import fire from "../config/fire-config";

import Description from "../components/mainPage/Description";
import useFirebaseAuth from "../hooks/useFirebaseAuth";

const Home = () => {
   
  const [loggedIn, setLoggedIn] = useState(false);
  const [notification, setNotification] = useState("");
  const [userUid, setUserUid] = useState('')
  const [userEmail, setUserEmail] = useState('')

  fire.auth().onAuthStateChanged((user) => {
   
    if (user) {
      setLoggedIn(true);
      setUserUid(user.uid)
      setUserEmail(user.email)
     
    } else {
      setLoggedIn(false);
    }
   
  });

console.log(useFirebaseAuth())
/* console.log(authUser, loading) */

  return (
    <>
    
      {notification}
      <Description />
      <Link href={"/mainPageSections/Resources"} passHref>
        <h3>Legal Help</h3>
      </Link>
    </>
  );
};
export default Home;
