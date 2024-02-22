import React from "react";
import Mapa from "./Mapa";

const MapaUsuariosPorPais = ({ usuariosPorPais, paises }) => {
  const arrayUsuariosPorPais = usuariosPorPais
    .filter((usuarioPorPais) =>
      paises.some((pais) => pais.id === usuarioPorPais.id)
    )
    .map((usuarioPorPais) => {
      const paisCorrespondiente = paises.find(
        (pais) => pais.id === usuarioPorPais.id
      );
      return {
        ...usuarioPorPais,
        ...paisCorrespondiente,
      };
    });
  const markersData = arrayUsuariosPorPais.map((pais) => {
    const marca = {
      lat: pais.latitude,
      lng: pais.longitude,
      titulo: pais.name,
      cantidad: pais.cantidadDeUsuarios,
    };
    return marca;
  });
  return (
    <>
      <div>
        <Mapa markersData={markersData} />
      </div>
    </>
  );
};

export default MapaUsuariosPorPais;
