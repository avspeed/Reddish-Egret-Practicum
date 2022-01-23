import React from "react";
import Link from "next/link";
import Image from "next/image";
import fire from "../../config/fire-config";
import { useAuth } from "../context/authUserContext";

const Header = () => {
  const { authUser, loading, signOut } = useAuth();

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Image src="/images/logo.png " width={100} height={100} alt="logo" />
      <nav>
        <Link href={"/"}> Home </Link>
        {!loading && authUser ? (
          <button onClick={signOut}> Sign out </button>
        ) : (
          <div>
            <Link href={"/users/login"}> Login </Link> |
            <Link href={"/users/join"}> JoinUs </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
