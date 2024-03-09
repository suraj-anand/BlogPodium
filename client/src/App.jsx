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

          {/* Blog */}
          <Route path="/blog/:blogid" element={<SingleBlog />} />
          
          {/* Protected */}
          <Route path="/write-blog" element={<WriteBlog />} />
          <Route path="/blog/:blogid/edit/" element={<EditBlog />} /> 
          <Route path="/your-items" element={<YourItems />} />

          
          
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
