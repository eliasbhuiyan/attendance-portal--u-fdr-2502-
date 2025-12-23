import React, { useState } from "react";
import Navbar from "./Navbar";
import { Navigate, Outlet } from "react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loading from "../ui/Loading";

const Layout = () => {
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (!user.emailVerified) {
        setLoading(false);
        return setUser(null);
      }
      setUser(user);
      setLoading(false);
    } else {
      setUser(null);
      setLoading(false);
    }
  });

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
