import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import Login from '../LoginPage/Login.jsx';
import SignUp from "../SignUpPage/SignUp.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function HomePage() {
    return (
      <Router>
        <div>
          <Header />
          <Routes>
            
            <Route path="/" element={<Hero />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </Router>
    );
}
export default HomePage;