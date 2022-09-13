import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import moment from "moment";

import load from "../../assets/loading.gif";
import { createMessage, clearMessage } from "../../actions/auth";
import {
  create_properties,
  get_properties,
} from "../../actions/propertyActions.js";
import { CustomSelect, CustomTextField, Form } from "../../components";
import useForm from "../../hooks/useForm";
import {
  Button,
  FormLabel,
  Input,
  MenuItem,
  Select,
  Switch,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

export const properties_things = [
  { id: "Apartment", Title: "Apartment" },
  { id: "Rental", Title: "Rental" },
  { id: "Hostel", Title: "Hostel" },
  { id: "Motel", Title: "Motel" },
  { id: "Retail Shop Space", Title: "Retail Shop Space" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      flex: 1,
      marginTop: theme.spacing(3),
    },
    margin: "0px 20px 0px 20px",
    flexDirection: "column",
  },
  sub_title: {
    fontWeight: 700,
    fontSize: "25px",
    fontFamily: "Manrope",
    textAlign: "left",
    flex: 1,
    marginBottom: "10px",
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
    marginTop: "10px",
    "&::after": {
      borderBottom: "1.5px solid #949494",
    },
  },
  formLabel: {
    fontSize: "13px",
    color: "rgba(0, 0, 0, 0.5)",
    fontWeight: "600",
    marginBottom: "10px",
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
    marginTop: "10px",
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
    height: "46px",
    textTransform: "none",
    fontSize: "13px!important",
    background: "#FF5722",
    fontFamily: "Dosis",
    fontWeight: "bold",
    fontSize: "22px",
    lineHeight: "16px",
    color: "#FFFFFF!important",
  },
}));
function AddProperty(props) {
  const [partial_payment, setPartialPayment] = React.useState(false);
  const { propertyData, handleInputChange, handleClearForm } = useForm();

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
      props.create_properties({
        ...propertyData,
        owner: props.user.id,
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
  const classes = useStyles();

  React.useEffect(() => {
    props.get_properties();
  }, []);

  return (
    <div>
      <div className={classes.top_title}>
        <p className={classes.sub_title}>Add Property</p>
      </div>

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
              rows="5"
              inputProps={{ "aria-label": "amount" }}
              className={classes.inputSmall}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormLabel component="label" className={classes.formLabel}>
              <div className="gpt3__cta-content_button_text">
                <span style={{ fontSize: "15px" }}>Property Description</span>
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
              rows="5"
            />
          </Grid>
        </Grid>

        <div style={{ margin: "8px 0px 2px 0px" }}>
          {props.message && props.reason === "property_fields" ? (
            <>
              {(props.message !== null || props.message !== undefined) && (
                <Alert severity="error" onClose={() => props.clearMessage()}>
                  {props.message}
                </Alert>
              )}
            </>
          ) : null}
        </div>
        <div style={{ margin: "8px 0px 2px 0px" }}>
          {props.message && props.reason === "created_property" ? (
            <>
              {(props.message !== null || props.message !== undefined) && (
                <Alert severity="success" onClose={() => props.clearMessage()}>
                  {props.message}
                </Alert>
              )}
            </>
          ) : null}
        </div>

        <div style={{ margin: "20px 0px 20px 0px" }}>
          <Button
            type="submit"
            fullWidth
            style={{
              background: "#042c54",
              color: "#fff",
              textTransform: "capitalize",
            }}
            className={classes.submit}
          >
            {props.create_loading ? (
              <img src={load} height="100" width="100" />
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.auth.user,
  message: state.auth.message,
  reason: state.auth.reason,
  create_loading: state.property.create_loading,
  properties: state.property.properties,
});

export default connect(mapStateToProps, {
  create_properties,
  clearMessage,
  createMessage,
  get_properties,
})(AddProperty);
