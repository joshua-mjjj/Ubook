import React, { useState } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import Icon from "@material-ui/icons/CheckCircleOutline";
import CancelIcon from "@material-ui/icons/Cancel";
import Autocomplete from './Autocomplete'

import {
  login,
  loadUser,
} from "../../actions/auth.js";

import { clear_state_error } from "../../actions/errors.js";
import { get_bookings } from "../../actions/bookings.js";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import logo from "../../assets/lock.svg";
import load from "../../assets/loading.gif";

import MainCard from "./card/MainCard"

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
    marginLeft: '10px',
    fontFamily: 'Manrope',
    textAlign: 'left'
  },
   grid: {
    marginBottom: '50px',
    marginTop: '10px',
  },
  schedule_grid: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'left',
    alignItems: "left",
    marginBottom: '30px',
    marginTop: "5px"
  },
  accordion: {
    margin: "5px",
  },
  formLabel: {
    fontSize: "15px",
    fontFamily: "Manrope",
    color: "black",
    fontWeight: "600",
    marginBottom: "5px"
  },
  formLabel_: {
    fontSize: "14px",
    color: "#23286B",
    fontWeight: "300",
    marginBottom: "5px"
  },
}));

const Accordion = withStyles((theme) => ({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
}))(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },

  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const format_date = (date) => {
	const new_date = moment(date).toDate();
	const new_date_ = new_date.toString().substring(0, 24);
	return new_date_;
};

function Analytics(props) {
  const classes = useStyles();

  React.useEffect(() => {
    props.get_bookings()
  }, [])
  
  const [data, setData] = useState(null);
  const list = []

  React.useEffect(() => {
    if(props.bookings !== null){
      const list_bookings = props.bookings.filter((booking) => booking.blocked_off === true);
      setData(list_bookings);
    }
  }, [props.bookings])

    const get_section_value = (value) => {
    console.log(value);
    // setClient_search(value)
  };

  return (
    <div>
    <div style={{ marginTop : "10px", display: 'flex', flexDirection: "row"  }}>
      <p className={classes.sub_title} >Dashboard</p>
      <div style={{ float: 'left', width: '600px', marginLeft: '400px' }}>
       <Autocomplete get_section_value={get_section_value} />
      </div>
    </div>
    <div className={classes.schedule_grid}>

      <Grid className={classes.grid} container spacing={2}>
        <Grid item lg={4} md={6} sm={6} xs={12}>
            <MainCard isLoading={false} /> 
        </Grid>
      </Grid>

    </div>
  </div>
  );
}


const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  bookings: state.bookings.bookings,
  system_stats: state.bookings.system_stats
});

export default connect(mapStateToProps, {
  login,
  clear_state_error,
  loadUser,
  get_bookings
})(Analytics);