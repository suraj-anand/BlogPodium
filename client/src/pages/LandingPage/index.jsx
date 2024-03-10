import React, { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Text, Img, Heading, Button, Input } from "../../components";
import Navbar from "components/shared/Navbar";
import Feature from "./components/Feature";
import LatestPodcasts from "./components/LatestPodcasts";
import TrendingBlogs from "./components/TrendingBlogs";
import Footer from "components/shared/Footer";
import { useAxios } from "hooks";
import { AuthContext } from "context/AuthContext";
import { Spinner } from "react-bootstrap";

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
          localStorage.setItem("user_id", data?.user_id);
          localStorage.setItem("user_name", data?.user_name);
          setAuthStatus(true);
      } else {
          setAuthStatus(false);
      }
  }, [status_code])


  useEffect(() => {
      call()
  }, [])

  if (loading) {
    return (
        <div className='flex items-center justify-center h-screen'>
            <Spinner className='text-blue-600' />
        </div>
    )
}

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
      <Footer />
      
    </>
  );
}
