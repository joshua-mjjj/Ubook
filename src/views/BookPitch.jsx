import React, { useState } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  login,
  loadUser,
} from "../actions/auth.js";

import { clear_state_error } from "../actions/errors.js";
import { get_bookings } from "../actions/bookings.js";

import { makeStyles } from '@material-ui/core/styles';

import logo from "../assets/lock.svg";
import load from "../assets/loading.gif";
import { CTA, Brand, Navbar, Banner, TopNav, Showcase } from '../components';
import { Footer } from '../containers';

import Schedule from "../views/booking/Calendar";
import { getWeeklyDates, getDailyDates, getBiWeeklyDates, getMonthlyDates } from "./Dash/utils/utilityFunctions"
import PeopleIcon from '@material-ui/icons/ArrowBack';

// import * as Scroll from 'react-scroll';
// var scroll = Scroll.animateScroll;

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    minHeight: "100vh",
   
  },
  rootGrid: {
    margin: "24px 0",
    padding: "23px 0",
    borderRadius: "10px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  
  },
  paper: {
    margin: "20px 100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "367px",
    position: "relative",
    zIndex: 0,
    
  },
  avatar: {
    margin: "3px 1px 0px",
    backgroundColor: "inherit",
    width: "100px",
    height: "55px",
    margin: 0,
    "& img": {
      width: "56px",
      height: "55.5px",
    },
  },
  logo: {
    cursor: "pointer",
    width: "52px",
    height: "52px",
  },
  title: {
    marginBottom: "23px",
    fontFamily: "Dosis",
    fontWeight: 900,
    fontSize: "51px",
    lineHeight: "58px",
    color: "#383F45",
   
  },
  form: {
    width: "328px", // Fix IE 11 issue.
    marginTop: "2px",
   
  },
  input: {
   // margin: "2px 0px 10px",
    marginBottom: "10px",
    borderRadius: "5px",
    "& input": {
      padding: "23px 52px 17px 14px",
    },
    "& label": {
      top: "8px",
      color: "black",
    },
    "&:first-child": {
      marginTop: "10px",
    },
  },
  submit: {
    margin: "3px 0px 1px",
    height: "56px",
    textTransform: "none",
    fontSize: "13px!important",
    background: "#FF5722",
    fontFamily: "Dosis",
    fontWeight: "bold",
    fontSize: "22px",
    lineHeight: "16px",
    color: "#FFFFFF!important",
    
  },
  signWrap: {
    margin: "0 auto",
    marginTop: "15px",
    maxWidth: "328px",
   
  },
  message: {
    width: "100%",
    "& > * + *": {
      marginTop: '2px',
    },
  },
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
  back_div: {
	textAlign: 'center',
	justifyContent: "center",
	alignItems: "center",
	margin: "20px"
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
  schedule_grid: {
  	display: 'flex',
  	flexDirection: "row",
  	justifyContent: 'center',
  	alignItems: "center",
  	marginBottom: '50px',
  	marginTop: "15px"
  },
  schedule_grid_list: {
  	display: 'flex',
  	flexDirection: "row",
  	justifyContent: 'center',
  	alignItems: "center",
  	marginBottom: '50px',
  	marginTop: "15px"
  }
}));

function BookPitch(props) {
  const classes = useStyles();

  React.useEffect(() => {
  	props.get_bookings()
  }, [])
  
  const [data_pitch_one, setData_pitch_one] = useState(null);
  const [data_pitch_two, setData_pitch_two] = useState(null);
  const [data_pitch_three, setData_pitch_three] = useState(null);
  const [data_tusker, setData_tusker] = useState(null);

  const list_pitch_one = []
  const list_pitch_two = []
  const list_ptich_three = []
  const list_tusker = []

  React.useEffect(() => {
  	if(props.bookings !== null){
  	  const pitch_1 = props.bookings.filter((booking) => booking.court_location === 'Pitch 1' && booking.cancelled === false);
  	  const pitch_2 = props.bookings.filter((booking) => booking.court_location === 'Pitch 2' && booking.cancelled === false);
  	  const pitch_3 = props.bookings.filter((booking) => booking.court_location === 'Pitch 3' && booking.cancelled === false);
  	  const tusker  = props.bookings.filter((booking) => booking.court_location === 'Tusker Court' && booking.cancelled === false);

  	  tusker.filter((availability) => {
	        // console.log(availability)
	        const id = availability.id;
	        const end_time = availability.end_time;
	        const start_time = availability.start_time;
	        const start_date = availability.start_date;
	        const end_date = availability.end_date;
	        let roomId;
	        if(availability.blocked_off){
	        	roomId = 1 // Verified
	        }
	        if(!availability.blocked_off){
	        	roomId = 2 // Not Verified
	        }
	        if(availability.blocked_off && availability.block_booking){
	        	roomId = 3 // Verified Block Booking
	        }

	        var dateString_start = start_date + ' ' + start_time;
	        var reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
	        var dateArray = reggie.exec(dateString_start);
	        var dateObject_start = new Date(+dateArray[1],+dateArray[2] - 1, +dateArray[3],
	          +dateArray[4],+dateArray[5],+dateArray[6]);

	        var dateString_end = end_date + ' ' + end_time;
	        var reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
	        var dateArray = reggie.exec(dateString_end);
	        var dateObject_end = new Date(+dateArray[1],+dateArray[2] - 1, +dateArray[3],
	          +dateArray[4],+dateArray[5],+dateArray[6]);

	        var dateString_start_endtime = start_date + ' ' + end_time;
	        var reggie2 = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
	        var dateArra = reggie2.exec(dateString_start);
	        // eslint-disable-next-line no-redeclare
	        var dateObject_start = new Date(
	          +dateArra[1],
	          +dateArra[2] - 1, // Careful, month starts at 0!
	          +dateArra[3],
	          +dateArra[4],
	          +dateArra[5],
	          +dateArra[6]
	        );

	        let object;
	        if(availability.block_booking){
	        	if(availability.interval === "Daily"){
	        		const count = getDailyDates(start_date, end_date).length
	        		object = {
			              title: "Booked",
			              startDate: dateObject_start,
			              endDate: dateString_start_endtime,
			              id: id,
			              rRule: `FREQ=DAILY;COUNT=${count}`,
			              location: "FAST FUSION",
			              roomId: roomId
			            };
	        	} 
	        	if(availability.interval === "Weekly"){
	        		const count = getWeeklyDates(start_date, end_date).length
	        		object = {
			              title: "Booked",
			              startDate: dateObject_start,
			              endDate: dateString_start_endtime,
			              id: id,
			              rRule: `FREQ=WEEKLY;COUNT=${count}`,
			              location: "FAST FUSION",
			              roomId: roomId
			            };
	        	}  
	        	if(availability.interval === "Bi-Weekly"){
	        		const count = getBiWeeklyDates(start_date, end_date).length
	        		object = {
			              title: "Booked",
			              startDate: dateObject_start,
			              endDate: dateString_start_endtime,
			              id: id,
			              rRule: `FREQ=WEEKLY;COUNT=${count};INTERVAL=2`,
			              location: "FAST FUSION",
			              roomId: roomId
			            };
	        	}  
	        	if(availability.interval === "Monthly"){
	        		const count = getMonthlyDates(start_date, end_date).length
	        		object = {
			              title: "Booked",
			              startDate: dateObject_start,
			              endDate: dateString_start_endtime,
			              id: id,
			              rRule: `FREQ=MONTHLY;COUNT=${count}`,
			              location: "FAST FUSION",
			              roomId: roomId
			            };
	        	}  
          }else{
          	object = {
              title: "Booked",
              startDate: dateObject_start,
              endDate: dateObject_end,
              id: id,
              location: "FAST FUSION",
              roomId: roomId
            };
	        }

	        list_tusker.push(object);
	      });
      setData_tusker(list_tusker);


  	  pitch_3.filter((availability) => {
	        // console.log(availability)
	        const id = availability.id;
	        const end_time = availability.end_time;
	        const start_time = availability.start_time;
	        const start_date = availability.start_date;
	        const end_date = availability.end_date;
	        let roomId;
	        if(availability.blocked_off){
	        	roomId = 1 // Verified
	        }
	        if(!availability.blocked_off){
	        	roomId = 2 // Not Verified
	        }
	        if(availability.blocked_off && availability.block_booking){
	        	roomId = 3 // Verified Block Booking
	        }

	        var dateString_start = start_date + ' ' + start_time;
	        var reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
	        var dateArray = reggie.exec(dateString_start);
	        var dateObject_start = new Date(+dateArray[1],+dateArray[2] - 1, +dateArray[3],
	          +dateArray[4],+dateArray[5],+dateArray[6]);

	        var dateString_end = end_date + ' ' + end_time;
	        var reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
	        var dateArray = reggie.exec(dateString_end);
	        var dateObject_end = new Date(+dateArray[1],+dateArray[2] - 1, +dateArray[3],
	          +dateArray[4],+dateArray[5],+dateArray[6]);

	        var dateString_start_endtime = start_date + ' ' + end_time;
	        var reggie2 = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
	        var dateArra = reggie2.exec(dateString_start);
	        // eslint-disable-next-line no-redeclare
	        var dateObject_start = new Date(
	          +dateArra[1],
	          +dateArra[2] - 1, // Careful, month starts at 0!
	          +dateArra[3],
	          +dateArra[4],
	          +dateArra[5],
	          +dateArra[6]
	        );

	        let object;
	        if(availability.block_booking){
	        	if(availability.interval === "Daily"){
	        		const count = getDailyDates(start_date, end_date).length
	        		object = {
			              title: "Booked",
			              startDate: dateObject_start,
			              endDate: dateString_start_endtime,
			              id: id,
			              rRule: `FREQ=DAILY;COUNT=${count}`,
			              location: "FAST FUSION",
			              roomId: roomId
			            };
	        	} 
	        	if(availability.interval === "Weekly"){
	        		const count = getWeeklyDates(start_date, end_date).length
	        		object = {
			              title: "Booked",
			              startDate: dateObject_start,
			              endDate: dateString_start_endtime,
			              id: id,
			              rRule: `FREQ=WEEKLY;COUNT=${count}`,
			              location: "FAST FUSION",
			              roomId: roomId
			            };
	        	}  
	        	if(availability.interval === "Bi-Weekly"){
	        		const count = getBiWeeklyDates(start_date, end_date).length
	        		object = {
			              title: "Booked",
			              startDate: dateObject_start,
			              endDate: dateString_start_endtime,
			              id: id,
			              rRule: `FREQ=WEEKLY;COUNT=${count};INTERVAL=2`,
			              location: "FAST FUSION",
			              roomId: roomId
			            };
	        	}  
	        	if(availability.interval === "Monthly"){
	        		const count = getMonthlyDates(start_date, end_date).length
	        		object = {
			              title: "Booked",
			              startDate: dateObject_start,
			              endDate: dateString_start_endtime,
			              id: id,
			              rRule: `FREQ=MONTHLY;COUNT=${count}`,
			              location: "FAST FUSION",
			              roomId: roomId
			            };
	        	}  
          }else{
          	object = {
              title: "Booked",
              startDate: dateObject_start,
              endDate: dateObject_end,
              id: id,
              location: "FAST FUSION",
              roomId: roomId
            };
	        }

	       list_ptich_three.push(object);
	      });
      setData_pitch_three(list_ptich_three);

  	  pitch_2.filter((availability) => {
	        // console.log(availability)
	        const id = availability.id;
	        const end_time = availability.end_time;
	        const start_time = availability.start_time;
	        const start_date = availability.start_date;
	        const end_date = availability.end_date;
	        let roomId;
	        if(availability.blocked_off){
	        	roomId = 1 // Verified
	        }
	        if(!availability.blocked_off){
	        	roomId = 2 // Not Verified
	        }
	        if(availability.blocked_off && availability.block_booking){
	        	roomId = 3 // Verified Block Booking
	        }

	        var dateString_start = start_date + ' ' + start_time;
	        var reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
	        var dateArray = reggie.exec(dateString_start);
	        var dateObject_start = new Date(+dateArray[1],+dateArray[2] - 1, +dateArray[3],
	          +dateArray[4],+dateArray[5],+dateArray[6]);

	        var dateString_end = end_date + ' ' + end_time;
	        var reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
	        var dateArray = reggie.exec(dateString_end);
	        var dateObject_end = new Date(+dateArray[1],+dateArray[2] - 1, +dateArray[3],
	          +dateArray[4],+dateArray[5],+dateArray[6]);

	        var dateString_start_endtime = start_date + ' ' + end_time;
	        var reggie2 = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
	        var dateArra = reggie2.exec(dateString_start);
	        // eslint-disable-next-line no-redeclare
	        var dateObject_start = new Date(
	          +dateArra[1],
	          +dateArra[2] - 1, // Careful, month starts at 0!
	          +dateArra[3],
	          +dateArra[4],
	          +dateArra[5],
	          +dateArra[6]
	        );

	        let object;
	        if(availability.block_booking){
	        	if(availability.interval === "Daily"){
	        		const count = getDailyDates(start_date, end_date).length
	        		object = {
			              title: "Booked",
			              startDate: dateObject_start,
			              endDate: dateString_start_endtime,
			              id: id,
			              rRule: `FREQ=DAILY;COUNT=${count}`,
			              location: "FAST FUSION",
			              roomId: roomId
			            };
	        	} 
	        	if(availability.interval === "Weekly"){
	        		const count = getWeeklyDates(start_date, end_date).length
	        		object = {
			              title: "Booked",
			              startDate: dateObject_start,
			              endDate: dateString_start_endtime,
			              id: id,
			              rRule: `FREQ=WEEKLY;COUNT=${count}`,
			              location: "FAST FUSION",
			              roomId: roomId
			            };
	        	}  
	        	if(availability.interval === "Bi-Weekly"){
	        		const count = getBiWeeklyDates(start_date, end_date).length
	        		object = {
			              title: "Booked",
			              startDate: dateObject_start,
			              endDate: dateString_start_endtime,
			              id: id,
			              rRule: `FREQ=WEEKLY;COUNT=${count};INTERVAL=2`,
			              location: "FAST FUSION",
			              roomId: roomId
			            };
	        	}  
	        	if(availability.interval === "Monthly"){
	        		const count = getMonthlyDates(start_date, end_date).length
	        		object = {
			              title: "Booked",
			              startDate: dateObject_start,
			              endDate: dateString_start_endtime,
			              id: id,
			              rRule: `FREQ=MONTHLY;COUNT=${count}`,
			              location: "FAST FUSION",
			              roomId: roomId
			            };
	        	}  
          }else{
          	object = {
              title: "Booked",
              startDate: dateObject_start,
              endDate: dateObject_end,
              id: id,
              location: "FAST FUSION",
              roomId: roomId
            };
	        }
	       list_pitch_two.push(object);
	      });
      setData_pitch_two(list_pitch_two);

  	  pitch_1.filter((availability) => {
	        // console.log(availability)
	        const id = availability.id;
	        const end_time = availability.end_time;
	        const start_time = availability.start_time;
	        const start_date = availability.start_date;
	        const end_date = availability.end_date;
	        let roomId;
	        if(availability.blocked_off){
	        	roomId = 1 // Verified
	        }
	        if(!availability.blocked_off){
	        	roomId = 2 // Not Verified
	        }
	        if(availability.blocked_off && availability.block_booking){
	        	roomId = 3 // Verified Block Booking
	        }

	        var dateString_start = start_date + ' ' + start_time;
	        var reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
	        var dateArray = reggie.exec(dateString_start);
	        var dateObject_start = new Date(+dateArray[1],+dateArray[2] - 1, +dateArray[3],
	          +dateArray[4],+dateArray[5],+dateArray[6]);

	        var dateString_end = end_date + ' ' + end_time;
	        var reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
	        var dateArray = reggie.exec(dateString_end);
	        var dateObject_end = new Date(+dateArray[1],+dateArray[2] - 1, +dateArray[3],
	          +dateArray[4],+dateArray[5],+dateArray[6]);

	        var dateString_start_endtime = start_date + ' ' + end_time;
	        var reggie2 = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
	        var dateArra = reggie2.exec(dateString_start);
	        // eslint-disable-next-line no-redeclare
	        var dateObject_start = new Date(
	          +dateArra[1],
	          +dateArra[2] - 1, // Careful, month starts at 0!
	          +dateArra[3],
	          +dateArra[4],
	          +dateArra[5],
	          +dateArra[6]
	        );

	        let object;
	        if(availability.block_booking){
	        	if(availability.interval === "Daily"){
	        		const count = getDailyDates(start_date, end_date).length
	        		object = {
			              title: "Booked",
			              startDate: dateObject_start,
			              endDate: dateString_start_endtime,
			              id: id,
			              rRule: `FREQ=DAILY;COUNT=${count}`,
			              location: "FAST FUSION",
			              roomId: roomId
			            };
	        	} 
	        	if(availability.interval === "Weekly"){
	        		const count = getWeeklyDates(start_date, end_date).length
	        		object = {
			              title: "Booked",
			              startDate: dateObject_start,
			              endDate: dateString_start_endtime,
			              id: id,
			              rRule: `FREQ=WEEKLY;COUNT=${count}`,
			              location: "FAST FUSION",
			              roomId: roomId
			            };
	        	}  
	        	if(availability.interval === "Bi-Weekly"){
	        		const count = getBiWeeklyDates(start_date, end_date).length
	        		object = {
			              title: "Booked",
			              startDate: dateObject_start,
			              endDate: dateString_start_endtime,
			              id: id,
			              rRule: `FREQ=WEEKLY;COUNT=${count};INTERVAL=2`,
			              location: "FAST FUSION",
			              roomId: roomId
			            };
	        	}  
	        	if(availability.interval === "Monthly"){
	        		const count = getMonthlyDates(start_date, end_date).length
	        		object = {
			              title: "Booked",
			              startDate: dateObject_start,
			              endDate: dateString_start_endtime,
			              id: id,
			              rRule: `FREQ=MONTHLY;COUNT=${count}`,
			              location: "FAST FUSION",
			              roomId: roomId
			            };
	        	}  
          }else{
          	object = {
              title: "Booked",
              startDate: dateObject_start,
              endDate: dateObject_end,
              id: id,
              location: "FAST FUSION",
              roomId: roomId
            };
	        }
	       list_pitch_one.push(object);
	      });
      setData_pitch_one(list_pitch_one);
    }
  }, [props.bookings])


  const [current, setCurrent] = useState('');
  React.useEffect(() => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var current_date = year + '-' + month + '-' + date;
    setCurrent(current_date);
  }, [props.bookings]);

  const fetching = () => {
    console.log("Refreshing....")
  };

   const get_new = (date) => {
   	// console.log(date)
    // handleDateChange(date)
    // handleDateChange_(date)
    // scroll.scrollMore(100);
  }

  const [type, setType] = useState(null);
  const handleSetType = (type) => {
  	setType(type)
  	// scroll.scrollToTop();
  	localStorage.setItem("booking_type", type)
  }
  
  return (
  	<div>
  	<div className="gradient__bg">
      <TopNav />
      <Banner />
      <Navbar />
	</div>
	<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
		 {type !== null ?  <PeopleIcon onClick={() => handleSetType(null)} style={{ color: "#042c54", cursor: 'pointer' }} /> : null} 
		 <div style={{ marginTop : "20px", marginLeft: "100px"}}>
			<p className={classes.title} >Book a pitch</p>
			{type !== null ? <p className={classes.title2} >Double click on a cell you want to book</p> : null} 
		 </div>
	</div>
	{
		type !== null ? 
		(
			<div>
			<div className={classes.schedule_grid}>
				{data_pitch_one !== null && type !== "Basket Ball" && type !== "Net Ball" ? (
					<div>
					    <div style={{ marginLeft : "20px" , width: "300px" }}>
					    <div style={{ marginTop : "20px"}}>
							<p className={classes.sub_title} >Pitch 1</p>
						</div>
					      <Schedule 
					        data={data_pitch_one} 
					        current={current} 
					        location={"Pitch 1"}
					        fetch={fetching} 
					        get_new={get_new} 
					      />
					    </div>
				    </div>
				  ) : <div>{type !== "Basket Ball" && type !== "Net Ball" ? <img src={load} height="130" width="130" /> : null }</div>}

				{data_pitch_two !== null && type !== "Basket Ball" && type !== "Net Ball"? (
					<div>
					    <div style={{ marginLeft : "20px" , width: "300px" }}>
					    <div style={{ marginTop : "20px"}}>
							<p className={classes.sub_title} >Pitch 2</p>
						</div>
					      <Schedule 
					        data={data_pitch_two} 
					        current={current} 
					        fetch={fetching} 
					        location={"Pitch 2"}
					        get_new={get_new} 
					      />
					    </div>
				    </div>
				  ) :<div>
							{type !== "Basket Ball"  && type !== "Net Ball"? 
							  <div>
							  	<div className={classes.title2}>Loading calendar</div>
							    <img src={load} height="130" width="130" />
							  </div> : null}
						</div>}

				{data_pitch_three !== null && type !== "Basket Ball"  && type !== "Net Ball"? (
					<div>
					  <div style={{ marginLeft : "20px" , width: "300px" }}>
					   <div style={{ marginTop : "20px"}}>
							<p className={classes.sub_title} >Pitch 3</p>
						 </div>
					      <Schedule 
					        data={data_pitch_three} 
					        current={current} 
					        fetch={fetching} 
					        location={"Pitch 3"}
					        get_new={get_new} 
					      />
					    </div>
				    </div>
				  ) : 
				<div>
					{type !== "Basket Ball"  && type !== "Net Ball"? <img src={load} height="130" width="130" /> : null }
				</div>}
				{
					type === "Basket Ball" || type === "Net Ball"  ? (
						<div>
							{data_tusker !== null && (type === "Basket Ball" || type === "Net Ball") ? (
								<div>
								  <div style={{ marginLeft : "20px" , width: "400px" }}>
								   <div style={{ marginTop : "20px"}}>
										<p className={classes.sub_title} >Tusker Court</p>
									 </div>
								      <Schedule 
								        data={data_tusker} 
								        current={current} 
								        fetch={fetching} 
								        location={"Tusker Court"}
								        get_new={get_new} 
								      />
								    </div>
							    </div>
							  ) : 
							<div>
						    <img src={load} height="130" width="130" />
							</div>}
						</div>) : null
			      }	

			</div>
			<div className={classes.back_div}>
				<p onClick={() => handleSetType(null)} className={classes.title_sub}>{"<"} Back to list</p>
			</div>
			</div>
		): 
		(
			<div className={classes.schedule_grid_list}>
				<div style={{ marginRight: "200px"}}>
					<div>
						<div style={{ marginTop : "20px"}}>
							<p onClick={() => handleSetType("Soccer")} className={classes.title_sub}>> Soccer</p>
						</div>
						<div style={{ marginTop : "20px"}}>
							<p onClick={() => handleSetType("Woodball")} className={classes.title_sub}>> Woodball</p>
						</div>
						<div style={{ marginTop : "20px"}}>
							<p onClick={() => handleSetType("Hockey")} className={classes.title_sub}>> Hockey</p>
						</div>
						<div style={{ marginTop : "20px"}}>
							<p onClick={() => handleSetType("Volley Ball")} className={classes.title_sub}>> Volley ball</p>
						</div>
						<div style={{ marginTop : "20px"}}>
							<p onClick={() => handleSetType("Net Ball")} className={classes.title_sub}>> Net ball</p>
						</div>
						<div style={{ marginTop : "20px"}}>
							<p onClick={() => handleSetType("Basket Ball")} className={classes.title_sub}>> Basket Ball</p>
						</div>
					</div>
				</div>
			</div>
		)
	}

    <Footer />
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
})(BookPitch);


  // props.bookings.filter((availability) => {
	 //        // console.log(availability)
	 //        const id = availability.id;
	 //        const end_time = availability.end_time;
	 //        const start_time = availability.start_time;
	 //        const start_date = availability.start_date;
	 //        const end_date = availability.end_date;

	 //        var dateString_start = start_date + ' ' + start_time;
	 //        var reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
	 //        var dateArray = reggie.exec(dateString_start);
	 //        var dateObject_start = new Date(+dateArray[1],+dateArray[2] - 1, +dateArray[3],
	 //          +dateArray[4],+dateArray[5],+dateArray[6]);

	 //        // var dateString_start_endtime = start_date + ' ' + end_time;
	 //        // var reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
	 //        // var dateArray = reggie.exec(dateString_start);
	 //        // var dateObject_start = new Date(+dateArray[1],+dateArray[2] - 1, +dateArray[3],
	 //        //   +dateArray[4], +dateArray[5], +dateArray[6]);

	 //        var dateString_end = end_date + ' ' + end_time;
	 //        var reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
	 //        var dateArray = reggie.exec(dateString_end);
	 //        var dateObject_end = new Date(+dateArray[1],+dateArray[2] - 1, +dateArray[3],
	 //          +dateArray[4],+dateArray[5],+dateArray[6]);

	        
	       
	 //        let object;
	 //         object = {
	 //              title: "Not Available",
	 //              startDate: dateObject_start,
	 //              endDate: dateObject_end,
	 //              id: id,
	 //              location: "FAST FUSION"
	 //            };
	 //        list.push(object);
	 //       // if(recur === true){
	 //          // if(availability.interval === "weekly"){
	 //          //   const count = getWeeklyDates(start_date, end_date).length
	 //          //   object = {
	 //          //     title: "Not Available",
	 //          //     startDate: dateObject_start,
	 //          //     endDate: dateString_start_endtime,
	 //          //     id: id,
	 //          //     rRule: `FREQ=WEEKLY;COUNT=${count}`,
	 //          //     location: "FAST FUSION"
	 //          //   }
	 //          //   list.push(object);
	 //          // }else if(availability.interval === "biweekly"){
	 //          //   const count = getBiWeeklyDates(start_date, end_date).length
	 //          //   object = {
	 //          //     title: "Not Available",
	 //          //     startDate: dateObject_start,
	 //          //     endDate: dateString_start_endtime,
	 //          //     id: id,
	 //          //     rRule: `FREQ=WEEKLY;COUNT=${count};INTERVAL=2`,
	 //          //     location: "FAST FUSION"
	 //          //   }
	 //          //   list.push(object);
	 //          // }
	 //          // else if(availability.interval === "monthly"){
	 //          //   const count = getMonthlyDates(start_date, end_date).length
	 //          //   object = {
	 //          //     title: "Not Available",
	 //          //     startDate: dateObject_start,
	 //          //     endDate: dateString_start_endtime,
	 //          //     id: id,
	 //          //     rRule: `FREQ=MONTHLY;COUNT=${count}`,
	 //          //     location: "FAST FUSION"
	 //          //   }
	 //          //   list.push(object);
	 //          // }else if(availability.interval === "annually"){
	 //          //   const count = getYearlyDates(start_date, end_date).length
	 //          //   object = {
	 //          //       title: "Not Available",
	 //          //       startDate: dateObject_start,
	 //          //       endDate: dateString_start_endtime,
	 //          //       id: id,
	 //          //       rRule: `FREQ=YEARLY;COUNT=${count}`,
	 //          //       location: "FAST FUSION"
	 //          //     }
	 //          //   list.push(object);
	 //          // }else {
	 //          //   object = {
	 //          //     title: "Not Available",
	 //          //     startDate: dateObject_start,
	 //          //     endDate: dateObject_end,
	 //          //     id: id,
	 //          //     location: "FAST FUSION"
	 //          //   };
	 //          //   list.push(object);
	 //          // }
	 //        // }else{
	 //            // object = {
	 //            //   title: "Not Available",
	 //            //   startDate: dateObject_start,
	 //            //   endDate: dateObject_end,
	 //            //   id: id,
	 //            //   location: "FAST FUSION"
	 //            // };
	 //            // list.push(object);
	 //      //   }
	 //      });

	 	  // props.bookings.filter((availability) => {
	    //     // console.log(availability)
	    //     const id = availability.id;
	    //     const end_time = availability.end_time;
	    //     const start_time = availability.start_time;
	    //     const start_date = availability.start_date;
	    //     const end_date = availability.end_date;

	    //     var dateString_start = start_date + ' ' + start_time;
	    //     var reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
	    //     var dateArray = reggie.exec(dateString_start);
	    //     var dateObject_start = new Date(+dateArray[1],+dateArray[2] - 1, +dateArray[3],
	    //       +dateArray[4],+dateArray[5],+dateArray[6]);

	    //     var dateString_end = end_date + ' ' + end_time;
	    //     var reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
	    //     var dateArray = reggie.exec(dateString_end);
	    //     var dateObject_end = new Date(+dateArray[1],+dateArray[2] - 1, +dateArray[3],
	    //       +dateArray[4],+dateArray[5],+dateArray[6]);

	    //     let object;
	    //      object = {
	    //           title: "Not Available",
	    //           startDate: dateObject_start,
	    //           endDate: dateObject_end,
	    //           id: id,
	    //           location: "FAST FUSION"
	    //         };
	    //     list.push(object);
	    //   });