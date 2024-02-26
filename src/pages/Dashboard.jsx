import React, { useEffect, useState } from "react";
import { Grid, Snackbar, Typography } from "@mui/material";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import es from "dayjs/locale/es";
import { useLocation } from "react-router-dom";
import CardAgregarRegistro from "../components/CardAgregarRegistro";
import CardFiltro from "../components/CardFiltro";
import {
  obtenerAlimentosAPI,
  obtenerRegistrosPorUsuarioAPI,
} from "../services/service";
import { cargarAlimentos } from "../slices/alimentosSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  cargarRegistrosPorUsuario,
} from "../slices/registrosSlice";
import CardTabla from "../components/CardTabla";
import CardTotalCalorias from "../components/CardTotalCalorias";
import CardTotalCaloriasIngeridas from "../components/CardTotalCaloriasIngeridas";
import TiempoRestante from "../components/TiempoRestante";
import GraficoCantidadPorAlimento from "../components/GraficoCantidadPorAlimento";
import GraficoCantidadPorFecha from "../components/GraficoCaloriasPorFecha";
import MapaUsuariosPorPais from "../components/MapaUsuariosPorPais";

dayjs.locale(es);
dayjs.extend(isBetween);

const Dashboard = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const caloriasDiarias = queryParams.get("caloriasDiarias");

  const [responseMessage, setResponseMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const userId = localStorage.getItem("sessionId");
  const userApiKey = localStorage.getItem("apiKey");

  const alimentos = useSelector((state) => state.alimentosSlice.alimentos);
  const registros = useSelector((state) => state.registrosSlice.registros);

  const [arrayRegistrosYAlimentos, setArrayRegistrosYAlimentos] = useState([]);
  const [originalRegistrosYAlimentos, setOriginalRegistrosYAlimentos] = useState([]);

  const fechaActual = new Date();
  const fechaHoyFormateada = fechaActual.toISOString().split("T")[0];

  const [filtro, setFiltro] = useState("Todos");

  const obtenerAlimentos = async () => {
    const alimentosAPI = await obtenerAlimentosAPI(userId, userApiKey);
    dispatch(cargarAlimentos(alimentosAPI));
  };

  const obtenerRegistrosPorUsuario = async () => {
    const cargaDeRegistros = await obtenerRegistrosPorUsuarioAPI(
      userId,
      userApiKey
    );
    dispatch(cargarRegistrosPorUsuario(cargaDeRegistros));
  };

  useEffect(() => {
    obtenerAlimentos();
    obtenerRegistrosPorUsuario();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    const registrosYAlimentos = registros.map((registro) => {
      const alimento = alimentos.find(
        (alimento) => alimento.id === registro.idAlimento
      );
      if (alimento) {
        const { id, ...restoAlimento } = alimento;
        return { ...registro, ...restoAlimento, idAlimento: id };
      } else {
        return registro;
      }
    });
    setArrayRegistrosYAlimentos(registrosYAlimentos);
    setOriginalRegistrosYAlimentos([...registrosYAlimentos]);
  }, [registros, alimentos]);

  const handleFiltroChange = (event) => {
    const selectedFiltro = event.target.value;
    setFiltro(selectedFiltro);
  };

  useEffect(() => {
    const fechaHoy = dayjs();
    const fechaSemanaAntes = fechaHoy.subtract(1, "week");
    const fechaMesAntes = fechaHoy.subtract(1, "month");
    const filtrarRegistros = () => {
      let arrayRegistrosYAlimentosFiltrados;
      if (filtro === "Todos") {
        arrayRegistrosYAlimentosFiltrados = originalRegistrosYAlimentos;
      } else if (filtro === "Semana") {
        arrayRegistrosYAlimentosFiltrados = originalRegistrosYAlimentos.filter(
          (row) => dayjs(row.fecha).isBetween(fechaSemanaAntes, fechaHoy)
        );
      } else if (filtro === "Mes") {
        arrayRegistrosYAlimentosFiltrados = originalRegistrosYAlimentos.filter(
          (row) => dayjs(row.fecha).isBetween(fechaMesAntes, fechaHoy)
        );
      }
      setArrayRegistrosYAlimentos(arrayRegistrosYAlimentosFiltrados);
    };

    filtrarRegistros();
  }, [filtro, originalRegistrosYAlimentos]);

  return (
    <div>
      <Typography
        style={{
          color: "#BE3A4A",
          fontSize: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Dashboard
      </Typography>
      <Grid container spacing={2} style={{ marginTop: "1%" }}>
        <Grid item xs={2} style={{ height: "100%" }}>
          <CardAgregarRegistro userId={userId} userApiKey={userApiKey} setResponseMessage={setResponseMessage} setOpenSnackbar={setOpenSnackbar}
            fechaHoyFormateada={fechaHoyFormateada} />
        </Grid>
        <Grid item xs={8} style={{ height: "100%" }}>
          <CardTabla
            arrayRegistrosYAlimentos={arrayRegistrosYAlimentos}
            userId={userId} userApiKey={userApiKey} setResponseMessage={setResponseMessage} setOpenSnackbar={setOpenSnackbar}
          />

        </Grid>
        <Grid item xs={2} style={{ alignItems: "center", height: "100%" }}>
          <CardFiltro filtro={filtro} handleFiltroChange={handleFiltroChange} />

          <CardTotalCaloriasIngeridas
          />
          <CardTotalCalorias
            caloriasDiarias={caloriasDiarias}
          />
          <TiempoRestante />
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
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <MapaUsuariosPorPais userId={userId} userApiKey={userApiKey} />
        </Grid>
        <Grid item xs={4} style={{ marginTop: "2%" }}>
          <GraficoCantidadPorAlimento userId={userId} userApiKey={userApiKey}
          />
        </Grid>
        <Grid item xs={4}>
          <GraficoCantidadPorFecha
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
