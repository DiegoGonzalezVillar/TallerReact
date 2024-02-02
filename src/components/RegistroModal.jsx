import React from "react";
import { Modal, Form } from "react-bootstrap";
import { Select, Button, MenuItem } from "@mui/material";

const RegistroModal = ({
  showRegistro,
  handleCloseRegistro,
  handleKeyDown,
  handleSubmit,
  selectValue,
  setSelectValue,
  setUsername,
  setPassword,
  setCalorias,
  paises,
}) => {
  return (
    <Modal
      show={showRegistro}
      onHide={handleCloseRegistro}
      style={{ marginTop: "5%" }}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#BE3A4A" }}>
          Registro de Usuario
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onKeyDown={handleKeyDown}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label style={{ color: "#BE3A4A" }}>Usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar Usuario"
              onChange={(event) => setUsername(event.target.value)}
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
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicSelect" style={{ marginTop: "10px" }}>
            <Form.Label style={{ color: "#BE3A4A" }}>
              Seleccionar País
            </Form.Label>
            <Select
              value={selectValue}
              onChange={(event) => setSelectValue(event.target.value)}
              label="Seleccionar País"
              variant="outlined"
              fullWidth
            >
              {Array.isArray(paises) & (paises.length > 0)
                ? paises.map((pais) => (
                    <MenuItem key={pais.id} value={pais.id}>
                      {pais.name}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </Form.Group>
          <Form.Group
            controlId="formBasicCalorias"
            style={{ marginTop: "10px" }}
          >
            <Form.Label style={{ color: "#BE3A4A" }}>Calorias</Form.Label>
            <Form.Control
              type="text"
              placeholder=" Ingresar Calorias"
              onChange={(event) => setCalorias(event.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleCloseRegistro}
          style={{ color: "#BE3A4A" }}
        >
          Cerrar
        </Button>
        <Button
          variant="primary"
          style={{ color: "#BE3A4A" }}
          onClick={handleSubmit}
        >
          Crear Usuario
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegistroModal;
