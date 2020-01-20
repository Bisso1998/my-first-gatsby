import React, { Component } from "react"
// import axios from "axios"
import Layout from "../../components/layout"
import GuestsSelector from "../../components/guestsSelector/guestsSelector"
import { Container, Row, Col } from "reactstrap"
import {
    InputGroup,
// InputGroupText,
// InputGroupAddon,
Input,
} from "reactstrap"
import { Button, Label } from "reactstrap"
import axios from "axios"
import "react-dates/initialize"
import { DateRangePicker, SingleDatePicker } from "react-dates"
import "react-dates/lib/css/_datepicker.css"
import * as moment from "moment"
import TimePicker from 'react-times';

// use material theme
// import 'react-times/css/material/default.css';
// or you can use classic theme
import 'react-times/css/classic/default.css';
import { faMapMarkerAlt, faClock } from "@fortawesome/free-solid-svg-icons"
// library.add(fab, faCheckSquare, faCoffee)
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import apiEndPoints from '../../apiEndPoints';
import StepWizard from 'react-step-wizard';
import { observer, inject } from 'mobx-react';

var striptags = require("striptags");
// import { Link } from "gatsby"

@observer
@inject('store')
class FlightDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            numberOfAdultGuest: 1,
            numberOfChildren: 0,
            totalCost: 0,
            activityToBookDetails: "",
            userName: "",
            userAge: "",
            userGender: "",
            userEmailId: "",
            userArrivalDate: "",
            userArrivalTime: "01:45",
            userDepartureDate: "",
            userDepartureTime: "02:00",
            userPhoneNumber: "",
            date: "",
            arrivalDateFocused: null,
            departureDateFocused: null,

            isPhoneNumberVerified: true,
            isEmailVerified: true,
        }
// console.log("activityToBookId  " , this.props.location.state.activityId);
//   console.log("I am booking for this activity: " , this.state.activityToBookDetails);
}

onArrivalTimeChange(timeObj) {
    let timeString = timeObj.hour + ':' + timeObj.minute
    this.setState({userArrivalTime : timeString})
    this.props.store.cabWizardStore.setGuestFlightArrivalDateTime(timeObj.hour,timeObj.minute)
    // do something
}

onArrivalTimeFocusChange(focusStatue) {
    // do something
}

onDepartureTimeChange(timeObj) {
    this.props.store.cabWizardStore.setGuestFlightDepartureDateTime(timeObj.hour,timeObj.minute)
    let timeString = timeObj.hour + ':' + timeObj.minute
    this.setState({userDepartureTime : timeString})
    // do something
    console.log(this.props.store.cabWizardStore.guestTotalDaysInAndaman)
}

onDepartureTimeFocusChange(focusStatue) {
// do something
}

isBlocked = day => {
    return 0
}

componentDidMount = ()=> {
    // props.location is only available on browser/client
    // gatsby will build server side.. so if window is undefined, ignore props.location
    if (typeof window === "undefined") {
        return
    }

}

handleArrivalDateChange = date => {
    if(date< moment()){
        alert("Arrival date cannot be in the past ")
        return 
    }
    this.props.store.cabWizardStore.setGuestFlightArrivalDate(date)
    this.setState({
        userArrivalDate: date,
    })
}

handleDepartureDateChange = date => {
    if(date <= this.props.store.cabWizardStore.guestFlightArrivalDateTime ){
        alert("Arrival date cannot be before Departure date")
        return
    }
    this.props.store.cabWizardStore.setGuestFlightDepartureDate(date)
    this.setState({
        userDepartureDate: date,
    })
}

render = ()=> {
    return (
        <Row>
        <Col sm={{ size: 12 }} style={{ padding: "0" }}>
        <div
        style={{
            width: "100%",
            fontFamily: "Montserrat",
            color: "rgb(75,75,75)",
            boxSizing: "border-box",
            marginTop: "50px",
        }}
        >
        <p style={{ fontSize: "28px", marginTop: "-20px" }}>
        <b>
       Journey Details
        </b>
        </p>
        <p style={{ fontSize: "16px", marginTop: "-10px" }}>
        {" "}
        This Wizard will collect some information from you and help you figure out the best possible Cab and taxi options for your trip around Andaman
        <br />
         <br />
        Please select the date of arrival, Departure below to build your Cab itinerary {" "}
        </p>
        </div>

        <Row>
        <Col
        sm={{ size: 6 }}
        style={{ borderLeft: "1px solid white", paddingLeft: "0" }}
        >
        <span>Date of arrival in Andaman</span>
        <SingleDatePicker
        placeholder="Date of arrival in Andaman"
        minDate="2019-06-23"
        maxDate="2019-07-25"
        inputIconPosition="after"
        small={true}
        numberOfMonths={1}
        date={this.state.userArrivalDate}
        onDateChange={date => this.handleArrivalDateChange(date)}
        focused={this.state.arrivalDateFocused}
        onFocusChange={({ focused }) => this.setState({ arrivalDateFocused:focused })}
        id="singleDatePicker"
        block={true}
        openDirection="up"
        hideKeyboardShortcutsPanel={true}
        isDayBlocked={this.isBlocked}
        isOutsideRange={day =>
            !(moment().diff(day) < 0 || moment().diff(day) >= 0)
        }
        />
        </Col>
        <Col
        sm={{ size: 6 }}
        style={{ borderLeft: "1px solid white", paddingLeft: "0" }}
        >
            <span>Time of arrival in Andaman</span>
<TimePicker style={{height:"10px"}}
        time = {this.state.userArrivalTime}
      onFocusChange={this.onArrivalTimeFocusChange.bind(this)}
      onTimeChange={this.onArrivalTimeChange.bind(this)}
      theme="classic"
    />
        </Col>
        </Row>
        <br />
        <Row>
        <Col
        sm={{ size: 6 }}
        style={{ borderLeft: "1px solid white", paddingLeft: "0" }}
        >
        <span>Departure From Andaman</span>
        <SingleDatePicker
        placeholder="Date of departure from Andaman"
        minDate="2019-06-23"
        maxDate="2019-07-25"
        inputIconPosition="after"
        small={true}
        numberOfMonths={1}
        date={this.state.userDepartureDate}
        onDateChange={date => this.handleDepartureDateChange(date)}
        focused={this.state.departureDateFocused}
        onFocusChange={({ focused }) => this.setState({ departureDateFocused:focused })}
        id="singleDatePicker"
        block={true}
        openDirection="up"
        hideKeyboardShortcutsPanel={true}
        isDayBlocked={this.isBlocked}
        isOutsideRange={day =>
            !(moment().diff(day) < 0 || moment().diff(day) >= 0)
        }
        />

        </Col>
        <Col
        sm={{ size: 6 }}
        style={{ borderLeft: "1px solid white", paddingLeft: "0" }}
        >
            <span>Time of departure from Andaman</span>
<TimePicker style={{height:"10px"}}
time = {this.state.userDepartureTime}
      onFocusChange={this.onDepartureTimeFocusChange.bind(this)}
      onTimeChange={this.onDepartureTimeChange.bind(this)}
      theme="classic"
    />
    <p
        style={{
            fontSize: "26px",
            ontFamily: "Montserrat",
            color: "rgb(75,75,75)",
            float:"right",
            marginRight:"100px",
            marginTop:"30px"
        }}
        >
        {" "}
        <Button onClick={this.props.nextStep}>
        Next Step
        </Button>
        </p>
        </Col>
        </Row>
        

        <Row>
        </Row>
        <div style={{ marginTop: "20px" }}>
        </div>
        </Col>
        </Row>
        )
}
}

export default FlightDetails
