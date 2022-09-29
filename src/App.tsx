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
import MainProducts from "./pages/MainProducts";
import CartPage from "./pages/Cart";
import OrderList from "./pages/OrderList";
import AdminHome from "./pages/admin/AdminHome";
import SingleProduct from "./pages/SingleProduct";
import ProductsRoutes from "./routes/ProductsRoutes";
import AdminRoutes from "./routes/AdminRoutes";

function App() {

  return (
    <>
      <MyNavBar />
      <FlashMssagesContainer />

      <div className="main-container">
          <Routes>
            <Route path="/admin/*" element={<AdminRoutes />} />

            <Route path="/" element={<MainProducts />} />
            <Route path="/products/*" element={<ProductsRoutes />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
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
