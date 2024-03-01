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
import NotFound from "pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />        
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectRoutes />}>
            <Route path="/secret" element={<Protected />} />
          </Route>

          {/* 404 - Page Not Found */}
          <Route path="*" element={<NotFound />} />

        </Routes>      
      </Router>
    </AuthProvider>
  );
}

export default App;
