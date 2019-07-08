import React, { Component } from "react"
import axios from "axios"
import InputRange from 'react-input-range';
// Using an ES6 transpiler like Babel
import Slider from 'react-rangeslider'

// To include the default styles
import 'react-rangeslider/lib/index.css'
import Layout from "../components/layout"
import {
  Container,
  Row,
  Col,
  Spinner,
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
  UncontrolledPopover,
  Input,
  Badge
} from "reactstrap"
import { Link } from "gatsby"
import "../styles/global.css"
var striptags = require('striptags');


class FerryActivities extends Component {
    constructor (props) {
        super(props);
        this.state = {
           allActivities: [],
          listOfActivityDetails: [],
           loading: true,
          fromDate: "2019-06-22",
          toDate: "2020-06-25",
          rawData: null,
           location: [{"id":1,"locationname":"Port Blair","city_id":1},{"id":2,"locationname":"Havelock","city_id":2}],

          authToken: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM4LCJpc3MiOiJodHRwczovL3RyYXZlbGNoZWNraW5zLmNvbS9hcGl0ZXN0L2FwaS9hdXRoZW50aWNhdGUiLCJpYXQiOjE1NjI1MDA3ODUsImV4cCI6MTU2MjUwNDM4NSwibmJmIjoxNTYyNTAwNzg1LCJqdGkiOiJoSWJsbmRQVFM0cE5FeURzIn0._rraxmSFgimWJh2GR2GNOY97WAlH4gm8P8F1c8exNEw",

          priceValue: 1000,
        }
      this.setValueOfSearch();

    }
  updateValueOfPriceFilter = e => {

    let valueOfPrice = e.target.value;
    valueOfPrice= parseInt(valueOfPrice);


    this.setState({ priceValue: valueOfPrice });
    console.log("FILTERING...." , e.target.value);
  }
   filterList = () => {
     console.log("Calling filter from filter list....");

     this.state.allActivities = this.state.listOfActivityDetails.filter(eachActivity => {
      return eachActivity.adult_ticket <= this.state.priceValue
    })
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
          "fromdate":"2019-06-22",
          "todate":"2019-07-25",
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
              console.log('Activity date' , eachDate)

              ;
              data.data.data[eachPlace].data[eachDate].map((eachDetail, index)=> {
                console.log("eachDetail" , eachDetail.name + " index " + index);
                this.setState(prevState => ({
                  listOfActivityDetails: [...prevState.listOfActivityDetails, eachDetail],
                  loading: false,
                  allActivities: [...prevState.listOfActivityDetails, eachDetail],
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
        listOfContent =  this.state.allActivities.map((eachActivity)=> (
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
                  <div style={{width: '100', padding: '20px', backgroundColor: '#F9F9F9' }}>
                    <Row>
                     <Col sm={{size: 4}} >

                   </Col>
                      <Col sm={{size: 4}} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <div >
                          <p  style={{paddingTop: '16px', color: 'rgba(0, 0, 0, 0.5)' }}>
                            <b>Filters:</b>
                          </p>
                        </div>

                        <Button id="filterByDate" type="button" outline color="secondary" size="sm">
                          Dates
                        </Button>
                        <Button id="filterByPrice" type="button" outline color="secondary" size="sm">
                          Price
                        </Button>
                        <Button id="filterByGuest" type="button" outline color="secondary" size="sm">
                          Guest
                        </Button>
                        <Button id="filterByTime" type="button" outline color="secondary" size="sm">
                          Time of Day
                        </Button>
                      </Col>
                      <Col sm={{size: 4}}>
                      </Col>

                   </Row>

                    <UncontrolledPopover trigger="legacy" placement="bottom" target="filterByDate">
                      <PopoverHeader>Filter by date</PopoverHeader>
                      <PopoverBody>
                        Legacy is a reactstrap special trigger value (outside of bootstrap's spec/standard). Before reactstrap correctly supported click and focus, it had a hybrid which was very useful and has been brought back as trigger="legacy". One advantage of the legacy trigger is that it allows the popover text to be selected while also closing when clicking outside the triggering element and popover itself.</PopoverBody>
                    </UncontrolledPopover>
                    <UncontrolledPopover trigger="legacy" placement="bottom" target="filterByPrice">
                      <PopoverHeader>Filter by Pricez</PopoverHeader>
                      <PopoverBody>
                        {/*<input type="range" name="points" min="100" max="1000"  step="100" value={this.state.priceValue}*/}
                               {/*onChange={e => this.updateValueOfPriceFilter(e)}*/}
                               {/*/!*onFocus={this.filterList}/>*!/*/}
                        {/*<InputRange*/}
                          {/*maxValue={1000}*/}
                          {/*minValue={100}*/}
                          {/*value={300}*/}
                          {/*onChange={value => this.setState({ priceValue: value })}*/}
                        {/*/>*/}
                        <Slider
                          value={this.state.priceValue}
                          orientation="horizontal"
                          onChange={value => this.setState({ priceValue: value })}
                        />

                      <h5 style={{textAlign: 'center',  }}>
                          <Badge href="#" color="light">0 to {this.state.priceValue} INR</Badge>
                      </h5>
                      </PopoverBody>
                    </UncontrolledPopover>
                    <UncontrolledPopover trigger="legacy" placement="bottom" target="filterByGuest">
                      <PopoverHeader>Filter by Guests</PopoverHeader>
                      <PopoverBody>
                        Legacy is a reactstrap special trigger value (outside of bootstrap's spec/standard). Before reactstrap correctly supported click and focus, it had a hybrid which was very useful and has been brought back as trigger="legacy". One advantage of the legacy trigger is that it allows the popover text to be selected while also closing when clicking outside the triggering element and popover itself.</PopoverBody>
                    </UncontrolledPopover>
                    <UncontrolledPopover trigger="legacy" placement="bottom" target="filterByTime">
                      <PopoverHeader>Filter by Time of Day</PopoverHeader>
                      <PopoverBody>
                        Legacy is a reactstrap special trigger value (outside of bootstrap's spec/standard). Before reactstrap correctly supported click and focus, it had a hybrid which was very useful and has been brought back as trigger="legacy". One advantage of the legacy trigger is that it allows the popover text to be selected while also closing when clicking outside the triggering element and popover itself.</PopoverBody>
                    </UncontrolledPopover>
                  </div>
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
