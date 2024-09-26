import React from 'react';
import LocationMap from './LocationMap';

const LocationMapPage = () => {
  // Example latitude and longitude
  const latitude = 12.87311491009048;
  const longitude = 74.9196933021752;

  return (
    <div className='bg-[#303030] min-h-screen '>
      <h1 className='text-white font-monospace text-3xl font-bold mb-4'>Location Map Page</h1>
      <LocationMap latitude={latitude} longitude={longitude} className="" />
    </div>
  );
};

export default LocationMapPage;
