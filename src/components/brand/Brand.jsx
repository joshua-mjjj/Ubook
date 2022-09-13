import React from 'react';
import { cocacola, 
  assa, beton, 
  budweiser,
  CIC_Group_Logo,
  dstv,
  Jmall_Logos,
  Jumia,
  logo,
  energies,
  X1H2T7d3_400x400 } from './imports';
import './brand.css';

const Brand = () => (
  <div>
    <div className="heading_brand">
      <h1 >MEET OUR SPONSORS</h1>
    </div>
    <div className="gpt3__brand">
      <div>
        <img  height="30px" width="20px" className="gpt3__brand_img" src={cocacola} />
      </div>
      <div>
        <img height="120px" width="50px" className="gpt3__brand_img" src={assa} />
      </div>
      <div>
        <img className="gpt3__brand_img" src={beton} />
      </div>
      <div>
        <img height="70px" width="50px" className="gpt3__brand_img" src={budweiser} />
      </div>
      <div>
        <img height="70px" width="40px" className="gpt3__brand_img" src={CIC_Group_Logo} />
      </div>
      <div>
        <img height="70px" width="40px" className="gpt3__brand_img" src={dstv} />
      </div>
      <div>
        <img height="70px" width="40px" className="gpt3__brand_img" src={Jmall_Logos} />
      </div>
      <div>
        <img height="60px" width="40px" className="gpt3__brand_img" src={Jumia} />
      </div>
      <div>
        <img height="50px" width="40px" className="gpt3__brand_img" src={logo} />
      </div>
       <div>
        <img height="60px" width="40px" className="gpt3__brand_img" src={energies} />
      </div>
      <div>
        <img height="140px" width="40px" className="gpt3__brand_img" src={X1H2T7d3_400x400} />
      </div>
     
    </div>
  </div>
);

export default Brand;
