import React from 'react';
import Layout from "../components/layout"
import { Container, Row, Col } from 'reactstrap';
import * as moment from "moment"
class Thankyou extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            url: 'https://ferrybooking.in/thank-you?name=0',
        }
    }

    componentDidMount(){
        // props.location is only available on browser/client
        // gatsby will build server side.. so if window is undefined, ignore props.location
        if (typeof window === 'undefined') {
            return;
          }
        this.setState(() => ({ url: this.props.location.href }));
    }

    extractUrlValue = (key, url) =>
    {
        if (typeof(url) === 'undefined')
            url = this.state.url;
        var match = url.match('[?&]' + key + '=([^&]+)');
        return match ? decodeURIComponent(match[1]) : null;
    }

    getTotalGuests(adult,children){
        return parseInt(adult)+parseInt(children)
    }

    render(){
        return(
            <Layout>
                <Container id="activity-info" style={{marginTop:'4rem'}}>
                    
                    <Row>
                        <h3>Booking Successful 🥳 </h3>
                    </Row>
                    <br/>
                    <hr/>
                    <Row>
                        <h1>
                            Booking Details
                        </h1>
                    </Row>
                    <hr style={{borderColor:"rgb(31, 105, 176)"}}/>
                    <Row>
                        <Col sm={{size:4}}>
                        <p style={{fontWeight:"bolder",fontSize: '20px',}}> {this.extractUrlValue('activity_name')} at {this.extractUrlValue("location")}</p>
                        </Col>
                        <Col sm={{size:4}}>
                        <p style={{fontWeight:"bolder",fontSize: '20px',}}>  {moment(this.extractUrlValue('date')).format("dddd MMM Do, YYYY ")}</p>
                        </Col>
                        {/* <Col sm={{size:2}}>
                        </Col> */}
                        <Col sm={{size:4}}>
                        <p style={{fontWeight:"bolder",fontSize: '20px',}}> PNR: {this.extractUrlValue('pnr')}</p>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col>
                        <p>Your booking is confirmed for {this.getTotalGuests(this.extractUrlValue('adult_count'),this.extractUrlValue('child_count'))} Guests ({this.extractUrlValue('adult_count')} Adults and {this.extractUrlValue('child_count')} Children) </p>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col>
                        <p style={{color:"#999"}}>Helpline Details</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <p>Aditya Mani</p>
                        <p>+91 9933266608</p>
                        <p>info@ferrybooking.in</p>
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <br />
                    <Row>
                    <h3>Thank you for booking with ferrybooking.in</h3>
                    </Row>
                </Container>
                <Row>

                </Row>
           </Layout>
        )
    }
}

export default Thankyou;