import React, { Component } from "react"
// import axios from "axios"
import Layout from "../components/layout"
import { Container, Row, Col } from 'reactstrap';
import {
  BrowserView,
  MobileView
} from "react-device-detect";
import {
  faMapMarkerAlt,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
// library.add(fab, faCheckSquare, faCoffee)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Recommendation from '../components/recommended';
import apiEndPoints from '../apiEndPoints';
import { Link } from "gatsby";
var striptags = require('striptags');

class ActivityDetail extends Component {
    constructor (props) {
        super(props);
        this.state = {
            data: props.pageContext.page,
            activities: [],
            loading: true,
        }
    }

    componentDidMount(){
        // props.location is only available on browser/client
        // gatsby will build server side.. so if window is undefined, ignore props.location
        if (typeof window === 'undefined') {
            return;
          }
        this.setState(() => ({ activityId: this.props.location.state.activityId }));
    }

    render() {  
        console.log(this.state.data)
        return(
            <Layout>
                <Container id="activity-info" style={{marginTop:'4rem'}}>
                    <BrowserView>
                    <Row className="">
                        <Col sm={{ size: 4}}  >
                            <div id="activityImage" style={{width: '100%' , height: '600px' ,  backgroundImage:  'url('+apiEndPoints.image+this.state.data.image+')' , backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', }}>

                            </div>
                            
                            <div style={{width: '100%', fontFamily: 'Montserrat',   color: 'rgb(72, 72, 72)',padding: '10px' ,  boxSizing: 'border-box',  marginTop : '20px'}}>
                                <p style={{fontSize: '26px',}}> Inclusions </p>
                                <div style={{fontSize: '14px'}}>
                                    <b>Facilities</b>  : {this.state.data.facilities}<br/>
                                    <b>Equipment</b> : {this.state.data.equipment}<br/>
                                    <b>Photography</b> : {this.state.data.photography}<br/>
                                    <b>Certificate</b> : {this.state.data.certificate_provided}<br/>
                                </div>
                
                                <hr/>
                                <p style={{fontSize: '26px',}}> Information to participants </p>
                                <div style={{fontSize: '14px'}}>
                                    <b>Minimum Age</b>  : <br/>
                                    <b>Physical Requirement</b> :{this.state.data.physical_requirements}<br/>
                                    <b>Medical Condition</b> :{this.state.data.medical_requirements}<br/>
                                    <b>What to carry</b> :{this.state.data.what_to_carry}<br/>

                                    {/* <b>Pre activity guidelines</b> :{this.state.data.pre_activity_guidelines}<br/>
                                    <b>Post activity guidelines</b> :{this.state.data.post_activity_guidelines}<br/> */}
                                </div>
                            </div>
                        </Col>
                        <Col sm={{ size: 7}}  >
                            <div style={{width: '100%', fontFamily: 'Montserrat', color: 'rgb(72, 72, 72)', boxSizing: 'border-box', }}>
                                <p style={{fontSize: '13px',}}> {this.state.data.name}</p>
                                <p style={{fontSize: '26px', marginTop: '-20px',fontWeight: 'bold'}}> {striptags(this.state.data.small_description)}</p>
                            </div>
                            <div style={{fontWeight: 100,backgroundColor: '#1D62B1', boxSizing: 'border-box', color: 'white', padding: '15px'}}>
                                <Row>
                                    <Col sm={{ size: 6}}  >
                                    <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  style={{ fontSize: '18px', color: 'white', marginRight:'10px' }}
                /> <b>{this.state.data.location}</b> <br/>
                                        <FontAwesomeIcon
                  icon={faClock}
                  style={{ fontSize: '16px', color: 'white', marginRight:'10px' }}
                /><b>45 Mins</b> <br/>
                                        
                                    </Col>
                                    <Col sm={{ size: 6}}  style={{borderLeft: '1px solid white'}} >
                                        Min Age: <b>{this.state.data.participants_age}</b> <br/>
                                        Activity Type: <b>{this.state.data.style}</b> <br/>
                                    </Col>
                                </Row>
                            </div>
                            <div style={{width: '100%', color: 'rgb(72, 72, 72)',fontFamily: 'Montserrat', padding: '10px' ,  boxSizing: 'border-box',  marginTop : '20px'}}>
                                <p style={{fontSize: '26px',}}> About </p>
                                <div style={{fontSize: '16px'}}>
                                    {striptags(this.state.data.description)}</div>
                            </div>
                            <div style={{padding: '10px' , color: 'rgb(72, 72, 72)',  fontFamily: 'Montserrat', fontSize: '16px' }}>
                                <p style={{fontSize: '26px', color: '#CC4263'}}> Why you will love this activity? </p>
                                <ul>
                                    {/* <li>
                                        Scuba diving is a mode of underwater diving where the diver uses a self-contained underwater breathing apparatus (scuba).
                                    </li>
                                    <li>
                                        Scuba diving is a mode of underwater diving where the diver uses a self-contained underwater breathing apparatus (scuba).
                                    </li>
                                    <li>
                                    Scuba diving is a mode of underwater diving where the diver uses a self-contained underwater breathing apparatus (scuba).
                                    </li>
                                    <li>
                                    Scuba diving is a mode of underwater diving where the diver uses a self-contained underwater breathing apparatus (scuba).
                                    </li>
                                    <li>
                                    Scuba diving is a mode of underwater diving where the diver uses a self-contained underwater breathing apparatus (scuba).
                                    </li> */}
                                    {this.state.data.why_to_do}
                                </ul>
                                <br/>
                              <Link to="/activity-book"   state={{ activityId: this.state.activityId , activityToBook: this.state.data }} >
                              <button style={{backgroundColor: '#CC4263', padding: '10px', color: 'white' , width: '150px'}}
                              >Book Now </button>
                              </Link>
                            </div>
                        </Col>
                    </Row>
                    </BrowserView>


                    <MobileView>
                      <Row className="">
                        <Col sm={{ size: 6}} style={{padding:'0'}}  >
                          <div style={{width: '100%', fontFamily: 'Montserrat', color: 'rgb(72, 72, 72)', boxSizing: 'border-box', }}>
                            {/*<p style={{fontSize: '13px',}}> {this.state.data.name}</p>*/}
                            <p style={{fontSize: '26px', marginTop: '-20px',fontWeight: 'bold'}}> {striptags(this.state.data.small_description)}</p>
                          </div>

                          <div style={{width: '100%', color: 'rgb(72, 72, 72)',fontFamily: 'Montserrat', padding: '10px' ,  boxSizing: 'border-box',  marginTop : '20px'}}>
                            <p style={{fontSize: '26px',}}> {this.state.data.name}</p>
                            <div id="activityImage" style={{width: '100%' , height: '600px' ,  backgroundImage:  'url('+apiEndPoints.image+this.state.data.image+')' , backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', }}>

                            </div>

                            <div style={{fontSize: '16px',marginTop:'15px'}}>
                              {striptags(this.state.data.description)}</div>
                          </div>
                          <div style={{fontWeight: 100,backgroundColor: '#1D62B1', boxSizing: 'border-box', color: 'white', padding: '15px'}}>
                          <Row>
                                    <Col sm={{ size: 6}}  >
                                    <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  style={{ fontSize: '18px', color: 'white', marginRight:'10px' }}
                /> <b>{this.state.data.location}</b> <br/>
                                        <FontAwesomeIcon
                  icon={faClock}
                  style={{ fontSize: '16px', color: 'white', marginRight:'10px' }}
                /><b>{this.state.data.duration}</b> <br/>
                                        
                                    </Col>
                                    <Col sm={{ size: 6}}  style={{borderLeft: '1px solid white'}} >
                                        Min Age: <b>{this.state.data.participants_age}</b> <br/>
                                        Activity Type: <b>{this.state.data.style}</b> <br/>
                                    </Col>
                                </Row>
                          </div>
                          <div style={{padding: '10px' , color: 'rgb(72, 72, 72)',  fontFamily: 'Montserrat', fontSize: '16px',marginTop:'15px' }}>
                              <p style={{fontSize: '26px', color: '#CC4263'}}> Why you will love this activity? </p>

                            <ul>
                              <li>
                                Scuba diving is a mode of underwater diving where the diver uses a self-contained underwater breathing apparatus (scuba).
                              </li>
                              <li>
                                Scuba diving is a mode of underwater diving where the diver uses a self-contained underwater breathing apparatus (scuba).
                              </li>
                              <li>
                                Scuba diving is a mode of underwater diving where the diver uses a self-contained underwater breathing apparatus (scuba).
                              </li>
                              <li>
                                Scuba diving is a mode of underwater diving where the diver uses a self-contained underwater breathing apparatus (scuba).
                              </li>
                              <li>
                                Scuba diving is a mode of underwater diving where the diver uses a self-contained underwater breathing apparatus (scuba).
                              </li>
                            </ul>
                            <br/>

                          </div>
                        </Col>
                        <Col sm={{ size: 4}}  >


                          <div style={{width: '100%', fontFamily: 'Montserrat',   color: 'rgb(72, 72, 72)',padding: '10px' ,  boxSizing: 'border-box',  marginTop : '-15px'}}>
                            <p style={{fontSize: '26px',}}> Inclusions </p>
                            <div style={{fontSize: '14px'}}>
                              <b>Facilities</b>  : {this.state.data.facilities}<br/>
                              <b>Equipment</b> : {this.state.data.equipment}<br/>
                              <b>Photography</b> : {this.state.data.photography}<br/>
                              <b>Certificate</b> : {this.state.data.certificate_provided}<br/>
                            </div>

                            <hr/>
                            <p style={{fontSize: '26px',}}> Information to participants </p>
                            <div style={{fontSize: '14px'}}>
                              <b>Minimum Age</b>  : <br/>
                              <b>Physical Requirement</b> :{this.state.data.physical_requirements}<br/>
                              <b>Medical Condition</b> :{this.state.data.medical_requirements}<br/>
                              <b>What to carry</b> :{this.state.data.what_to_carry}<br/>

                              {/* <b>Pre activity guidelines</b> :{this.state.data.pre_activity_guidelines}<br/>
                                    <b>Post activity guidelines</b> :{this.state.data.post_activity_guidelines}<br/> */}
                            </div>
                          </div>
                          <Link to="/activity-book"   state={{ activityId: this.state.activityId , activityToBook: this.state.data }} >
                            <button style={{backgroundColor: '#CC4263', padding: '10px', color: 'white' , width: '100%'}}
                            >Book Now </button>
                          </Link>
                        </Col>

                      </Row>
                    </MobileView>
                    <hr />
                    <p style={{fontSize: '26px', ontFamily: 'Montserrat',  color: '#938f8f',  marginTop: '10px'}}> <b>Recommended</b> </p>
                    <Recommendation  listOfRecommendation = {this.state.data.related_activities}/>
                </Container>
            </Layout>
            )
            
        }
    }
    
    export default ActivityDetail
    