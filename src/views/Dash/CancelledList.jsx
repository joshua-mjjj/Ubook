import React , { useState }from 'react';
import { connect } from "react-redux";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import {
  login,
  loadUser,
} from "../../actions/auth.js";

import { clear_state_error } from "../../actions/errors.js";
import { get_bookings } from "../../actions/bookings.js";

import logo from "../../assets/lock.svg";
import load from "../../assets/loading.gif";


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor:'#2d2d2d',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    fontFamily: 'Manrope'
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, contact, email, date) {
  return { name, contact, email, date };
}

const rows = [
  createData('Phaneroo', 'phanerevfoo@gmail.com', '0751964081', 'Sun, 07, 2022'),
  createData('Phanegrtroo', 'phanerrvrroo@gmail.com', '0751964081', 'Sun, 07, 2022'),
  createData('Phantgrteroo', 'phanec vfvroo@gmail.com', '0751964081', 'Sun, 07, 2022'),
  createData('Phanerroo', 'phanerrrfoo@gmail.com', '0751964081', 'Sun, 07, 2022'),
  createData('Phantgrteroo', 'phaneefoo@gmail.com', '0751964081', 'Sun, 07, 2022'),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
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
});

function ListTable(props) {
  const classes = useStyles();

  React.useEffect(() => {
    props.get_bookings()
  }, [])
  
  const [data, setData] = useState(null);
  const list = []

  React.useEffect(() => {
    if(props.bookings !== null){
      const list_bookings = props.bookings.filter((booking) => booking.cancelled === true);
      setData(list_bookings);
    }
  }, [props.bookings])

  return (
    <div>
    <div style={{ marginTop : "10px"}}>
      <p className={classes.sub_title} >Cancelled Bookings</p>
    </div>
      <div className={classes.schedule_grid}>

        <Grid className={classes.grid} container spacing={2}>
          <Grid item lg={12} md={12} sm={6} xs={12}>
          {
            data !== null ? 
              (
                 <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                       
                        <StyledTableCell>Customer contact</StyledTableCell>
                        <StyledTableCell align="left">Bookng type</StyledTableCell>
                        <StyledTableCell align="left">Location</StyledTableCell>
                        <StyledTableCell align="left">Duration</StyledTableCell>
                        <StyledTableCell align="left">Start time</StyledTableCell>
                        <StyledTableCell align="left">End time</StyledTableCell>
                        <StyledTableCell align="left">Cost</StyledTableCell>
                        <StyledTableCell align="left">Verified by</StyledTableCell>
                      </TableRow>
                    </TableHead
                     >
                    <TableBody>
                      {data.map((row, index) => (
                        <StyledTableRow key={row.name}>
                          <StyledTableCell component="th" scope="row">
                            > {row.customer_contact}
                          </StyledTableCell>
                          <StyledTableCell align="left">{row.booking_type}</StyledTableCell>
                          <StyledTableCell align="left">{row.court_location}</StyledTableCell>
                          <StyledTableCell align="left">{row.duration}</StyledTableCell>
                          <StyledTableCell align="left">{row.start_time}</StyledTableCell>
                          <StyledTableCell align="left">{row.end_time}</StyledTableCell>
                          <StyledTableCell align="left">Shs {row.cost}</StyledTableCell>
                          <StyledTableCell align="left">{row.verified_by}</StyledTableCell>
                        </StyledTableRow>
                      )).reverse()}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : null
          }
          </Grid>
        </Grid>

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
})(ListTable);