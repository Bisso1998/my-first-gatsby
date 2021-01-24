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
class PortBlairCabs extends Component {
    constructor(props) {
        super(props)

        this.state = {
          portBlairCabs:["Cab Transfer from Airport to Hotel","Cab Transfer from Airport to Ferry Point","Cab Transfer From Hotel To Ferry Point","Cellular Jail Tour Drop & Pickup","Cellular Jail light and sound Show Drop & Pickup","Corbyns Cove beach","Antro Museum","Fisherires Museum ", "Samudrika Museum","Catham Saw Mills","Monrng half day tour- Ross - Northbay  pickup and drop (one way)","Ross Island tour", "Ross trip with light and sound show", "Chidiya tapu", "National Park","Jolly Bouy/RedSkin", "Wandoor Beach","Baratang","Anthropological Museum","National Park"],
          portBlairCabsObject:[
            {
              name:"Airport -> Hotel Shuttle (one way) ",
              durationInMinutes: 45,
              },
          {
              name:"Airport -> Ferry Shuttle (one way)",
              durationInMinutes: 45,
              },
          {
              name:"Hotel -> Ferry Shuttle (one way) ",
              durationInMinutes: 45,
              },
          {
              name:"Cellular Jail Tour (Drop & Pick Up)",
              durationInMinutes: 45,
              },
          {
              name:"Cellular Jail light & sound Show (Drop & Pick Up)",
              durationInMinutes: 45,
              },
          {
              name:"Corbyns Cove Beach",
              durationInMinutes: 45,
              },
          {
              name:"on arrival Afternoon Tour -Cellular Jail, Corbyns Cove Beach, Cellular Jail Light and Sound show",
              durationInMinutes: 45,
              },
          {
              name:"Antro Museum ",
              durationInMinutes: 45,
              },
          {
              name:"Fisheries  Museum ",
              durationInMinutes: 45,
              },
          {
              name:"Samudrika Museum",
              durationInMinutes: 45,
              },
          {
              name:"Catham Saw Mills",
              durationInMinutes: 45,
              },
          {
              name:"City Tour -Cellular jail, Antro, Fisheries & Samudria Museum, Catham saw mill",
              durationInMinutes: 45,
              },
          {
              name:"Monrng half day tour -Ross -Northbay ",
              durationInMinutes: 45,
              },
          {
              name:"Ross trip",
              durationInMinutes:45,
              },
          {
              name:"Ross trip with light and sound show ",
              durationInMinutes: 45,
              },
          {
              name:"Chidiyatapu Half day evening tour ",
              durationInMinutes: 45,
              },
          {
              name:"Baratang Day tour",
              durationInMinutes: 45,
              },
          {
              name:"Wandoor day tour (jolly bouy/redskin) ",
              durationInMinutes: 45,
              },
          {
              name:"Wandoor beach morning or afternoon half day tour ",
              durationInMinutes: 45,
              },
          
                              ],
          cabsInPortBlairSelected:[]
        }
}

componentDidMount = ()=> {
    // props.location is only available on browser/client
    // gatsby will build server side.. so if window is undefined, ignore props.location
    if (typeof window === "undefined") {
        return
    }
}

onCardClick = (value,object) => {
  this.toggleCardSelected(document.getElementById(value))
  this.state.cabsInPortBlairSelected.push(object)
  // this.setState({})
}

toggleCardSelected = (element) => {
  // console.log(element.style.backgroundColor)
  if(element.style.backgroundColor == "white"){
    element.style.backgroundColor = "#eee"
    return
  }  
  if(element.style.backgroundColor == "rgb(238, 238, 238)"){
    element.style.backgroundColor = "white"
    return
  }
}

nextStep = () => {
    this.props.store.cabWizardStore.setGuestFerryIsBooked()
    this.props.store.cabWizardStore.setCabsInPortBlair(this.state.cabsInPortBlairSelected)
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
        Where would you like to go in Port Blair?
        </b>
        </p>
        <p style={{ fontSize: "16px", marginTop: "-10px" }}>
        {" "}
        Please select the places you would like to visit in PortBlair, We will prepare a itinerary for you accordingly{" "}
        </p>
        </div>
        </Col>
        </Row>


        
        <Row style={{ marginBottom: "50px" }}>
            {this.state.portBlairCabsObject.map(
              eachExperience => (
                <Col sm={{ size: 4 }}>
                  <div style={{ margin: "10px" }}>
                    <Row
                      style={{
                        boxShadow: " 0px 4px 32px rgba(189, 189, 189, 0.24)",
                        border: "1px solid #F2F2F2",
                        cursor: "pointer",
                        backgroundColor: "white"
                      }}
                      onClick={()=>this.onCardClick(eachExperience.name,eachExperience)
                      }
                      id={eachExperience.name}
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
                          <b>{eachExperience.name}</b>
                          <br/>
                          ({eachExperience.durationInMinutes} Mins)
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

export default PortBlairCabs
