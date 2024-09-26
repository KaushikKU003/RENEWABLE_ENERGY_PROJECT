import React from 'react';
import LocationMap from './LocationMap';
import { useParams } from 'react-router-dom';

const LocationMapPage = () => {
  // Example latitude and longitude
  // const latitude = 12.87311491009048;
  // const longitude = 74.9196933021752;

  const { longitude, latitude } = useParams();
  console.log(longitude)
  console.log(latitude)
 const project_name=localStorage.getItem("pname");
  return (
    <div className='bg-[#303030] min-h-screen '>
      <h1 className='text-white font-monospace text-3xl font-bold mb-4'>Map View of Project {project_name}</h1>
      <LocationMap latitude={latitude} longitude={longitude} className="" />
    </div>
  );
};

export default LocationMapPage;
