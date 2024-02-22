import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Card, CardContent, Typography } from "@mui/material";

const TiempoRestante = () => {
  const fechaObjetivo = dayjs("2024-03-31");
  const [tiempoRestante, setTiempoRestante] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  useEffect(() => {
    let intervalo;

    const calcularTiempoRestante = () => {
      const ahora = dayjs();
      const diferencia = fechaObjetivo.diff(ahora, "second");

      if (diferencia <= 0) {
        setTiempoRestante({
          dias: 0,
          horas: 0,
          minutos: 0,
          segundos: 0,
        });
        clearInterval(intervalo);
      } else {
        const dias = Math.floor(diferencia / (60 * 60 * 24));
        const horas = Math.floor((diferencia % (60 * 60 * 24)) / (60 * 60));
        const minutos = Math.floor((diferencia % (60 * 60)) / 60);
        const segundos = diferencia % 60;

        setTiempoRestante({
          dias,
          horas,
          minutos,
          segundos,
        });
      }
    };

    intervalo = setInterval(calcularTiempoRestante, 1000);

    return () => {
      clearInterval(intervalo);
    };
  }, [fechaObjetivo]);

  return (
    <div>
      <Card
        style={{
          marginTop: "10px",
          marginRight: "10px",
          textAlign: "center",
        }}
      >
        <CardContent>
          <Typography style={{ color: "#BE3A4A", fontSize: "18px" }}>
            Tiempo restante para definir nuevos objetivos:
          </Typography>
          <Typography style={{ color: "#BE3A4A", fontSize: "17px" }}>
            {tiempoRestante.dias} días, {tiempoRestante.horas} horas,{" "}
            {tiempoRestante.minutos} minutos, {tiempoRestante.segundos} segundos
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default TiempoRestante;
