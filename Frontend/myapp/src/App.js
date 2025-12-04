import Home from "./Pages/Home";
import './output.css'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail from "./Pages/ProductDetail";
import Login from "./Pages/Login";
import CreateAccount from "./Pages/CreateAccount";
import Cart from "./Pages/Cart";

import Account from "./Pages/Account";


function App() {
  return (
   
      <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<CreateAccount />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/account" element={<Account />} />

            </Routes>
      </Router>
  );
}

export default App;
