import { useState } from "react";
import { MyNavBar } from "./components/MyNavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import MyFooter from "./components/MyFooter";
import Login from "./pages/Login";
import './style/App.scss';
import "./style/index.css";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import FlashMssagesContainer from "./features/flash_messages/FlashMssagesContainer";
import { LoginRoute } from "./routes/LoginRoutes";
import MainProducts from "./pages/MainProducts";
import CartPage from "./pages/Cart";
import OrderList from "./pages/OrderList";

function App() {

  return (
    <>
      <MyNavBar />
      <FlashMssagesContainer />

      <div className="main-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path='/products' element={<MainProducts />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/orders' element={<OrderList />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
      </div>

      <MyFooter />
    </>
  );
}

export default App;
