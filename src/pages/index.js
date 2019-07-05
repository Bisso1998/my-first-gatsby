import React, { Component } from "react"
import axios from "axios"
import Layout from "../components/layout"
import { Container, Row, Col, Spinner } from 'reactstrap';
import { Link } from "gatsby"
import "../styles/global.css"
var striptags = require('striptags');


class FerryActivities extends Component {
    constructor (props) {
        super(props);
        this.state = {
           activities: [],
          listOfActivityDetails: [],
           loading: true,
           fromDate: "2019-06-18",
           toDate: "2019-06-20",
          rawData: null,
           location: [{"id":1,"locationname":"Port Blair","city_id":1},{"id":2,"locationname":"Havelock","city_id":2}],

          authToken: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM4LCJpc3MiOiJodHRwczovL3RyYXZlbGNoZWNraW5zLmNvbS9hcGl0ZXN0L2FwaS9hdXRoZW50aWNhdGUiLCJpYXQiOjE1NjIyMjM0NjQsImV4cCI6MTU2MjIyNzA2NCwibmJmIjoxNTYyMjIzNDY0LCJqdGkiOiJ6VDI1eDlITDJEMWVPdGtrIn0.FTq9CVJ-guTo-4kAoi7PBa2dRMKsz2z5xjyC5pNGAMM"
        }
      this.setValueOfSearch();

    }
      componentDidMount() {
      }
      setValueOfSearch() {
        this.fetchActivitiesList();
        // this.state.rawData.data.map((eachPlace) => {
        //     eachPlace.data.map((eachDate) => {
        //       eachDate.data.map((activityDetails)=> {
        //         console.log(activityDetails.description);
        //       })
        //     })
        // })
      }

      fetchActivitiesList () {
        // var data = {
        //     "searchdata":{
        //       "fromdate" : this.state.fromDate,
        //       "todate": this.state.toDate,
        //       "location" : this.state.location
        //       }
        // }
        let data = {"searchdata":{
          "fromdate":"2019-06-18",
          "todate":"2019-06-20",
          "location":[{"id":1,"locationname":"Port Blair","city_id":1},{"id":2,"locationname":"Havelock","city_id":2}]
          }
          }
          data = JSON.stringify(data);

        let  headers = {
          'Content-Type': 'application/json',
          'Authorization': this.state.authToken
      }
        this.setState({ loading: true })
        axios
        .post(`https://travelcheckins.com/apitest/api/booking/search/activity`, data,  {headers: headers} )
        .then(data => {
          console.log(Object.keys(data.data.data));
          Object.keys(data.data.data).map((eachPlace)=>{
            Object.keys(data.data.data[eachPlace].data).map((eachDate)=> {
              console.log('Activity date' , eachDate);
              data.data.data[eachPlace].data[eachDate].map((eachDetail, index)=> {
                console.log("eachDetail" , eachDetail.name + " index " + index);
                this.setState(prevState => ({
                  listOfActivityDetails: [...prevState.listOfActivityDetails, eachDetail],
                  loading: false,
                }))
                return eachDetail
              })
              return eachDate
            })
            return eachPlace

          })



          // Object.keys(data.data).map(function(eachPlace,index) {
          //   console.log(eachPlace);
          // })
          // let dataForDate = null;

          // Object.keys(data.data)
          //   .map(function(key,index){
          //     console.log('location',data.data[key].name)
          //     Object.keys(data.data[key].data).map(function(innerLoopKey,innerLoopIndex){
          //       dataForDate = data.data[key].data[innerLoopKey]
          //       console.log("dataForDate" , dataForDate[0].id)
          //     })
          //   })
            this.setState({

               rawData: data.data,
              activities: [1,2,3,4,5,6,7],
            })

          })
          .catch(error => {
            this.setState({ loading: false, error })
          })
        }

        render() {
      let listOfContent;
      if(this.state.loading) {
        listOfContent = <Spinner type="grow" color="primary" style={{ width: '6rem', height: '6rem' , left: "50%", marginLeft: '-6rem' , position: 'fixed'}} />;
      } else {
        listOfContent =  this.state.listOfActivityDetails.map((eachActivity)=> (
          <Col sm={{ size: 3}} style={{marginBottom: '140px'}} >
            <div style={{backgroundImage:  `https://www.algarvefun.com/wp-content/uploads/2017/02/albufeira-snorkeling-algarve-fun-1.jpg` , height: '300px', margin: '5px', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
              <Link to="/activity-details">

                <div style={{backgroundImage:  `url(https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Surfer_at_the_Cayucos_Pier%2C_Cayucos%2C_CA.jpg/1200px-Surfer_at_the_Cayucos_Pier%2C_Cayucos%2C_CA.jpg)` , height: '300px', marginLeft: '19px', marginRight: '19px',  backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '5px'}}>
                </div>
              </Link>
              <div style ={{marginLeft: '19px' , marginTop: '5px' , paddingTop: '5px'}}>
                <p style={{ fontFamily: 'Helvetica', fontSize: '11px', color: 'grey', letterSpacing: '1px', padding: '0px', margin: '0px',}}>{striptags(eachActivity.description)}</p>
                <p style={{ fontFamily: 'Times', fontSize: '14px', color: '#554944', padding: '0px', margin: '0px',}}><b>{eachActivity.name}</b></p>
                <span style={{ fontFamily: 'Times', fontSize: '13px', color: '#3F4A4A', padding: '5px' , backgroundColor: '#DFE6E6' , boxSizing: 'border-box'}}>₹3,900/pax - 1.5 Hours </span>
              </div>
            </div>

          </Col>
        ))

      }
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


                      {
                        listOfContent
                      }
                
                    </Row>
                   </Container>
                </Layout>
            )

        }
}

export default FerryActivities
