import React from 'react';
import SemiFeature from '../../components/feature/SemiFeature';
import './features.css';

const featuresData = [
  {
    title: '5-Aside Football Pitches',
    text: 'Viewing Galleries',
  },
  {
    title: 'Indoor Hockey Facilities',
    text: 'Event Space',
  },
  {
    title: 'Netball Court',
    text: 'Fusball & Table Tennis',
  },
  {
    title: 'Basketball Court',
    text: 'Arena Grill & Sports Bar',
  },
  {
    title: 'Secure Parking',
    text: 'Muay Thai Kickboxing',
  },
  {
    title: 'Fully Equipped Gymnasium',
    text: 'Outdoor Area for Families',
  },
  {
    title: 'Football Coaching',
    text: 'Changing Rooms',
  },
  {
    title: 'Netball Coaching',
    text: 'Kids Parties',
  },
  {
    title: 'Basketball Coaching',
    text: 'Outdoor Beer Garden',
  },
  {
    title: 'Soccer Youth Development',
    text: 'Sports Shop',
  },
];

const Features = () => (
  <div>
    <div className="gpt3__features-heading_top">
      <h1 >WHO WE ARE</h1>
      <span>WELCOME TO FAST SPORTS FUSION</span>
    </div>
    <div className="gpt3__features section__padding" id="features">
    <div className="gpt3__features-heading">
      <h1 >KAMPALA'S PREMIER INDOOR SPORTS FACILITY</h1>
      <div />
    </div>
    <div className="gpt3__features-container">
      <div className="gpt3__features-heading">
        <h1 >WHAT WE OFFER</h1>
        <div />
      </div>
      <br />
        {featuresData.map((item, index) => (
          <SemiFeature title={item.title} text={item.text} key={item.title + index} />
        ))}
      </div>
    </div>
  </div>
  
);

export default Features;
