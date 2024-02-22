import React from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GraficoCantidadPorFecha = ({ registros, alimentos }) => {
  const calcularMaximoEjeY = () => {
    const valores = Object.values(caloriasPorFecha);
    const maximo = Math.max(...valores);
    return maximo + 30;
  };

  const caloriasPorFecha = {};

  // Obtener fechas de la última semana
  const fechasUltimaSemana = Array.from({ length: 7 }, (_, i) =>
    dayjs().subtract(i, "day").format("YYYY-MM-DD")
  );

  registros.map((registro) => {
    const fechaRegistro = dayjs(registro.fecha).format("YYYY-MM-DD");

    if (fechasUltimaSemana.includes(fechaRegistro)) {
      const alimento = alimentos.find((a) => a.id === registro.idAlimento);

      if (alimento) {
        const caloriasAlimento = alimento.calorias; // Asumiendo que tu alimento tiene un campo de calorias

        caloriasPorFecha[fechaRegistro] =
          (caloriasPorFecha[fechaRegistro] || 0) + caloriasAlimento;
      }
    }

    return null; // La función de mapeo requiere que se devuelva algo, y en este caso, no necesitamos un nuevo array
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
        data: Object.values(dataValues),
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
      <Bar data={data} options={options} plugins={[ChartDataLabels]} />
    </div>
  );
};

export default GraficoCantidadPorFecha;
