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
class NeilCabs extends Component {
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
        <Container>
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
        Where would you like to go in Neil?
        </b>
        </p>
        <p style={{ fontSize: "16px", marginTop: "-10px" }}>
        {" "}
        Please select the places you would like to visit in Neil, We will prepare a itinerary for you accordingly{" "}
        </p>
        </div>
        </Col>
        </Row>


        
        <Row style={{ marginBottom: "50px" }}>
            {["Cab Transfer from Ferry point to Hotel","Bharathpur Beach","Laxmanpur Beach"].map(
              eachExperience => (
                <Col sm={{ size: 4 }}>
                  <div style={{ margin: "10px" }}>
                    <Row
                      style={{
                        boxShadow: " 0px 4px 32px rgba(189, 189, 189, 0.24)",
                        border: "1px solid #F2F2F2",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        {}
                      }
                      id={eachExperience}
                    >
                      <Col
                        sm={{ size: 3 }}
                        style={{
                          backgroundImage: `url(https://cdn.dribbble.com/users/1426558/screenshots/4740239/artboard_copy.png)`,
                          height: "70px",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                      <Col sm={{ size: 9 }} style={{ marginTop: "5%" }}>
                        <p
                          style={{
                            fontFamily: "Open Sans",
                            fontSize: "14px",
                            color: "#554944",
                          }}
                        >
                          <b>{eachExperience}</b>
                        </p>
                      </Col>
                    </Row>
                  </div>
                </Col>
              )
            )}
          </Row>

        <Row>
        <Col sm={{ size: 12 }} style={{ padding: "0" }}>
        
        
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
        Next
        </Button>
        </p>
       

        
        
       
        </Col>
        </Row>
        
        
        
        </Container>
        )
}
}

export default NeilCabs
