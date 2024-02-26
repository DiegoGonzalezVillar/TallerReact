import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GraficoCantidadPorFecha = () => {

  const alimentos = useSelector((state) => state.alimentosSlice.alimentos);
  const registros = useSelector((state) => state.registrosSlice.registros);

  const [arrayRegistrosYAlimentos, setArrayRegistrosYAlimentos] = useState([]);

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
  }, [registros, alimentos]);

  const calcularMaximoEjeY = () => {
    const valores = Object.values(caloriasPorFecha);
    const maximo = Math.max(...valores);
    return maximo + 100;
  };

  const caloriasPorFecha = {};

  const fechasUltimaSemana = Array.from({ length: 7 }, (_, i) =>
    dayjs().subtract(i, "day").format("YYYY-MM-DD")
  );
  fechasUltimaSemana.map((fecha) => {
    return caloriasPorFecha[fecha] = 0;
  });

  arrayRegistrosYAlimentos.map((registro) => {
    const fechaRegistro = dayjs(registro.fecha).format("YYYY-MM-DD");
    if (fechasUltimaSemana.includes(fechaRegistro)) {
      // Check if 'porcion' is defined before using 'replace'
      if (registro.porcion !== undefined) {
        let porcionNumerica = parseFloat(registro.porcion.replace(/[^\d.-]/g, ""));
        const caloriasAlimento = (registro.calorias * registro.cantidad) / porcionNumerica;

        // Make sure caloriasPorFecha[fechaRegistro] is initialized
        caloriasPorFecha[fechaRegistro] = (caloriasPorFecha[fechaRegistro] || 0) + parseInt(caloriasAlimento);
      }
    }
    return null;
  });


  const labels = fechasUltimaSemana.reverse();
  const dataValues = labels.map((fecha) =>
    caloriasPorFecha[fecha] ? caloriasPorFecha[fecha] : 0
  );
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Total calorias",
        data: dataValues,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Calorias por Fecha",
      },
      datalabels: {
        anchor: "end",
        align: "top",
        formatter: (value) => {
          return value;
        },
      },
    },
    scales: {
      x: {
        ticks: {
          align: "end",
          position: "end",
          padding: 5,
        },
      },
      y: {
        beginAtZero: true,
        max: calcularMaximoEjeY(),
      },
    },
  };

  return (
    <div>
      <Typography style={{ color: "#FFFFFF", fontSize: "20px" }}>
        Cantidad por Fecha
      </Typography>
      <Bar
        style={{ marginRight: "10px" }}
        data={data}
        options={options}
        plugins={[ChartDataLabels]}
      />
    </div>
  );
};

export default GraficoCantidadPorFecha;
