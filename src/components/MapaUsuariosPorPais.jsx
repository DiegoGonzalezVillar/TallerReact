import React, { useEffect } from "react";
import Mapa from "./Mapa";
import { obtenerPaisesAPI, usuariosPorPaisAPI } from "../services/service";
import { useDispatch, useSelector } from "react-redux";
import { cargarPaises } from "../slices/paisesSlice";
import { cargarUsuariosPorPais } from "../slices/usuariosSlice";

const MapaUsuariosPorPais = ({ userId, userApiKey }) => {

  const dispatch = useDispatch()

  const usuariosPorPais = useSelector((state) => state.usuariosSlice.usuarios);
  const paises = useSelector((state) => state.paisesSlice.paises);

  const obtenerPaises = async () => {
    const paisesAPI = await obtenerPaisesAPI();
    dispatch(cargarPaises(paisesAPI));
  };

  const obtenerUsuariosPorPais = async () => {
    const arrayUsuariosPorPais = await usuariosPorPaisAPI(userId, userApiKey);
    dispatch(cargarUsuariosPorPais(arrayUsuariosPorPais));
  };

  useEffect(() => {
    obtenerPaises();
    obtenerUsuariosPorPais();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

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
