import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useThemeHook } from "./GlobalComponents/ThemeProvider";
import Header from "./components/Header";
//import { Router } from "@reach/router";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Pages
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";

import SignIn from "./Pages/SignIn";
import Register from "./Pages/Register";
import AddProduct from "./components/AddProduct";
import UsuarioPage from "./Pages/usuario/UsuarioPage";
import Favoritos from "./Pages/favorito/Favoritos";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
      
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/usuarios" element={<UsuarioPage />} />
        <Route exact path="/favoritos" element={<Favoritos />} />
        <Route exact path="/sign" element={<SignIn />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/addProduct" element={<AddProduct />} />
     

        
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
