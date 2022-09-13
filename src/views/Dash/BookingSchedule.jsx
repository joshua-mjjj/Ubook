import React, { useState } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

import {
  login,
  loadUser,
} from "../../actions/auth.js";

import { clear_state_error } from "../../actions/errors.js";
import { get_bookings } from "../../actions/bookings.js";

import { makeStyles } from "@material-ui/core/styles";
import logo from "../../assets/lock.svg";
import load from "../../assets/loading.gif";

import Schedule from "../../views/booking/Schedule";
import { getWeeklyDates, getDailyDates, getBiWeeklyDates, getMonthlyDates } from "./utils/utilityFunctions"
import Autocomplete from './Autocomplete'

// import * as Scroll from 'react-scroll';
// var scroll = Scroll.animateScroll;

const useStyles = makeStyles(() => ({
  title: {
  	fontWeight: 700,
	fontSize: '30px',
	fontFamily: 'Manrope',
	textAlign: 'center'
  },
  title2: {
  	fontWeight: 700,
	fontSize: '15px',
	fontFamily: 'Manrope',
	textAlign: 'center'
  },
  title_sub: {
  	fontWeight: 700,
	fontSize: '15px',
	fontFamily: 'Manrope',
	cursor: "pointer",
	transition: "0.5s",
	 "&:hover": {
      color: "red",
    },
  },
  sub_title: {
  	fontWeight: 700,
	fontSize: '25px',
	fontFamily: 'Manrope',
	textAlign: 'center'
  },
  sub_title_: {
  	fontWeight: 700,
	fontSize: '25px',
	fontFamily: 'Manrope',
	textAlign: 'left'
  },
  schedule_grid: {
  	display: 'flex',
  	flexDirection: "row",
  	justifyContent: 'left',
  	alignItems: "left",
  	marginBottom: '50px',
  	marginTop: "5px"
  }
}));

function BookingSchedule(props) {
  const classes = useStyles();

  React.useEffect(() => {
  	props.get_bookings()
  }, [])

  const fetching = () => {
    console.log("Refreshing....")
  };

  const get_section_value = (value) => {
    console.log(value);
    // setClient_search(value)
  };

  return (
  		<div>
		    <div style={{ marginTop : "10px", display: 'flex', flexDirection: "row"  }}>
		      <p className={classes.sub_title_} >Dashboard</p>
		      <div style={{ float: 'left', width: '600px', marginLeft: '400px' }}>
		       <Autocomplete get_section_value={get_section_value} />
		      </div>
		    </div>

        </div>
  );
}


const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  bookings: state.bookings.bookings
});

export default connect(mapStateToProps, {
  login,
  clear_state_error,
  loadUser,
  get_bookings
})(BookingSchedule);

