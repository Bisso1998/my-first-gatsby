import React, { Component } from "react"
// import axios from "axios"
import Layout from "../components/layout"
import { Container, Row, Col } from 'reactstrap';
import { InputGroup, 
  // InputGroupText, 
  // InputGroupAddon, 
  Input } from 'reactstrap';
import { Button } from 'reactstrap';
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
  }
  // console.log("activityToBookId  " , this.props.location.state.activityId);
  //   console.log("I am booking for this activity: " , this.state.activityToBookDetails);

  }
  componentDidMount(){
    // props.location is only available on browser/client
    // gatsby will build server side.. so if window is undefined, ignore props.location
    if (typeof window === 'undefined') {
      return;
    }
    if (this.props.location.state != null) {
      this.setState(() => ({ activityToBookDetails: this.props.location.state.activityToBook }));
      console.log("activityToBookDetails " , this.state.activityToBookDetails);
    } else {
      alert("Please select an activity from homepage to book the activity. No activity selected");
    }

  }
  updateNumberOfAdults = e => {
    this.setState({ numberOfAdultGuest: e.target.value });
  }
  updateNumberOfChildren = e => {
    this.setState({ numberOfChildren: e.target.value })
  }
  render() {
let dateToString = new Date(this.state.activityToBookDetails.date);
     return(
      <Layout>
        <Container style={{marginTop:"4rem"}}>
          <Row>
            <Col sm={{ size: 7}}  >
              <div style={{width: '100%', fontFamily: 'Montserrat',  color: 'rgb(85, 73, 68)',  boxSizing: 'border-box', marginTop: '50px' }}>
                <p style={{fontSize: '28px', marginTop: '-20px'}}><b>Review and pay for {this.state.activityToBookDetails.name}</b></p>
                <p style={{fontSize: '16px',  marginTop: '-10px'}}> { striptags(this.state.activityToBookDetails.small_description)}</p>
              </div>
              <div style={{width: '100%', fontFamily: 'Montserrat',  color: 'rgb(85, 73, 68)',  boxSizing: 'border-box', }}>
                <p style={{fontSize: '28px', marginTop: '40px'}}><b>Who's coming?</b></p>


              </div>
              <div>
                <Row>
                  <Col sm={{ size: 4}}  >
                    <InputGroup>
                      <Input placeholder="Name"/>
                  </InputGroup>
                  </Col>
                  <Col sm={{ size: 4}}  style={{borderLeft: '1px solid white'}} >
                    <InputGroup>
                      <Input type="number" placeholder="Age"/>
                    </InputGroup>
                  </Col>
                  <Col sm={{ size: 4}}  style={{borderLeft: '1px solid white'}} >
                    <InputGroup>
                      <Input placeholder="Gender"/>
                    </InputGroup>
                  </Col>
                </Row>
                <br/>
                <Row>

                  <Col sm={{ size: 6}}  style={{borderLeft: '1px solid white'}} >
                    <InputGroup>
                      <Input placeholder="Contact Number"/>
                    </InputGroup>
                  </Col>
                  <Col sm={{ size: 6}}  style={{borderLeft: '1px solid white'}} >
                    <InputGroup>
                      <Input placeholder="Email"/>
                    </InputGroup>
                  </Col>
                </Row>
                <div style={{width: '100%', fontFamily: 'Montserrat',  color: 'rgb(85, 73, 68)',  boxSizing: 'border-box', }}>
                  <p style={{fontSize: '26px', marginTop: '40px'}}><b>Guest Details</b></p>
                </div>
                <br/>
                <Row>
                  <Col sm={{ size: 6}}  style={{borderLeft: '1px solid white'}} >
                    <InputGroup>
                      <Input type="number"
                             placeholder="Number of adults"
                             value={this.state.numberOfAdultGuest}
                             onChange={e => this.updateNumberOfAdults(e)}/>
                    </InputGroup>
                  </Col>
                  <Col sm={{ size: 6}}  style={{borderLeft: '1px solid white'}} >
                    <InputGroup>
                      <Input type="number" placeholder="Number of children"
                             value={this.state.numberOfChildren}
                             onChange={e => this.updateNumberOfChildren(e)}/>
                    </InputGroup>
                  </Col>
                </Row>

              </div>
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
              <div style={{width: '100%', fontFamily: 'Montserrat', border: '2px solid #d8d2d2' ,  color: '#938f8f',padding: '20px' ,  boxSizing: 'border-box',  marginTop : '0px'}}>
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
            <Button  style={{backgroundColor: '#CC4263', padding: '10px', color: 'white' , width: '150px'}} block>Proceed to pay </Button>
          </div>
        </Container>
      </Layout>
    )

  }
}

export default ActivityBook
