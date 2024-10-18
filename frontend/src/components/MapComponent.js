import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { FaMapMarkerAlt } from 'react-icons/fa'; // Import the map marker icon
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet'; // Use Leaflet's Icon to customize marker

const MapComponent = ({ setSelectedLocation, selectedLocation }) => {
  const [position, setPosition] = useState(null);

  // Define a custom React Icon marker
  const reactIconMarker = new Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c-3.9 0-7 3.1-7 7 0 4.8 7 12 7 12s7-7.2 7-12c0-3.9-3.1-7-7-7zM12 9.6c1.3 0 2.4 1.1 2.4 2.4s-1.1 2.4-2.4 2.4-2.4-1.1-2.4-2.4 1.1-2.4 2.4-2.4z"></path></svg>`), // Inline red marker SVG
    iconSize: [32, 32],  // Set the icon size
    iconAnchor: [16, 32], // Anchor the icon at the base
    popupAnchor: [0, -32], // Adjust popup position
  });

  // Function to update the map when selectedLocation changes
  useEffect(() => {
    if (selectedLocation) {
      setPosition(selectedLocation);
    }
  }, [selectedLocation]);

  // Custom hook to set the map's center based on the position
  const MapEvents = () => {
    const map = useMap();

    useEffect(() => {
      if (position) {
        map.flyTo(position, map.getZoom()); // Smoothly center the map on the selected bin location
      }
    }, [position, map]);

    return position === null ? null : <Marker position={position} icon={reactIconMarker}>
      <Popup>Selected Bin Location</Popup>
    </Marker>;
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