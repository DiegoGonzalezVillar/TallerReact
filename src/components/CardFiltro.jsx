import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

const CardFiltro = ({ filtro, handleFiltroChange }) => {
  return (
    <Card style={{ height: "25%", marginRight: "10px" }}>
      <CardContent>
        <Typography
          style={{
            color: "#BE3A4A",
            fontSize: "18px",
            marginLeft: "30%",
          }}
        >
          Filtrar por:
        </Typography>
        <RadioGroup
          row
          aria-label="filtro"
          name="filtro"
          value={filtro}
          onChange={handleFiltroChange}
          style={{ marginTop: "10px" }}
        >
          <FormControlLabel
            value="Todos"
            control={
              <Radio
                style={{
                  color: "#BE3A4A",
                  "&.MuiChecked": {
                    color: "#BE3A4A",
                  },
                  transform: "scale(0.8)",
                }}
              />
            }
            label={<Typography style={{ fontSize: "14px" }}>Todos</Typography>}
          />
          <FormControlLabel
            value="Semana"
            control={
              <Radio
                style={{
                  color: "#BE3A4A",
                  "&.MuiChecked": {
                    color: "#BE3A4A",
                  },
                  transform: "scale(0.8)",
                }}
              />
            }
            label={<Typography style={{ fontSize: "14px" }}>Semana</Typography>}
          />
          <FormControlLabel
            value="Mes"
            control={
              <Radio
                style={{
                  color: "#BE3A4A",
                  "&.MuiChecked": {
                    color: "#BE3A4A",
                  },
                  transform: "scale(0.8)",
                }}
              />
            }
            label={<Typography style={{ fontSize: "14px" }}>Mes</Typography>}
          />
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default CardFiltro;
