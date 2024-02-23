import React, { useEffect, useState } from "react";
import { Grid, Snackbar, Typography } from "@mui/material";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import es from "dayjs/locale/es";
import { useLocation } from "react-router-dom";
import CardAgregarRegistro from "../components/CardAgregarRegistro";
import CardFiltro from "../components/CardFiltro";
import {
  agregarRegistroAPI,
  obtenerAlimentosAPI,
  obtenerRegistrosPorUsuarioAPI,
  eliminarRegistroAPI,
  usuariosPorPaisAPI,
  obtenerPaisesAPI,
} from "../services/service";
import { cargarAlimentos } from "../slices/alimentosSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  agregarRegistro,
  cargarRegistrosPorUsuario,
  borrarRegistro,
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

  const fechaActual = new Date();
  const fechaHoyFormateada = fechaActual.toISOString().split("T")[0];

  const [responseMessage, setResponseMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const userId = localStorage.getItem("sessionId");
  const userApiKey = localStorage.getItem("apiKey");

  const [selectValueAlimento, setSelectValueAlimento] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [valueFecha, setValueFecha] = useState("");

  const alimentos = useSelector((state) => state.alimentosSlice.alimentos);
  const registros = useSelector((state) => state.registrosSlice.registros);

  const [arrayRegistrosYAlimentos, setArrayRegistrosYAlimentos] = useState([]);
  const [originalRegistrosYAlimentos, setOriginalRegistrosYAlimentos] =
    useState([]);

  const [usuariosPorPais, setUsuariosPorPais] = useState([]);
  const [paises, setPaises] = useState([]);

  const [totalCaloriasHoy, setTotalCaloriasHoy] = useState(0);
  const [totalCaloriasIngeridas, setTotalCaloriasIngeridas] = useState(0);

  const [filtro, setFiltro] = useState("Todos");

  const obtenerAlimentos = async () => {
    const alimentosAPI = await obtenerAlimentosAPI(userId, userApiKey);
    dispatch(cargarAlimentos(alimentosAPI));
  };

  const obtenerPaises = async () => {
    const paisesAPI = await obtenerPaisesAPI();
    setPaises(paisesAPI);
  };

  const obtenerRegistrosPorUsuario = async () => {
    const cargaDeRegistros = await obtenerRegistrosPorUsuarioAPI(
      userId,
      userApiKey
    );
    dispatch(cargarRegistrosPorUsuario(cargaDeRegistros));
  };

  const obtenerUsuariosPorPais = async () => {
    const arrayUsuariosPorPais = await usuariosPorPaisAPI(userId, userApiKey);
    setUsuariosPorPais(arrayUsuariosPorPais);
  };

  const totalDeCaloriasHoy = () => {
    const fechaHoy = dayjs().startOf("day");
    const arrayRegistrosYAlimentosFiltrados = arrayRegistrosYAlimentos.filter(
      (row) => dayjs(row.fecha).startOf("day").isSame(fechaHoy, "day")
    );
    const sumaCaloriasHoy = arrayRegistrosYAlimentosFiltrados.reduce(
      (acumulador, row) => {
        if (row.porcion) {
          let porcionNumerica = parseFloat(row.porcion.replace(/[^\d.-]/g, ""));
          return acumulador + (row.calorias * row.cantidad) / porcionNumerica;
        } else {
          return acumulador;
        }
      },
      0
    );
    setTotalCaloriasHoy(sumaCaloriasHoy);
  };

  const totalDeCaloriasIngeridas = () => {
    const sumaCaloriasIngeridas = arrayRegistrosYAlimentos.reduce(
      (acumulador, row) => {
        if (row.porcion) {
          let porcionNumerica = parseFloat(
            row.porcion.replace(/[^\d.mug-]/g, "")
          );
          return acumulador + (row.calorias * row.cantidad) / porcionNumerica;
        } else {
          return acumulador;
        }
      },
      0
    );
    setTotalCaloriasIngeridas(sumaCaloriasIngeridas);
  };

  useEffect(() => {
    obtenerAlimentos();
    obtenerRegistrosPorUsuario();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const eliminarRegistro = async (id) => {
    const response = await eliminarRegistroAPI(id, userId, userApiKey);
    if (response.codigo === 200) {
      setResponseMessage("Registro eliminado exitosamente!");
      setOpenSnackbar(true);
      dispatch(borrarRegistro(id));
      totalDeCaloriasHoy();
    }
  };

  const vaciarCampos = () => {
    setSelectValueAlimento("");
    setCantidad("");
  };

  const handleFiltroChange = (event) => {
    const selectedFiltro = event.target.value;
    setFiltro(selectedFiltro);
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
          totalDeCaloriasHoy();
          vaciarCampos();
        }
      }
    }
  };

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

  useEffect(() => {
    totalDeCaloriasHoy();
    obtenerUsuariosPorPais();
    obtenerPaises();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registros, arrayRegistrosYAlimentos, originalRegistrosYAlimentos]);

  useEffect(() => {
    totalDeCaloriasIngeridas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrayRegistrosYAlimentos, originalRegistrosYAlimentos]);

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
          <CardAgregarRegistro
            handleSubmit={agregarRegistroPorUsuario}
            alimentos={alimentos}
            setSelectValueAlimento={setSelectValueAlimento}
            selectValueAlimento={selectValueAlimento}
            setCantidad={setCantidad}
            setValueFecha={setValueFecha}
            cantidad={cantidad}
          />
        </Grid>
        <Grid item xs={8} style={{ height: "100%" }}>
          <CardTabla
            arrayRegistrosYAlimentos={arrayRegistrosYAlimentos}
            eliminarRegistro={eliminarRegistro}
          />
        </Grid>
        <Grid item xs={2} style={{ alignItems: "center", height: "100%" }}>
          <CardFiltro filtro={filtro} handleFiltroChange={handleFiltroChange} />

          <CardTotalCaloriasIngeridas
            totalCaloriasIngeridas={totalCaloriasIngeridas}
          />
          <CardTotalCalorias
            totalCalorias={totalCaloriasHoy}
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
          <MapaUsuariosPorPais
            usuariosPorPais={usuariosPorPais}
            paises={paises}
          />
        </Grid>
        <Grid item xs={4} style={{ marginTop: "2%" }}>
          <GraficoCantidadPorAlimento
            alimentos={alimentos}
            registros={registros}
          />
        </Grid>
        <Grid item xs={4}>
          <GraficoCantidadPorFecha
            alimentos={alimentos}
            registros={registros}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
