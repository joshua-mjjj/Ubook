import React from 'react';
import './navbar.css';

const TopNav = () => {

  return (
    <div className="gpt3__navbar_top_nav">
      <div className="gpt3__navbar-links">
       {/* <div className="gpt3__navbar-links_logo">
          <img src={logo} />
        </div>*/}
        <div className="gpt3__navbar-links_container_top">
          <p><a href="/" style={{ color : '#FF4820' }} onClick={() => window.location.href = "/"} >Welcome to Ubook</a></p>
          {/*<p><a href="#wgpt3"> Call Us: 0776 450 351 / 020 092 8186 or email us on games@fastsportsfusion.ug</a></p>*/}
        </div>
      </div>


      <div onClick={() => window.location.href = "/" } className="gpt3__navbar-sign_top">
        <p style={{ color : '#FF4820' }} >Need help?</p>
       {/* <button type="button">Sign up</button>*/}
      </div>
    </div>
  );
};

export default TopNav;
