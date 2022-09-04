//import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import QRgen from "./components/views/QR/QRgenerator";
import QRscanner from "./components/views/QR/QRscanner";
import Auth from "./hoc/auth";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Router>
          <Routes>
            <Route exact path="/" element={Auth(LandingPage, null)} />
            <Route path="/login" element={Auth(LoginPage, false)} />
            <Route path="/register" element={Auth(RegisterPage, false)} />
            <Route path="/qr_generator" element={Auth(QRgen, true)} />
            <Route path="/qr_scanner" element={Auth(QRscanner, false)} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
