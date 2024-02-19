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

const CardAgregarRegistro = ({ handleSubmit, alimentos, selectValueAlimento, setSelectValueAlimento, setValueFecha, setCantidad }) => {

  return (

    <Card style={{ marginLeft: "20px" }}>
      <CardContent>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label style={{
              color: "#BE3A4A"
            }}>
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
                onChange={(event) =>
                  setSelectValueAlimento(event.target.value)
                }
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
            controlId="formBasicPassword"
            style={{ marginTop: "10px", marginBottom: "20px" }}
          >
            <Form.Label style={{ color: "#BE3A4A" }}>Cantidad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar Cantidad"
              onChange={(event) => setCantidad(event.target.value)}
            />
          </Form.Group>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Seleccionar fecha"
              onChange={(date) => setValueFecha(dayjs(date).format('YYYY-MM-DD'))}
              renderInput={(params) => (
                <TextField {...params} style={{ marginTop: "20px" }} />
              )}
            />
          </LocalizationProvider>
          <Button
            variant="primary"
            style={{ color: "#BE3A4A" }}
            onClick={() => {
              handleSubmit();
            }}
          >
            Agregar
          </Button>
        </Form>
      </CardContent>
    </Card>
  )
}

export default CardAgregarRegistro


