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
class FerryDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            guestFerryPortBlairToHavelockDate: null,
            guestFerryPortBlairToHavelockTime: null,
            guestFerryHavelockToNeilDate: null,
            guestFerryHavelockToNeilTime: null,
            guestFerryNeilToPortBlairDate: null,
            guestFerryNeilToPortBlairTime: null,
            guestFerryPortBlairToHavelockDateFocused: null,
            guestFerryHavelockToNeilDateFocused: null,
            guestFerryNeilToPortBlairDateFocused: null,
        }
    }

    onGuestFerryPortBlairToHavelockDepartureDateChange(date) {
        let tmpArrivalDay = this.props.store.cabWizardStore.guestFlightArrivalDateTime.clone()
        tmpArrivalDay.set({h: "00", m: "00"})
        if(date < tmpArrivalDay){
            alert("Ferry date cannot be before your Flight arrival date to Andaman")
            return 
        }
        this.props.store.cabWizardStore.setGuestFerryPortBlairToHavelockDepartureDate(date)
        this.setState({guestFerryPortBlairToHavelockDate:date})
        // do something
    }

    onGuestFerryPortBlairToHavelockDepartureTimeChange(timeObj) {
        
        let timeString = timeObj.hour + ':' + timeObj.minute
        this.setState({guestFerryPortBlairToHavelockTime : timeString})
        this.props.store.cabWizardStore.setGuestFerryPortBlairToHavelockDepartureDateTime(timeObj.hour, timeObj.minute)
        // do something
    }

    onGuestFerryHavelockToNeilDepartureDateChange(date) {
        if(date < this.props.store.cabWizardStore.guestFlightArrivalDateTime){
            alert("Ferry date cannot be before your Flight arrival date to Andaman")
            return 
        }
        if(date < this.props.store.cabWizardStore.guestFerryPortBlairToHavelockDateTime){
            alert("Ferry from Havelock cannot be before reaching from PortBlair to Havelock. Please check the date of your ferry from PortBlair to Havelock")
            return 
        }
        this.props.store.cabWizardStore.setGuestFerryHavelockToNeilDepartureDate(date)
        this.setState({guestFerryHavelockToNeilDate:date})
        // do something
    }

    onGuestFerryHavelockToNeilDepartureTimeChange(timeObj) {
        let timeString = timeObj.hour + ':' + timeObj.minute
        this.setState({guestFerryHavelockToNeilTime : timeString})
        this.props.store.cabWizardStore.setGuestFerryHavelockToNeilDepartureDateTime(timeObj.hour, timeObj.minute)
        // do something
    }

    onGuestFerryNeilToPortBlairDepartureDateChange(date) {
        if(date < this.props.store.cabWizardStore.guestFlightArrivalDateTime){
            alert("Ferry date cannot be before your Flight arrival date to Andaman")
            return 
        }
        if(date < this.props.store.cabWizardStore.guestFerryHavelockToNeilDateTime){
            alert("Ferry from Neil to PortBlair cannot be before reaching Neil Island. Please check the date of your ferry from Havelock to Neil")
            return 
        }
        this.props.store.cabWizardStore.setGuestFerryNeilToPortBlairDepartureDate(date)
        this.setState({guestFerryNeilToPortBlairDate:date})
        // do something
    }

    onGuestFerryNeilToPortBlairDepartureTimeChange(timeObj) {
        let timeString = timeObj.hour + ':' + timeObj.minute
        this.setState({guestFerryNeilToPortBlairTime : timeString})
        this.props.store.cabWizardStore.setGuestFerryNeilToPortBlairDepartureDateTime(timeObj.hour, timeObj.minute)
        // do something
    }


    componentDidMount = ()=> {
        // props.location is only available on browser/client
        // gatsby will build server side.. so if window is undefined, ignore props.location
        if (typeof window === "undefined") {
            return
        }
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
            date={this.state.guestFerryPortBlairToHavelockDate}
            onDateChange={date => this.onGuestFerryPortBlairToHavelockDepartureDateChange(date)}
            focused={this.state.guestFerryPortBlairToHavelockDateFocused}
            onFocusChange={({ focused }) => this.setState({ guestFerryPortBlairToHavelockDateFocused:focused })}
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
                    time = {this.state.guestFerryPortBlairToHavelockTime}
                    onFocusChange={({ focused }) => {}}
                    onTimeChange={this.onGuestFerryPortBlairToHavelockDepartureTimeChange.bind(this)}
                    theme="classic"/>

            </Col>
            </Row>
            <br />
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
            date={this.state.guestFerryHavelockToNeilDate}
            onDateChange={date => this.onGuestFerryHavelockToNeilDepartureDateChange(date)}
            focused={this.state.guestFerryHavelockToNeilDateFocused}
            onFocusChange={({ focused }) => this.setState({ guestFerryHavelockToNeilDateFocused:focused })}
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
                time = {this.state.guestFerryHavelockToNeilTime}
                    onFocusChange={({ focused }) => {}}
                    onTimeChange={this.onGuestFerryHavelockToNeilDepartureTimeChange.bind(this)}
                    theme="classic"
                    />
        
            </Col>
            </Row>

            <br />
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
            date={this.state.guestFerryNeilToPortBlairDate}
            onDateChange={date => this.onGuestFerryNeilToPortBlairDepartureDateChange(date)}
            focused={this.state.guestFerryNeilToPortBlairDateFocused}
            onFocusChange={({ focused }) => this.setState({ guestFerryNeilToPortBlairDateFocused:focused })}
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
    time = {this.state.guestFerryNeilToPortBlairTime}
        onFocusChange={({ focused }) => {}}
        onTimeChange={this.onGuestFerryNeilToPortBlairDepartureTimeChange.bind(this)}
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

export default FerryDetails
