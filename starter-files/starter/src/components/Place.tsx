import React from 'react';
import './Place.css';

interface PlaceProps {
  place: string;
  desc: string;
  img: string;
}

const Place: React.FC<PlaceProps> = ({ place, desc, img }) => {
  return (
    <div className="place">
      <img src={img} alt={place} className="place-image" />
      <h3>{place}</h3>
      <p>{desc}</p>
    </div>
  );
};

export default Place;
