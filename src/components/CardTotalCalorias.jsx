import React, { useEffect, useState } from "react";
import { Card, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const CardTotalCalorias = ({ /*totalCaloriasHoy, */caloriasDiarias }) => {

  const alimentos = useSelector((state) => state.alimentosSlice.alimentos);
  const registros = useSelector((state) => state.registrosSlice.registros);

  const [arrayRegistrosYAlimentos, setArrayRegistrosYAlimentos] = useState([]);
  const [totalCaloriasHoy, setTotalCaloriasHoy] = useState(0);

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
    //setOriginalRegistrosYAlimentos([...registrosYAlimentos]);
  }, [registros, alimentos]);

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

  useEffect(() => {
    totalDeCaloriasHoy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrayRegistrosYAlimentos]);

  let porcentaje = (totalCaloriasHoy / caloriasDiarias) * 100;
  let letra = "#FFFFFF";
  let fondo;
  if (porcentaje > 100) {
    fondo = "#BE3A4A";
  } else if (porcentaje >= 90) {
    fondo = "#FDFD96";
    letra = "#BE3A4A";
  } else {
    fondo = "#5DC460";
  }
  return (
    <Card
      style={{
        backgroundColor: fondo,
        marginTop: "15px",
        marginRight: "10px",
        textAlign: "center",
      }}
    >
      <Typography style={{ color: letra, fontSize: "20px" }}>
        Calorias diarias: {caloriasDiarias}
      </Typography>
      <Typography style={{ color: letra, fontSize: "20px" }}>
        Consumidas hoy: {parseInt(totalCaloriasHoy)}
      </Typography>
    </Card>
  );
};

export default CardTotalCalorias;
