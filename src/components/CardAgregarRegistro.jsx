import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import {
  Select,
  MenuItem,
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { agregarRegistroAPI } from "../services/service";
import { useDispatch, useSelector } from "react-redux";
import { agregarRegistro } from "../slices/registrosSlice";
dayjs.extend(isSameOrBefore);

const CardAgregarRegistro = ({ userId, userApiKey, setResponseMessage, setOpenSnackbar }) => {

  const alimentos = useSelector((state) => state.alimentosSlice.alimentos);
  const [selectValueAlimento, setSelectValueAlimento] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [valueFecha, setValueFecha] = useState("");
  const fechaActual = new Date();
  const fechaHoyFormateada = fechaActual.toISOString().split("T")[0];
  const [porcionSeleccionada, setPorcionSeleccionada] = useState(null);
  const dispatch = useDispatch();

  const vaciarCampos = () => {
    setSelectValueAlimento("");
    setCantidad("");
    setValueFecha("")
  };

  useEffect(() => {
    const alimentoSeleccionado = alimentos.find(alimento => alimento.id === selectValueAlimento);
    if (alimentoSeleccionado) {
      setPorcionSeleccionada(alimentoSeleccionado.porcion);
    } else {
      setPorcionSeleccionada(null);
    }
  }, [selectValueAlimento, alimentos]);

  const tipoPorcion = (valorPorcion) => {
    const letra = valorPorcion.slice(-1)
    const porciones = {
      g: "gramos",
      u: "unidades",
      m: "mililitros",
    };
    return porciones[letra];
  };


  const agregarRegistroPorUsuario = async () => {
    if (selectValueAlimento === "" || cantidad === "" || valueFecha === "") {
      setResponseMessage("Debe ingresar todos los campos!");
      setOpenSnackbar(true);
    } else if (isNaN(parseFloat(cantidad)) || parseFloat(cantidad) <= 0) {
      setResponseMessage("La cantidad debe ser un número mayor a 0!");
      setOpenSnackbar(true);
    } else {
      if (valueFecha > fechaHoyFormateada) {
        setResponseMessage(
          "La fecha seleccionada no puede ser posterior a la fecha actual!"
        );
        setOpenSnackbar(true);
      } else {
        let fecha = valueFecha.replace(/\//g, "-");
        const nuevoRegistrosAPI = await agregarRegistroAPI(
          userId,
          userApiKey,
          selectValueAlimento,
          cantidad,
          fecha
        );
        let idUsuario = parseInt(userId);
        if (nuevoRegistrosAPI.codigo === 200) {
          const agregarNuevoRegistro = {
            id: nuevoRegistrosAPI.idRegistro,
            idAlimento: selectValueAlimento,
            idUsuario: idUsuario,
            cantidad: cantidad,
            fecha: fecha,
          };
          setResponseMessage("Registro agregado exitosamente!");
          setOpenSnackbar(true);
          dispatch(agregarRegistro(agregarNuevoRegistro));
          vaciarCampos();
        }
      }
    }
  };

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
            <div style={{ display: "flex", alignItems: "center" }}>
              <Form.Control
                type="number"
                placeholder="Ingresar Cantidad"
                value={cantidad}
                onChange={(event) => setCantidad(event.target.value)}
              />
              <Typography style={{ color: "#BE3A4A", marginLeft: "10px" }}> {porcionSeleccionada && tipoPorcion(porcionSeleccionada)}</Typography>
            </div>
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
              agregarRegistroPorUsuario();
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
