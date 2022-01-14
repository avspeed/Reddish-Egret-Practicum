import { useState } from "react";
import Link from "next/link";
import fire from "../config/fire-config";
import { useAuth } from "./authUserContext";
import Description from "../components/mainPage/Description";
import useFirebaseAuth from "../hooks/useFirebaseAuth";

const Home = () => {
  const [notification, setNotification] = useState("");

  /* console.log(authUser, loading) */
  console.log(useAuth());
  return (
    <>
      {notification}
      <Description />
    </>
  );
};
export default Home;
