import * as React from 'react';
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
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

import {
  create_booking,
  toggle_back
} from "../../actions/bookings.js";

import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';

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
    border: '1px solid #cfd7de',
    borderRadius: '5px',
    padding: "1px",
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
  

  const [start_date, setStartDate] = React.useState(null);
  const [end_date, setEndDate] = React.useState(null);
  const [start_time, setStartTime] = React.useState(null);
  const [end_time, setEndTime] = React.useState(null);

  const [contact] = React.useState(localStorage.getItem("auto_fill_contact"));
  const [email] = React.useState(localStorage.getItem("auto_fill_email"));
  const [name] = React.useState(localStorage.getItem("auto_fill_name"));


  const [booking_type] = React.useState(localStorage.getItem("booking_type"));
  const [location] = React.useState(props.location !== null ? props.location : localStorage.getItem("pitch_location"));
  const [minutes, setMinutes] = React.useState(0);
  const [show_alert, showAlert] = React.useState(false);

  const make_booking = () => {
  	const data_object = {
  		"customer_contact" : contact,
  		"customer_name" : name,
  		"customer_email" : email,
  		"booking_type": booking_type,
  		"venue": "FAST SPORTS FUSION UG",
  		"court_location": location,
  		"start_date": start_date,
  		"end_date": start_date,
  		"start_time": start_time,
  		"end_time": end_time,
  		"duration": minutes,
  		"block_booking": false,
  		"cost": 0,
  		"blocked_off": false,
      "verified_by": null
  	}
  	if(end_time === null){
  		showAlert(true)
  		console.log("Please select a duration by clicking on one of the button above.")
  	}else if(contact && booking_type && location && start_date && start_time && end_time && minutes){
  		// console.log(data_object)
  		props.create_booking(data_object)
  	}
  }

{
  // "customer_contact": "string",
  // "customer_name": "string",
  // "customer_email": "string",
     //  "booking_type": "Hockey",
  // "venue": "string",
 //  "court_location": "Pitch 1",
  // "start_date": "2022-06-22",
  // "end_date": "2022-06-22",
  // "start_time": "string",
  // "end_time": "string",
  // "duration": "string",
  // "block_booking": true,
  // "cost": 0,
  // "blocked_off": true
}

  const handleDuration = (value) => {
  	setMinutes(value)
	const endTime = moment(start_time, 'HH:mm').add(value, 'minutes').format('HH:mm');
	setEndTime(endTime)
  };


  React.useEffect(() => {
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

  return (
    <div>
      <div className="gpt3__cta-btn">
	      {/*<button variant="outlined" onClick={handleClickOpen}>
	        Contact Us
	      </button>*/}
	    </div>
      <BootstrapDialog
        disableEnforceFocus
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        <div style={{ display: 'flex', margin: "0px" }}>
	         <div style={{ flexGrow: 1,  margin: "0px"  }}>
		         <div className="gpt3__cta-content_button_text">
			       <span style={{ fontSize: '20px' }} >Book this slot</span>
			     </div>
			 </div>
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

	     <div className="gpt3__cta-content_button_text">
	       <span style={{ fontSize: '13px' }} >Select/click on desired duration</span>
	     </div>

	    <Button variant="outlined" color="primary" style={{ margin: "5px", background: `${minutes === 30 ? '#c2cace' : '' }` }} autoFocus onClick={() => handleDuration(30)}>
         <div className="gpt3__cta-content_button">
	       <span>30 minutes</span>
	     </div>
        </Button>
       <Button variant="outlined" color="primary" style={{ margin: "5px", background: `${minutes === 60 ? '#c2cace' : '' }` }} autoFocus onClick={() => handleDuration(60)}>
         <div className="gpt3__cta-content_button">
	       <span>1 hr</span>
	     </div>
        </Button>
        <Button variant="outlined" color="primary" style={{ margin: "5px", background: `${minutes === 90 ? '#c2cace' : '' }` }} autoFocus onClick={() => handleDuration(90)}>
         <div className="gpt3__cta-content_button">
	       <span>1 & 1/2 hrs</span>
	     </div>
        </Button>
        <Button variant="outlined" color="primary" style={{ margin: "5px", background: `${minutes === 120 ? '#c2cace' : '' }` }} autoFocus onClick={() => handleDuration(120)}>
         <div className="gpt3__cta-content_button">
	       <span>2 hrs</span>
	     </div>
        </Button>
        <Button variant="outlined" color="primary" style={{ margin: "5px", background: `${minutes === 150 ? '#c2cace' : '' }` }} autoFocus onClick={() => handleDuration(150)}>
         <div className="gpt3__cta-content_button">
	       <span>2 & 1/2 hrs</span>
	     </div>
        </Button>
        <Button variant="outlined" color="primary" style={{ margin: "5px", background: `${minutes === 180 ? '#c2cace' : '' }` }} autoFocus onClick={() => handleDuration(180)}>
         <div className="gpt3__cta-content_button">
	       <span>3 hrs</span>
	     </div>
        </Button>
        <Button variant="outlined" color="primary" style={{ margin: "5px", background: `${minutes === 210 ? '#c2cace' : '' }` }} autoFocus onClick={() => handleDuration(210)}>
         <div className="gpt3__cta-content_button">
	       <span>3 & 1/2 hrs</span>
	     </div>
        </Button>
        <Button variant="outlined" color="primary" style={{ margin: "5px", background: `${minutes === 240 ? '#c2cace' : '' }` }} autoFocus onClick={() => handleDuration(240)}>
         <div className="gpt3__cta-content_button">
  	       <span>4 hrs</span>
  	     </div>
        </Button>
        <Button variant="outlined" color="primary" style={{ margin: "5px", background: `${minutes === 270 ? '#c2cace' : '' }` }} autoFocus onClick={() => handleDuration(270)}>
         <div className="gpt3__cta-content_button">
           <span>4 & 1/2 hrs</span>
         </div>
        </Button>
        <Button variant="outlined" color="primary" style={{ margin: "5px", background: `${minutes === 300 ? '#c2cace' : '' }` }} autoFocus onClick={() => handleDuration(300)}>
         <div className="gpt3__cta-content_button">
           <span>5 hrs</span>
         </div>
        </Button>

         {
         	props.booking_created ? 
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
	            }>{"Your booking has successfully been created. Our team will reach out to you very soon."}</Alert>
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
                  value={start_time}
                  disableUnderline
                  type="text"
                  fullWidth
                  // onChange={(e) => setStartTime(e.target.value)}
                  placeholder="Start time"
                  inputProps={{ 'aria-label': 'amount' }}
                  className={classes.inputSmall}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel component="label" className={classes.formLabel}>
                 <div className="gpt3__cta-content_button_text">
			       <span style={{ fontSize: '15px' }} >Day</span>
			     </div>
                </FormLabel>
                <Input
                  id="amount"
                  value={start_date}
                  disableUnderline
                  type="text"
                  fullWidth
                  placeholder="Day"
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
                  value={end_time}
                  disableUnderline
                  type="text"
                  fullWidth
                  placeholder="End time"
                  inputProps={{ 'aria-label': 'amount' }}
                  className={classes.inputSmall}
                />
              </Grid>
               <Grid item xs={12} md={6}>
                <FormLabel component="label" className={classes.formLabel}>
                  <div className="gpt3__cta-content_button_text">
			       <span style={{ fontSize: '15px' }} >Contact</span>
			     </div>
                </FormLabel>
                <Input
                  id="contact"
                  value={contact}
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
			       <span style={{ fontSize: '15px' }} >Booking Type</span>
			     </div>
                </FormLabel>
                <Input
                  id="booking_type"
                  value={booking_type}
                  disableUnderline
                  type="text"
                  fullWidth
                  placeholder="Booking type"
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
                <Input
                  id="location"
                  value={location}
                  disableUnderline
                  type="text"
                  fullWidth
                  placeholder="Location"
                  inputProps={{ 'aria-label': 'amount' }}
                  className={classes.inputSmall}
                />
              </Grid> 
              {
              	email !== null ? 
	            (  <Grid item xs={12} md={6}>
	                <FormLabel component="label" className={classes.formLabel}>
	                  <div className="gpt3__cta-content_button_text">
				       <span style={{ fontSize: '15px' }} >Email</span>
				     </div>
	                </FormLabel>
	                <Input
	                  id="location"
	                  value={email}
	                  disableUnderline
	                  type="text"
	                  fullWidth
	                  placeholder="Location"
	                  inputProps={{ 'aria-label': 'amount' }}
	                  className={classes.inputSmall}
	                />
	              </Grid> ) : null}
	            {
	              	name !== null ? 
		            (  <Grid item xs={12} md={6}>
		                <FormLabel component="label" className={classes.formLabel}>
		                  <div className="gpt3__cta-content_button_text">
					       <span style={{ fontSize: '15px' }} >Name</span>
					     </div>
		                </FormLabel>
		                <Input
		                  id="location"
		                  value={name}
		                  disableUnderline
		                  type="text"
		                  fullWidth
		                  placeholder="Location"
		                  inputProps={{ 'aria-label': 'amount' }}
		                  className={classes.inputSmall}
		                />
		              </Grid> ) : null}
              
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
          	onClick={make_booking}
          >
            <div className="gpt3__cta-content_button">
		      <span>{props.loading  === true ? 
                      <div style={{}}><img src={load} height="20" width="20" /></div>
                     : "Book"}
              </span>
		    </div>
            {/*{props.tips_payments.isLoading_tips_payments === true ? (
              <div style={{ marginLeft: '5px', marginTop: '3px' }}>
                <img src={Spinner} alt="" height="18px" width="18px" />
              </div>
            ) : null}*/}
          </Button>
          <Button 
	          	variant="outlined" 
	          	color="primary"
	          	autoFocus 
	          	onClick={handleBack}>
             <div className="gpt3__cta-content_button">
		       <span>Back</span>
		    </div>
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  bookings: state.bookings.bookings,
  loading: state.bookings.create_booking_loading,
  booking_created: state.bookings.booking_created,
});

export default connect(mapStateToProps, {
  create_booking,
  toggle_back
})(BookingForm);