import React from 'react';
import './Banner.css'; 

const Banner: React.FC = () => {
  return (
    <div className="banner" style={{ backgroundImage: 'url(https://picsum.photos/1600/600)' }}>
      <div className="banner-content">
        <h1>Nomad Nation</h1>
        <button>Read More</button>
      </div>
    </div>
  );
};

export default Banner;
