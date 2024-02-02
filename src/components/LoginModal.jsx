import React from "react";
import { Modal, Form } from "react-bootstrap";
import { Button } from "@mui/material";

const LoginModal = ({ show, handleClose, handleKeyDown, handleSubmit }) => {
  return (
    <Modal show={show} onHide={handleClose} style={{ marginTop: "5%" }}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#BE3A4A" }}>Inicio de Sesión</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onKeyDown={handleKeyDown}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label style={{ color: "#BE3A4A" }}>Usuario</Form.Label>
            <Form.Control type="text" placeholder="Ingresar Usuario" />
          </Form.Group>
          <Form.Group
            controlId="formBasicPassword"
            style={{ marginTop: "10px" }}
          >
            <Form.Label style={{ color: "#BE3A4A" }}>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Ingresar Contraseña" />
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
          style={{ color: "#BE3A4A" }}
          onClick={handleSubmit}
        >
          Iniciar Sesión
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
