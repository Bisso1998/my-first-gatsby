import React, { Component } from "react"
// import axios from "axios"
import Layout from "../components/layout"
import { Container, Row, Col } from 'reactstrap';
import Recommendation from '../components/recommended'
import { Link } from "gatsby"

class ActivityDetail extends Component {
    constructor (props) {
        super(props);
        this.state = {
            activities: [],
            loading: true,
        }
        console.log("Id for activity is ", this.props.location.state.activityId);

    }
    render() {
        return(
            <Layout>
                <Container style={{marginTop:'4rem'}}>
                    <Row>
                        <Col sm={{ size: 4}}  >
                            <div style={{width: '100%' , height: '600px' ,  backgroundImage:  `url(http://getwallpapers.com/wallpaper/full/c/1/2/1136197-cool-scuba-diving-wallpaper-3159x2106-for-hd.jpg)` , backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', }}>

                            </div>
                            
                            <div style={{width: '100%', fontFamily: 'Montserrat',   color: 'rgb(72, 72, 72)',padding: '10px' ,  boxSizing: 'border-box',  marginTop : '20px'}}>
                                <p style={{fontSize: '26px',}}> Inclusions </p>
                                <div style={{fontSize: '14px'}}>
                                    Facilities  : Well maintained washroom and changing room<br/>
                                    Equipments :<br/>
                                    Photography :<br/>
                                    Certificate :<br/>
                                </div>
                
                                <hr/>
                                <p style={{fontSize: '26px',}}> Information to participants </p>
                                <div style={{fontSize: '14px'}}>
                                    Age  : Min 7 years<br/>
                                    Physical Requirement :<br/>
                                    Medical Condition :<br/>
                                    What to carry :<br/>
                                    Post activity guidelines :<br/>
                                </div>
                            </div>
                        </Col>
                        <Col sm={{ size: 7}}  >
                            <div style={{width: '100%', fontFamily: 'Montserrat', color: 'rgb(72, 72, 72)', boxSizing: 'border-box', }}>
                                <p style={{fontSize: '13px',}}> Scuba Diving Night waters</p>
                                <p style={{fontSize: '26px', marginTop: '-20px',fontWeight: 'bold'}}> Night Scuba Diving Night at Havelock Island</p>
                            </div>
                            <div style={{fontWeight: 100,backgroundColor: '#1D62B1', boxSizing: 'border-box', color: 'white', padding: '15px'}}>
                                <Row>
                                    <Col sm={{ size: 6}}  >
                                        Location: <b>Havelock Island</b> <br/>
                                        Timing: <b>6 to 8am</b> <br/>
                                        Activity Type: <b>Private</b> <br/>
                                        Level: <b>Amateur</b> <br/>
                                    </Col>
                                    <Col sm={{ size: 6}}  style={{borderLeft: '1px solid white'}} >
                                        Code: <b>Havelock Island</b> <br/>
                                        Rating: <b>6 to 8am</b> <br/>
                                        Age Type: <b>Private</b> <br/>
                                        Level: <b>Amateur</b> <br/>
                                    </Col>
                                </Row>
                            </div>
                            <div style={{width: '100%', color: 'rgb(72, 72, 72)',fontFamily: 'Montserrat', padding: '10px' ,  boxSizing: 'border-box',  marginTop : '20px'}}>
                                <p style={{fontSize: '26px',}}> About </p>
                                <div style={{fontSize: '16px'}}>
                                    Scuba diving is a mode of underwater diving where the diver uses a self-contained underwater breathing apparatus (scuba), which is completely independent of surface supply, to breathe underwater.
                                </div>
                            </div>
                            <div style={{padding: '10px' , color: 'rgb(72, 72, 72)',  fontFamily: 'Montserrat', fontSize: '16px' }}>
                                <p style={{fontSize: '26px', color: '#CC4263'}}> Why you will love this activity? ID IS  { this.props.location.state.activityId} </p>
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
                              <Link to="/activity-book">
                              <button style={{backgroundColor: '#CC4263', padding: '10px', color: 'white' , width: '150px'}}>Book Now </button>
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
    