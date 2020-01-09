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
class Step1 extends Component {
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
            userDepartureDate: "",
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
onTimeChange(options) {
    // do something
  }

  onFocusChange(focusStatue) {
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
            Intelligent Wizard will collect info and figure out the best possible Cab Taxi & Activities for your Andaman trip 
        </b>
        </p>
        <p style={{ fontSize: "16px", marginTop: "-10px" }}>
        {" "}
         Book Taxi Cab Car Rental for your trip around Port Blair, Havelock, Niel Island in Andaman 
        <br />
        <br />
        Please select your date of arrival, departure, contact and other
        details below to build your Cab itinerary
        {" "}
        </p>
        </div>
        <datalist id="spots">
        <option value="Hotel the north reef" />
        <option value="Phoenix Bay Jetty" />
        <option value="Hotel driftwood" />
        <option value="NSRY Jetty" />
        <option value="Fisheries Jetty" />
        </datalist>
        <div
        style={{
            width: "100%",
            fontFamily: "Montserrat",
            color: "rgb(75,75,75)",
            boxSizing: "border-box",
        }}>

        <p style={{ fontSize: "28px", marginTop: "40px" }}>
        <b>Contact details</b>
        </p>
        </div>

        <Row>
        <Col sm={{ size: 6 }} style={{ paddingLeft: "0" }}>
        <span>Name</span>
        <InputGroup style={{ width: "85%" }}>
        <Input
        style={{
            borderColor: "rgb(235,235,235)",
            borderRadius: "1px",
        }}
        placeholder="First and last name"
        value={this.state.userName}
        onChange={e => this.updateUsername(e)}
        />
        </InputGroup>
        </Col>
        <Col
        sm={{ size: 6 }}
        style={{ borderLeft: "1px solid white", paddingLeft: "0" }}
        >
        <span>Age</span>
        <InputGroup style={{ width: "85%" }}>
        <Input
        style={{
            borderColor: "rgb(235,235,235)",
            borderRadius: "1px",
        }}
        type="number"
        placeholder="Age"
        value={this.state.userAge}
        onChange={e => this.updateAge(e)}
        />
        </InputGroup>
        </Col>

        </Row>
        <br />
        <Row>
        <Col
        sm={{ size: 6 }}
        style={{ borderLeft: "1px solid white", paddingLeft: "0" }}
        >
        <span>Contact Number</span>
        <InputGroup style={{ width: "85%" }}>
        <Input
        style={{
            borderColor: "rgb(235,235,235)",
            borderRadius: "1px",
        }}
        type="number"
        placeholder=""
        onBlur={this.validatePhoneNumber}
        value={this.state.userPhoneNumber}
        onChange={e => this.updateContactNumber(e)}
        />
        </InputGroup>
        {!this.state.isPhoneNumberVerified && (
            <p style={{ color: "red", display: "block" }}>
            Please enter a valid 10 digit number
            </p>
            )}
        </Col>
        <Col
        sm={{ size: 6 }}
        style={{ borderLeft: "1px solid white", paddingLeft: "0" }}
        >
        <span>Email</span>
        <InputGroup style={{ width: "85%" }}>
        <Input
        style={{
            borderColor: "rgb(235,235,235)",
            borderRadius: "1px",
        }}
        placeholder=""
        value={this.state.userEmailId}
        onBlur={this.validateEmailId}
        onChange={e => this.updateEmailId(e)}
        />
        </InputGroup>
        {!this.state.isEmailVerified && (
            <p style={{ color: "red", display: "block" }}>
            Please enter a valid Email Id
            </p>
            )}
        </Col>
        </Row>
     

        <Row>
        <Col sm={{ size: 6 }}>
        </Col>
        <Col  sm={{ size: 6 }}>
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

export default Step1
