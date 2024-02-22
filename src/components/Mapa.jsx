import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIcon from "../images/ubi.png";
import "leaflet/dist/leaflet.css";

const Mapa = ({ markersData }) => {
  const center = [-16.5, -68.15];
  const zoom = 3;
  const size = { minWidth: "400px", minHeight: "400px" };
  const urlTileLayer = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  const customMarkerIcon = L.icon({
    iconUrl: markerIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
  });

  return (
    <div>
      <div>
        <MapContainer center={center} zoom={zoom} style={size}>
          <TileLayer url={urlTileLayer} />
          {markersData?.map((marker) => {
            const posMarker = [marker.lat, marker.lng];
            const keyMarker = `${marker.lat}-${marker.lng}`;
            return (
              <Marker
                key={keyMarker}
                position={posMarker}
                icon={customMarkerIcon}
              >
                <Popup>
                  <h3>{marker.titulo}</h3>
                  <p> {marker.cantidad}</p>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default Mapa;
