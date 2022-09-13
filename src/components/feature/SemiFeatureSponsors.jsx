import React from 'react';
import './feature.css';

const SemiFeatureSponsors = ({ image }) => (
  <div className="gpt3__features-container__feature">
    <div className="gpt3__features-container_semi_feature-text">
      <image src={image} />
    </div>
  </div>
);

export default SemiFeatureSponsors;
