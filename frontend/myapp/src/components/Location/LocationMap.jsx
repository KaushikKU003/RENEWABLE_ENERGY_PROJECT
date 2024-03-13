import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import pinIcon1 from '../Images/pin.png'
const LocationMap = ({ latitude, longitude }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize Leaflet map
    // const map = L.map(mapRef.current).setView([latitude, longitude], 13);
    const map = L.map(mapRef.current, {
        center: [latitude, longitude],
        zoom: 10, // Adjust the initial zoom level as needed
        scrollWheelZoom: true // Disable scroll wheel zoom
      });
      const pinIcon = L.icon({
        iconUrl: pinIcon1,
        iconSize: [64, 64], // Increase the size of the icon here
      iconAnchor: [32, 64] 
      });
    // Add a tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Add a marker at the specified location
    L.marker([latitude, longitude],{ icon: pinIcon }).addTo(map);

    return () => {
      // Cleanup
      map.remove();
    };
  }, [latitude, longitude]);

  return <div ref={mapRef} style={{ height: '600px',width:'1200px' }} />;
};

export default LocationMap;
