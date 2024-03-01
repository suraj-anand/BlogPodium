import React, { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Text, Img, Heading, Button, Input } from "../../components";
import Navbar from "components/shared/Navbar";
import Feature from "./components/Feature";
import LatestPodcasts from "./components/LatestPodcasts";
import TrendingBlogs from "./components/TrendingBlogs";
import LoadMoreBlogs from "./components/LoadMoreBlogs";
import Footer from "components/shared/Footer";
import { useAxios } from "hooks";
import { AuthContext } from "context/AuthContext";

export default function LandingPagePage() {

  const {
      data,
      loading,
      status_code,
      call
  } = useAxios({
      url: "/api/auth-check/",
      method: "POST"
  });

  const { setAuthStatus } = useContext(AuthContext)


  useEffect(() => {
      const isAuth = data?.detail === "Authenticated" 
      if (status_code === 202 && isAuth) {
          setAuthStatus(true);
      } else {
          setAuthStatus(false);
      }
  }, [status_code])


  useEffect(() => {
      call()
  }, [])

  return (
    <>
      <Helmet>
        <title>BlogPodium</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      
      <Navbar />
      <Feature />
      <LatestPodcasts />
      <TrendingBlogs />
      <LoadMoreBlogs />
      <Footer />
      
    </>
  );
}
