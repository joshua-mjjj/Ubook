import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import './navbar.css';
import Drawer from "./Drawer"

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const set_close_menu = () => {
    setToggleMenu(false)
  }
  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links_links">
        {/*<div className="gpt3__navbar-links_logo">
          <img src={logo} />
        </div>*/}
        <div className="gpt3__navbar-links_container">
          <p><a href="/">Home</a></p>
          <p><a href="/">Search</a></p>
          <p><a href="/">Contact Us</a></p>
          <p><a href="/">About Us</a></p>
          <p><a href="/">Become a client</a></p>
          <p><a href="/">Public opinion</a></p>
          <p><a href="/login">Sigin in</a></p>
          <p><a href="/register">Register</a></p>
          {/*<p><a href="#features">Book Your Event</a></p>
          <p><a href="/book_pitch">Book a Pitch</a></p>
          <p><a href="#blog">Football Leagues</a></p>
          <p><a href="#blog">Gym and Spa</a></p>
          <p><a href="#blog">Cool Stuff</a></p>
          <p><a href="#blog">Contact Us</a></p>*/}
        </div>
      </div>
      {/*<div className="gpt3__navbar-sign">
        <p>Sign in</p>
        <button type="button">Sign up</button>
      </div>*/}
      <div className="gpt3__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
           <Drawer set_close_menu={set_close_menu} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
