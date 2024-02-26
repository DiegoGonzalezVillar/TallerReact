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
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GraficoCantidadPorAlimento = () => {

  const alimentos = useSelector((state) => state.alimentosSlice.alimentos);
  const registros = useSelector((state) => state.registrosSlice.registros);

  const calcularMaximoEjeY = () => {
    const valores = Object.values(cantidadPorAlimento);
    const maximo = Math.max(...valores);
    return maximo + 1;
  };

  const cantidadPorAlimento = registros.reduce((acc, registro) => {
    const alimento = alimentos.find((a) => a.id === registro.idAlimento);
    if (alimento) {
      const nombreAlimento = alimento.nombre;
      acc[nombreAlimento] = (acc[nombreAlimento] || 0) + 1;
    }
    return acc;
  }, {});

  const data = {
    labels: Object.keys(cantidadPorAlimento),
    datasets: [
      {
        label: "Cantidad de Consumo",
        data: Object.values(cantidadPorAlimento),
        backgroundColor: "rgba(190, 58, 74, 0.6)",
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
        text: "Consumo por Alimento",
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
      <Bar data={data} options={options} plugins={[ChartDataLabels]} />
    </div>
  );
};

export default GraficoCantidadPorAlimento;
