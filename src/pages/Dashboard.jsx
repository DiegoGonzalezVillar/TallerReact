import React, { useEffect, useState } from "react";
import {
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
  CardContent,
  Snackbar,
} from "@mui/material";
import dayjs from "dayjs";
import es from "dayjs/locale/es";

import CardAgregarRegistro from "../components/CardAgregarRegistro";
import { agregarRegistroAPI, obtenerAlimentosAPI, obtenerRegistrosPorUsuarioAPI } from "../services/service";
import { cargarAlimentos } from "../slices/alimentosSlice";
import { useDispatch, useSelector } from "react-redux";
import { agregarRegistro, cargarRegistrosPorUsuario } from "../slices/registrosSlice";
import { buscarAlimento } from "../utils/util";
import { cargarUsuarios } from "../slices/usuariosSlice";
dayjs.locale(es);


const Dashboard = () => {
  const dispatch = useDispatch()
  const urlImagenes = "https://calcount.develotion.com/imgs/"

  const fechaActual = new Date()
  const fechaHoyFormateada = fechaActual.toISOString().split('T')[0];

  const [responseMessage, setResponseMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const userId = localStorage.getItem("sessionId");
  const userApiKey = localStorage.getItem("apiKey");

  const [selectValueAlimento, setSelectValueAlimento] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [valueFecha, setValueFecha] = useState("");

  const alimentos = useSelector((state) => state.alimentosSlice.alimentos);
  const usuarios = useSelector((state) => state.usuariosSlice.usuarios)
  const registros = useSelector((state) => state.registrosSlice.registros);

  const [alimentoAMostrar, setAlimentoAMostrar] = useState("");
  //const [usuarioAMostrar, setUsuarioAMostrar] = useState("");

  const obtenerAlimentos = async () => {
    const alimentosAPI = await obtenerAlimentosAPI(userId, userApiKey);
    dispatch(cargarAlimentos(alimentosAPI));
  };

  const obtenerRegistrosPorUsuario = async () => {
    const cargaDeRegistros = await obtenerRegistrosPorUsuarioAPI(userId, userApiKey)
    dispatch(cargarRegistrosPorUsuario(cargaDeRegistros))
  }

  const obtenerUsuarios = () => {
    dispatch(cargarUsuarios())
  }

  useEffect(() => {
    obtenerAlimentos();
    obtenerRegistrosPorUsuario()
    obtenerUsuarios()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const agregarRegistroPorUsuario = async () => {
    if (
      selectValueAlimento === "" ||
      cantidad === "" ||
      valueFecha === ""
    ) {
      setResponseMessage("Debe ingresar todos los campos!");
      setOpenSnackbar(true);
    } else {
      if (valueFecha > fechaHoyFormateada) {
        setResponseMessage("La fecha seleccionada no puede ser posterior a la fecha actual!");
        setOpenSnackbar(true);
      }
      else {
        let fecha = valueFecha.replace(/\//g, '-');
        const nuevoRegistrosAPI = await agregarRegistroAPI(userId, userApiKey, selectValueAlimento, cantidad, fecha);
        let idUsuario = parseInt(userId)
        if (nuevoRegistrosAPI.codigo === 200) {
          const agregarNuevoRegistro = {
            id: nuevoRegistrosAPI.idRegistro,
            idAlimento: selectValueAlimento,
            idUsuario: idUsuario,
            cantidad: cantidad,
            fecha: fecha

          }
          dispatch(agregarRegistro(agregarNuevoRegistro))
          const alimentoAEncontrar = buscarAlimento(selectValueAlimento, alimentos)
          //const usuarioAEncontrar = buscarUsuario(userId, usuarios)
          setAlimentoAMostrar(alimentoAEncontrar)
          //setUsuarioAMostrar(usuarioAEncontrar)
        }
      }

    }
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
      <Grid container spacing={4}>
        <Grid item xs={3}>

          <CardAgregarRegistro handleSubmit={agregarRegistroPorUsuario} alimentos={alimentos}
            setSelectValueAlimento={setSelectValueAlimento} selectValueAlimento={selectValueAlimento} setCantidad={setCantidad} setValueFecha={setValueFecha}

          />
        </Grid>
        <Grid item xs={6}>
          <Card style={{ marginLeft: "20px" }}>
            <CardContent>

              <TableContainer style={{ overflowX: "auto", marginTop: "1em" }}>
                <Table aria-label="data grid">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ color: "#BE3A4A" }}>Nombre</TableCell>
                      <TableCell style={{ color: "#BE3A4A" }}>Alimento</TableCell>
                      <TableCell style={{ color: "#BE3A4A" }} >Cantidad</TableCell>
                      <TableCell style={{ color: "#BE3A4A" }}>Fecha</TableCell>
                      <TableCell style={{ color: "#BE3A4A" }}>Imagen</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {registros.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                          {row.idUsuario}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.idAlimento}
                        </TableCell>
                        <TableCell>{row.cantidad}</TableCell>
                        <TableCell>{row.fecha}</TableCell>
                        <TableCell><img
                          src={urlImagenes + "Zanahoria.png"}
                          alt={"Zanahoria.png"}
                          style={{ maxWidth: '50px', maxHeight: '50px' }} // ajusta el tamaño según tus necesidades
                        /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

            </CardContent>
          </Card>
        </Grid>
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
      </Grid>
    </div>
  );
};

export default Dashboard;
