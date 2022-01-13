import { useState } from "react";
import Link from "next/link";
import fire from "../config/fire-config";
import Layout from "../components/Layout";
import Description from "../components/mainPage/Description";

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [notification, setNotification] = useState("");

  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  

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
