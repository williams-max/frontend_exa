import React, { useContext, useState, useEffect } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { ThemeContext } from "../GlobalComponents/ThemeProvider";
import { BiSun, BiMoon, BiCart } from "react-icons/bi";
import { VscAccount } from "react-icons/vsc";
//import { Link } from "@reach/router";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";

const Header = () => {
  const { theme, setThemeMode } = useContext(ThemeContext);
  const [darkMode, setDarkMode] = useState(theme);

  const [dataUserName, SetDataUserName] = useState("");
  useEffect(() => {
    setThemeMode(darkMode);
    console.log(darkMode);

    var user = localStorage.getItem("username");
    console.log("user", user);
    SetDataUserName(user);
  }, [dataUserName]);

  const { isEmpty, totalItems } = useCart();

  return (
    <Navbar
      collapseOnSelect
      expand="md"
      variant={darkMode ? "dark" : "#dd0285"}
      style={{
        width: "100%",
        position: "fixed",
        zIndex: 100,
        backgroundColor: "#dd0285",
      }}
    >
      <Container>
        <Link to="/">
          <Navbar.Brand
            className={darkMode ? "text-dark-primary" : "text-light-primary"}
          >
            <b>Inicio</b>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link
              to="/usuarios"
              className={`nav-link ${
                darkMode ? "text-dark-primary" : "text-light-primary"
              }`}
            >
              Usuarios
            </Link>

            <Link
              to="/favoritos"
              className={`nav-link ${
                darkMode ? "text-dark-primary" : "text-light-primary"
              }`}
            >
              Lista Favoritos
            </Link>

            <Link
              to="/sign"
              className={`nav-link ${
                darkMode ? "text-dark-primary" : "text-light-primary"
              }`}
            >
              Sign in
            </Link>

            <Link
              to="/cart"
              className={`nav-link ${
                darkMode ? "text-dark-primary" : "text-light-primary"
              }`}
            >
              Mis Favoritos
            </Link>

            <Link className={`nav-link text-light-primary`}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h5 style={{ color: "white" }}>{dataUserName}</h5>

                <VscAccount size="1.8rem" />
              </div>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
