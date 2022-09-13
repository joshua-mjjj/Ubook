import React from 'react';
import './feature.css';

const Feature = ({ title, text, image }) => (
  <div className="gpt3__features-container__feature">
    <div className="gpt3__features-container__feature-title">
      <div />
      <span>
         <img src={image} height="150px" width="180px" />
         <h1>{title}</h1>
      </span>
    </div>
    <div className="gpt3__features-container_feature-text">
      <p>{text}</p>
    </div>
  </div>
);

export default Feature;
