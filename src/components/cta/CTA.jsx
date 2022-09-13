import React from 'react';
import './cta.css';
import Contact from "./Contact"
import Gallery from "./Gallery"

const CTA = () => (
  <div style={{ display: 'flex', flexDirection: "column" }} >
    {/*<div style={{ marginLeft: "150px" }} >
      <div className="heading_div">
         <h1 >OUR GALLERY</h1>
         <span >A VIEW OF WHAT WE DO</span>
      </div>
      <div className="galley_large">
        <Gallery />
      </div>
    </div>*/}

  <div className="gpt3__cta">
    <div className="gpt3__cta-content">
      <p>Contact us today</p>
      <h3>Ubook</h3>
    </div>
    <div className="gpt3__cta-btn">
     {/* <button type="button">Book event</button>*/}
      <Contact />
    </div>
  </div>

  </div>
);

export default CTA;
