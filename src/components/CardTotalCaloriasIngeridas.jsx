import React, { useEffect, useState } from "react";
import { Card, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const CardTotalCaloriasIngeridas = (/*{ totalCaloriasIngeridas }*/) => {

  const alimentos = useSelector((state) => state.alimentosSlice.alimentos);
  const registros = useSelector((state) => state.registrosSlice.registros);

  const [arrayRegistrosYAlimentos, setArrayRegistrosYAlimentos] = useState([]);
  const [totalCaloriasIngeridas, setTotalCaloriasIngeridas] = useState(0);

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
    totalDeCaloriasIngeridas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrayRegistrosYAlimentos]);

  return (
    <Card
      style={{ marginTop: "15px", marginRight: "10px", textAlign: "center" }}
    >
      <Typography style={{ color: "#BE3A4A", fontSize: "20px" }}>
        Total de calorias ingeridas:
      </Typography>
      <Typography style={{ color: "#BE3A4A", fontSize: "20px" }}>
        {parseInt(totalCaloriasIngeridas)}
      </Typography>
    </Card>
  );
};
export default CardTotalCaloriasIngeridas;
