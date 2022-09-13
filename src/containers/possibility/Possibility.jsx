import React from 'react';
import Lottie from 'react-lottie';
import './possibility.css';
import customerSatisfaction from '../../assets/animations/customer-satisfaction.json';
import SemiFeatureComments from '../../components/feature/SemiFeatureComments';

const Possibility = () => {
    const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: customerSatisfaction,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    }; 

  return (
  <div>
    <div className="heading_brand">
      <h1 >WHAT OUR CUSTOMERS SAY</h1>
      <span>UBOOK</span>
    </div>
    <div className="gpt3__possibility section__padding_2" id="possibility">
      {/*<div className="gpt3__possibility-image">
         <Lottie options={defaultOptions}
            height={150}
            width={150}
          />
      </div>*/}
    </div>
   </div>
)
};

export default Possibility;
