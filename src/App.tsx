import { useState } from "react";
import { MyNavBar } from "./components/MyNavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import MyFooter from "./components/MyFooter";
import Login from "./pages/Login";
import './style/App.scss';
import "./style/index.css";

function App() {

  return (
    <>
      <MyNavBar />

      <div className="main-container">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
          </Routes>
      </div>

      <MyFooter />
    </>
  );
}

export default App;
