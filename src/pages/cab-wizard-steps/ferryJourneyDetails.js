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
var striptags = require("striptags");
// import { Link } from "gatsby"
class FerryJourneyDetails extends Component {
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
            ferryNeilToPortBlairDate: "",
            ferryNeilToPortBlairTime: "",
            userPhoneNumber: "",
            date: "",
            arrivalDateFocused: null,
            departureDateFocused: null,
            ferryNeilToPortBlairDateFocused:null,

            isPhoneNumberVerified: true,
            isEmailVerified: true,
        }
// console.log("activityToBookId  " , this.props.location.state.activityId);
//   console.log("I am booking for this activity: " , this.state.activityToBookDetails);
}
onArrivalTimeChange(timeObj) {
    console.log(timeObj)
    let timeString = timeObj.hour + ':' + timeObj.minute
    this.setState({userArrivalTime : timeString})
    // do something
}

  onArrivalTimeFocusChange(focusStatue) {
    // do something
  }

  onDepartureTimeChange(timeObj) {
    console.log(timeObj)
    let timeString = timeObj.hour + ':' + timeObj.minute
    this.setState({userDepartureTime : timeString})
    // do something
}

  onDepartureTimeFocusChange(focusStatue) {
    // do something
  }

  onFerryNeilToPortBlairTimeChange(timeObj) {
    console.log(timeObj)
    let timeString = timeObj.hour + ':' + timeObj.minute
    this.setState({ferryNeilToPortBlairTime : timeString})
    // do something
}

  onFerryNeilToPortBlairTimeFocusChange(focusStatue) {
    // do something
  }

guestCountHandler = (adultCount, childCount) => {
    this.setState({
        numberOfAdultGuest: adultCount,
        numberOfChildren: childCount,
    })
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
// if (this.props.location.state != null) {
//     this.setState(() => ({
//         activityToBookDetails: this.props.location.state.activityToBook,
//     }))
//     console.log(
//         "activityToBookDetails ",
//         this.props.location.state.activityToBook
//         )
//     let savedState = JSON.stringify(this.props.location.state)
//     localStorage.setItem("activityBookingState", savedState)
// } else {
//     let retrievedState = JSON.parse(
//         localStorage.getItem("activityBookingState")
//         )
//     this.setState(() => ({
//         activityToBookDetails: retrievedState.activityToBook,
//     }))
//     if (retrievedState == null)
//         alert(
//             "Please select an activity from homepage to book the activity. No activity selected."
//             )
// // reinstate when done developing
// //   window.location = "/"
// }
}

updateNumberOfAdults = e => {
    this.setState({ numberOfAdultGuest: e.target.value })
}

updateNumberOfChildren = e => {
    this.setState({ numberOfChildren: e.target.value })
}

updateUsername = e => {
    this.setState({
        userName: e.target.value,
    })
}

updateGender = e => {
    this.setState({
        userGender: e.target.value,
    })
}
updateAge = e => {
    this.setState({
        userAge: e.target.value,
    })
}
updateEmailId = e => {
    this.setState({
        userEmailId: e.target.value,
    })
}
validateEmailId = () => {
    let emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (emailValidator.test(String(this.state.userEmailId).toLowerCase())) {
        this.setState({
            isEmailVerified: true,
        })
    } else {
        this.setState({
            isEmailVerified: false,
        })
    }
}
updateContactNumber = e => {
    this.setState({
        userPhoneNumber: e.target.value,
    })
}

validatePhoneNumber = () => {
    if (this.state.userPhoneNumber.length == 10) {
        this.setState({
            isPhoneNumberVerified: true,
        })
    } else {
        this.setState({
            isPhoneNumberVerified: false,
        })
    }
}

// updateDate = e => {
//   this.setState({
//     userDate: e.target.value
//   })
// }

handleArrivalDateChange = date => {
    this.setState({
        userArrivalDate: date,
    })
}

handleDepartureDateChange = date => {
    this.setState({
        userDepartureDate: date,
    })
}

handleFerryNeilToPortBlairDateChange = date => {
    this.setState({
        ferryNeilToPortBlairDate: date,
    })
}
bookActivityTemporarily = () => {
// console.log("The data we have are: " , this.state.activityToBookDetails);
let tmpActivityDetails = this.state.activityToBookDetails
// let totalBookingCost = ( ( this.state.numberOfAdultGuest * this.state.activityToBookDetails.adult_ticket) + (this.state.numberOfChildren * this.state.activityToBookDetails.child_ticket));
let data = {
    activity_id: tmpActivityDetails.id,
    purpose: tmpActivityDetails.name,
    email: this.state.userEmailId,
    phone: this.state.userPhoneNumber,
    buyer_name: this.state.userName,
    adults: this.state.numberOfAdultGuest,
    children: this.state.numberOfChildren,
    date: moment(this.state.userDate).format("YYYY-MM-DD"),
    age: this.state.userAge,
}

console.log("Data I am sending is: ", data)
data = JSON.stringify(data)

let headers = {
    "Content-Type": "application/json",
}

this.setState({ loading: true })
axios
.post(
    `http://ferrybooking.in/activity-payment-processor/pay-for-activity.php`,
    data,
    { headers: headers }
    )
.then(data => {
    console.log(data)
})
.catch(error => {
    this.setState({ loading: false, error })
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
       Ferry Journey Details
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
 <p style={{ fontSize: "28px", marginTop: "-20px" }}>
        <b>
       Port Blair to Havelock
        </b>
        </p>
        <Row>
            
        <Col
        sm={{ size: 6 }}
        style={{ borderLeft: "1px solid white", paddingLeft: "0" }}
        >
        <span>Departure from Port Blair</span>
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
            <span>Time of departure from Port Blair</span>
<TimePicker style={{height:"10px"}}
        time = {this.state.userArrivalTime}
      onFocusChange={this.onArrivalTimeFocusChange.bind(this)}
      onTimeChange={this.onArrivalTimeChange.bind(this)}
      theme="classic"
    />
        </Col>
        </Row>
        <br />
          <p style={{ fontSize: "28px", marginTop: "-20px" }}>
        <b>
        Havelock to Neil
        </b>
        </p>
        <Row>
           
        <Col
        sm={{ size: 6 }}
        style={{ borderLeft: "1px solid white", paddingLeft: "0" }}
        >
        <span>Departure from Havelock</span>
        <SingleDatePicker
        placeholder="Date of departure from Havelock"
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
            <span>Time of departure from Havelock</span>
<TimePicker style={{height:"10px"}}
time = {this.state.userDepartureTime}
      onFocusChange={this.onDepartureTimeFocusChange.bind(this)}
      onTimeChange={this.onDepartureTimeChange.bind(this)}
      theme="classic"
    />
    
        </Col>
        </Row>

        <br />
          <p style={{ fontSize: "28px", marginTop: "-20px" }}>
        <b>
        Niel to Port Blair
        </b>
        </p>
        <Row>
           
        <Col
        sm={{ size: 6 }}
        style={{ borderLeft: "1px solid white", paddingLeft: "0" }}
        >
        <span>Departure From Neil</span>
        <SingleDatePicker
        placeholder="Date of departure from Neil"
        minDate="2019-06-23"
        maxDate="2019-07-25"
        inputIconPosition="after"
        small={true}
        numberOfMonths={1}
        date={this.state.ferryNeilToPortBlairDate}
        onDateChange={date => this.handleFerryNeilToPortBlairDateChange(date)}
        focused={this.state.ferryNeilToPortBlairDateFocused}
        onFocusChange={({ focused }) => this.setState({ ferryNeilToPortBlairDateFocused:focused })}
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
            <span>Time of departure from Neil</span>
<TimePicker style={{height:"10px"}}
time = {this.state.ferryNeilToPortBlairTime}
      onFocusChange={this.onFerryNeilToPortBlairTimeFocusChange.bind(this)}
      onTimeChange={this.onFerryNeilToPortBlairTimeFocusChange.bind(this)}
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

export default FerryJourneyDetails
