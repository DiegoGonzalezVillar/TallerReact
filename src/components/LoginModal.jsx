import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { Button } from "@mui/material";

const LoginModal = ({
  show,
  handleClose,
  handleKeyDown,
  handleSubmit,
  setUsername,
  setPassword,
  username,
  password,
}) => {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
    updateButtonState(value, password);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    updateButtonState(username, value);
  };

  const updateButtonState = (newUsername, newPassword) => {
    const areFieldsNotEmpty =
      newUsername.trim() !== "" && newPassword.trim() !== "";
    setIsButtonEnabled(areFieldsNotEmpty);
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} style={{ marginTop: "5%" }}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#BE3A4A" }}>
            Inicio de Sesión
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onKeyDown={handleKeyDown}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label style={{ color: "#BE3A4A" }}>Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresar Usuario"
                value={username}
                onChange={handleUsernameChange}
              />
            </Form.Group>
            <Form.Group
              controlId="formBasicPassword"
              style={{ marginTop: "10px" }}
            >
              <Form.Label style={{ color: "#BE3A4A" }}>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresar Contraseña"
                value={password}
                onChange={handlePasswordChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            style={{ color: "#BE3A4A" }}
          >
            Cerrar
          </Button>
          <Button
            variant="primary"
            style={{ color: isButtonEnabled ? "#BE3A4A" : "#CCCCCC" }}
            onClick={() => {
              handleSubmit();
            }}
            disabled={!isButtonEnabled}
          >
            Iniciar Sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LoginModal;
