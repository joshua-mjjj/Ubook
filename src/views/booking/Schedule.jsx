import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Resources,
  DayView,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  DragDropProvider,
  EditRecurrenceMenu
} from '@devexpress/dx-react-scheduler-material-ui';
import { connectProps } from '@devexpress/dx-react-core';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Input from '@material-ui/core/Input';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import BookingForm from "./BookingForm"
import BookingFormEdit from "./BookingFormEdit"
// import Createappointment from '../components/Createappointment';
// import Editappointment from '../components/Editappointment';
import "./bookingform.css"
import { isEmpty } from 'lodash';

// import * as Scroll from 'react-scroll';

// var scroll = Scroll.animateScroll;

const containerStyles = (theme) => ({
  container: {
    width: "100px",
    padding: 0,
    paddingBottom: "10px"
  },
  inputSmall: {
    fontSize: '13px',
    color: '#1b1f23',
    border: '1px solid #cfd7de',
    borderRadius: '5px',
    padding: "4px",
    marginTop: "4px",
    '&::after': {
      borderBottom: '1px solid #949494'
    }
  },
  inputSelect: {
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
    marginBottom: "4px"
  }
});

class AppointmentFormContainerBasic extends React.PureComponent {
  constructor(props) {
    super(props);
    const { appointmentData } = this.props;
    const { location } = this.props;
    this.state = {
      appointmentChanges: {},
      start_time: '',
      end_time: '',
      notes: '',
      start_date: '',
      end_date: '',

      start_date_edit: '',
      end_date_edit: '',
      start_time_edit: '',
      end_time_edit: '',
      notes_edit: '',
      viewDialog: false,
      location: location
    };

    this.getAppointmentData = () => {
      const { appointmentData } = this.props;
      return appointmentData;
    };
    this.getAppointmentChanges = () => {
      const { appointmentChanges } = this.state;
      return appointmentChanges;
    };

    this.changeAppointment = this.changeAppointment.bind(this);
    this.commitAppointment = this.commitAppointment.bind(this);
  }

  onChange = (e) =>
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });


  onClicked() {
    // console.log(this.state.start_time)
    // console.log(this.state.end_time)
    // console.log(this.state.notes)
    // console.log(this.state.day)
  }

  changeAppointment({ field, changes }) {
    const nextChanges = {
      ...this.getAppointmentChanges(),
      [field]: changes
    };
    this.setState({
      appointmentChanges: nextChanges
    });
  }

  commitAppointment(type) {
    const { commitChanges } = this.props;
    const appointment = {
      ...this.getAppointmentData(),
      ...this.getAppointmentChanges()
    };

    if (type === 'deleted') {
      commitChanges({ [type]: appointment.id });
    } else if (type === 'changed') {
      commitChanges({ [type]: { [appointment.id]: appointment } });
    } else {
      commitChanges({ [type]: appointment });
    }
    this.setState({
      appointmentChanges: {}
    });
  }

  render() {

    const {
      classes,
      visible,
      visibleChange,
      appointmentData,
      cancelAppointment,
      target,
      onHide,
      refresh_data,
    } = this.props;
    const { appointmentChanges } = this.state;
    const { viewDialog } = this.state;
    const { location } = this.state;

    const displayAppointmentData = {
      ...appointmentData,
      ...appointmentChanges
    };

    const isNewAppointment = appointmentData.id === undefined;
    const applyChanges = isNewAppointment
      ? () => this.commitAppointment('added')
      : () => this.commitAppointment('changed');

    const textEditorProps = (field) => ({
      variant: 'outlined',
      onChange: ({ target: change }) =>
        this.changeAppointment({
          field: [field],
          changes: change.value
        }),
      value: displayAppointmentData[field] || '',
      label: field[0].toUpperCase() + field.slice(1),
      className: classes.textField
    });

    const pickerEditorProps = (field) => ({
      className: classes.picker,
      // keyboard: true,
      ampm: false,
      value: displayAppointmentData[field],
      onChange: (date) =>
        this.changeAppointment({
          field: [field],
          changes: date ? date.toDate() : new Date(displayAppointmentData[field])
        }),
      inputVariant: 'outlined',
      format: 'HH:mm ',
      onError: () => null
    });

    const cancelChanges = (value) => {
      this.setState({
        appointmentChanges: {}
      });
      visibleChange();
      cancelAppointment();
      if(value === true){
      	window.location.reload()
      }
    };

    const setTelContact = (e) => {
      localStorage.setItem("auto_fill_contact", e.target.value)
    };
    const setEmail = (e) => {
      localStorage.setItem("auto_fill_email", e.target.value)
    };
    const setName = (e) => {
      localStorage.setItem("auto_fill_name", e.target.value)
    };

    const handleContact = (e) => {
    	if(localStorage.getItem("auto_fill_contact") !== null && localStorage.getItem("booking_type") !== null){
	    	this.setState({
		       viewDialog:true
		    });
    	}
    };

    const onBack = (e) => {
    	this.setState({
	       viewDialog:false
	    });
    };

    const fetch_again = () => {
      refresh_data();
    };

    const checking_state = isEmpty(appointmentData);
    if (
      checking_state === false &&
      appointmentData.title !== undefined &&
      appointmentData.location !== undefined
    ){
      return (
        <AppointmentForm.Overlay visible={visible} target={target} fullSize onHide={onHide}>
          <div>
            {/*<div className={classes.header}>
              <IconButton className={classes.closeButton} onClick={cancelChanges}>
                <Close color="action" />
              </IconButton>
            </div>*/}
            <BookingFormEdit onBack={onBack} onHide={cancelChanges} location={location} />
          </div>
        </AppointmentForm.Overlay>
      );
    } else {
      return (
        <AppointmentForm.Overlay visible={visible} target={target} fullSize onHide={onHide}>
         <Grid item xs={6}>
             <div style={{ display: 'flex', flexDirection: 'column' }}>
             	<FormLabel style={{ margin: "10px", fontSize: "14px" , fontWeight: '800'}} component="label" className={classes.formLabel}>
		            Please kindly share the following  <br /> information. <br />
		            It helps us to reach out and <br /> provide more 
		             assistance regarding <br /> your booking.
		        </FormLabel>
	            <Input
		            fullWidth
		            style={{ margin: "10px", width: '200px'}}
		            id="contact"
		            name="contact"
		            disableUnderline
		            onChange={setTelContact}
		            // defaultValue={appointmentData.title}
		            placeholder="Contact (required)"
		            className={classes.inputSmall}
		          />
		          <Input
		            fullWidth
		            style={{ margin: "10px", width: '200px'}}
		            id="name"
		            name="Name"
		            disableUnderline
		            onChange={setName}
		            // defaultValue={appointmentData.title}
		            placeholder="Name (Not required)"
		            className={classes.inputSmall}
		          />
		           <Input
		            fullWidth
		            style={{ margin: "10px", width: '200px'}}
		            id="email"
		            name="Email"
		            disableUnderline
		            onChange={setEmail}
		            // defaultValue={appointmentData.title}
		            placeholder="Email (Not required)"
		            className={classes.inputSmall}
		          />
		         <br />

		         <FormLabel component="label" className={classes.formLabel}>
                  <div className="gpt3__cta-content_button_text">
  			       <span style={{ fontSize: '15px', marginLeft: "10px", }} >Booking Type</span>
  			     </div>
                 </FormLabel>
	             <Select
	                onChange={(e) => localStorage.setItem("booking_type", e.target.value)}
	                disableUnderline
	                style={{ margin: "10px", width: '200px'}}
	                fullWidth
	                autoComplete="booking_type"
	                displayEmpty
	                className={classes.inputSelect}
	                inputProps={{
	                  'aria-label': 'Select booking_type'
	                }}
	              >
	                <MenuItem value="Soccer">{"Soccer"}</MenuItem>
	                <MenuItem value="Woodball">{"Woodball"}</MenuItem>
                  <MenuItem value="Volley Ball">{"Volley Ball"}</MenuItem>
                  <MenuItem value="Net Ball">{"Net Ball"}</MenuItem>
	                <MenuItem value="Hockey">{"Hockey"}</MenuItem>
                  <MenuItem value="Basket Ball">{"Basket Ball"}</MenuItem>
		         </Select>
		        <div style={{ display: 'flex', flexDirection: 'row'}} > 
			        <button style={{ 
			        	width: '80px', 
			        	borderRadius: "5px" , 
			        	border: "solid 1px #c2cace",
			        	padding: '10px', 
			        	fontFamily: "Manrope",
			        	fontWeight: 800,
			        	margin: '10px', 
			        	background: '#c2cace',
			        	cursor: 'pointer'
			        }}
			        onClick={handleContact}>
			          	Continue
			        </button>
			        <button style={{ 
			        	width: '80px', 
			        	borderRadius: "5px" , 
			        	border: "solid 1px #c2cace",
			        	padding: '10px', 
			        	fontFamily: "Manrope",
			        	fontWeight: 800,
			        	margin: '10px', 
			        	background: '#c2cace',
			        	cursor: 'pointer'
			        }}
			        onClick={cancelChanges}>
			          	Back
			        </button>
		        </div>
             </div>
         </Grid>
         {
         	viewDialog ? <BookingForm onBack={onBack} onHide={cancelChanges} location={location} /> : null
         }
        {/* */}
        </AppointmentForm.Overlay>
      );
    }
  }
}

const AppointmentFormContainer = withStyles(containerStyles, { name: 'AppointmentFormContainer' })(
  AppointmentFormContainerBasic
);

const styles = (theme) => ({
  addButton: {
    position: 'absolute',
    bottom: "50px",
    right: "20px"
  },
  paper: {
    marginTop: "0px"
  }
});

/* eslint-disable-next-line react/no-multi-comp */
class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      resources: [
        {
          fieldName: 'roomId',
          title: 'Status',
          instances: [
            {
              text: 'Verified',
              id: 1,
              color: '#006600',
            }, {
              text: 'Not Verified',
              id: 2,
              color: '#ff0000',
            }, {
              text: 'Block Booking',
              id: 3,
              color: 'orange',
            }
          ],
        }
      ],
      // data: appointments,
      currentDate: this.props.current,
      get_new_value: this.props.get_new,
      location: this.props.location,
      confirmationVisible: false,
      editingFormVisible: false,
      deletedAppointmentId: undefined,
      editingAppointment: undefined,
      previousAppointment: undefined,
      addedAppointment: {},
      startDayHour: 7,
      endDayHour: 24,
      interval: 2,
      isNewAppointment: false,
      reload: false
    };

    this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this);
    this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this);
    this.toggleEditingFormVisibility = this.toggleEditingFormVisibility.bind(this);

    this.commitChanges = this.commitChanges.bind(this);
    this.onEditingAppointmentChange = this.onEditingAppointmentChange.bind(this);
    this.onAddedAppointmentChange = this.onAddedAppointmentChange.bind(this);
    this.appointmentForm = connectProps(AppointmentFormContainer, () => {
      const {
        editingFormVisible,
        editingAppointment,
        data,
        location,
        addedAppointment,
        isNewAppointment,
        previousAppointment
      } = this.state;

      // console.log(editingAppointment)
      // console.log(data)
      // console.log("Here")

      const currentAppointment =
        data.filter(
          (appointment) => editingAppointment && appointment.id === editingAppointment.id
        )[0] || addedAppointment;

      const cancelAppointment = () => {
        if (isNewAppointment) {
          this.setState({
            editingAppointment: previousAppointment,
            isNewAppointment: false
          });
        }
      };

      const refresh_data = () => {
        const { reload } = this.state;
        props.fetch();
      };

      return {
        visible: editingFormVisible,
        appointmentData: currentAppointment,
        location: location,
        commitChanges: this.commitChanges,
        visibleChange: this.toggleEditingFormVisibility,
        onEditingAppointmentChange: this.onEditingAppointmentChange,
        cancelAppointment,
        refresh_data
      };
    });
  }

  componentDidUpdate() {
    this.appointmentForm.update();
  }

   componentDidMount() {
    localStorage.removeItem("auto_fill_contact")
	localStorage.removeItem("auto_fill_email")
	localStorage.removeItem("auto_fill_name")
	localStorage.removeItem("booking_type")
  }

  //  React.useEffect(() => {
  //   console.log("Running...")
  //   window.scrollTo(0, 0);
  // }, []);

  onEditingAppointmentChange(editingAppointment) {
  	localStorage.setItem("edit_booking_id", editingAppointment.id)
    this.setState({ editingAppointment });
  }

  onAddedAppointmentChange(addedAppointment) {
    this.setState({ addedAppointment });
    const { editingAppointment } = this.state;
    if (editingAppointment !== undefined) {
      this.setState({
        previousAppointment: editingAppointment
      });
    }
    this.setState({ editingAppointment: undefined, isNewAppointment: true });
  }

  setDeletedAppointmentId(id) {
    this.setState({ deletedAppointmentId: id });
  }

  toggleEditingFormVisibility(e) {
    const { editingFormVisible } = this.state;
    if(e !== undefined && e !== null){
    	localStorage.setItem("start_date_autofill", e.startDate)
    	localStorage.setItem("end_date_autofill", e.endDate)
    }
    this.state.get_new_value(e)
    this.setState({
      // editingFormVisible: false
      editingFormVisible: !editingFormVisible
    });
  }

  toggleConfirmationVisible() {
    const { confirmationVisible } = this.state;
    this.setState({ confirmationVisible: !confirmationVisible });
  }

  commitDeletedAppointment() {
    this.setState((state) => {
      const { data, deletedAppointmentId } = state;
      // console.log(deletedAppointmentId)
      this.props.delete_aval(deletedAppointmentId);

      const nextData = data.filter((appointment) => appointment.id !== deletedAppointmentId);

      return { data: nextData, deletedAppointmentId: null };
    });
    this.toggleConfirmationVisible();
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment
        );
      }
      if (deleted !== undefined) {
        this.setDeletedAppointmentId(deleted);
        this.toggleConfirmationVisible();
      }
      return { data, addedAppointment: {} };
    });
  }

  render() {
    const {
      currentDate,
      data,
      resources,
      confirmationVisible,
      editingFormVisible,
      startDayHour,
      endDayHour,
      interval
    } = this.state;
    const { classes } = this.props;

    return (
      <Paper className={classes.paper}>
        <Scheduler data={data} height={680}>
          <ViewState defaultCurrentDate={currentDate} />
          <EditingState
          onCommitChanges={this.commitChanges}
          onEditingAppointmentChange={this.onEditingAppointmentChange}
          onAddedAppointmentChange={this.onAddedAppointmentChange}
          />
          <DayView 
          	startDayHour={startDayHour}
            endDayHour={endDayHour}
          />
          {/*<WeekView
            startDayHour={startDayHour}
            endDayHour={endDayHour}
          />*/}
          {/*<MonthView intervalCount={interval} />*/}
         {/* <Toolbar />*/}
         {/* <DateNavigator />*/}
          {/*<AllDayPanel />*/}
          <EditRecurrenceMenu />
          <Appointments
            style={{
              backgroundColor: 'green'
            }}
          />

          <AppointmentTooltip showCloseButton showOpenButton/>
         {/* <ViewSwitcher />*/}
          <AppointmentForm
            overlayComponent={this.appointmentForm}
            visible={editingFormVisible}
            onAppointmentDataChange={this.toggleEditingFormVisibility}
          />
          <Resources
            data={resources}
            mainResourceName="roomId"
          />
          <DragDropProvider />
        {/*  <TodayButton />*/}
        </Scheduler>

        <Dialog open={confirmationVisible} onClose={this.cancelDelete}>
          <DialogTitle>Delete Appointment</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure you want to delete this appointment?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.toggleConfirmationVisible} color="primary" variant="outlined">
              Cancel
            </Button>
            <Button onClick={this.commitDeletedAppointment} color="secondary" variant="outlined">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    );
  }
}

export default withStyles(styles, { name: 'EditingDemo' })(Demo);
