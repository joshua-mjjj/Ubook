import * as React from 'react';
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import { styled, withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import './bookingform.css';
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import load from "../../assets/home_load.gif"; 
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import {
  create_booking,
  toggle_back,
  get_booking_details,
  update_booking,
  cancel_booking,
} from "../../actions/bookings.js";

import FormLabel from '@material-ui/core/FormLabel';

import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import moment from "moment"

import * as Scroll from 'react-scroll';

var scroll = Scroll.animateScroll;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(4),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


const useStyles = makeStyles(() => ({
  inputSmall: {
    fontSize: '13px',
    color: '#1b1f23',
    border: '2px solid #cfd7de',
    borderRadius: '5px',
    padding: "7px",
    marginTop: "10px",
    '&::after': {
      borderBottom: '1.5px solid #949494'
    }
  },
  formLabel: {
    fontSize: '13px',
    color: 'rgba(0, 0, 0, 0.5)',
    fontWeight: '600',
    marginBottom: "10px"
  },
  contain: {
    marginLeft: '0px',
  },
  inputSelect: {
    fontSize: '13px',
    color: '#1b1f23',
    border: '2px solid #cfd7de',
    borderRadius: '5px',
    padding: "7px",
    width: '100%',
    marginTop: "10px",
    '&::after': {
      borderBottom: '1.5px solid #949494'
    }
  },
  labels: {
     color : '#FF5722', 
     fontWeight: '800',
     fontFamily: 'Dosis'
  }
}));

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#006600' : 'gray',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#006600' : 'gray',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));


const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {/*{onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}*/}
    </DialogTitle>
  );
};

function BookingForm(props) {
  const [open, setOpen] = React.useState(true);
  const classes = useStyles();

  const [send_email, setSendEmail] = React.useState(false);
  const [partial, setPartial] = React.useState(props.booking_details ? props.booking_details.partial_payment : false);
  const [balance, setBalance] = React.useState(props.booking_details ? props.booking_details.balance : null);
  const [additional_info, setAdditional] = React.useState(props.booking_details ? props.booking_details.additional_info : null);

// partial_payment
// balance
// additional_info

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    props.onHide(true)
  };

  const handleBack = () => {
    setOpen(false);
    props.onBack()
  };
  

  const [start_date, setStartDate] = React.useState(props.booking_details ? props.booking_details.start_date : null);
  const [end_date, setEndDate] = React.useState(props.booking_details ? props.booking_details.end_date : null);
  const [start_time, setStartTime] = React.useState(props.booking_details ? props.booking_details.start_time : null);
  const [end_time, setEndTime] = React.useState(props.booking_details ? props.booking_details.end_time : null);

  const [contact, setContact] = React.useState(props.booking_details ? props.booking_details.customer_contact : null);
  const [email, setEmail] = React.useState(props.booking_details ? props.booking_details.customer_email : null);
  const [name, setName] = React.useState(props.booking_details ? props.booking_details.customer_name : null);


  const [booking_type, setBooking_type] = React.useState(props.booking_details ? props.booking_details.booking_type : null);
  const [location, setLocation] = React.useState(props.booking_details ? props.booking_details.court_location : null);
  const [minutes, setMinutes] = React.useState(props.booking_details ? props.booking_details.duration : null);
  const [verifed, setVerified] = React.useState(props.booking_details ? props.booking_details.blocked_off : null);
  const [cost, setCost] = React.useState(props.booking_details ? props.booking_details.cost : null);
  const [interval, setInterva] = React.useState(props.booking_details ? props.booking_details.interval : null);
  const [show_alert, showAlert] = React.useState(false);

  const make_booking = () => {
  	let end_time_set;
  	if(end_time === null){
  		end_time_set = props.booking_details.end_time;
  	}else{
  		end_time_set = end_time
  	}

  	let start_time_set;
  	if(start_time === null){
  		start_time_set = props.booking_details.start_time;
  	}else{
  		start_time_set = start_time
  	}

  	let start_date_set;
  	if(start_date === null){
  		start_date_set = props.booking_details.start_date;
  	}else{
  		start_date_set = start_date
  	}

  	let booking_type_set;
  	if(booking_type === null){
  		booking_type_set = props.booking_details.booking_type;
  	}else{
  		booking_type_set = booking_type
  	}

  	let court_location_set;
  	if(location === null){
  		court_location_set = props.booking_details.court_location;
  	}else{
  		court_location_set = location
  	}

  	let contact_set;
  	if(contact === null){
  		contact_set = props.booking_details.customer_contact;
  	}else{
  		contact_set = contact
  	}

    let name_set;
    if(name === null){
      name_set = props.booking_details.customer_name;
    }else{
      name_set = name
    }

    let email_set;
    if(email === null){
      email_set = props.booking_details.customer_email;
    }else{
      email_set = email
    }

    let cost_set;
    if(cost === null){
      cost_set = props.booking_details.cost;
    }else{
      cost_set = cost
    }

    let blocked_off_set;
    if(verifed === null){
      blocked_off_set = props.booking_details.blocked_off;
    }else{
      blocked_off_set = verifed
    }

    let duration_set = 0;
    if(start_time_set && end_time_set){
      duration_set = moment.utc(`${end_time_set}`, 'HH:mm:ss').diff(moment.utc(`${start_time_set}`, 'HH:mm:ss'), 'minutes')
    }

    let partial_set;
    partial_set = partial

    let balance_set;
    if(balance === null){
      balance_set = props.booking_details.balance;
    }else{
      balance_set = balance
    }

    let info_set;
    if(additional_info === null){
      info_set = props.booking_details.additional_info;
    }else{
      info_set = additional_info
    }
   
  	const data_object = {
  		  "customer_contact" : contact_set,
  		  "customer_name" : name_set,
  		  "customer_email" : email_set,
  		  "booking_type": booking_type_set,
  		  "venue": "FAST SPORTS FUSION UG",
  		  "court_location": court_location_set,
  		  "start_date": start_date_set,
  		  "end_date": start_date_set,
  		  "start_time": start_time_set,
  		  "end_time": end_time_set,
  		  "duration": duration_set,
  		  "block_booking": false,
  		  "cost": cost_set,
  		  "blocked_off": blocked_off_set,
        "verified_by": props.auth.user.username,
        "send_verification_email": send_email,
        "partial_payment": partial_set,
        "additional_info": info_set,
        "balance": balance_set,
  	}
  	// console.log(data_object)
    const get_id = localStorage.getItem("edit_booking_id")
    props.update_booking(data_object, get_id)
  }

  const make_block_booking = () => {
    let end_time_set;
    if(end_time === null){
      end_time_set = props.booking_details.end_time;
    }else{
      end_time_set = end_time
    }

    let start_time_set;
    if(start_time === null){
      start_time_set = props.booking_details.start_time;
    }else{
      start_time_set = start_time
    }

    let start_date_set;
    if(start_date === null){
      start_date_set = props.booking_details.start_date;
    }else{
      start_date_set = start_date
    }

    let end_date_set;
    if(end_date === null){
      end_date_set = props.booking_details.end_date;
    }else{
      end_date_set = end_date
    }

    let booking_type_set;
    if(booking_type === null){
      booking_type_set = props.booking_details.booking_type;
    }else{
      booking_type_set = booking_type
    }

    let interval_set;
    if(interval === null){
      interval_set = props.booking_details.interval;
    }else{
      interval_set = interval
    }


    let court_location_set;
    if(location === null){
      court_location_set = props.booking_details.court_location;
    }else{
      court_location_set = location
    }

    let contact_set;
    if(contact === null){
      contact_set = props.booking_details.customer_contact;
    }else{
      contact_set = contact
    }

    let name_set;
    if(name === null){
      name_set = props.booking_details.customer_name;
    }else{
      name_set = name
    }

    let email_set;
    if(email === null){
      email_set = props.booking_details.customer_email;
    }else{
      email_set = email
    }

    let cost_set;
    if(cost === null){
      cost_set = props.booking_details.cost;
    }else{
      cost_set = cost
    }

    let blocked_off_set;
    if(verifed === null){
      blocked_off_set = props.booking_details.blocked_off;
    }else{
      blocked_off_set = verifed
    }

    let duration_set = 0;
    if(start_time_set && end_time_set){
      duration_set = moment.utc(`${end_time_set}`, 'HH:mm:ss').diff(moment.utc(`${start_time_set}`, 'HH:mm:ss'), 'minutes')
    }

    let partial_set;
    partial_set = partial

    let balance_set;
    if(balance === null){
      balance_set = props.booking_details.balance;
    }else{
      balance_set = balance
    }

    let info_set;
    if(additional_info === null){
      info_set = props.booking_details.additional_info;
    }else{
      info_set = additional_info
    }
   
    const data_object = {
        "customer_contact" : contact_set,
        "customer_name" : name_set,
        "customer_email" : email_set,
        "booking_type": booking_type_set,
        "venue": "FAST SPORTS FUSION UG",
        "court_location": court_location_set,
        "start_date": start_date_set,
        "end_date": end_date_set,
        "start_time": start_time_set,
        "end_time": end_time_set,
        "duration": duration_set,
        "interval": interval_set,
        "block_booking": true,
        "cost": cost_set,
        "blocked_off": blocked_off_set,
        "verified_by": props.auth.user.username,
        "send_verification_email": send_email,
        "partial_payment": partial_set,
        "additional_info": info_set,
        "balance": balance_set,
    }
    // console.log(data_object)
    const get_id = localStorage.getItem("edit_booking_id")
    props.update_booking(data_object, get_id)
  }

  const cancel = () => {
    let blocked_off_set;
    if(verifed === null){
      blocked_off_set = props.booking_details.blocked_off;
    }else{
      blocked_off_set = verifed
    }
    
    const get_id = localStorage.getItem("edit_booking_id")
    const data_object = {
        "cancelled" : true,
        "blocked_off": blocked_off_set
    }
    props.cancel_booking(data_object, get_id)
  }

  const handleDuration = (value) => {
  	setMinutes(value)
	const endTime = moment(start_time, 'HH:mm').add(value, 'minutes').format('HH:mm');
	setEndTime(endTime)
  };


  React.useEffect(() => {
  	const get_id = localStorage.getItem("edit_booking_id")
  	props.get_booking_details(get_id)
  	const start = localStorage.getItem("start_date_autofill")
  	const end = localStorage.getItem("end_date_autofill")

  	var get_start = new Date(start)
  	const get_start_time = `${get_start.getHours()}:${get_start.getMinutes()}`
  	const get_start_date = `${get_start.getFullYear()}-${get_start.getMonth() + 1}-${get_start.getDate()}`

     var dt = {
    'Date/Time': `${get_start_date} ${get_start_time}`
    };
    const get_start_time_formatted = moment(dt['Date/Time']).format('HH:mm');
    const get_start_date_formatted = moment(dt['Date/Time']).format('YYYY-MM-DD');
   	// console.log(get_start_time_formatted)
   	// console.log(get_start_date_formatted)
   	setStartTime(get_start_time_formatted)
   	setStartDate(get_start_date_formatted)
  }, [])

  const [is_block_booking, setBlock] = React.useState(false);
  React.useEffect(() => {
    if(props.booking_details){
      console.log(props.booking_details)
      if(props.booking_details.block_booking){
        // console.log(props.booking_details)
        setBlock(true)
      }
    }
  }, [props.booking_details])

  return (
    <div>
      <div className="gpt3__cta-btn">
	      {/*<button variant="outlined" onClick={handleClickOpen}>
	        Contact Us
	      </button>*/}
	    </div>
	{ props.booking_details !== null ? 
      <BootstrapDialog
        disableEnforceFocus
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        <div style={{ display: 'flex', margin: "0px" }}>
            {
              is_block_booking ? 
              (
                <div style={{ flexGrow: 1,  margin: "0px"  }}>
                 <div className="gpt3__cta-content_button_text">
                   <span style={{ fontSize: '20px', 'color': "#000066" }} >Edit block booking</span>
                   <span style={{ fontSize: '15px', 'color': "#000066" }} >Kindly maintain the data format as you edit</span>
                 </div>
                </div>
              ) : null
            }
            {
              is_block_booking === false ? 
              (
                <div style={{ flexGrow: 1,  margin: "0px"  }}>
                 <div className="gpt3__cta-content_button_text">
                   <span style={{ fontSize: '20px' }} >Edit Book this booking</span>
                   <span style={{ fontSize: '15px' }} >Kindly maintain the data format as you edit</span>
                 </div>
               </div>
              ) : null
            }

	         <IconButton
		          aria-label="close"
		          onClick={handleClose}
		          sx={{
		            position: 'absolute',
		            right: 8,
		            top: 8,
		            // color: (theme) => theme.palette.grey[500],
		          }} >
		          <CloseIcon />
		     </IconButton>
	    </div>

      <div style={{ flexGrow: 1,  margin: "0px"  }}>
       <div className="gpt3__cta-content_button_text">
         <span style={{ fontSize: '15px', color: "blue", fontWeight: 'bold' }} >Default Costs</span>
          <span style={{ fontSize: '15px', color: "blue" }} >DAILY: <span style={{ color: "red" }}>7:00 AM - 5:00 PM > Shs 50,000 Per Hour</span></span>
          <span style={{ fontSize: '15px', color: "blue" }} >DAILY: <span style={{ color: "red" }}>5:00 PM - 11:30 PM > Shs 80,000 Per Hour</span></span>
          <span style={{ fontSize: '15px', color: "blue" }} >WEEKENDS: <span style={{ color: "red" }}>Shs 80,000 Per Hour</span></span>
       </div>
      </div>
        {
         	props.booking_updated ? 
         	(
    			 <div>
  	          <Alert severity="success"
  	            action={
  	              <IconButton
  	                aria-label="close"
  	                color="inherit"
  	                size="small"
  	                onClick={props.toggle_back}>
  	                <CloseIcon fontSize="inherit" />
  	              </IconButton>
  	            }>{"This booking has successfully been updated."}</Alert>
  	         </div>
           	):null
	       }
         {
          props.booking_cancelled ? 
          (
           <div>
                <Alert severity="success"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={props.toggle_back}>
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }>{"This booking has been cancelled."}</Alert>
               </div>
              ):null
           }

	      {
         show_alert ? 
         	(
			     <div>
	          <Alert severity="info"
	            action={
	              <IconButton
	                aria-label="close"
	                color="inherit"
	                size="small"
	                onClick={() => {showAlert(false)}}>
	                <CloseIcon fontSize="inherit" />
	              </IconButton>
	            }>{"Please select a duration by clicking on one of the buttons above."}</Alert>
	         </div>
         	):null
         }

        </BootstrapDialogTitle>
         <DialogContent dividers className={classes.contain}>
           <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormLabel component="label" className={classes.formLabel}>
                 <div className="gpt3__cta-content_button_text">
      			       <span style={{ fontSize: '15px' }} >Start time</span>
      			     </div>
                </FormLabel>
                <Input
                  id="start_time"
                  defaultValue={props.booking_details.start_time}
                  disableUnderline
                  type="time"
                  fullWidth
                  onChange={(e) => setStartTime(e.target.value)}
                  placeholder="Start time"
                  inputProps={{ 'aria-label': 'amount' }}
                  className={classes.inputSmall}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel component="label" className={classes.formLabel}>
                 <div className="gpt3__cta-content_button_text">
                   <span style={{ fontSize: '15px' }} >End time</span>
                 </div>
                </FormLabel>
                <Input
                  id="amount"
                  defaultValue={props.booking_details.end_time}
                  onChange={(e) => setEndTime(e.target.value)}
                  disableUnderline
                  type="time"
                  fullWidth
                  placeholder="End time"
                  inputProps={{ 'aria-label': 'amount' }}
                  className={classes.inputSmall}
                />
              </Grid>
              {is_block_booking ? (<Grid item xs={12} md={6}>
                <FormLabel component="label" className={classes.formLabel}>
                 <div className="gpt3__cta-content_button_text">
                   <span style={{ fontSize: '15px' }} >Start date</span>
                 </div>
                </FormLabel>
                <Input
                  id="amount"
                  defaultValue={props.booking_details.start_date}
                  onChange={(e) => setStartDate(e.target.value)}
                  disableUnderline
                  type="date"
                  fullWidth
                  placeholder="Day"
                  inputProps={{ 'aria-label': 'amount' }}
                  className={classes.inputSmall}
                />
              </Grid>): null}

              {is_block_booking ? (<Grid item xs={12} md={6}>
                <FormLabel component="label" className={classes.formLabel}>
                 <div className="gpt3__cta-content_button_text">
                   <span style={{ fontSize: '15px' }} >End date</span>
                 </div>
                </FormLabel>
                <Input
                  id="amount"
                  defaultValue={props.booking_details.end_date}
                  onChange={(e) => setEndDate(e.target.value)}
                  disableUnderline
                  type="date"
                  fullWidth
                  placeholder="Day"
                  inputProps={{ 'aria-label': 'amount' }}
                  className={classes.inputSmall}
                />
              </Grid>): null}


              {is_block_booking === false ? (<Grid item xs={12} md={6}>
                <FormLabel component="label" className={classes.formLabel}>
                 <div className="gpt3__cta-content_button_text">
                   <span style={{ fontSize: '15px' }} >Day</span>
                 </div>
                </FormLabel>
                <Input
                  id="amount"
                  defaultValue={props.booking_details.start_date}
                  onChange={(e) => setStartDate(e.target.value)}
                  disableUnderline
                  type="text"
                  fullWidth
                  placeholder="Day"
                  inputProps={{ 'aria-label': 'amount' }}
                  className={classes.inputSmall}
                />
              </Grid>): null}

              {is_block_booking ? (<Grid item xs={12} md={6}>
                <FormLabel component="label" className={classes.formLabel}>
                  <div className="gpt3__cta-content_button_text">
                   <span style={{ fontSize: '15px' }} >Interval</span>
                 </div>
                </FormLabel>
                <Select
                  onChange={(e) => setInterva(e.target.value)}
                  disableUnderline
                  fullWidth
                  defaultValue={props.booking_details.interval}
                  autoComplete="booking_type"
                  displayEmpty
                  className={classes.inputSelect}
                  inputProps={{
                    'aria-label': 'Select booking_type'
                  }}
                > 
                  <MenuItem value="Daily">{"Daily"}</MenuItem>
                  <MenuItem value="Weekly">{"Weekly"}</MenuItem>
                  <MenuItem value="Bi-Weekly">{"Bi-Weekly"}</MenuItem>
                  <MenuItem value="Monthly">{"Monthly"}</MenuItem>
               </Select>
              </Grid>): null}
              
               <Grid item xs={12} md={6}>
                <FormLabel component="label" className={classes.formLabel}>
                  <div className="gpt3__cta-content_button_text">
      			       <span style={{ fontSize: '15px' }} >Contact</span>
      			     </div>
                </FormLabel>
                <Input
                  id="contact"
                  defaultValue={props.booking_details.customer_contact}
                  onChange={(e) => setContact(e.target.value)}
                  disableUnderline
                  type="text"
                  fullWidth
                  placeholder="Tel Contact"
                  inputProps={{ 'aria-label': 'amount' }}
                  className={classes.inputSmall}
                />
              </Grid>
               <Grid item xs={12} md={6}>
                <FormLabel component="label" className={classes.formLabel}>
                  <div className="gpt3__cta-content_button_text">
      			       <span style={{ fontSize: '15px' }} >Location</span>
      			     </div>
                </FormLabel>
                <Select 
	                onChange={(e) => setLocation(e.target.value)}
	                disableUnderline
	                fullWidth
	                defaultValue={props.booking_details.court_location}
	                autoComplete="location"
	                displayEmpty
	                className={classes.inputSelect}
	                inputProps={{
	                  'aria-label': 'Select location'
	                }}
	              >
	                <MenuItem value="Pitch 1">{"Pitch 1"}</MenuItem>
	                <MenuItem value="Pitch 2">{"Pitch 2"}</MenuItem>
	                <MenuItem value="Pitch 3">{"Pitch 3"}</MenuItem>
                  <MenuItem value="Tusker Court">{"Tusker Court"}</MenuItem>
	             </Select>
               {/* <Input
                  id="location"
                  value={location}
                  disableUnderline
                  type="text"
                  fullWidth
                  placeholder="Location"
                  inputProps={{ 'aria-label': 'amount' }}
                  className={classes.inputSmall}
                />*/}
              </Grid> 
	          <Grid item xs={12} md={6}>
                <FormLabel component="label" className={classes.formLabel}>
                  <div className="gpt3__cta-content_button_text">
			       <span style={{ fontSize: '15px' }} >Email</span>
			     </div>
                </FormLabel>
                <Input
                  id="email"
                  defaultValue={props.booking_details.customer_email}
                  onChange={(e) => setEmail(e.target.value)}
                  disableUnderline
                  type="text"
                  fullWidth
                  placeholder="Email"
                  inputProps={{ 'aria-label': 'amount' }}
                  className={classes.inputSmall}
                />
	          </Grid> 
		       <Grid item xs={12} md={12}>
                <FormLabel component="label" className={classes.formLabel}>
                  <div className="gpt3__cta-content_button_text">
			       <span style={{ fontSize: '15px' }} >Name</span>
			     </div>
                </FormLabel>
                <Input
                  id="email"
                  defaultValue={props.booking_details.customer_name}
                  onChange={(e) => setName(e.target.value)}
                  disableUnderline
                  type="text"
                  fullWidth
                  placeholder="Names"
                  inputProps={{ 'aria-label': 'amount' }}
                  className={classes.inputSmall}
                />
		       </Grid>
		        <Grid item xs={12} md={6}>
                <FormLabel component="label" className={classes.formLabel}>
                  <div className="gpt3__cta-content_button_text">
      			       <span style={{ fontSize: '15px', color: 'red' }} >Verified</span>
      			      </div>
                </FormLabel>
                <Select 
	                onChange={(e) => setVerified(e.target.value)}
	                disableUnderline
	                fullWidth
	                defaultValue={props.booking_details.blocked_off}
	                autoComplete="location"
	                displayEmpty
	                className={classes.inputSelect}
	                inputProps={{
	                  'aria-label': 'Select location'
	                }}
	              >
	                <MenuItem value={true}>{"Yes"}</MenuItem>
	                <MenuItem value={false}>{"No"}</MenuItem>
	             </Select>
               {/* <Input
                  id="location"
                  value={location}
                  disableUnderline
                  type="text"
                  fullWidth
                  placeholder="Location"
                  inputProps={{ 'aria-label': 'amount' }}
                  className={classes.inputSmall}
                />*/}
            </Grid> 
	          <Grid item xs={12} md={6}>
                <FormLabel component="label" className={classes.formLabel}>
                  <div className="gpt3__cta-content_button_text">
        			       <span style={{ fontSize: '15px' , color: 'red' }} >Cost(e.g 50000)</span>
        			    </div>
                </FormLabel>
                <Input
                  id="email"
                  defaultValue={props.booking_details.cost}
                  onChange={(e) => setCost(e.target.value)}
                  disableUnderline
                  type="text"
                  fullWidth
                  placeholder="Cost"
                  inputProps={{ 'aria-label': 'amount' }}
                  className={classes.inputSmall}
                />
	          </Grid> 
            {
              props.booking_details.send_verification_email ? 
              (
                <Grid item xs={12} md={6}>
                  <FormLabel component="label" className={classes.formLabel}>
                    <div className="gpt3__cta-content_button_text">
                       <span style={{ fontSize: '15px' , color: 'red' }} >Send Verification email</span>
                    </div>
                  </FormLabel>
                  <FormControlLabel 
                    control={<IOSSwitch checked={true} disabled />}
                    label="Sent Already"
                  />
                </Grid> 
              ):(
                 <Grid item xs={12} md={6}>
                    <FormLabel component="label" className={classes.formLabel}>
                      <div className="gpt3__cta-content_button_text">
                         <span style={{ fontSize: '15px' , color: 'red' }} >Send Verification email</span>
                      </div>
                    </FormLabel>
                    <FormControlLabel 
                      control={<IOSSwitch checked={send_email} onChange={() => {
                        setSendEmail(!send_email)
                      }} name="checkedB" />}
                      label={`${send_email ? "Send": "Don't send"}`}
                    />
                  </Grid> 
                )
            }
            <Grid item xs={12} md={6}>
              <FormLabel component="label" className={classes.formLabel}>
                <div className="gpt3__cta-content_button_text">
                   <span style={{ fontSize: '15px' , color: 'red' }}>Partial Payment</span>
                </div>
              </FormLabel>
              <FormControlLabel 
                control={<IOSSwitch checked={partial} onChange={() => {
                        setPartial(!partial)
                      }}  />}
                label=""
              />
            </Grid> 
            <Grid item xs={12} md={12}>
                <FormLabel component="label" className={classes.formLabel}>
                  <div className="gpt3__cta-content_button_text">
                     <span style={{ fontSize: '15px' , color: 'red' }} >Balance(e.g 50000)</span>
                  </div>
                </FormLabel>
                <Input
                  id="balance"
                  defaultValue={props.booking_details.balance}
                  onChange={(e) => setBalance(e.target.value)}
                  disableUnderline
                  disabled={!partial ? true : false}
                  type="text"
                  fullWidth
                  placeholder="Balance"
                  inputProps={{ 'aria-label': 'amount' }}
                  className={classes.inputSmall}
                />
            </Grid> 
            <Grid item xs={12} md={12}>
                <FormLabel component="label" className={classes.formLabel}>
                  <div className="gpt3__cta-content_button_text">
                     <span style={{ fontSize: '15px' }} >Additional Information</span>
                  </div>
                </FormLabel>
                <Input
                  id="balance"
                  defaultValue={props.booking_details.additional_info}
                  onChange={(e) => setAdditional(e.target.value)}
                  disableUnderline
                  type="text"
                  fullWidth
                  multiline
                  rows={2}
                  placeholder="Additional Information"
                  inputProps={{ 'aria-label': 'amount' }}
                  className={classes.inputSmall}
                />
            </Grid> 
              
            </Grid>
            <br/>
            {/*{props.messages.notify_timeout ? (
              <Grid item md={12} sm={12} xs={12}>
                <Alert
                  severity="success"
                  style={{ marginTop: '20px' }}
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        props.clear_error();
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }>
                  <div className={classes.message}>{alert}</div>
                </Alert>
              </Grid>
            ) : null}*/}

        </DialogContent>
        <DialogActions>
          <Button 
          	variant="outlined" 
          	autoFocus 
          	color="primary"
          	onClick={is_block_booking ? make_block_booking : make_booking}
          >
          <div className="gpt3__cta-content_button">
  		      <span>{props.update_loading  === true ? 
                    <div ><img src={load} height="20" width="20" /></div>
                   : "Edit"}
            </span>
  		    </div>
          </Button>
          <Button 
            variant="outlined" 
            autoFocus 
            color="primary"
            onClick={cancel}
          >
          <div className="gpt3__cta-content_button">
            <span>{props.cancel_booking_loading  === true ? 
                    <div ><img src={load} height="20" width="20" /></div>
                   : "Cancel booking"}
            </span>
          </div>
          </Button>
          {/*<Button 
	          	variant="outlined" 
	          	color="primary"
	          	autoFocus 
	          	onClick={handleBack}>
             <div className="gpt3__cta-content_button">
    		       <span>Delete</span>
    		    </div>
          </Button>
          <Button 
              variant="outlined" 
              color="primary"
              autoFocus 
              onClick={handleBack}>
             <div className="gpt3__cta-content_button">
               <span>Back</span>
            </div>
          </Button>*/}
        </DialogActions>
      </BootstrapDialog>
      : null }
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  bookings: state.bookings.bookings,
  booking_details: state.bookings.booking_details_calendar,
  update_loading: state.bookings.update_booking_loading,
  booking_updated: state.bookings.booking_updated,
  cancel_booking_loading: state.bookings.cancel_booking_loading,
  booking_cancelled: state.bookings.booking_cancelled,
});

export default connect(mapStateToProps, {
  create_booking,
  toggle_back,
  get_booking_details,
  update_booking,
  cancel_booking
})(BookingForm);