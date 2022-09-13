import React from 'react';
import football from '../../assets/fastfusion.png';
import './footer.css';
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => (
  <div className="gpt3__footer section__padding">
    <div className="gpt3__footer-heading">
      <h1 className="gradient__text">UBOOK</h1>
    </div>

    <div className="gpt3__footer-btn">
      <p onClick={() => window.location.href = "/book_pitch"}>Book Anytime</p>
    </div>

    <div className="gpt3__footer-links">
      <div className="gpt3__footer-links_logo">
        <img src={football} alt="gpt3_logo" />
        <p>Makerere Kikoni</p>
      </div>
      <div className="gpt3__footer-links_div">
        <h4>USEFUL LINKS</h4>
        <span/>
        <p>Home</p>
        <p>About Us</p>
        <p>Search</p>
        <p>Contact Us</p>
      </div>
      <div className="gpt3__footer-links_div">
        <h4>OUR WORK HOURS</h4>
        <span/>
        <p>Monday - Friday : {"    "} 07:00 - 00:00 </p>
        <p>Saturday - Sunday : {"   "} 08:00 - 00:00 </p>
        <p>Holidays  : {"   "} Open Till Late</p>
      </div>
      <div className="gpt3__footer-links_head_div">
        <h4 >FIND US ON SOCIAL MEDIA</h4>
        <span/>
        <div className="gpt3__footer-links_inner_div">
          <p><FaFacebookF size={30} /></p>
          <p><FaInstagram size={35} /></p>
          <p><FaTwitter size={35} /></p>
          <p><FaYoutube size={35} /></p>
        </div>
      </div>
    </div>

    <div className="gpt3__footer-copyright">
      <p>@2022 UBOOK All rights reserved.</p>
      <br />
      <p>ALTERNATIVE UNIVERSE TECH</p>
    </div>
  </div>
);

export default Footer;
