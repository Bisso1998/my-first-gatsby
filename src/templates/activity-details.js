import React, { Component } from "react"
// import axios from "axios"
import Layout from "../components/layout"
import { Container, Row, Col } from 'reactstrap';
import Recommendation from '../components/recommended'
import { Link } from "gatsby"
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
                <Container style={{marginTop:'4rem'}}>
                    <Row>
                        <Col sm={{ size: 4}}  >
                            <div style={{width: '100%' , height: '600px' ,  backgroundImage:  'url(https://travelcheckins.com/apitest/public/activity_images/'+this.state.data.image+')' , backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', }}>

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
                                    <b>Pre activity guidelines</b> :{this.state.data.pre_activity_guidelines}<br/>
                                    <b>Post activity guidelines</b> :{this.state.data.post_activity_guidelines}<br/>
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
                                        Location: <b>{this.state.data.location}</b> <br/>
                                        Timing: <b>6 to 8am</b> <br/>
                                        Activity Type: <b>{this.state.data.type}</b> <br/>
                                    </Col>
                                    <Col sm={{ size: 6}}  style={{borderLeft: '1px solid white'}} >
                                        Code: <b>Havelock Island</b> <br/>
                                        Rating: <b>6 to 8am</b> <br/>
                                        Min Age: <b>{this.state.data.participants_age}</b> <br/>
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
                              <Link to="/activity-book"   state={{ activityId: this.state.activityId , activityToBook: this.state.data }} >
                              <button style={{backgroundColor: '#CC4263', padding: '10px', color: 'white' , width: '150px'}}
                              >Book Now </button>
                              </Link>
                            </div>
                        </Col>
                    </Row>
                    <p style={{fontSize: '26px', ontFamily: 'Montserrat',  color: '#938f8f',  margin: '10px'}}> <b>Recommended</b> </p>
                    <Recommendation/>
                </Container>
            </Layout>
            )
            
        }
    }
    
    export default ActivityDetail
    