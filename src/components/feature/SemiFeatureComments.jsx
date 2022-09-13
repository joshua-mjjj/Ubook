import React from 'react';
import './feature.css';

const SemiFeatureComments = ({ title, text, image }) => (
  <div className="gpt3__features-container__feature">
    <div className="gpt3__features-container_semi_feature-text_head">
      <span>{title}</span>
    </div>
    <div className="gpt3__features-container_semi_feature-text_boarder">
      <p>{text}</p>
    </div>
  </div>
);

export default SemiFeatureComments;
