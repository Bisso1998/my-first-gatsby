import React, { Component } from "react"
// import axios from "axios"
import Layout from "../components/layout"

import GuestsSelector from "../components/guestsSelector/guestsSelector"
import { Container, Row, Col } from 'reactstrap';
import { InputGroup, 
  // InputGroupText, 
  // InputGroupAddon, 
  Input } from 'reactstrap';
import { Button, Label } from 'reactstrap';
import axios from "axios";
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import * as moment from 'moment';
var striptags = require('striptags');



// import { Link } from "gatsby"
class ActivityBook extends Component {
  constructor (props) {
    super(props);
    this.state = {
      loading: true,
      numberOfAdultGuest: "",
      numberOfChildren: "",
      totalCost: 0,
      activityToBookDetails: '',
      userName: '',
      userAge: '',
      userGender: '',
      userEmailId: '',
      userDate: '',
      userPhoneNumber: '',
      date: '',
      focused: null,
    }
  // console.log("activityToBookId  " , this.props.location.state.activityId);
  //   console.log("I am booking for this activity: " , this.state.activityToBookDetails);
  }

  guestCountHandler = (adultCount, childCount)=>{
    this.setState({numberOfAdultGuest:adultCount,numberOfChildren:childCount})
  }

  isBlocked = day => {
    day = day.format("YYYY-MM-DD");
    const  availableDates = this.props.location.state.activityToBook.dates;
    return (availableDates.includes(day)) ? 0 : 1;

  }
  componentDidMount(){
    // props.location is only available on browser/client
    // gatsby will build server side.. so if window is undefined, ignore props.location
    if (typeof window === 'undefined') {
      return;
    }
    if (this.props.location.state != null) {
      this.setState(() => ({ activityToBookDetails: this.props.location.state.activityToBook }));
      console.log("activityToBookDetails " , this.props.location.state.activityToBook );
      let savedState =  JSON.stringify(this.props.location.state)
      localStorage.setItem('activityBookingState', savedState);
    } else {
      let retrievedState = JSON.parse(localStorage.getItem('activityBookingState'));
      this.setState(() => ({ activityToBookDetails: retrievedState.activityToBook }));
      if(retrievedState==null)
        alert("Please select an activity from homepage to book the activity. No activity selected");
    }
  }
  updateNumberOfAdults = e => {
    this.setState({ numberOfAdultGuest: e.target.value });
  }
  updateNumberOfChildren = e => {
    this.setState({ numberOfChildren: e.target.value })
  }


  updateUsername = e => {
    this.setState({
      userName: e.target.value
    })
  }

  updateGender = e => {
    this.setState({
      userGender: e.target.value
    })
  }
  updateAge = e => {
    this.setState({
      userAge: e.target.value
    })
  }
  updateEmailId = e => {
    this.setState({
      userEmailId: e.target.value
    })
  }
  updateContactNumber = e => {
    this.setState({
      userPhoneNumber: e.target.value
    })
  }

  // updateDate = e => {
  //   this.setState({
  //     userDate: e.target.value
  //   })
  // }


  handleDateChange = (date) => {
    this.setState({
      userDate: date,
    })

  }
  bookActivityTemporarily = () => {
    // console.log("The data we have are: " , this.state.activityToBookDetails);
    let tmpActivityDetails = this.state.activityToBookDetails;
    let totalBookingCost = ( ( this.state.numberOfAdultGuest * this.state.activityToBookDetails.adult_ticket) + (this.state.numberOfChildren * this.state.activityToBookDetails.child_ticket));
    let data = {"activitydata":{
        "activitycart": [
          {
            "_activityDate": this.state.userDate,
            "_activityid": tmpActivityDetails.id,
            "_adultquantity": this.state.numberOfAdultGuest,
            "_childquantity": this.state.numberOfChildren,
          }],
        "age": "28",
        "booking_amount": totalBookingCost,
        "contact_no": this.state.userPhoneNumber,
        "email": this.state.userEmailId,
        "gender": this.state.userGender,
        "name": this.state.userName
      },
      "agent_id":2,
      "user_id":38
    }

    console.log("Data I am sending is: " , data);
    data = JSON.stringify(data);


    let  headers = {
      'Content-Type': 'application/json',
    }

    this.setState({ loading: true });
    axios
      .post(`https://travelcheckins.com/apitest/api/booking/book/tempbookactivity`, data,  {headers: headers} )
      .then(data => {
        console.log(data);

      })
      .catch(error => {
        this.setState({ loading: false, error })
      })
  }


  render() {
let dateToString = new Date(this.state.activityToBookDetails.date);
     return(
      <Layout>
        <Container style={{marginTop:"4rem"}}>
          <Row>
            <Col sm={{ size: 7}} style={{padding:'0'}} >
              <div style={{width: '100%', fontFamily: 'Montserrat',  color: 'rgb(85, 73, 68)',  boxSizing: 'border-box', marginTop: '50px' }}>
                <p style={{fontSize: '28px', marginTop: '-20px'}}><b>Review and pay for {this.state.activityToBookDetails.name}</b></p>
                <p style={{fontSize: '16px',  marginTop: '-10px'}}> { striptags(this.state.activityToBookDetails.small_description)}</p>
              </div>
              <div style={{width: '100%', fontFamily: 'Montserrat',  color: 'rgb(85, 73, 68)',  boxSizing: 'border-box', }}>
                <p style={{fontSize: '28px', marginTop: '40px'}}><b>Contact details</b></p>
              </div>
             
                <Row>
                  <Col sm={{ size: 6}}  >
                    <span>Name</span>
                    <InputGroup>
                      <Input placeholder="First and last name"
                             value={this.state.userName}
                             onChange={e => this.updateUsername(e)}/>
                  </InputGroup>
                  </Col>
                  <Col sm={{ size: 6}}  style={{borderLeft: '1px solid white'}} >
                  <span>Age</span>
                    <InputGroup>
                      <Input type="number" placeholder="Age"
                             value={this.state.userAge}
                             onChange={e => this.updateAge(e)}/>
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
                <br/>
                <Row>

                  <Col sm={{ size: 6}}  style={{borderLeft: '1px solid white'}} >
                    <span>Contact Number</span>
                    <InputGroup>
                      <Input placeholder="9312341234" value={this.state.userPhoneNumber}
                             onChange={e => this.updateContactNumber(e)}/>
                    </InputGroup>
                  </Col>
                  <Col sm={{ size: 6}}  style={{borderLeft: '1px solid white'}} >
                    <span>Email</span>
                    <InputGroup>
                      <Input placeholder="name@gmail.com" value={this.state.userEmailId}
                             onChange={e => this.updateEmailId(e)}/>
                    </InputGroup>
                  </Col>
                  
                </Row>
                <div style={{width: '100%', fontFamily: 'Montserrat',  color: 'rgb(85, 73, 68)',  boxSizing: 'border-box', }}>
                  <p style={{fontSize: '26px', marginTop: '40px'}}><b>Booking Details</b></p>
                </div>
                
                <Row>
                <Col sm={{ size: 6}}  style={{borderLeft: '1px solid white'}} >
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
                      onFocusChange={({ focused }) =>
                        this.setState({ focused })
                      }
                      id="singleDatePicker"
                      block={true}
                      openDirection="up"
                      hideKeyboardShortcutsPanel={true}
                      isDayBlocked={this.isBlocked}
                      isOutsideRange={day => !((moment().diff(day) < 0) || (moment().diff(day) >= 0) )}

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
                  <Col sm={{ size: 6}}  style={{borderLeft: '1px solid white'}} >
                    <span>Number of guests</span>
                    <GuestsSelector handler={this.guestCountHandler} maxTotalCount={this.state.activityToBookDetails.maxcapacity} />
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
                <br/>
              <hr />
              <br/>
              <p style={{fontSize: '26px', ontFamily: 'Montserrat',  color: 'rgb(85, 73, 68)', }}> <b>Additional Services</b> </p>
              <Row>
                {
                  [1,2,3].map((eachElement) => (
                    <Col sm={{ size: 4}}  >
                      <div style={{fontSize: '16px' , color: 'rgb(85, 73, 68)'}}>
                        AIRPORT PORT BLAIR
                      </div>
                      <div style={{fontSize: '14px' , color: 'rgb(85, 73, 68)', marginTop: "10px", marginBottom: "10px"}}>
                        <b>AIRPORT PICK UP SERVICES</b>
                      </div>
                      <div style={{fontSize: '14px' , color: '#938f8f'}}>
                        1888 for upto 4 guets
                        <br/>
                        Know More
                        <br/>
                        <br/>
                        <Button outline color="secondary" size="sm">Add</Button>
                      </div>
                    </Col>
                  ))
                }
              </Row>
            </Col>
            <Col sm={{ size: 5}}  >
              <div style={{width: '100%', fontFamily: 'Montserrat', border: '2px solid #d8d2d2' ,  color: '#938f8f',padding: '20px' ,  boxSizing: 'border-box',  marginTop : '20px'}}>
                <p style={{fontSize: '16px',color: 'rgb(85, 73, 68)'}}> <b> {striptags(this.state.activityToBookDetails.description)} </b> </p>


                <Row>
                  <Col sm={{ size: 6}}  >
                    <p style={{fontSize: '14px',color: '#767676'}}> <b>{this.state.activityToBookDetails.location}</b> </p>
                    <p style={{fontSize: '14px',color: '#767676', marginTop: '10px'}}> <b>3.5 hours</b> </p>
                    <i className="fas fa-band-aid"></i>

                  </Col>
                  <Col sm={{ size: 2}}  >
                    <img alt="" src={"https://travelcheckins.com/apitest/public/activity_images/"+this.state.activityToBookDetails.image} style={{height: "80px", width: "80px", borderRadius: '2px'}}/>
                  </Col>

                  <Col sm={{ size: 4}}  >

                  </Col>
                </Row>
  <hr/>
                <div style={{fontSize: '14px', }}>
                  {dateToString.toDateString()}
                  <br/>
                  {this.state.activityToBookDetails.start_time} - {this.state.activityToBookDetails.end_time}
                </div>
                <hr/>
                <div style={{fontSize: '14px', }}>
                 Provided Equipments
                  <br/>
                  {this.state.activityToBookDetails.equipment}
                </div>

                <hr/>
                <div style={{fontSize: '14px', }}>
                  <p style={{display: 'inline'}}>
                    {this.state.activityToBookDetails.adult_ticket} X {this.state.numberOfAdultGuest || 0} adult(s)
                  </p>
                  <p style={{display: 'inline', float: 'right '}}>
                    {this.state.activityToBookDetails.adult_ticket * this.state.numberOfAdultGuest}
                  </p>
                </div>
                <br/>
                <div style={{fontSize: '14px', }}>
                  <p style={{display: 'inline'}}>
                    {this.state.activityToBookDetails.child_ticket} X {this.state.numberOfChildren || 0} children(s)
                  </p>
                  <p style={{display: 'inline', float: 'right '}}>
                    {this.state.activityToBookDetails.child_ticket * this.state.numberOfChildren}
                  </p>
                </div>

                <hr/>
                <div style={{fontSize: '14px', }}>
                  <p style={{display: 'inline'}}>
                    <b>TOTAL (INR) </b>
                  </p>
                  <p style={{display: 'inline', float: 'right '}}>
                    {( ( this.state.numberOfAdultGuest * this.state.activityToBookDetails.adult_ticket) + (this.state.numberOfChildren * this.state.activityToBookDetails.child_ticket))}
                  </p>
                </div>
                <hr/>
                <div>
                  <p style={{color: "#9DC9D8"}}>
                    <b>Cancellation Policy</b>
                  </p>
                  <p>
                    Get a full refund if you cancel in 24 hours.
                  </p>
                </div>
                <hr/>
                <p>
                  <b>Review Guest Requirements</b>
                  <br/>
                  {this.state.activityToBookDetails.physical_requirements}
                </p>
                <p>
                  <b>Guidelines</b>
                </p>
                <p>
                  <b>Pre Activity Guidelines </b> {this.state.activityToBookDetails.pre_activity_guidelines}
                </p>
                <p>
                  <b>Post Activity Guidelines </b> {this.state.activityToBookDetails.post_activity_guidelines}
                </p>
              </div>
            </Col>
          </Row>
          <br/>
          <div style={{display: 'flex', justifyContent: 'center', marginBottom: '30px'}}>
            <Button
              style={{backgroundColor: '#CC4263', padding: '10px', color: 'white' , width: '150px'}}
              onClick={this.bookActivityTemporarily}
              disabled={!this.state.userAge || !this.state.userName || !this.state.userEmailId || !this.state.userDate || !this.state.userPhoneNumber || !this.state.numberOfAdultGuest || !this.state.numberOfChildren}
              block>Proceed to pay </Button>
          </div>
        </Container>
      </Layout>


    )

  }
}

export default ActivityBook
