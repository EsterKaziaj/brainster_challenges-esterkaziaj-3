import React, { useEffect, useState } from 'react';
import Place from './Place';
import './PlacesContainer.css';

interface PlaceData {
  id: number;
  place: string;
  desc: string;
  img: string;
}

const PlacesContainer: React.FC = () => {
  const [places, setPlaces] = useState<PlaceData[]>([]);

  useEffect(() => {
    console.log('Fetching data from JSON server...');
    fetch('http://localhost:5002/places')
      .then(response => {
        console.log('Response received:', response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched places:', data); // This should log the fetched array
        setPlaces(data); // Assuming this updates your state
      })
      .catch(error => console.error('Error fetching places:', error));
  }, []);
  
  
  return (
    <div className="places-container">
      {places.length > 0 ? (
        places.map(place => (
          <Place key={place.id} {...place} />
        ))
      ) : (
        <p>No places available</p>
      )}
    </div>
  );
};

export default PlacesContainer;
