import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ setSelectedLocation }) => {
  const [position, setPosition] = useState(null);

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        setSelectedLocation(e.latlng); 
      },
    });
    return position === null ? null : <Marker position={position}></Marker>;
  };

  return (
    <div className="mb-6">
      <MapContainer center={[51.505, -0.09]} zoom={13} className="h-96 w-full rounded-md overflow-hidden">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        <MapEvents />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
