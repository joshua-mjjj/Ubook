import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  get_properties,
  update_properties,
  delete_properties,
} from "../../actions/propertyActions.js";
import Autocomplete from "./Autocomplete";
import { createMessage, clearMessage } from "../../actions/auth";
import { Alert } from "@material-ui/lab";
import { properties_things } from "./AddProperty";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableRow,
  TableHeader,
  Grid,
  Paper,
  TableHead,
  IconButton,
  FormLabel,
  Input,
  Select,
} from "@material-ui/core";
import load from "../../assets/loading.gif";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import Popup from "../../components/common/Popup.js";
import useForm from "../../hooks/useForm";
import { Button, MenuItem, Switch } from "@material-ui/core";
import { CustomSelect, CustomTextField, Form } from "../../components";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#2d2d2d",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      flex: 1,
      marginTop: theme.spacing(3),
    },
    margin: "0px 20px 0px 20px",
    flexDirection: "column",
  },
  table: {
    minWidth: 700,
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
      cursor: "pointer",
    },
  },
  grid: {
    marginBottom: "50px",
    marginTop: "10px",
  },
  schedule_grid: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "left",
    alignItems: "left",
    marginBottom: "30px",
    marginTop: "5px",
  },
  sub_title: {
    fontWeight: 700,
    fontSize: "25px",
    fontFamily: "Manrope",
    textAlign: "left",
    flex: 1,
  },
  top_title: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "0px 20px 0px 20px",
  },
  inputSmall: {
    fontSize: "13px",
    color: "#1b1f23",
    border: "1px solid #cfd7de",
    borderRadius: "5px",
    padding: "7px",
    marginTop: "4px",
    "&::after": {
      borderBottom: "1.5px solid #949494",
    },
  },
  formLabel: {
    fontSize: "13px",
    color: "rgba(0, 0, 0, 0.5)",
    fontWeight: "600",
    marginBottom: "2px",
  },
  contain: {
    marginLeft: "10px",
  },
  inputSelect: {
    fontSize: "13px",
    color: "#1b1f23",
    border: "1px solid #cfd7de",
    borderRadius: "5px",
    padding: "1px",
    width: "100%",
    marginTop: "4px",
    "&::after": {
      borderBottom: "1.5px solid #949494",
    },
    padding: "8px",
  },
  labels: {
    color: "#FF5722",
    fontWeight: "800",
    fontFamily: "Dosis",
  },
  submit: {
    margin: "3px 0px 1px",
    height: "40px",
    fontSize: "13px!important",
    background: "#FF5722",
    fontFamily: "Dosis",
    fontWeight: "bold",
    fontSize: "18px",
    lineHeight: "16px",
    color: "#FFFFFF!important",
    background: "#042c54",
    textTransform: "capitalize",
    marginRight: "10px",
    "&:hover": {
      background: "#042c54",
    },
  },
}));

function Properties(props) {
  const classes = useStyles();
  const [partial_payment, setPartialPayment] = React.useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [data, setData] = useState(null);
  const [list_data, setList] = useState(null);
  const [search_mode, setSearchMode] = useState(false);
  const { propertyData, handleInputChange, handleClearForm, setPropertyData } =
    useForm();
  const list = [];

  React.useEffect(() => {
    if (props.properties !== null) {
      setData(props.properties);

      props.properties?.filter((p) => {
        let object;
        object = {
          title: p.property_name !== null ? p.property_name : "",
        };
        list.push(object);
      });
      setList(list);
      // console.log(list)
    }
  }, [props.properties]);

  const format_date = (date) => {
    const new_date = moment(date).toDate();
    const new_date_ = new_date.toString().substring(0, 24);
    return new_date_;
  };

  const [search_property, setProperty_search] = useState(null);
  const [searched_data, setSearched_data] = useState(null);
  React.useEffect(() => {
    if (props.properties !== null && search_property !== null) {
      const foundProperty = props.properties.filter(
        (p) => p.customer_name === search_property
      );
      if (foundProperty.length > 0) {
        setSearchMode(true);
        setSearched_data(foundProperty);
      } else {
        setSearchMode(false);
        setSearched_data(null);
      }
      // console.log(found)
    }
  }, [props.properties, search_property]);

  const get_section_value = (value) => {
    // console.log(value);
    setProperty_search(value);
  };

  const editProperty = props.properties?.find((property) =>
    currentId ? property.id === currentId : null
  );

  React.useEffect(() => {
    if (editProperty) {
      setPropertyData(editProperty);
    }
  }, [editProperty, setPropertyData]);

  React.useEffect(() => {
    props.get_properties();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      propertyData.additional_info &&
      propertyData.client_contact &&
      propertyData.client_email &&
      propertyData.client_name &&
      propertyData.price &&
      propertyData.property_description &&
      propertyData.property_location &&
      propertyData.property_name &&
      propertyData.property_type
    ) {
      props.update_properties(currentId, {
        ...propertyData,
        owner: props.user?.id,
        partial_payment: partial_payment,
        verified_by: "1",
      });
    } else {
      props.createMessage(
        "All fields are required to create the property",
        "property_fields"
      );
    }
  };

  return (
    <>
      <div>
        {props.message && props.reason === "delete_property" ? (
          <>
            {(props.message !== null || props.message !== undefined) && (
              <Alert severity="success" onClose={() => props.clearMessage()}>
                {props.message}
              </Alert>
            )}
          </>
        ) : null}
      </div>
      <div>
        {props.message && props.reason === "update_property" ? (
          <>
            {(props.message !== null || props.message !== undefined) && (
              <Alert severity="success" onClose={() => props.clearMessage()}>
                {props.message}
              </Alert>
            )}
          </>
        ) : null}
      </div>
      <div className={classes.top_title}>
        <p className={classes.sub_title}>Properties</p>
        <div style={{ flex: 1, alignItems: "flex-end" }}>
          <Autocomplete
            list={list_data}
            get_section_value={get_section_value}
          />
        </div>
      </div>
      {props.get_loading ? (
        <img src={load} height="100" width="100" />
      ) : (
        <div>
          <div className={classes.schedule_grid}>
            <Grid className={classes.grid} container spacing={2}>
              <Grid item lg={12} md={12} sm={6} xs={12}>
                {props.properties !== null ? (
                  <TableContainer component={Paper}>
                    <Table
                      className={classes.table}
                      aria-label="customized table"
                    >
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="left">
                            Property Name
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            Property Type
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            Property Location
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            Property Price
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Actions
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {props.properties &&
                          props.properties
                            ?.map((p) => (
                              <StyledTableRow key={p.id}>
                                <StyledTableCell align="left">
                                  {p.property_name !== null
                                    ? p.property_name
                                    : "----"}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                  {p.property_type !== null
                                    ? p.property_type
                                    : "----"}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                  {p.property_location !== null
                                    ? p.property_location
                                    : "----"}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                  {p.price !== null ? p.price : "----"}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  <div>
                                    <IconButton
                                      onClick={() => {
                                        setCurrentId(p.id);
                                        setOpenPopup(true);
                                      }}
                                    >
                                      <CreateIcon
                                        color="primary"
                                        fontSize="small"
                                      />
                                    </IconButton>

                                    <IconButton
                                      onClick={() => {
                                        setCurrentId(p.id);
                                        setOpenDeletePopup(true);
                                      }}
                                    >
                                      <DeleteIcon
                                        color="error"
                                        fontSize="small"
                                      />
                                    </IconButton>
                                  </div>
                                </StyledTableCell>
                              </StyledTableRow>
                            ))
                            .reverse()}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : null}
              </Grid>
            </Grid>
          </div>
        </div>
      )}
      <Popup
        openPopup={openPopup}
        openDeletePopup={openDeletePopup}
        title={openPopup && "Edit Property"}
        setOpenPopup={setOpenPopup}
        setOpenDeletePopup={setOpenDeletePopup}
      >
        {openPopup && (
          <Form onSubmit={handleSubmit} className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormLabel component="label" className={classes.formLabel}>
                  <div className="gpt3__cta-content_button_text">
                    <span style={{ fontSize: "15px" }}>Client Name</span>
                  </div>
                </FormLabel>
                <Input
                  placeholder="enter client name"
                  name="client_name"
                  value={propertyData.client_name}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  inputProps={{ "aria-label": "amount" }}
                  className={classes.inputSmall}
                  disableUnderline
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel component="label" className={classes.formLabel}>
                  <div className="gpt3__cta-content_button_text">
                    <span style={{ fontSize: "15px" }}>Client Contact</span>
                  </div>
                </FormLabel>
                <Input
                  placeholder="enter client contact"
                  name="client_contact"
                  value={propertyData.client_contact}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  inputProps={{ "aria-label": "amount" }}
                  className={classes.inputSmall}
                  disableUnderline
                  type="tel"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel component="label" className={classes.formLabel}>
                  <div className="gpt3__cta-content_button_text">
                    <span style={{ fontSize: "15px" }}>Client Email</span>
                  </div>
                </FormLabel>
                <Input
                  placeholder="enter client email"
                  name="client_email"
                  value={propertyData.client_email}
                  onChange={handleInputChange}
                  type="email"
                  fullWidth
                  inputProps={{ "aria-label": "amount" }}
                  className={classes.inputSmall}
                  disableUnderline
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel component="label" className={classes.formLabel}>
                  <div className="gpt3__cta-content_button_text">
                    <span style={{ fontSize: "15px" }}>Property Type</span>
                  </div>
                </FormLabel>
                <Select
                  label="Property Type"
                  placeholder="enter property type"
                  name="property_type"
                  value={propertyData.property_type}
                  onChange={handleInputChange}
                  fullWidth
                  inputProps={{ "aria-label": "amount" }}
                  className={classes.inputSelect}
                  disableUnderline
                >
                  <MenuItem value="0">Choose Property Type ....</MenuItem>
                  {properties_things.map((p) => (
                    <MenuItem key={p.id} value={p.id}>
                      {p.Title}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormLabel component="label" className={classes.formLabel}>
                  <div className="gpt3__cta-content_button_text">
                    <span style={{ fontSize: "15px" }}>Property Name</span>
                  </div>
                </FormLabel>
                <Input
                  label="Property Name"
                  placeholder="enter property name"
                  name="property_name"
                  value={propertyData.property_name}
                  onChange={handleInputChange}
                  fullWidth
                  inputProps={{ "aria-label": "amount" }}
                  className={classes.inputSmall}
                  disableUnderline
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel component="label" className={classes.formLabel}>
                  <div className="gpt3__cta-content_button_text">
                    <span style={{ fontSize: "15px" }}>Property Location</span>
                  </div>
                </FormLabel>
                <Input
                  label="Property Location"
                  placeholder="enter property location"
                  name="property_location"
                  value={propertyData.property_location}
                  onChange={handleInputChange}
                  fullWidth
                  inputProps={{ "aria-label": "amount" }}
                  className={classes.inputSmall}
                  disableUnderline
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel component="label" className={classes.formLabel}>
                  <div className="gpt3__cta-content_button_text">
                    <span style={{ fontSize: "15px" }}>Price</span>
                  </div>
                </FormLabel>
                <Input
                  label="Price"
                  placeholder="price"
                  name="price"
                  value={propertyData.price}
                  onChange={handleInputChange}
                  fullWidth
                  inputProps={{ "aria-label": "amount" }}
                  className={classes.inputSmall}
                  disableUnderline
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel component="label" className={classes.formLabel}>
                  <div className="gpt3__cta-content_button_text">
                    <span style={{ fontSize: "15px" }}>Partial Payment</span>
                  </div>
                </FormLabel>
                <Switch
                  checked={partial_payment}
                  onChange={() => setPartialPayment(!partial_payment)}
                  color="primary"
                  name="Partial Payment"
                  inputProps={{ "aria-label": "primary checkbox" }}
                  style={{ alignSelf: "flex-end" }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormLabel component="label" className={classes.formLabel}>
                  <div className="gpt3__cta-content_button_text">
                    <span style={{ fontSize: "15px" }}>Additional Info</span>
                  </div>
                </FormLabel>
                <Input
                  label="Additional Info"
                  placeholder="enter additional info"
                  name="additional_info"
                  value={propertyData.additional_info}
                  onChange={handleInputChange}
                  fullWidth
                  multiline
                  disableUnderline
                  rows="3"
                  inputProps={{ "aria-label": "amount" }}
                  className={classes.inputSmall}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel component="label" className={classes.formLabel}>
                  <div className="gpt3__cta-content_button_text">
                    <span style={{ fontSize: "15px" }}>
                      Property Description
                    </span>
                  </div>
                </FormLabel>
                <Input
                  label="Property Description"
                  placeholder="enter property description"
                  name="property_description"
                  value={propertyData.property_description}
                  onChange={handleInputChange}
                  fullWidth
                  inputProps={{ "aria-label": "amount" }}
                  className={classes.inputSmall}
                  disableUnderline
                  multiline
                  rows="3"
                />
              </Grid>
            </Grid>

            <div
              style={{
                margin: "20px 0px 20px 0px",
                display: "flex",
              }}
            >
              <Button type="submit" className={classes.submit}>
                {props.update_loading ? (
                  <img src={load} height="100" width="100" />
                ) : (
                  "Update"
                )}
              </Button>
              <Button
                type="button"
                className={classes.submit}
                onClick={() => setOpenPopup(false)}
                style={{ backgroundColor: "crimson" }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        )}

        {openDeletePopup && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <di>Are you sure you want to delete?</di>

            <div
              style={{
                margin: "20px 0px 20px 0px",
                display: "flex",
              }}
            >
              <Button
                type="submit"
                className={classes.submit}
                onClick={() => props.delete_properties(currentId)}
              >
                {props.delete_loading ? (
                  <img src={load} height="100" width="100" />
                ) : (
                  "Delete"
                )}
              </Button>
              <Button
                type="button"
                className={classes.submit}
                onClick={() => setOpenDeletePopup(false)}
                style={{ backgroundColor: "crimson" }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Popup>
    </>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.auth.user,
  get_loading: state.property.get_loading,
  update_loading: state.property.update_loading,
  delete_loading: state.property.delete_loading,
  properties: state.property.properties,
  success: state.property.success,
  message: state.auth.message,
  reason: state.auth.reason,
});

export default connect(mapStateToProps, {
  get_properties,
  update_properties,
  delete_properties,
  clearMessage,
  createMessage,
})(Properties);
