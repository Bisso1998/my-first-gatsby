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
import { faMapMarkerAlt, faClock } from "@fortawesome/free-solid-svg-icons"
// library.add(fab, faCheckSquare, faCoffee)
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import apiEndPoints from '../../apiEndPoints';
import StepWizard from 'react-step-wizard';
import { observer, Provider, inject } from 'mobx-react';

var striptags = require("striptags")

// import { Link } from "gatsby"
@observer
@inject('store')
class IsFerryBooked extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
}

componentDidMount = ()=> {
    // props.location is only available on browser/client
    // gatsby will build server side.. so if window is undefined, ignore props.location
    if (typeof window === "undefined") {
        return
    }
}

nextStep = () => {
    this.props.store.cabWizardStore.setGuestFerryIsBooked()
    this.props.nextStep()
}

previousStep = () => {
    this.props.store.cabWizardStore.setGuestFerryIsNotBooked()
    this.props.previousStep()
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
        Have you already booked your ferry?
        </b>
        </p>
        <p style={{ fontSize: "16px", marginTop: "-10px" }}>
        {" "}
        In order to plan your trip around andaman better, We would like to know if you have already booked your ferry tickets{" "}
        </p>
        </div>

        <p
        style={{
            fontSize: "26px",
            ontFamily: "Montserrat",
            color: "rgb(75,75,75)",
            float:"left",
            marginRight:"100px",
            marginTop:"30px"
        }}
        >
        {" "}
        <Button onClick={()=>{this.previousStep()}}>
        No, I want to book ferry tickets
        </Button>
        </p>
        
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
        <Button onClick={()=>{this.nextStep()}}>
        Yes, I have booked ferry tickets
        </Button>
        </p>
       

        <Row>
        </Row>
       
        </Col>
        </Row>
        )
}
}

export default IsFerryBooked
