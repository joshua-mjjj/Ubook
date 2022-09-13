import * as React from "react";
import { connect } from "react-redux";
import { get_bookings } from "../../actions/bookings.js";

import {
  makeStyles,
  styled,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

import CssBaseline from "@material-ui/core/CssBaseline";
import MuiDrawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import MuiAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ViewModuleIcon from "@material-ui/icons/ViewColumn";
import Button from "@material-ui/core/Button";

// import ListItem from '@material-ui/core/ListItem';
import ListItemButton from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PeopleIcon from "@material-ui/icons/ArrowBack";
import Verify from "@material-ui/icons/CheckCircle";
import { FaHome } from "react-icons/fa";
import { FaTh } from "react-icons/fa";
import FilterTiltShiftIcon from "@material-ui/icons/FilterTiltShift";
import { FaCalendarWeek } from "react-icons/fa";
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
import Clients from "@material-ui/icons/People";
import { FaPortrait } from "react-icons/fa";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import WholeSchedule from "./ScheduleContainer";
import BookingSchedule from "./BookingSchedule";
import Notifications from "./Notifications";
import Properties from "./Properties";
import CancelledList from "./CancelledList";
import Home from "./Home";
import Profile from "./Profile";
import AddProperty from "./AddProperty.jsx";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Alternate Universe Tech
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(10),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(25),
      },
    }),
  },
}));

const mdTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#042c54",
    },
  },
});

const useStyles = makeStyles({
  list: {
    width: 200,
    border: "1px solid gray",
  },
  text: {
    fontWeight: "bold",
    fontFamily: "Manrope",
    fontSize: "15px",
  },
});

function DashboardContent(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [home, setHome] = React.useState(true);
  const [booking, setBooking] = React.useState(false);
  const [verified_booking, setVerified_Booking] = React.useState(false);
  const [canceled_booking, setCancelled_Booking] = React.useState(false);
  const [schedule, setSchedule] = React.useState(false);
  const [analytics, setAnalytics] = React.useState(false);
  const [clients, setClients] = React.useState(false);
  const [block_bookings, setBlock] = React.useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  React.useEffect(() => {
    props.get_bookings();
  }, []);

  const set_home = (e) => {
    setHome(true);
    setBooking(false);
    setSchedule(false);
    setVerified_Booking(false);
    setAnalytics(false);
    setClients(false);
    setCancelled_Booking(false);
    setBlock(false);
  };
  const set_booking = (e) => {
    setHome(false);
    setBooking(true);
    setSchedule(false);
    setVerified_Booking(false);
    setAnalytics(false);
    setClients(false);
    setCancelled_Booking(false);
    setBlock(false);
  };
  const set_schedule = (e) => {
    setHome(false);
    setBooking(false);
    setSchedule(true);
    setVerified_Booking(false);
    setAnalytics(false);
    setClients(false);
    setCancelled_Booking(false);
    setBlock(false);
  };
  const set_analytics = (e) => {
    setHome(false);
    setBooking(false);
    setSchedule(false);
    setAnalytics(true);
    setVerified_Booking(false);
    setClients(false);
    setCancelled_Booking(false);
    setBlock(false);
  };
  const set_verified = (e) => {
    setHome(false);
    setBooking(false);
    setSchedule(false);
    setVerified_Booking(true);
    setAnalytics(false);
    setClients(false);
    setCancelled_Booking(false);
    setBlock(false);
  };
  const set_clients = (e) => {
    setHome(false);
    setBooking(false);
    setSchedule(false);
    setVerified_Booking(false);
    setAnalytics(false);
    setClients(true);
    setCancelled_Booking(false);
    setBlock(false);
  };
  const set_cancelled = (e) => {
    setHome(false);
    setBooking(false);
    setSchedule(false);
    setVerified_Booking(false);
    setAnalytics(false);
    setClients(false);
    setCancelled_Booking(true);
    setBlock(false);
  };
  const set_block = (e) => {
    setHome(false);
    setBooking(false);
    setSchedule(false);
    setVerified_Booking(false);
    setAnalytics(false);
    setClients(false);
    setCancelled_Booking(false);
    setBlock(true);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar color="primary" position="absolute" open={open}>
          <div>
            <Toolbar>
              <Typography
                style={{
                  color: "#fff !important",
                  fontFamily: "Manrope",
                  fontWeight: 800,
                  flexGrow: 1,
                  fontSize: "20px",
                }}
                onClick={(e) => (window.location.href = "/")}
              >
                <span>
                  {" "}
                  {props.auth.user !== null
                    ? `Hi ${props.auth.user.username}!`
                    : null}{" "}
                </span>
              </Typography>

              <IconButton color="inherit">
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <AccountCircle />
                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: "13px",
                      margin: "5px",
                      fontFamily: "Manrope",
                    }}
                  >
                    {" "}
                    Profile
                  </p>
                </IconButton>
              </IconButton>

              <IconButton color="inherit">
                <Button
                  id="submit"
                  // type="submit"
                  fullWidth
                  size="small"
                  variant="contained"
                  color="primary"
                  style={{
                    background: "#042c54",
                    margin: "5px",
                    width: "100px",
                  }}
                  onClick={handleLogOut}
                >
                  <p
                    style={{
                      // fontWeight: 'bold'
                      fontWeight: 600,
                      lineHeight: "20px",
                      fontSize: "13px",
                      fontFamily: "Manrope",
                    }}
                  >
                    Log out
                  </p>
                </Button>
              </IconButton>
            </Toolbar>
          </div>
        </AppBar>

        <Drawer
          sx={{
            backgroundColor: "#2d2d2d",
          }}
          variant="permanent"
          open={open}
        >
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            {/* <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>*/}
            <div>UBOOK</div>
          </Toolbar>

          <Divider />
          <List
            component="nav"
            sx={{
              backgroundColor: "grey",
            }}
          >
            <ListItemButton selected={home} button onClick={set_home}>
              <ListItemIcon>
                <FaHome size={20} style={{ color: "#042c54" }} />
              </ListItemIcon>
              <ListItemText
                primary="Dashboard"
                classes={{ primary: classes.text }}
              />
              <Divider />
            </ListItemButton>
            <Divider />
            <ListItemButton selected={clients} button onClick={set_clients}>
              <ListItemIcon>
                <Clients size={20} style={{ color: "#042c54" }} />
              </ListItemIcon>
              <ListItemText
                primary="Add Property"
                classes={{ primary: classes.text }}
              />
            </ListItemButton>
            <Divider />
            <ListItemButton
              selected={verified_booking}
              button
              onClick={set_verified}
            >
              <ListItemIcon>
                <Verify size={15} style={{ color: "#042c54" }} />
              </ListItemIcon>
              <ListItemText
                primary="Properties "
                classes={{ primary: classes.text }}
              />
            </ListItemButton>
            <Divider />
            <ListItemButton selected={booking} button onClick={set_booking}>
              <ListItemIcon>
                <FilterTiltShiftIcon style={{ color: "#042c54" }} />
              </ListItemIcon>
              <ListItemText
                primary="Notifications"
                classes={{ primary: classes.text }}
              />
            </ListItemButton>
            <Divider />
            <ListItemButton
              selected={block_bookings}
              button
              onClick={set_block}
            >
              <ListItemIcon>
                <ViewModuleIcon style={{ color: "#042c54" }} />
              </ListItemIcon>
              <ListItemText
                primary="Profile"
                classes={{ primary: classes.text }}
              />
            </ListItemButton>
            <Divider />
            {/*<ListItemButton selected={schedule} button onClick={set_schedule}> 
              <ListItemIcon>
                <FaCalendarWeek size={20} style={{ color: "#042c54" }} />
              </ListItemIcon>
              <ListItemText primary="Schedule" classes={{ primary: classes.text }}/>
            </ListItemButton>*/}
            {/*<Divider />
             <ListItemButton selected={analytics} button onClick={set_analytics}> 
              <ListItemIcon>
                <SignalCellularAltIcon size={20} style={{ color: "#042c54" }} />
              </ListItemIcon>
              <ListItemText primary="Home" classes={{ primary: classes.text }}/>
            </ListItemButton>
             <Divider />
             <ListItemButton selected={canceled_booking} button onClick={set_cancelled} >
              <ListItemIcon>
                <HighlightOffIcon size={15} style={{ color: "#042c54" }} />
              </ListItemIcon>
              <ListItemText primary="Cancelled " classes={{ primary: classes.text }} />
            </ListItemButton>
             <Divider />*/}
            <ListItemButton button onClick={() => (window.location.href = "/")}>
              <ListItemIcon>
                <PeopleIcon style={{ color: "#042c54" }} />
              </ListItemIcon>
              <ListItemText
                primary="Back to site"
                classes={{ primary: classes.text }}
              />
            </ListItemButton>
            <Divider />
            {/* <ListItemButton disabled>
              <ListItemIcon>
                <FaPortrait size={25} style={{ color: "#042c54" }} />
              </ListItemIcon>
              <ListItemText primary="Profile" classes={{ primary: classes.text }} />
            </ListItemButton>*/}
            <Divider />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
            <Grid container spacing={1}>
              <Toolbar />
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  style={{
                    padding: "10px",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                  // sx={{
                  //   p: 4,
                  //   // display: 'flex',
                  //   // flexDirection: 'column',
                  //   height: 1000,
                  // }}
                >
                  {/* Content */}
                  {home ? <Home /> : null}
                  {booking ? <Notifications /> : null}
                  {verified_booking ? <Properties /> : null}
                  {schedule ? <WholeSchedule /> : null}
                  {analytics ? <Home /> : null}
                  {clients ? <AddProperty /> : null}
                  {block_bookings ? <Profile /> : null}
                  {canceled_booking ? <CancelledList /> : null}
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

// export default function Dashboard() {
//   return <DashboardContent />;
// }

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  bookings: state.bookings.bookings,
});

export default connect(mapStateToProps, {
  get_bookings,
})(DashboardContent);
