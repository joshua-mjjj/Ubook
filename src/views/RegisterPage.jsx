import React, { useState } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

import {
  register,
  loadUser,
} from "../actions/auth.js";

import { clear_state_error } from "../actions/errors.js";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from '@material-ui/icons/Close';

import logo from "../assets/lock-reset.svg";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Box } from "@material-ui/core";
import load from "../assets/loading.gif";
import { CTA, Brand, Navbar, Banner, TopNav, Showcase } from '../components';
import { Footer } from '../containers';

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
  alreadyText: {
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '22px',
    letterSpacing: '0.4px',
    color: '#000000',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& a': {
      fontFamily: 'Manrope',
      color: '#327287',
      fontWeight: '600',
      textDecoration: 'none',
      fontSize: '14px',
      lineHeight: '22px',
    },
    '& span': {
      color: '#327287',
      textDecoration: 'none',
      cursore: 'pointer'
    }
  },
}));

function SignInPage(props) {
  const classes = useStyles();

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [register_success, setRegisterSuccess] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    // Request Body
    const account_type = "Client"
    const body = JSON.stringify({ username, password, email, account_type });

    props.register(body);
  };

  React.useEffect(() => {
    if (props.auth.register_success) {
      setRegisterSuccess(true)
    }
  }, [props, props.auth.register_success]);

  React.useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.loadUser();
    }
  }, [props, props.auth.isAuthenticated]);

  let alert;
  if (props.errors.msg) {
    let msg;
    if (props.errors.msg.non_field_errors) {
      msg = props.errors.msg.non_field_errors;
      alert = (
        <div className="alerts">
          <Alert severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  props.clear_state_error();
                }}>
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }>{msg}</Alert>
        </div>
      );
    }
    if (props.errors.msg.username) {
      msg = props.errors.msg.username;
      alert = (
        <div className="alerts">
          <Alert severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  props.clear_state_error();
                }}>
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }>{msg}</Alert>
        </div>
      );
    }
  }

  let success;
  success = (
        <div className="alerts">
          <Alert severity="success"
            // action={
            //   <IconButton
            //     aria-label="close"
            //     color="inherit"
            //     size="small"
            //     onClick={() => {
            //       props.clear_state_error();
            //     }}>
            //     <CloseIcon fontSize="inherit" />
            //   </IconButton>
            // }
            >
            You have successfully signed up on Ubook! 
            <span 
              style={{ color: 'red', cursor: 'pointer'}} 
              onClick={() => window.location.href = "/login"} > Sign in </span>
             here.</Alert>
        </div>
      );

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
  	<div>
  	<div className="gradient__bg">
      <TopNav />
     {/* <Banner />*/}
      <Navbar />
	</div>
    <Box>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={6}
          md={5}
          xl={4}
          component={Paper}
          elevation={6}
          square
          className={classes.rootGrid}
        >
          <div className={classes.paper}>
              <img
                src={logo}
                alt="Signup Logo"
                onClick={(e) => (window.location.href = "/")}
                width="70"
              />
      		<div>
      			<p style={{ 
      				fontWeight: 700,
      				fontSize: '30px',
      				fontFamily: 'Manrope',
      				textAlign: 'center'
      			}} >Sign up as a client</p>
      		</div>
           {/* <Typography component="h1" variant="h5" className={classes.title}>
              
            </Typography>*/}
            <form className={classes.form} noValidate>
              <div className={classes.signWrap}>
                <Grid item xs={12}>
                  <div className={classes.message}>{alert}</div>
                </Grid>
                {register_success ? <Grid item xs={12}>
                  <div className={classes.message}>{success}</div>
                </Grid>: null}
                

                <div style={{ marginBottom : "10px" }}>
                	<TextField
	                  variant="outlined"
	                  className={classes.input}
	                  required
	                  fullWidth
	                  id="username"
	                  label="Username"
	                  name="username"
	                  // autoComplete="username"
	                  size="small"
	                  autoFocus
	                  onChange={(e) => setUsername(e.target.value)}
	                />
                </div>

                <div style={{ marginBottom : "10px" }}>
                  <TextField
                    variant="outlined"
                    className={classes.input}
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    // autoComplete="username"
                    size="small"
                    autoFocus
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div style={{ marginBottom : "10px" }}>
                	<TextField
	                  variant="outlined"
	                  className={classes.input}
	                  size="small"
	                  required
	                  fullWidth
	                  name="password"
	                  label="Password"
	                  type={showPassword ? "text" : "password"}
	                  id="password"
	                  // autoComplete="current-password"
	                  onChange={(e) => setPassword(e.target.value)}
	                  InputProps={{
	                    endAdornment: (
	                      <InputAdornment position="end">
	                        <IconButton
	                          aria-label="Toggle password visibility"
	                          onClick={handleClickShowPassword}
	                          onMouseDown={handleMouseDownPassword}
	                        >
	                          {showPassword ? <Visibility /> : <VisibilityOff />}
	                        </IconButton>
	                      </InputAdornment>
	                    ),
	                  }}
                  />
                </div>
                <div>
                	<Button
	                  id="submit"
	                  // type="submit"
	                  fullWidth
	                  variant="contained"
	                  color="primary"
	                  style={{
	                  	background: "#042c54"
	                  }}
	                  className={classes.submit}
	                  // onClick={() => window.location.href = "/dashboard"}
                    onClick={handleRegister}
	                >
	                 <p style={{
	                 	// fontWeight: 'bold'
	                 	fontWeight: 500,
    	      				fontSize: '20px',
    	      				fontFamily: 'Manrope'
	                 }} >{props.auth.register_loading ? 
                      <img src={load} height="130" width="130" />
                     : "Sign up"}</p>
                   </Button>
                </div>
                 
               {/* <Grid container>
                  <Grid item xs>
                    <Link
                      className={classes.fogot}
                      id="forgotLink"
                      href="/forgot_password"
                      variant="body2"
                    >
                      Forgot your password?
                    </Link>
                  </Grid>
                </Grid>*/}
                <Grid item>
                  <p className={classes.alreadyText}>
                    Already have an account?&nbsp;
                    <Link href="/login" id="signupLink" variant="body2">
                      {"Sign In"}
                    </Link>
                    &nbsp;now!
                  </p>
                </Grid>
              </div>
            </form>
          </div>
        </Grid>
      </Grid>
    </Box>
    <Footer />
  </div>
  );
}


const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {
  register,
  clear_state_error,
  loadUser
})(SignInPage);

