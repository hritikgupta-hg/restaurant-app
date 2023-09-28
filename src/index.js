import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import App from "./App";
import AuthProvider from "./store/AuthProvider";
import AvailableFoodItemsProvider from "./store/AvailableFoodItemsProvider";
import CartProvider from "./store/CartProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <AuthProvider>
      <AvailableFoodItemsProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AvailableFoodItemsProvider>
    </AuthProvider>
  </Router>
);
