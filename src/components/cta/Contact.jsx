import * as React from 'react';

import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import './cta.css';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';


import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

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
    border: '1px solid #cfd7de',
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
    marginLeft: '10px',
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

export default function Contact() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="gpt3__cta-btn">
	      <button variant="outlined" onClick={handleClickOpen}>
	        Contact Us
	      </button>
	    </div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
         
         <div className="gpt3__cta-content_button_text">
	       <span style={{ fontSize: '20px' }} >Contact Us</span>
	     </div>
        </BootstrapDialogTitle>
         <DialogContent dividers className={classes.contain}>
           <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormLabel component="label" className={classes.formLabel}>
                 <div className="gpt3__cta-content_button_text">
			       <span style={{ fontSize: '15px' }} >First Name</span>
			     </div>
                </FormLabel>
                <Input
                  id="amount"
                  // value={amount}
                  disableUnderline
                  type="text"
                  fullWidth
                  placeholder="First Name"
                  inputProps={{ 'aria-label': 'amount' }}
                  className={classes.inputSmall}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel component="label" className={classes.formLabel}>
                 <div className="gpt3__cta-content_button_text">
			       <span style={{ fontSize: '15px' }} >Last Name</span>
			     </div>
                </FormLabel>
                <Input
                  id="amount"
                  // value={amount}
                  disableUnderline
                  type="text"
                  fullWidth
                  placeholder="Last Name"
                  inputProps={{ 'aria-label': 'amount' }}
                  className={classes.inputSmall}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel component="label" className={classes.formLabel}>
                 <div className="gpt3__cta-content_button_text">
			       <span style={{ fontSize: '15px' }} >Email</span>
			     </div>
                </FormLabel>
                <Input
                  id="amount"
                  // value={amount}
                  disableUnderline
                  type="text"
                  fullWidth
                  placeholder="Email"
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
                  id="amount"
                  // value={amount}
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
			       <span style={{ fontSize: '15px' }} > Address 1</span>
			     </div>
                </FormLabel>
                <Input
                  id="amount"
                  // value={amount}
                  disableUnderline
                  type="text"
                  fullWidth
                  placeholder="Address 1"
                  inputProps={{ 'aria-label': 'amount' }}
                  className={classes.inputSmall}
                />
              </Grid>
               <Grid item xs={12} md={6}>
                <FormLabel component="label" className={classes.formLabel}>
                  <div className="gpt3__cta-content_button_text">
			       <span style={{ fontSize: '15px' }} > Address 2</span>
			     </div>
                </FormLabel>
                <Input
                  id="amount"
                  // value={amount}
                  disableUnderline
                  type="text"
                  fullWidth
                  placeholder="Address 2"
                  inputProps={{ 'aria-label': 'amount' }}
                  className={classes.inputSmall}
                />
              </Grid> 
            </Grid>
            
            <br/>
            <Grid item xs={12}>
              <FormLabel component="label" className={classes.formLabel}>
                <div className="gpt3__cta-content_button_text">
			       <span style={{ fontSize: '15px' }} >Message</span>
			     </div>
              </FormLabel>
              <Input
                fullWidth
                id="description"
                name="description"
                disableUnderline
                // onChange={(e) => setDescription(e.target.value)}
                // value={description}
                multiline
                placeholder="Share your message here."
                rows="5"
                className={classes.inputSmall}
              />
            </Grid>

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
          	// onClick={make_payment}
          >
            {/*<span className={classes.labels}></span>*/}
            <div className="gpt3__cta-content_button">
		      <span>Submit</span>
		    </div>
            {/*{props.tips_payments.isLoading_tips_payments === true ? (
              <div style={{ marginLeft: '5px', marginTop: '3px' }}>
                <img src={Spinner} alt="" height="18px" width="18px" />
              </div>
            ) : null}*/}
          </Button>
          <Button 
	          	variant="outlined" 
	          	autoFocus 
	          	onClick={handleClose}>
             <div className="gpt3__cta-content_button">
		       <span>Close</span>
		    </div>
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
