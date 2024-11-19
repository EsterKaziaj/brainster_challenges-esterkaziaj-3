import React from 'react';
import './DetailsBlock.css';

interface DetailsBlockProps {
  title: string;
  text: string;
  imageUrl: string;
}

const DetailsBlock: React.FC<DetailsBlockProps> = ({ title, text, imageUrl }) => {
  return (
    <div className="details-block">
      <div className="text-content">
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
      <div className="image-content">
        <img src={imageUrl} alt={title} className="round-image" />
      </div>
    </div>
  );
};

export default DetailsBlock;
