import React from 'react';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AssessmentIcon from '@material-ui/icons/Assessment';
import BarChartIcon from '@material-ui/icons/BarChart';
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit';

import { get_stats } from "../../../actions/bookings.js";
import apartments from '../../../assets/house2.jpg';
import hotels from '../../../assets/hotels.jpg';
import rentals from '../../../assets/house.jpg';
import shops from '../../../assets/rentals.jpeg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(2),
      marginBottom: theme.spacing(4),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  style: {
  	width: '330px',
    borderRadius: "10px",
    backgroundImage: `url(${apartments})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  style2: {
    width: '330px',
    backgroundImage: `url(${hotels})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  style3: {
    width: '330px',
    backgroundImage: `url(${rentals})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  style4: {
    width: '330px',
    backgroundImage: `url(${shops})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  style_daily: {
    width: '250px'
  },
  silence: {
  	width: '503px',
  },
  title_div: {
  	margin: "0px",
    marginTop: "120px",
  	display: "flex"
  },
  icon: {
  	marginLeft: "1px"
  },
  title: {
    fontWeight: 700,
    fontSize: '20px',
    fontFamily: 'Manrope',
    textAlign: 'center'
  },
  title_small: {
    fontWeight: 600,
    fontSize: '15px',
    fontFamily: 'Manrope',
    textAlign: 'center'
  },
  sub_title: {
    fontWeight: 300,
    fontSize: '12px',
    fontFamily: 'Manrope',
    textAlign: 'left'
  },
  subtitle:{
  	fontWeight: 400,
    fontSize: '30px',
    fontFamily: 'Manrope',
    textAlign: 'left',
    marginLeft: '10px'
  },
  header:{
    fontWeight: 400,
    fontSize: '15px',
    fontFamily: 'Manrope',
    textAlign: 'left',
    marginLeft: '30px'
  },
  figure: {
    fontWeight: 700,
    fontSize: '25px',
    fontFamily: 'Manrope',
    textAlign: 'center',
    marginBottom: '10px',
    marginLeft: '0px',
    cursor: 'pointer',
    transition: '1s',
    "&:hover": {
      color: 'red'
    }
  },
  income: {
    fontWeight: 600,
    fontSize: '30px',
    fontFamily: 'Manrope',
    textAlign: 'center',
    marginBottom: '10px',
    marginLeft: '10px'
  },
  small_figure: {
    fontWeight: 500,
    fontSize: '20px',
    fontFamily: 'Manrope',
    textAlign: 'left',
    marginLeft: "30px"
  },
  small_flex: {
    display: "flex", 
    flexDirection: "column"
  }
}));

function Variants(props) {
  const classes = useStyles();
  return (
  	<div style={{ display: "flex", flexDirection: "column" }} >
  	<div style={{ display: "flex", flexDirection: "row" }}>
	    <div className={classes.root}>
	      <Paper variant="outlined" className={classes.style}>
	        <div className={classes.title_div}>
	       	 <span className={classes.figure}>Apartments</span>
	       </div>
	      </Paper>
	    </div>

	    <div className={classes.root}>
        <Paper variant="outlined" className={classes.style3}>
          <div className={classes.title_div}>
           <span className={classes.figure}>Rentals</span>
         </div>
        </Paper>
      </div>

       <div className={classes.root}>
        <Paper variant="outlined" className={classes.style2}>
          <div className={classes.title_div}>
           <span className={classes.figure}>Hostels</span>
         </div>
        </Paper>
      </div>

    </div>
    <div style={{ display: "flex", flexDirection: "row" }}>
      
       <div className={classes.root}>
        <Paper variant="outlined" className={classes.style3}>
          <div className={classes.title_div}>
           <span className={classes.figure}>Retail Shop space</span>
         </div>
        </Paper>
      </div>
      <div className={classes.root}>
        <Paper variant="outlined" className={classes.style4}>
          <div className={classes.title_div}>
           <span className={classes.figure}>Motels</span>
         </div>
        </Paper>
      </div>
       <div className={classes.root}>
        <Paper variant="outlined" className={classes.style}>
          <div className={classes.title_div}>
           <span className={classes.figure}>Land titles</span>
         </div>
        </Paper>
      </div>
    </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  system_stats: state.bookings.system_stats
});

export default connect(mapStateToProps, {
  get_stats
})(Variants);