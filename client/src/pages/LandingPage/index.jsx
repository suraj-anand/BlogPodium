import React from "react";
import { Helmet } from "react-helmet";
import { Text, Img, Heading, Button, Input } from "../../components";
import Navbar from "components/shared/Navbar";
import Feature from "./components/Feature";
import LatestPodcasts from "./components/LatestPodcasts";
import TrendingBlogs from "./components/TrendingBlogs";
import LoadMoreBlogs from "./components/LoadMoreBlogs";
import Footer from "components/shared/Footer";

export default function LandingPagePage() {
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
