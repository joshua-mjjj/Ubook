import React, { useState } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

import {
  login,
  loadUser,
} from "../../actions/auth.js";

import { clear_state_error } from "../../actions/errors.js";
import { get_bookings } from "../../actions/bookings.js";
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

import { makeStyles } from "@material-ui/core/styles";
import logo from "../../assets/lock.svg";
import load from "../../assets/loading.gif";

import Schedule from "../../views/booking/BookingsCalendar";
import { getWeeklyDates, getDailyDates, getBiWeeklyDates, getMonthlyDates } from "./utils/utilityFunctions"

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
		textAlign: 'left'
	},
	small_title: {
  	fontWeight: 700,
		fontSize: '15px',
		fontFamily: 'Manrope',
		textAlign: 'left'
	},
  schedule_grid: {
  	display: 'flex',
  	flexDirection: "row",
  	justifyContent: 'center',
  	alignItems: "center",
  	marginBottom: '50px',
  	marginTop: "5px"
  }
}));

function ScheduleContainer(props) {
  const classes = useStyles();

  React.useEffect(() => {
  	props.get_bookings()
  }, [])
  
  const [data, setData] = useState(null);
  const list = []

  React.useEffect(() => {
  	if(props.bookings !== null){
  	    props.bookings.filter((availability) => {
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
			              title: `${availability.booking_type} at ${availability.court_location}, ${availability.customer_contact}`,
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
			              title: `${availability.booking_type} at ${availability.court_location}, ${availability.customer_contact}`,
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
			              title: `${availability.booking_type} at ${availability.court_location}, ${availability.customer_contact}`,
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
			              title: `${availability.booking_type} at ${availability.court_location}, ${availability.customer_contact}`,
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
              title: `${availability.booking_type} at ${availability.court_location}, ${availability.customer_contact}`,
              startDate: dateObject_start,
              endDate: dateObject_end,
              id: id,
              location: "FAST FUSION",
              roomId: roomId
            };
	         }

	        list.push(object);
	      });
      setData(list);
      // console.log(list)
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

  return (
  	<div>
	<div style={{ marginTop : "10px"}}>
		<p className={classes.sub_title} >Bookings Calendar</p>
		<p className={classes.small_title}>Use this calender to create block bookings</p>
	</div>
		<div className={classes.schedule_grid}>

			{data !== null ? (
				<div>
				    <div >
				      <Schedule 
				        data={data} 
				        current={current} 
				        fetch={fetching} 
				        location={"Pitch 1"}
				        get_new={get_new} 
				      />
				    </div>
			    </div>
			  ) :<div>
					<div className={classes.title2}>Loading calendar</div>
					<img src={load} height="130" width="130" />
				</div>
			}
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
})(ScheduleContainer);


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