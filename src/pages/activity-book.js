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
  componentDidMount() {
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
      window.location = "/"
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

  render() {
    let dateToString = new Date(this.state.activityToBookDetails.date)
    let showDateOfActivity = this.state.userDate ? (
      <p>{moment(this.state.userDate).format("YYYY-MM-DD")} </p>
    ) : (
      <p>
        <b>No Date Selected</b>
      </p>
    )
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

              <div
                style={{
                  width: "100%",
                  fontFamily: "Montserrat",
                  color: "rgb(75,75,75)",
                  boxSizing: "border-box",
                }}
              >
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
                      Enter a valid EmailId
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
              <br />
              <hr />
              <br />
              <p
                style={{
                  fontSize: "26px",
                  ontFamily: "Montserrat",
                  color: "rgb(75,75,75)",
                }}
              >
                {" "}
                <b>Additional Services</b>{" "}
              </p>
              <Row>
                {[1, 2, 3].map(eachElement => (
                  <Col sm={{ size: 4 }} style={{ paddingLeft: 0 }}>
                    <div style={{ fontSize: "14px", color: "rgb(75,75,75)" }}>
                      AIRPORT PORT BLAIR
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
                ))}
              </Row>
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
                    {" "}
                    {striptags(this.state.activityToBookDetails.name)}{" "}
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
                      {this.state.activityToBookDetails.location}{" "}
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
                      3.5 hours
                    </p>
                    <i className="fas fa-band-aid" />
                  </Col>
                  <Col xs={{ size: 6 }} sm={{ size: 6 }}>
                    <img
                      alt=""
                      src={
                        "https://travelcheckins.com/apitest/public/activity_images/" +
                        this.state.activityToBookDetails.image
                      }
                      style={{ width: "112px", borderRadius: "2px" }}
                    />
                  </Col>

                  {/* <Col sm={{ size: 4}}  >

                  </Col> */}
                </Row>
                <hr />
                <Row>
                  <div style={{ fontSize: "14px", color: "rgb(72, 72, 72)" }}>
                    {showDateOfActivity}
                    {this.state.activityToBookDetails.start_time} -{" "}
                    {this.state.activityToBookDetails.end_time}
                  </div>
                </Row>

                <hr />
                <div style={{ fontSize: "14px", color: "rgb(72, 72, 72)" }}>
                  <p>
                    <b> Provided Equipments</b>
                  </p>

                  <span>{this.state.activityToBookDetails.equipment}</span>
                </div>

                <hr />
                <div style={{ fontSize: "14px", color: "rgb(72, 72, 72)" }}>
                  <p style={{ display: "inline" }}>
                    {this.state.activityToBookDetails.adult_ticket} X{" "}
                    {this.state.numberOfAdultGuest || 0} adult(s)
                  </p>
                  <p style={{ display: "inline", float: "right " }}>
                    ₹
                    {this.state.activityToBookDetails.adult_ticket *
                      this.state.numberOfAdultGuest}
                  </p>
                </div>
                <br />
                <div style={{ fontSize: "14px", color: "rgb(72, 72, 72)" }}>
                  <p style={{ display: "inline" }}>
                    {this.state.activityToBookDetails.child_ticket} X{" "}
                    {this.state.numberOfChildren || 0} children(s)
                  </p>
                  <p style={{ display: "inline", float: "right " }}>
                    ₹
                    {this.state.activityToBookDetails.child_ticket *
                      this.state.numberOfChildren}
                  </p>
                </div>

                <hr />
                <div style={{ fontSize: "14px", color: "rgb(72, 72, 72)" }}>
                  <p style={{ display: "inline" }}>
                    <b>TOTAL (INR)</b>
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

                <b style={{ color: "rgb(72, 72, 72)" }}>Guidelines</b>

                <p style={{ fontSize: "14px", color: "rgb(72, 72, 72)" }}>
                  <b>Pre Activity Guidelines </b>{" "}
                  {this.state.activityToBookDetails.pre_activity_guidelines}
                </p>
                <p style={{ fontSize: "14px", color: "rgb(72, 72, 72)" }}>
                  <b>Post Activity Guidelines </b>{" "}
                  {this.state.activityToBookDetails.post_activity_guidelines}
                </p>
              </div>
            </Col>
          </Row>
          <br />
          <div style={{ marginTop: "15px" }}>
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
        </Container>
      </Layout>
    )
  }
}

export default ActivityBook
