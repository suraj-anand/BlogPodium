import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  LandingPage,
  Login,
  Register
} from './pages'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>      
    </Router>
  );
}

export default App;
