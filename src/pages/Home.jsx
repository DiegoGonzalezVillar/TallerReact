import React from "react";
import CardComponent from "../components/Card";
import imagenHome from "../images/paraHome2.jpg";
import { Grid } from "@mui/material";

const Home = () => {
  let texto = "Alimentación Saludable";
  let texto2 = (
    <p>
      En esta plataforma, los usuarios encontrarán herramientas intuitivas para
      registrar sus hábitos alimenticios, permitiéndoles detallar alimentos
      consumidos, cantidades y fechas. Además, podrán visualizar un listado de
      registros, filtrarlos por fecha y recibir informes sobre calorías
      ingeridas.
    </p>
  );
  let texto3 = (
    <p>
      La sección de análisis ofrece gráficos interactivos que muestran la
      frecuencia de consumo de alimentos y la ingesta calórica diaria. Un
      componente social agrega un toque único al presentar un mapa interactivo
      con la cantidad de usuarios registrados por país, fomentando la conexión
      global.{" "}
    </p>
  );
  let combinedText = (
    <div>
      <div
        className="text"
        style={{
          color: "#BE3A4A",
          fontSize: "2.5em",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "calibri",
        }}
      >
        {texto}
      </div>
      <div>
        <div
          style={{
            color: "#BE3A4A",
            fontSize: "1.8em",
            fontFamily: "calibri",
            textAlign: "justify",
            marginTop: "50px",
            marginRight: "20px",
            marginBottom: "10px",
            marginLeft: "20px",
          }}
        >
          {texto2}
        </div>
        <div
          style={{
            color: "#BE3A4A",
            fontSize: "1.8em",
            textAlign: "justify",
            fontFamily: "calibri",
            marginTop: "40px",
            marginRight: "20px",
            marginBottom: "10px",
            marginLeft: "20px",
          }}
        >
          {texto3}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Grid container style={{ marginTop: "20px" }}>
        <Grid item sm={12} md={12} lg={12} xl={6}>
          <CardComponent
            style={{ maxWidth: "100%" }}
            imagenHome={imagenHome}
            alt="Imagen comida"
          ></CardComponent>
        </Grid>
        <Grid item sm={12} md={12} lg={12} xl={6}>
          {combinedText}
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
