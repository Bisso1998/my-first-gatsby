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
var striptags = require("striptags")

// import { Link } from "gatsby"
class SelectDay1Activities extends Component {
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
            Day 1: Port Blair
        </b>
        </p>
        <p style={{ fontSize: "18px", marginTop: "-20px" }}>
        <b>
            Please select the activites you would like to participate for day 1 at Port Blair 
        </b>
        </p>
        <br /><br /> <br />
        <ul>
                <li> <Input type="checkbox" />{' '}Drop to Hotel in Port Blair</li>
                <li> <Input type="checkbox" />{' '}Visit to Cellular Jail</li>
                <li> <Input type="checkbox" />{' '}Visit to evening Light And Sound Show</li>
            </ul>
        </div>

        
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
        <Button onClick={this.props.previousStep}>
        Go to day 2
        </Button>
        </p>
       

        <Row>
            
        </Row>
       
        </Col>
        </Row>
        )
}
}

export default SelectDay1Activities
