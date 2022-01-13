import React from "react";
import Link from "next/link";
import Image from "next/image";

const Header = ({ loggedIn }) => {
  
  const handleLogout = () => {
    fire
      .auth()
      .signOut()
      
  };
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
        {loggedIn ? (
          <button onClick={handleLogout}> Logout </button>
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
