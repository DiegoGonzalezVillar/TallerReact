import React, { useState, useEffect } from "react";
import { Toolbar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import RegistroModal from "./RegistroModal";

const Navbar = () => {
  const url = "https://calcount.develotion.com/";
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showRegistro, setShowRegistro] = useState(false);
  const [paises, setPaises] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [calorias, setCalorias] = useState("");

  const handleClose = () => setShow(false);
  const handleCloseRegistro = () => setShowRegistro(false);

  const handleShow = () => {
    setShow(true);
  };

  const handleShowRegistro = () => {
    setShowRegistro(true);
  };

  const fetchPaises = async () => {
    const res = await fetch(url + "paises.php", {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
    const data = await res.json();
    const paisesArray = Array.from(Object.values(data.paises));
    setPaises(paisesArray);
  };
  useEffect(() => {
    fetchPaises();
  }, []);
  const handleSubmit = async (event) => {
    // Implementa la lógica de manejo del formulario aquí
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSubmit(event);
    }
  };

  return (
    <div className="mi-navbar">
      <Toolbar>
        <Button
          style={{
            color: "#BE3A4A",
            marginLeft: "75%",
            marginRight: "20px",
            fontSize: "90%",
          }}
          onClick={() => navigate("/")}
        >
          Home
        </Button>
        <Button
          style={{ color: "#BE3A4A", marginRight: "20px", fontSize: "90%" }}
          onClick={() => navigate("/about")}
        >
          About
        </Button>
        <Button
          style={{ color: "#BE3A4A", marginRight: "20px", fontSize: "90%" }}
          onClick={handleShowRegistro}
        >
          Registro
        </Button>
        <Button
          style={{ color: "#BE3A4A", marginRight: "20px", fontSize: "90%" }}
          onClick={handleShow}
        >
          Inicio Sesion
        </Button>
      </Toolbar>

      {/* Componente del modal de inicio de sesión */}
      <LoginModal
        show={show}
        handleClose={handleClose}
        handleKeyDown={handleKeyDown}
        handleSubmit={handleSubmit}
      />

      {/* Componente del modal de registro */}
      <RegistroModal
        showRegistro={showRegistro}
        handleCloseRegistro={handleCloseRegistro}
        handleKeyDown={handleKeyDown}
        handleSubmit={handleSubmit}
        setUsername={setUsername}
        setPassword={setPassword}
        setSelectValue={setSelectValue}
        setCalorias={setCalorias}
        paises={paises}
      />
    </div>
  );
};

export default Navbar;
