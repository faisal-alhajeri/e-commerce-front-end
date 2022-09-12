import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { FlashMessegesProvider } from "./features/flash_messages/context/FlashMessegesContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <FlashMessegesProvider> 
      <App />

    </FlashMessegesProvider>

    </BrowserRouter>
  </React.StrictMode>
);
