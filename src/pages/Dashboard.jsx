import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import {
  Select,
  MenuItem,
  Grid,
  Button,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
  CardContent,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
//import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import dayjs from "dayjs";
import es from "dayjs/locale/es";

//dayjs.extend(isSameOrBefore);
dayjs.locale(es);

const Dashboard = () => {
  const url = "https://calcount.develotion.com/";
  const usuarioId = localStorage.getItem("sessionId");
  const usuarioApiKey = localStorage.getItem("apiKey");
  const [alimentos, setAlimentos] = useState("");
  const [selectValueAlimento, setSelectValueAlimento] = useState("");
  const [calorias, setCalorias] = useState("");
  const [valueFecha, setValueFecha] = useState(dayjs().startOf("day"));
  const [registros, setRegistros] = useState([]);

  const fetchAlimentos = async () => {
    const res = await fetch(url + "alimentos.php", {
      method: "GET",
      headers: {
        accept: "application/json",
        apikey: usuarioApiKey,
        iduser: usuarioId,
      },
    });
    const data = await res.json();
    const alimentosArray = Array.from(Object.values(data.alimentos));
    setAlimentos(alimentosArray);
  };
  useEffect(() => {
    fetchAlimentos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const agregarRegistro = () => {
    console.log(calorias);
    setValueFecha();
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h4 style={{ color: "#BE3A4A" }}>Dashboard</h4>
      </div>
      <Grid container>
        <Card style={{ marginLeft: "20px" }}>
          <CardContent>
            <Grid item>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label style={{ color: "#BE3A4A" }}>
                    Agregar Registro
                  </Form.Label>
                  <Form.Group
                    controlId="formBasicSelect"
                    style={{ marginTop: "10px" }}
                  >
                    <Form.Label style={{ color: "#BE3A4A" }}>
                      Seleccionar País
                    </Form.Label>
                    <Select
                      defaultValue="---"
                      value={selectValueAlimento}
                      onChange={(event) =>
                        setSelectValueAlimento(event.target.value)
                      }
                      label="Seleccionar País"
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
                  <Form.Label style={{ color: "#BE3A4A" }}>Calorias</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresar Calorias"
                    onChange={(event) => setCalorias(event.target)}
                  />
                </Form.Group>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="Seleccionar fecha"
                    value={valueFecha}
                    renderInput={(params) => (
                      <TextField {...params} style={{ marginTop: "20px" }} />
                    )}
                  />
                </LocalizationProvider>
                <Button
                  variant="primary"
                  style={{ color: "#BE3A4A" }}
                  onClick={() => {
                    agregarRegistro();
                  }}
                >
                  Agregar
                </Button>
              </Form>
            </Grid>
          </CardContent>
        </Card>
        <Grid item xl={1}></Grid>
        <Card>
          <CardContent>
            <Grid item xl={12}>
              <TableContainer style={{ overflowX: "auto", marginTop: "1em" }}>
                <Table aria-label="data grid">
                  <TableHead>
                    <TableRow>
                      <TableCell>Cedula</TableCell>
                      <TableCell>Fecha</TableCell>
                      <TableCell>Departamento</TableCell>
                      <TableCell>Ciudad</TableCell>
                      <TableCell>Ultima Consulta</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {registros.map((row) => (
                      <TableRow key={row.idAlimento}>
                        <TableCell component="th" scope="row">
                          {row.nombre}
                        </TableCell>
                        <TableCell>{row.fechaN}</TableCell>
                        <TableCell>{row.Departamento}</TableCell>
                        <TableCell>{row.Ciudad}</TableCell>
                        <TableCell>{row.Fecha_Consulta}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default Dashboard;
