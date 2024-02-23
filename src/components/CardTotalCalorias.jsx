import React from "react";
import { Card, Typography } from "@mui/material";

const CardTotalCalorias = ({ totalCalorias, caloriasDiarias }) => {
  let porcentaje = (totalCalorias / caloriasDiarias) * 100;
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
        Consumidas hoy: {totalCalorias}
      </Typography>
    </Card>
  );
};

export default CardTotalCalorias;
