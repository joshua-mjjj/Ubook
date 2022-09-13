import React from 'react';
import './feature.css';

const SemiFeature = ({ title, text, image }) => (
  <div className="gpt3__features-container__feature">
    <div className="gpt3__features-container_semi_feature-text">
      <p>{" > "} {title}</p>
    </div>
    <div className="gpt3__features-container_semi_feature-text">
      <p>{" > "}{text}</p>
    </div>
  </div>
);

export default SemiFeature;
