import React, { Component } from "react"
// import axios from "axios"
import Layout from "../components/layout"
import GuestsSelector from "../components/guestsSelector/guestsSelector"
import { Container, Row, Col } from "reactstrap"
import {
    InputGroup,
// InputGroupText,
// InputGroupAddon,
Input,
} from "reactstrap"
import StepWizard from 'react-step-wizard';
import Step1 from './cab-wizard-steps/step1';
import Step2 from './cab-wizard-steps/determine-if-ferry-booked';
import Step3 from './cab-wizard-steps/ferryJourneyDetails';
import JourneyDetails from './cab-wizard-steps/journeyDetails';
import SelectDay1Activities from './cab-wizard-steps/selectDay1Activities'
import Step99 from './cab-wizard-steps/step99';

import { Button, Label } from "reactstrap"
import axios from "axios"
import "react-dates/initialize"
import { DateRangePicker, SingleDatePicker } from "react-dates"
import "react-dates/lib/css/_datepicker.css"
import * as moment from "moment"
import { faMapMarkerAlt, faClock } from "@fortawesome/free-solid-svg-icons"
// library.add(fab, faCheckSquare, faCoffee)
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import apiEndPoints from '../apiEndPoints';

var striptags = require("striptags")
// import { Link } from "gatsby"
class ActivityBook extends Component {
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

guestCountHandler = (adultCount, childCount) => {
    this.setState({
        numberOfAdultGuest: adultCount,
        numberOfChildren: childCount,
    })
}

isBlocked = day => {
    day = day.format("YYYY-MM-DD")
    const availableDates = this.state.activityToBookDetails.dates
    return availableDates.includes(day) ? 0 : 1
}
componentDidMount = ()=> {
// props.location is only available on browser/client
// gatsby will build server side.. so if window is undefined, ignore props.location
if (typeof window === "undefined") {
    return
}
if (this.props.location.state != null) {
    this.setState(() => ({
        activityToBookDetails: this.props.location.state.activityToBook,
    }))
    console.log(
        "activityToBookDetails ",
        this.props.location.state.activityToBook
        )
    let savedState = JSON.stringify(this.props.location.state)
    localStorage.setItem("activityBookingState", savedState)
} else {
    let retrievedState = JSON.parse(
        localStorage.getItem("activityBookingState")
        )
    this.setState(() => ({
        activityToBookDetails: retrievedState.activityToBook,
    }))
    if (retrievedState == null)
        alert(
            "Please select an activity from homepage to book the activity. No activity selected."
            )
// reinstate when done developing
//   window.location = "/"
}
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
    Object.size = function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };
    let dateToString = new Date(this.state.activityToBookDetails.date)
    let showDateOfActivity = this.state.userDate ? (
        <p>{moment(this.state.userDate).format("YYYY-MM-DD")} </p>
        ) : (
        <p>
        <b>No Date Selected</b>
        </p>
        )
        const total_addons_available = Object.size(this.state.activityToBookDetails.related_addons)
        console.log(total_addons_available);
        let addons_available = total_addons_available ? 1 : 0;
// console.log(this.state.activityToBookDetails.related_addons.length)
return (
    <Layout>
    <Container style={{ marginTop: "4rem" }}>
<StepWizard>
<Step1 />
<JourneyDetails />
<Step2 />
<Step3 />
<SelectDay1Activities />
<Step99 /> 
</StepWizard>
    </Container>
    </Layout>
    )
}
}

export default ActivityBook
