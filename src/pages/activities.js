import React, { Component } from "react"
import axios from "axios"
import Layout from "../components/layout"
import { Container, Row, Col } from 'reactstrap';
import { Link } from "gatsby"
import Recommendation from '../components/recommended'
class FerryActivities extends Component {
    constructor (props) {
        super(props);
        this.state = {
           activities: [],
           loading: true,
        }
      }
   

        render() {
            return(
                <Layout>
                      <p><b>Explore experiences</b></p>

                      <Row style={{marginBottom: '50px'}}>
{['Nightlife', 'Sports' , 'Entertaintment' , 'Nature'].map( eachExperience => (
  <Col sm={{ size: 3}} >
  <div style={{margin: '10px'}}>
    <Row style={{boxShadow: ' 0px 4px 32px rgba(189, 189, 189, 0.24)', border: '1px solid #F2F2F2', cursor: 'pointer'}}>
    <Col sm={{ size: 3}} style={{backgroundImage:  `url(https://cdn.prod-carehubs.net/n1/802899ec472ea3d8/uploads/2015/05/shutterstock_36013711.jpg)` , height: '70px',  backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center',  }}>
    </Col>
    <Col sm={{ size: 9}} style={{marginTop: '5%'}}>
    <p style={{ fontFamily: 'Times', fontSize: '16px', color: '#554944', }}><b>{eachExperience}</b></p>
    </Col>
    </Row>
  </div>
  </Col>
))}
   
   
  
  </Row>
                   <Container>
                    <Recommendation/>
                   </Container>
                </Layout>
            )

        }
}

export default FerryActivities
