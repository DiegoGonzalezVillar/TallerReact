import React, { useState, useEffect } from "react";
import { Toolbar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import RegistroModal from "./RegistroModal";
import logo from "../images/logo3.png";
import Snackbar from "@mui/material/Snackbar";
import {
  loginUsuarioAPI,
  obtenerPaisesAPI,
  registroUsuarioAPI,
} from "../services/service";
import { useDispatch, useSelector } from "react-redux";
import { cargarPaises } from "../slices/paisesSlice";
import { agregarUsuario } from "../slices/usuariosSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showRegistro, setShowRegistro] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [calorias, setCalorias] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const dispatch = useDispatch();
  const paises = useSelector((state) => state.paisesSlice.paises);
  const handleShowDash = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      setShow(true);
    }
  };

  const handleClose = () => {
    setUsername("");
    setPassword("");
    setShow(false);
  };
  const handleCloseRegistro = () => {
    setUsername("");
    setPassword("");
    setCalorias("");
    setSelectValue("");
    setShowRegistro(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleShowRegistro = () => {
    setShowRegistro(true);
  };

  const obtenerPaises = async () => {
    const paisesAPI = await obtenerPaisesAPI();
    dispatch(cargarPaises(paisesAPI));
  };

  useEffect(() => {
    obtenerPaises();
    // eslint-disable-next-line
  }, []);

  const registroUsuario = async () => {
    if (
      username === "" ||
      password === "" ||
      selectValue === "" ||
      calorias === ""
    ) {
      setResponseMessage("Debe ingresar todos los campos!");
      setOpenSnackbar(true);
    } else if (isNaN(parseFloat(calorias)) || parseFloat(calorias) <= 0) {
      setResponseMessage("Las calorias diarias debe ser un número mayor a 0!");
      setOpenSnackbar(true);
    } else {
      const response = await registroUsuarioAPI(
        username,
        password,
        selectValue,
        calorias
      );
      if (response.codigo === 200) {
        setResponseMessage("Registro Exitoso!");
        setOpenSnackbar(true);
        let caloriasDiarias = response.caloriasDiarias;
        const idUsuario = response.id;
        const nuevoUsuario = {
          id: idUsuario,
          username: username,
          password: password,
          pais: selectValue,
          calorias: calorias,
        };
        dispatch(agregarUsuario(nuevoUsuario));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("sessionId", idUsuario);
        localStorage.setItem("apiKey", response.apiKey);
        handleCloseRegistro();
        navigate(`/dashboard?caloriasDiarias=${caloriasDiarias}`);
      } else if (response.codigo === 409) {
        setResponseMessage(response.mensaje);
        setOpenSnackbar(true);
      }
    }
  };

  const loginUsuario = async () => {
    const json = await loginUsuarioAPI(username, password);
    if (json.codigo === 200) {
      let caloriasDiarias = json.caloriasDiarias;
      setResponseMessage(`Login Exitoso! Bienvenido ${username}!`);
      setOpenSnackbar(true);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("sessionId", json.id);
      localStorage.setItem("apiKey", json.apiKey);
      handleClose();
      navigate(`/dashboard?caloriasDiarias=${caloriasDiarias}`);
    } else {
      setResponseMessage(json.mensaje);
      setOpenSnackbar(true);
    }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      loginUsuario(event);
    }
  };
  const Logout = () => {
    const cerrarSesion = () => {
      localStorage.clear();
      setResponseMessage("Sesión Finalizada");
      setOpenSnackbar(true);
      navigate("/");
    };

    return (
      <div
        className="mi-navbar"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            alt="Logo"
            onClick={() => navigate("/")}
            style={{
              height: "40px",
              marginLeft: "40px",
              cursor: "pointer",
              filter:
                "saturate(100%) invert(61%) sepia(90%) saturate(7480%) hue-rotate(344deg) brightness(94%) contrast(95%)",
            }}
          />
        </div>

        <Toolbar>
          <Button
            style={{
              color: "#BE3A4A",
              marginRight: "20px",
              fontSize: "90%",
            }}
            onClick={() => navigate("/")}
          >
            Home
          </Button>
          <Button
            style={{ color: "#BE3A4A", marginRight: "20px", fontSize: "90%" }}
            onClick={handleShowDash}
          >
            Dashboard
          </Button>
          <Button
            style={{ color: "#BE3A4A", marginRight: "20px", fontSize: "90%" }}
            onClick={cerrarSesion}
          >
            Cerrar sesión
          </Button>
        </Toolbar>

        <LoginModal
          show={show}
          handleClose={handleClose}
          handleKeyDown={handleKeyDown}
          handleSubmit={loginUsuario}
          setUsername={setUsername}
          setPassword={setPassword}
          username={username}
          password={password}
        />
        <RegistroModal
          showRegistro={showRegistro}
          handleCloseRegistro={handleCloseRegistro}
          handleKeyDown={handleKeyDown}
          handleSubmit={registroUsuario}
          selectValue={selectValue}
          calorias={calorias}
          setUsername={setUsername}
          setPassword={setPassword}
          setSelectValue={setSelectValue}
          setCalorias={setCalorias}
          paises={paises}
        />
        <Snackbar
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
          message={responseMessage}
          autoHideDuration={3000}
          style={{
            top: "80%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    );
  };

  const Login = () => {
    return (
      <div
        className="mi-navbar"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            alt="Logo"
            onClick={() => navigate("/")}
            style={{
              height: "40px",
              marginLeft: "40px",
              cursor: "pointer",
              filter:
                "saturate(100%) invert(61%) sepia(90%) saturate(7480%) hue-rotate(344deg) brightness(94%) contrast(95%)",
            }}
          />
        </div>
        <Toolbar>
          <Button
            style={{
              color: "#BE3A4A",
              marginRight: "20px",
              fontSize: "90%",
            }}
            onClick={() => navigate("/")}
          >
            Home
          </Button>
          <Button
            style={{ color: "#BE3A4A", marginRight: "20px", fontSize: "90%" }}
            onClick={handleShowDash}
          >
            Dashboard
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
        <LoginModal
          show={show}
          handleClose={handleClose}
          handleKeyDown={handleKeyDown}
          handleSubmit={loginUsuario}
          setUsername={setUsername}
          setPassword={setPassword}
          username={username}
          password={password}
        />
        <RegistroModal
          showRegistro={showRegistro}
          handleCloseRegistro={handleCloseRegistro}
          handleKeyDown={handleKeyDown}
          handleSubmit={registroUsuario}
          selectValue={selectValue}
          calorias={calorias}
          setUsername={setUsername}
          setPassword={setPassword}
          setSelectValue={setSelectValue}
          setCalorias={setCalorias}
          paises={paises}
        />
        <Snackbar
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
          message={responseMessage}
          autoHideDuration={3000}
          style={{
            top: "80%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    );
  };
  return <div className="mi-navbar"> {!isLoggedIn ? Login() : Logout()}</div>;
};

export default Navbar;
