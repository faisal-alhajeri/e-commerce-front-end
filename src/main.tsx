import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { FlashMessegesProvider } from "./features/flash_messages/context/FlashMessegesContext";
import AuthProvider from "./features/auth/context/AuthContext";
import CartProvider from "./features/cart/context/CartContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <FlashMessegesProvider>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </FlashMessegesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
