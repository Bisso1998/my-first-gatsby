import React, { Component } from "react"
import axios from "axios"
// Using an ES6 transpiler like Babel
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
//  calendars
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { Input } from 'reactstrap';
import * as moment from 'moment'
 
// To include the default styles
// import 'react-rangeslider/lib/index.css'
import Layout from "../components/layout"
import {
  Container,
  Row,
  Col,
  Spinner,
  Button,
  PopoverBody,
  UncontrolledPopover,
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
      authToken: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM4LCJpc3MiOiJodHRwczovL3RyYXZlbGNoZWNraW5zLmNvbS9hcGl0ZXN0L2FwaS9hdXRoZW50aWNhdGUiLCJpYXQiOjE1NjMyODM0OTgsImV4cCI6MTU2MzI4NzA5OCwibmJmIjoxNTYzMjgzNDk4LCJqdGkiOiJoWERNd1hNdFRxUXNqblQ2In0.cgsTr51mQovdY87q7M_RZ5DX9flG98jam5pMUUrMhVU",
      filterPriceValue: [0,1000],
      filterDateStart: null,
      filterDateEnd: null,
      filterDateFocusedInput: null,
    }
    this.setValueOfSearch();
  }
  
  // updates price when price filter range slider is moved 
  updateValueOfPriceFilter = e => {
    this.setState({ filterPriceValue: e });
    // filter out activities that are not within price range
    var x = this.state.listOfActivityDetails.filter(eachActivity => {
      return (eachActivity.adult_ticket >= e[0] && eachActivity.adult_ticket <= e[1]) 
    })
    this.setState({allActivities:x})
    console.log(this.state.allActivities)
    console.log(this.state.filterDateStart)
  }
  
  filterList = () => {
    console.log("Calling filter from filter list....");
    // var x = this.state.listOfActivityDetails.filter(eachActivity => {
    //   return eachActivity.adult_ticket <= this.state.priceValue
    // })
  }

  dateFilterUpdated = (startDate, endDate) => {
    this.setState({ filterDateStart:startDate, filterDateEnd:endDate })
    // console.log(startDate.format('YYYY-MM-DD'))
    var x = this.state.listOfActivityDetails.filter(eachActivity => {
      // let moments = eachActivity.dates.map(d => moment(d)),
      // console.log(eachActivity.dates)
      let moments = eachActivity.dates.map(d => moment(d)),
      maxDate = moment.max(moments),
      minDate = moment.min(moments)
      
      return (startDate>=minDate && endDate <= maxDate  ) 
    })
    this.setState({allActivities:x})
  }

  componentDidMount() {
  }

  // ? what is this function for?
  setValueOfSearch() {
    this.fetchActivitiesList();
  }
  
  fetchActivitiesList () {
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

  this.setState({ loading: true });
    function slugify(string) {
      const a = 'àáäâãåăæąçćčđďèéěėëêęǵḧìíïîįłḿǹńňñòóöôœøṕŕřßśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;'
      const b = 'aaaaaaaaacccddeeeeeeeghiiiiilmnnnnooooooprrssssttuuuuuuuuuwxyyzzz------'
      const p = new RegExp(a.split('').join('|'), 'g')
      string = striptags(string)
      return string.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
    }
  axios
  .post(`https://travelcheckins.com/apitest/api/booking/search/activity`, data,  {headers: headers} )
  .then(data => {
    // console.log(Object.keys(data.data.data));
    Object.keys(data.data.data).map((eachPlace)=>{
      Object.keys(data.data.data[eachPlace].data).map((eachDate)=> {
        // console.log('Activity date' , eachDate);
        data.data.data[eachPlace].data[eachDate].map((eachDetail, index)=> {
          // console.log("eachDetail" , eachDetail.name + " index " + index);
          // add date to the flat array
          eachDetail.date = eachDate
          // make sure activity is not a duplicate.
          eachDetail.url = slugify(eachDetail.small_description)

          if( ! this.state.allActivities.find(x => x.id === eachDetail.id) ){
            this.setState(prevState => ({
              listOfActivityDetails: [...prevState.listOfActivityDetails, eachDetail],
              loading: false,
              allActivities: [...prevState.listOfActivityDetails, eachDetail],

          }))
            
          }else{
            // if duplicate add date to activity available dates 
            if (!this.state.allActivities.find(x => x.id === eachDetail.id).dates){
              this.state.allActivities.find(x => x.id === eachDetail.id).dates = []
            }
            this.state.allActivities.find(x => x.id === eachDetail.id).dates.push(eachDate)
          }
          return eachDetail
        })
        return eachDate
      })
      return eachPlace
      
    })
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
      <Link to={`/${eachActivity.url}`}
            state={{ activityId: eachActivity.id }}
      >
      
      <div style={{backgroundImage: 'url(https://travelcheckins.com/apitest/public/activity_images/'+eachActivity.image+')' , height: '300px', marginLeft: '19px', marginRight: '19px',  backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '5px'}}>
      </div>
      </Link>
      <div style ={{marginLeft: '19px' , marginTop: '5px' , paddingTop: '5px'}}>
      <p style={{ fontFamily: 'Helvetica', fontSize: '11px', color: 'grey', letterSpacing: '1px', padding: '0px', margin: '0px',}}>{striptags(eachActivity.small_description)}</p>
      <p style={{ fontFamily: 'Times', fontSize: '14px', color: '#554944', padding: '0px', margin: '0px',}}><b>{eachActivity.name}</b></p>
      <span style={{ fontFamily: 'Times', fontSize: '13px', color: '#3F4A4A', padding: '5px' , backgroundColor: '#DFE6E6' , boxSizing: 'border-box'}}>₹{eachActivity.adult_ticket}/pax </span>
      </div>
      </div>
      
      </Col>
      ))
      
    }
    return(
      <Layout>
      <div style={{width: '100', padding: '20px' }}>
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
      {/* <Button id="filterByGuest" type="button" outline color="secondary" size="sm">
      Guest
      </Button> */}
      <Button id="filterByTime" type="button" outline color="secondary" size="sm">
      Location
      </Button>
      </Col>
      <Col sm={{size: 4}}>
      </Col>
      
      </Row>
      
      <UncontrolledPopover trigger="legacy" placement="bottom" target="filterByDate">
        {/* <PopoverHeader>Filter by date</PopoverHeader> */}
        <PopoverBody>
        <DateRangePicker
          startDateId="startDate"
          endDateId="endDate"
          startDate={this.state.filterDateStart}
          endDate={this.state.filterDateEnd}
          onDatesChange={({ startDate, endDate }) => { this.dateFilterUpdated(startDate,endDate) }}
          focusedInput={this.state.filterDateFocusedInput}
          onFocusChange={(focusedInput) => { this.setState({ filterDateFocusedInput:focusedInput })}}
        />
        </PopoverBody>
      </UncontrolledPopover>
      
      <UncontrolledPopover trigger="legacy" placement="bottom" target="filterByPrice">
        <PopoverBody style={{'paddingTop':'18%'}}>
          <Range min={0} max={1000} defaultValue={this.state.filterPriceValue} onChange={this.updateValueOfPriceFilter}/>
          <h5 style={{textAlign: 'center',  }}>
            <Badge href="#" color="light">{this.state.filterPriceValue[0]} to {this.state.filterPriceValue[1]} INR</Badge>
          </h5>
        </PopoverBody>
      </UncontrolledPopover>
      {/* <UncontrolledPopover trigger="legacy" placement="bottom" target="filterByGuest">
      <PopoverHeader>Filter by Guests</PopoverHeader>
      <PopoverBody>
      Legacy is a reactstrap special trigger value (outside of bootstrap's spec/standard). Before reactstrap correctly supported click and focus, it had a hybrid which was very useful and has been brought back as trigger="legacy". One advantage of the legacy trigger is that it allows the popover text to be selected while also closing when clicking outside the triggering element and popover itself.</PopoverBody>
      </UncontrolledPopover> */}
      <UncontrolledPopover trigger="legacy" placement="bottom" target="filterByTime">
        <PopoverBody>
        <div><Input addon type="checkbox" aria-label="Show all activities at Havelock" /> Havelock</div>
        <div><Input addon type="checkbox" aria-label="Show all activities at Havelock" /> PortBlair</div>
        <div><Input addon type="checkbox" aria-label="Show all activities at Havelock" /> Niel</div>
        </PopoverBody>
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
    