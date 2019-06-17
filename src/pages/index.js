import React, { Component } from "react"
import axios from "axios"
import Layout from "../components/layout"
import { Container, Row, Col } from 'reactstrap';
import { Link } from "gatsby"
class FerryActivities extends Component {
    constructor (props) {
        super(props);
        this.state = {
           activities: [],
           loading: true,
           fromDate: "2019-06-18",
           toDate: "2019-06-20",
           location: [{"id":1,"locationname":"Port Blair","city_id":1},{"id":2,"locationname":"Havelock","city_id":2}],
          authToken: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM4LCJpc3MiOiJodHRwczovL3RyYXZlbGNoZWNraW5zLmNvbS9hcGl0ZXN0L2FwaS9hdXRoZW50aWNhdGUiLCJpYXQiOjE1NjA2MjMyOTIsImV4cCI6MTU2MDYyNjg5MiwibmJmIjoxNTYwNjIzMjkyLCJqdGkiOiIzRkYxSGhmR3puZ3ZwUUdwIn0.KTFu0OF_uRFUzmhvwe8yjcWJoZ56MTmnxj7Cz9NmVZ4"
        }
       
        
      }
      componentDidMount() {
        this.setValueOfSearch();
      }
      setValueOfSearch() {
        this.fetchActivitiesList()
      }

      fetchActivitiesList () {
        // var data = {
        //     "searchdata":{
        //       "fromdate" : this.state.fromDate,
        //       "todate": this.state.toDate,
        //       "location" : this.state.location
        //       }
        // }
        var data = {"searchdata":{
          "fromdate":"2019-06-18",
          "todate":"2019-06-20",
          "location":[{"id":1,"locationname":"Port Blair","city_id":1},{"id":2,"locationname":"Havelock","city_id":2}]
          }
          }
          data = JSON.stringify(data);
        console.log("Body of data is " ,  data);

        var  headers = {
          'Content-Type': 'application/json',
          'Authorization': this.state.authToken
      }
        this.setState({ loading: true })
        axios
        .post(`https://travelcheckins.com/apitest/api/booking/search/activity`, data,  {headers: headers} )
        .then(data => {
            console.log(data);
            this.setState({
              loading: false,
              activities: data.data,
            })
          })
          .catch(error => {
            this.setState({ loading: false, error })
          })
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
                    <Row>
                        {this.state.activities.map((eachActivity) => (
                              <Col sm={{ size: 3}} style={{marginBottom: '40px'}} >
                            {/* <div style={{backgroundImage:  `url(${eachActivity.url})` , height: '300px', margin: '5px', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}> */}
                            <Link to="/activity-details">

                            <div style={{backgroundImage:  `url(https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Surfer_at_the_Cayucos_Pier%2C_Cayucos%2C_CA.jpg/1200px-Surfer_at_the_Cayucos_Pier%2C_Cayucos%2C_CA.jpg)` , height: '300px', marginLeft: '19px', marginRight: '19px',  backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '5px'}}>
                            </div>
                            </Link>
                        <div style ={{marginLeft: '19px' , marginTop: '5px' , paddingTop: '5px'}}>
                                <p style={{ fontFamily: 'Helvetica', fontSize: '11px', color: 'grey', letterSpacing: '1px', padding: '0px', margin: '0px',}}>Snorkelling - Elephant Beach</p>
                                <p style={{ fontFamily: 'Times', fontSize: '14px', color: '#554944', padding: '0px', margin: '0px',}}><b>Snorkelling at Elephant Beach</b></p>
                                <span style={{ fontFamily: 'Times', fontSize: '13px', color: '#3F4A4A', padding: '5px' , backgroundColor: '#DFE6E6' , boxSizing: 'border-box'}}>3,900 INR per person - 1.5 hours</span>
                        </div>

                            </Col>

                        ))}
                
                    </Row>
                   </Container>
                </Layout>
            )

        }
}

export default FerryActivities
