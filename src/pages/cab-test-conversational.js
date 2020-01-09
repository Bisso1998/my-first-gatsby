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

// conversational ui
import { ConversationalForm } from 'conversational-form';

var striptags = require("striptags")

// import { Link } from "gatsby"
class ActivityBook extends Component {
  constructor(props) {
    super(props)
    this.formFields = [
      {
        'tag': 'input',
        'type': 'text',
        'name': 'firstname',
        'cf-questions': 'Hello, What is your name?',
      },
      {
        'tag': 'input',
        'type': 'radio',
        'name': 'cab-needs',
        'cf-label':'Yes Please',
        'cf-questions': 'Need assistance planning your trip through andaman?',
      },
       {
        'tag': 'input',
        'type': 'radio',
        'name': 'cab-needs',
        'cf-label':'No',
      },
      {
        'tag': 'input',
        'type': 'text',
        'name': 'date-of-arrival',
        'cf-questions': 'When do you arrive at Andaman airport?'
      },
      {
        'tag': 'input',
        'type': 'text',
        'name': 'date-of-departure',
        'cf-questions': 'And may I know your date of departure from Andaman Island?'
      },
      {
        'tag': 'input',
        'type': 'text',
        'name': 'airport-next-destination',
        'cf-questions': 'Great! What is your next destination from PortBlair Airport?',
        'list':'spots'
      },
      {
        'tag': 'input',
        'cf-conditional-airport-next-destination':'yes',
        'type': 'text',
        'name': 'need-cab',
        'cf-questions': 'Need a cab from airport to '
      },

    ];
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
      userDate: "",
      userPhoneNumber: "",
      date: "",
      focused: null,

      isPhoneNumberVerified: true,
      isEmailVerified: true,
    }
    // console.log("activityToBookId  " , this.props.location.state.activityId);
    //   console.log("I am booking for this activity: " , this.state.activityToBookDetails);
  }
submitCallback = ()=> {
    var formDataSerialized = this.cf.getFormData(true);
    console.log("Formdata, obj:", formDataSerialized);
    this.cf.addRobotChatResponse("You are done. Check the dev console for form data output.")
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

    // conversational ui
    this.cf = ConversationalForm.startTheConversation({
      options: {
        submitCallback: this.submitCallback,
        preventAutoFocus: true,
        // loadExternalStyleSheet: false
      },
      tags: this.formFields
    });
    
    this.elem.appendChild(this.cf.el);
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

  handleDateChange = date => {
    this.setState({
      userDate: date,
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
          <Row>
            <Col sm={{ size: 7 }} style={{ padding: "0" }}>
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
                    Review and pay for {this.state.activityToBookDetails.name}
                  </b>
                </p>
                <p style={{ fontSize: "16px", marginTop: "-10px" }}>
                  {" "}
                  Please select the date of activity and add your contact
                  details below to confirm the reservation{" "}
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
                }}
              >
              {/* conversational ui */}
              
                <div ref={ref => this.elem = ref}/>

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
                {/* <Col sm={{ size: 6}}  style={{borderLeft: '1px solid white', marginTop:'20px'}} >
                    <InputGroup>
                      <Input placeholder="Gender"
                             value={this.state.userGender}
                             onChange={e => this.updateGender(e)}/>
                    </InputGroup>
                  </Col> */}
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
              <div
                style={{
                  width: "100%",
                  fontFamily: "Montserrat",
                  color: "rgb(75,75,75)",
                  boxSizing: "border-box",
                }}
              >
                <p style={{ fontSize: "26px", marginTop: "40px" }}>
                  <b>Booking Details</b>
                </p>
              </div>

              <Row>
                <Col
                  sm={{ size: 6 }}
                  style={{ borderLeft: "1px solid white", paddingLeft: "0" }}
                >
                  <span>Date</span>
                  <SingleDatePicker
                    // date={moment()}
                    // showClearDate={true}
                    placeholder="Date of activity"
                    minDate="2019-06-23"
                    maxDate="2019-07-25"
                    inputIconPosition="after"
                    small={true}
                    numberOfMonths={1}
                    date={this.state.userDate}
                    onDateChange={date => this.handleDateChange(date)}
                    focused={this.state.focused}
                    onFocusChange={({ focused }) => this.setState({ focused })}
                    id="singleDatePicker"
                    block={true}
                    openDirection="up"
                    hideKeyboardShortcutsPanel={true}
                    isDayBlocked={this.isBlocked}
                    isOutsideRange={day =>
                      !(moment().diff(day) < 0 || moment().diff(day) >= 0)
                    }
                  />

                  {/*<Input type="select"  id="exampleSelect" placeholder="Date" value={this.state.userDate}*/}
                  {/*onChange={e => this.updateDate(e)}   list="datesAvailable">*/}
                  {/*<option value="null" selected="selected" hidden="hidden">Select Date</option>*/}
                  {/*{*/}
                  {/*this.props.location.state.activityToBook.dates.map((eachDate) => (*/}
                  {/*<option value={eachDate}>{eachDate}</option>*/}
                  {/*))*/}
                  {/*}*/}
                  {/*<option>{this.state.activityToBookDetails.id}</option>*/}

                  {/*</Input>*/}
                </Col>
                <Col
                  sm={{ size: 6 }}
                  style={{ borderLeft: "1px solid white", paddingLeft: "0" }}
                >
                  <span>Number of guests</span>
                  <GuestsSelector
                    handler={this.guestCountHandler}
                    maxTotalCount={15}
                  />
                  {/* <InputGroup>
                      <Input type="number"
                             placeholder="Adult attending"
                             value={this.state.numberOfAdultGuest}
                             onChange={e => this.updateNumberOfAdults(e)}/>
                    </InputGroup> */}
                </Col>
                {/* <Col sm={{ size: 6}}  style={{borderLeft: '1px solid white'}} >
                    <InputGroup>
                      <Input type="number" placeholder="Number of children"
                             value={this.state.numberOfChildren}
                             onChange={e => this.updateNumberOfChildren(e)}/>
                    </InputGroup>
                  </Col> */}
              </Row>
              {/* <br /> */}
              {/* <hr /> */}
              {/* <br /> */}
              <p
                style={{
                  fontSize: "26px",
                  ontFamily: "Montserrat",
                  color: "rgb(75,75,75)",
                }}
              >
                {" "}
                {/* <b>Additional Services</b>{" "} */}
              </p>
              <Row>
                {/* { 
                  addons_available ? (
                  Object.keys(this.state.activityToBookDetails.related_addons).map( (eachElement,s) => (
                  <Col sm={{ size: 4 }} style={{ paddingLeft: 0 }}>
                    <div style={{ fontSize: "14px", color: "rgb(75,75,75)" }}>
                      {this.state.activityToBookDetails.related_addons[eachElement].name.toUpperCase()}
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "rgb(75,75,75)",
                        marginTop: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <b>AIRPORT PICK UP SERVICES</b>
                    </div>
                    <div style={{ fontSize: "14px", color: "#938f8f" }}>
                      1888 for upto 4 guets
                      <br />
                      Know More
                      <br />
                      <br />
                      <Button outline color="secondary" size="sm">
                        Add
                      </Button>
                    </div>
                  </Col>
                )
                )):''
                }  */}
              </Row>
              <div style={{ marginTop: "20px" }}>
            {/* <form
              method="post"
              action="http://localhost:8001/pay-for-activity.php"
            > */}
            <form
              method="post"
              action="https://ferrybooking.in/activity-payment-processor/pay-for-activity.php"
            >
              <input
                type="hidden"
                value={this.state.activityToBookDetails.id}
                name="activity_id"
              />
              <input
                type="hidden"
                value={this.state.activityToBookDetails.name}
                name="purpose"
              />
              <input
                type="hidden"
                value={this.state.userEmailId}
                name="email"
              />
              <input
                type="hidden"
                value={this.state.userPhoneNumber}
                name="phone"
              />
              <input
                type="hidden"
                value={this.state.userName}
                name="buyer_name"
              />
              <input
                type="hidden"
                value={this.state.numberOfAdultGuest}
                name="adults"
              />
              <input
                type="hidden"
                value={this.state.numberOfChildren}
                name="children"
              />
              <input
                type="hidden"
                value={moment(this.state.userDate).format("YYYY-MM-DD")}
                name="date"
              />
              <input type="hidden" value={this.state.userAge} name="age" />
              <Button
                style={{
                  backgroundColor: "#CC4263",
                  padding: "10px",
                  color: "white",
                  width: "150px",
                }}
                // onClick={this.bookActivityTemporarily}
                type="submit"
                disabled={
                  !this.state.userAge ||
                  !this.state.userName ||
                  !this.state.userEmailId ||
                  !this.state.userDate ||
                  !this.state.userPhoneNumber ||
                  !this.state.numberOfAdultGuest ||
                  !this.state.isPhoneNumberVerified ||
                  !this.state.isEmailVerified
                }
                block
              >
                Proceed to pay{" "}
              </Button>
            </form>
          </div>
            </Col>
            <Col sm={{ size: 5 }}>
              <div
                style={{
                  width: "100%",
                  fontFamily: "Montserrat",
                  border: "1px solid rgb(228, 228, 228)",
                  color: "#938f8f",
                  padding: "20px",
                  boxSizing: "border-box",
                  marginTop: "20px",
                }}
              >
                <p
                  style={{
                    fontSize: "20px",
                    color: "rgb(75,75,75)",
                    textTransform: "uppercase",
                  }}
                >
                  {" "}
                  <b>
                    Cab Trip Planner <br />
                    {" "}
                    Day 1
                  </b>{" "}
                </p>

                <Row>
                  <Col
                    xs={{ size: 6 }}
                    sm={{ size: 6 }}
                    style={{ paddingLeft: "0" }}
                  >
                    <p
                      style={{
                        fontSize: "14px",
                        color: "rgb(72, 72, 72)",
                        textTransform: "uppercase",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        style={{
                          fontSize: "16px",
                          color: "rgb(72, 72, 72)",
                          marginRight: "10px",
                        }}
                      />
                       Port Blair Airport to Phoenix Bay Jetty{" "}
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "rgb(72, 72, 72)",
                        marginTop: "10px",
                        textTransform: "uppercase",
                      }}
                    >
                      {" "}
                      <FontAwesomeIcon
                        icon={faClock}
                        style={{
                          fontSize: "16px",
                          color: "rgb(72, 72, 72)",
                          marginRight: "10px",
                        }}
                      />
                      20 Mins
                    </p>
                    <i className="fas fa-band-aid" />
                  </Col>
                  <Col xs={{ size: 6 }} sm={{ size: 6 }}>
                    <img
                      alt=""
                      src={
                        apiEndPoints.image+
                        this.state.activityToBookDetails.image
                      }
                      style={{ width: "112px", borderRadius: "2px" }}
                    />
                  </Col>

                  {/* <Col sm={{ size: 4}}  >

                  </Col> */}
                </Row>
                
                

                <hr />
                <div style={{ fontSize: "14px", color: "rgb(72, 72, 72)" }}>
                  <p style={{ display: "inline" }}>
                    <b>Estimated Fare (INR)</b>
                  </p>
                  <p style={{ display: "inline", float: "right " }}>
                    ₹
                    {this.state.numberOfAdultGuest *
                      this.state.activityToBookDetails.adult_ticket +
                      this.state.numberOfChildren *
                        this.state.activityToBookDetails.child_ticket}
                  </p>
                  <p>(GST Inclusive)</p>
                </div>
                <Button
                style={{
                  float:"right",
                  backgroundColor: "#CC4263",
                  padding: "10px",
                  color: "white",
                  width: "200px",
                }}
                // onClick={this.bookActivityTemporarily}
                type="submit"
                disabled={
                  !this.state.userAge ||
                  !this.state.userName ||
                  !this.state.userEmailId ||
                  !this.state.userDate ||
                  !this.state.userPhoneNumber ||
                  !this.state.numberOfAdultGuest ||
                  !this.state.isPhoneNumberVerified ||
                  !this.state.isEmailVerified
                }
                block
              >
                Request Final Quote{" "}
              </Button>
              <br />
              <br />
                <hr />
                <div>
                  <p style={{ color: "rgb(72, 72, 72)" }}>
                    <b>Cancellation Policy</b>
                  </p>
                  <p style={{ fontSize: "14px", color: "rgb(72, 72, 72)" }}>
                    Get a full refund if you cancel in 24 hours.
                  </p>
                </div>
                <hr />

               
              </div>
            </Col>
            
          </Row>
          <br />
          
        </Container>
      </Layout>
    )
  }
}

export default ActivityBook
