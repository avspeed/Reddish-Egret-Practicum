import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../components/context/authUserContext";

const MainBoard = () => {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (loading && !authUser) router.push("/");
  }, [authUser, loading, router]);

  return (
    <>
      <div>You are logged in</div>
      <div>This is a main board where you see all posts</div>
    </>
  );
};

export default MainBoard;
