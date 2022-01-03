import React from "react";
import Link from "next/link";

const Header = () => {

    return (
        <div style={{display: "flex", justifyContent: "space-around"}}>
            Logo
            <Link href={"/"}>Home</Link>
            <Link href={"/users/login"}>Login</Link>
            <Link href={"/users/join"}>JoinUs</Link>
            
        </div>
    )
}

export default Header