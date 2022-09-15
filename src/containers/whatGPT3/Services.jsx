import React from 'react';
import Feature from '../../components/feature/Feature';
import './whatGPT3.css';

import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import apartments from '../../assets/house2.jpg';
import hotels from '../../assets/hotels.jpg';
import rentals from '../../assets/house.jpg';
import shops from '../../assets/rentals.jpeg';
import SearchIcon from '../../assets/search.svg';

const useStyles = makeStyles((theme) => ({
  input: {
    paddingLeft: "23px",
    marginLeft: theme.spacing(1),
    fontSize: "24px",
    lineHeight: "41px",
    color: "#000",
    outline: 'none',
    height: "59px",
    display: "flex",
    alignItems: "center",
    width: "80%",
    maxWidth: "998px",
    borderRadius: "10px 0px 0px 10px",
    border: "2px solid #BDBDBD",
    "& > input": {
      background: "red",
    },
    "&::-webkit-input-placeholder": {
      fontFamily: "Manrope",
    },
    "&::-moz-placeholder": {
      fontFamily: "Manrope",
    },
    "&::ms-input-placeholder": {
      fontFamily: "Manrope",
    },
    [theme.breakpoints.down("sm")]: {
      width: "auto",
      margin: "1rem 0.5rem",
    },
    [theme.breakpoints.down("1200")]: {
      maxWidth: "570px",
      margin: "0",
    },
    [theme.breakpoints.down("650")]: {
      maxWidth: "278px",
      margin: "0",
      height: "58px",
      fontSize: "18px",
      lineHeight: "22,27px",
      paddingLeft: "10px",
      minWidth: "250px",
      borderRight: "none",
    },
  },
  button: {
    margin: "-1px",
    padding: "10px 69px",
    background: "#b42f05",
    height: "59px",
    borderRadius: "0px 10px 10px 0px",
    border: "2px solid #FF4820",
    outline: "none",
    transition: "background 0.2s ease-in",
    cursor: "pointer",
    "&:hover": {
      background: "#b42f05",
    },
    "&:active": {
      background: "#b42f05",
    },
    "& img": {
      [theme.breakpoints.down("650")]: {
        maxWidth: "35px",
      },
    },
    [theme.breakpoints.down("650")]: {
      maxWidth: "278px",
      margin: "0",
      padding: "9px 17px 6px 11px ",
    },
  },
  labelSearch: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
}));


const Services = () => {
  const classes = useStyles();

  return(
      <div className="gpt3__whatgpt3 section__margin" id="wgpt3">
      <div className={classes.labelSearch}>
        <input
          className={classes.input}
          // onKeyDown={onKeyDown}
          type="text"
          id="search"
          // value={searchInput}
          // onChange={handleChange}
          placeholder="Search for properties..."
        />
        <Link
          to={{
            pathname: "/",
            // search: `?q=${searchInput}`,
            // state: { detail: `${searchInput}` },
          }}
        >
          <button className={classes.button} type="submit">
            <img className={classes.image} height="30" src={SearchIcon} alt="" />
          </button>
        </Link>
      </div>
      <div className="gpt3__whatgpt3-container">
        <Feature image={apartments} title="Apartments" text="A smaller version of the beautiful game we are all so passionate about. Ask about our leagues." />
        <Feature image={hotels} title="Hotels" text="Its not just a sport, its an art! One that must be mastered to succeed - Stephen Curry" />
        <Feature image={rentals} title="Rentals" text="Ideal location to host sporting & non-sporting events. Get in touch for custom, original events and kids parties." />
        <Feature image={shops} title="Retail Shop space" text="Ask us about our Corporate Employee Wellbeing Sports Packages for your management & staff." />
      </div>
    </div>
    )
};

export default Services;
