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
import UserItems from "pages/UserItems/UserItems";
import SingleBlog from "pages/SingleBlog";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          
          <Route path="/" element={<LandingPage />} />      


          {/* Public Routes  */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blog/:blogid" element={<SingleBlog />} />

          {/* Test */}
          <Route path="/write-blog" element={<WriteBlog />} />
          <Route path="/your-items" element={<UserItems />} />
          
          
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
