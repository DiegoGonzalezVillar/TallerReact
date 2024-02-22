import React from "react";
import { Card, Typography } from "@mui/material";

const CardTotalCaloriasIngeridas = ({ totalCaloriasIngeridas }) => {
  return (
    <Card
      style={{ marginTop: "10px", marginRight: "10px", textAlign: "center" }}
    >
      <Typography style={{ color: "#BE3A4A", fontSize: "20px" }}>
        Total de calorias ingeridas:
      </Typography>
      <Typography style={{ color: "#BE3A4A", fontSize: "20px" }}>
        {totalCaloriasIngeridas}
      </Typography>
    </Card>
  );
};
export default CardTotalCaloriasIngeridas;
