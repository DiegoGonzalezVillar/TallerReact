import React from "react";
import { Form } from "react-bootstrap";
import {
  Select,
  MenuItem,
  Button,
  TextField,
  Card,
  CardContent,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrBefore);

const CardAgregarRegistro = ({
  handleSubmit,
  alimentos,
  selectValueAlimento,
  setSelectValueAlimento,
  setValueFecha,
  setCantidad,
  cantidad,
  valueFecha
}) => {
  return (
    <Card style={{ marginLeft: "10px", maxHeight: "400px" }}>
      <CardContent>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label
              style={{
                color: "#BE3A4A",
                marginLeft: "25%",
              }}
            >
              Agregar Registro
            </Form.Label>
            <Form.Group
              controlId="formBasicSelect"
              style={{ marginTop: "10px" }}
            >
              <Form.Label style={{ color: "#BE3A4A" }}>
                Seleccionar Alimento
              </Form.Label>
              <Select
                value={selectValueAlimento}
                onChange={(event) => setSelectValueAlimento(event.target.value)}
                label="Seleccionar Alimento"
                fullWidth
              >
                {Array.isArray(alimentos) & (alimentos.length > 0)
                  ? alimentos.map((alimento) => (
                    <MenuItem key={alimento.id} value={alimento.id}>
                      {alimento.nombre}
                    </MenuItem>
                  ))
                  : null}
              </Select>
            </Form.Group>
          </Form.Group>
          <Form.Group
            controlId="formBasicCantidad"
            style={{ marginTop: "10px", marginBottom: "20px" }}
          >
            <Form.Label style={{ color: "#BE3A4A" }}>Cantidad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar Cantidad"
              value={cantidad}
              onChange={(event) => setCantidad(event.target.value)}
            />
          </Form.Group>
          <Form.Group
            controlId="formBasicCalendario"
            style={{
              width: "100%",
            }}
          >
            <LocalizationProvider
              style={{
                width: "100%",
              }}
              dateAdapter={AdapterDayjs}
            >
              <DesktopDatePicker
                label="Seleccionar fecha"
                value={valueFecha}
                onChange={(date) =>
                  setValueFecha(dayjs(date).format("YYYY-MM-DD"))
                }
                renderInput={(params) => (
                  <TextField {...params} style={{ marginTop: "20px" }} />
                )}
              />
            </LocalizationProvider>
          </Form.Group>
          <Button
            style={{
              backgroundColor: "#BE3A4A",
              color: "#FFFFFF",
              marginTop: "40px",
              width: "100%",
              marginRight: "auto",
            }}
            onClick={() => {
              handleSubmit();
            }}
          >
            Agregar
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CardAgregarRegistro;
