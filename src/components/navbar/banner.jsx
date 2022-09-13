import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../logo.svg';
import logo_fast from '../../assets/fast.jpg';
import './navbar.css';

const Banner = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div>
    	<div className="gpt3__navbar_fast_contain"> 
    		<div className="gpt3__navbar_fast_logo">
	          <img src={logo_fast} />
	        </div>
    	</div>
    </div>
  );
};

export default Banner;
