import React from "react";

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
} from "@mui/material";

const CardTabla = ({ arrayRegistrosYAlimentos, eliminarRegistro }) => {
  const urlImagenes = "https://calcount.develotion.com/imgs/";
  return (
    <Card
      style={{
        maxHeight: "400px",
      }}
    >
      <TableContainer
        style={{
          maxHeight: "400px",
        }}
      >
        <Table aria-label="data grid">
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "#BE3A4A" }}>Alimento</TableCell>
              <TableCell style={{ color: "#BE3A4A" }}>Cantidad</TableCell>
              <TableCell style={{ color: "#BE3A4A" }}>Calorias</TableCell>
              <TableCell style={{ color: "#BE3A4A" }}>Porcion</TableCell>
              <TableCell style={{ color: "#BE3A4A" }}>Fecha</TableCell>
              <TableCell style={{ color: "#BE3A4A" }}>Imagen</TableCell>
              <TableCell style={{ color: "#BE3A4A" }}>Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {arrayRegistrosYAlimentos.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.nombre}
                </TableCell>
                <TableCell>{row.cantidad}</TableCell>
                <TableCell>{row.calorias}</TableCell>
                <TableCell>{row.porcion}</TableCell>
                <TableCell>{row.fecha}</TableCell>
                <TableCell>
                  <img
                    src={urlImagenes + row.imagen + ".png"}
                    alt={row.nombre + ".png"}
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => eliminarRegistro(row.id)}
                    title="Eliminar Registro"
                    className="btn btn-danger"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="#FFFFFF"
                      className="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                      <path
                        fillRule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                      />
                    </svg>
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default CardTabla;
