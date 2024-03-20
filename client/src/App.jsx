import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  LandingPage,
  Login,
  Register
} from './pages'
import Protected from "pages/Protected";
import ProtectRoutes from "utils/ProtectRoutes";
import { AuthProvider } from "context/AuthContext";
import Unauthorized from "pages/Unauthorized";
import WriteBlog from "pages/blogs/WriteBlog";
import YourItems from "pages/YourItems/YourItems";
import SingleBlog from "pages/SingleBlog";
import EditBlog from "pages/blogs/components/EditBlog";
import UserProfile from "pages/UserProfile/UserProfile";
import SearchPage from "pages/SearchPage";
import YourFacourites from "pages/YourFavourites";
import Podcast from "pages/podcasts/PodcastPlayer";
import Blog from "pages/blogs/Blog";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          
          <Route path="/" element={<LandingPage />} />      


          {/* Public Routes  */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Test */}
          <Route path="/user/:userid" element={<UserProfile />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/podcast/:podcastid" element={<Podcast />} />

          {/* Blog */}
          <Route path="/blog/" element={<Blog />} />
          <Route path="/blog/:blogid" element={<SingleBlog />} />
          
          {/* Protected */}
          <Route path="/write-blog" element={<WriteBlog />} />
          <Route path="/blog/:blogid/edit/" element={<EditBlog />} /> 
          <Route path="/your-items" element={<YourItems />} />
          <Route path="/your-favourites" element={<YourFacourites />} />

          
          
          {/* Protected Routes */}
          <Route element={<ProtectRoutes />}>
            <Route path="/secret" element={<Protected />} />
          </Route>

          {/* 404 - Page Not Found */}
          <Route path="*" element={<Unauthorized />} />

        </Routes>      
      </Router>
    </AuthProvider>
  );
}

export default App;
