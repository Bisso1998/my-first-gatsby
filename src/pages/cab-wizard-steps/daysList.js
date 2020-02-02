import React, { Component } from "react"
import GuestsSelector from "../../components/guestsSelector/guestsSelector"
import {
    Container,
    Row,
    Col ,
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText ,
    Button,
    } from "reactstrap"
import "react-dates/initialize"
import "react-dates/lib/css/_datepicker.css"
import * as moment from "moment"
import { faMapMarkerAlt, faClock } from "@fortawesome/free-solid-svg-icons"
// library.add(fab, faCheckSquare, faCoffee)
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { observer, inject } from 'mobx-react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

// import { Link } from "gatsby"
@observer
@inject('store')
class DaysList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpen:true,
        }
}

componentDidMount = ()=> {
    // props.location is only available on browser/client
    // gatsby will build server side.. so if window is undefined, ignore props.location
    if (typeof window === "undefined") {
        return
    }
}

listOfPortBlair = () =>{
    var listString = '';
    this.props.store.cabWizardStore.cabsInPortBlair.map( (eachCab,index) => (
        listString = listString + (index ? ', ' : '') + eachCab.name
    ))
    console.log(this.listOfPortBlair)
    return listString
}

listOfHavelock = () =>{
    var listString = '';
    this.props.store.cabWizardStore.cabsInHavelock.map( (eachCab,index) => (
        listString = listString + (index ? ', ' : '') + eachCab.name
    ))
    console.log(this.listOfHavelock)
    return listString
}

listOfNeil = () =>{
    var listString = '';
    this.props.store.cabWizardStore.cabsInNeil.map( (eachCab,index) => (
        listString = listString + (index ? ', ' : '') + eachCab.name
    ))
    console.log(this.listOfNeil)
    return listString
}

nextStep = () => {
    this.props.store.cabWizardStore.setGuestFerryIsBooked()
    this.props.nextStep()
}

previousStep = () => {
    this.props.store.cabWizardStore.setGuestFerryIsNotBooked()
    this.props.previousStep()
}

toggle = () => this.setIsOpen(!this.isOpen);

setIsOpen = (value) => this.setState({isOpen:value})

createItinerary = () => {
    let tmpDays = 0
    var daysInPreFerryPortBlair = []
    console.log(this.props.store.cabWizardStore.guestTotalPreFerryDaysInPortBlair)
    // for(var i=0;i<this.props.store.cabWizardStore.guestTotalPreFerryDaysInPortBlair;i++){
        daysInPreFerryPortBlair.push(<VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{  color: '#000' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
            date= "22/01/2020"
           
            position="left"
          >
            <h3 className="vertical-timeline-element-title">PortBlair</h3>
            <h4 className="vertical-timeline-element-subtitle"></h4>
            <p>
            {this.listOfPortBlair()}
            </p>
        </VerticalTimelineElement>)
    // }

    var daysInHavelock= []
    console.log(this.props.store.cabWizardStore.guestTotalDaysInHavelock)
    // for(var i=0;i<this.props.store.cabWizardStore.guestTotalDaysInHavelock;i++){
        daysInPreFerryPortBlair.push(
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{color: '#000' }}
                contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                date="25/01/2020"
                position="right"
              >
                <h3 className="vertical-timeline-element-title">Havelock</h3>
                <p>
                {this.listOfHavelock()}               
                </p>
            </VerticalTimelineElement>
              )
    // }

    var daysInNeil= []
    console.log(this.props.store.cabWizardStore.guestTotalDaysInNeil)
    // for(var i=0;i<this.props.store.cabWizardStore.guestTotalDaysInNeil;i++){
        daysInPreFerryPortBlair.push(<VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ color: '#000' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
            date="30/01/2020"
            position= "left"
          >
            <h3 className="vertical-timeline-element-title">Neil</h3>
            <p>
            {this.listOfNeil()}
            </p>
        </VerticalTimelineElement>)
    // }

    var daysInPostFerryPortBlair = []
    console.log(this.props.store.cabWizardStore.guestTotalPostFerryDaysInPortBlair)
    // for(var i=0;i<this.props.store.cabWizardStore.guestTotalPostFerryDaysInPortBlair;i++){
        daysInPostFerryPortBlair.push(<VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ color: '#000' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
            date="2011 - present"
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            
            position="right"
          >
            <h3 className="vertical-timeline-element-title">Post PortBlair</h3>
            <p>
            {this.listOfNeil()}
            </p>
        </VerticalTimelineElement>)
    // }

    return(
        <VerticalTimeline layout="1-column">
            {daysInPreFerryPortBlair}
            {daysInHavelock}
            {daysInNeil}
            {/* {daysInPostFerryPortBlair} */}
        </VerticalTimeline>

)}

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
        Here's Your Final Itinerary
        </b>
        </p>
        <p style={{ fontSize: "16px", marginTop: "-10px" }}>
        {" "}
        
        </p>
        </div>
        {this.createItinerary()}
    
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
        Request Quote
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
        Pay Now
        </Button>
        </p>
       
        </Col>
        </Row>
        )
}
}

export default DaysList
