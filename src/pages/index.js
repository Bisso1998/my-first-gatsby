import React, { Component } from "react"
import axios from "axios"
// Using an ES6 transpiler like Babel
import { Range } from "rc-slider"
import "rc-slider/assets/index.css"
//  calendars
import "react-dates/initialize"
import { DateRangePicker } from "react-dates"
import "react-dates/lib/css/_datepicker.css"
import { Input } from "reactstrap"
import * as moment from "moment"
import { BrowserView, MobileView, isMobile } from "react-device-detect"
import {Helmet} from "react-helmet";
import Layout from "../components/layout"
import {
  Container,
  Row,
  Col,
  Spinner,
  Button,
  PopoverBody,
  UncontrolledPopover,
  Badge,
} from "reactstrap"
import { Link } from "gatsby"
import "../styles/global.css"
import apiEndPoints from '../apiEndPoints';
import { graphql } from 'gatsby'
// import Img from 'gatsby-image'
import BackgroundImage from 'gatsby-background-image'
const storedActivityData = require('./../../pages.json');
// to strip any html tags that may appear in api response data
var striptags = require("striptags")


class FerryActivities extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      allActivities: [],
      listOfActivityDetails: [],
      loading: true,
      fromDate: "2019-06-22",
      toDate: "2020-06-25",
      rawData: null,
      location: [
        { id: 1, locationname: "Port Blair", city_id: 1 },
        { id: 2, locationname: "Havelock", city_id: 2 },
      ],
      authToken:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM4LCJpc3MiOiJodHRwczovL3RyYXZlbGNoZWNraW5zLmNvbS9hcGl0ZXN0L2FwaS9hdXRoZW50aWNhdGUiLCJpYXQiOjE1NjM0NTc2NjAsImV4cCI6MTU2MzQ2MTI2MCwibmJmIjoxNTYzNDU3NjYwLCJqdGkiOiI3RlZ2QXdjNUdXTXNlbU1nIn0.Ucnf_zIQvooZyB1IP-IKsxrW9sLAoeAx98-xQvKcL2E",
      filterPriceValue: [0, 150000],
      filterDateStart: null,
      filterDateEnd: null,
      filterDateFocusedInput: null,
      listOfPlacesToFilter: { Havelock: true, "Port Blair": true, Niel: true },
      filterExperienceValue: "",
    }
    
    // this.setValueOfSearch();
  }

  // temporary login function to get the bearer token
  login = () => {
    // axios
    //   .post(
    //     apiEndPoints.authentication,
    //     '{"username":"ferrybooking","password":"ferrybooking"}',
    //     { headers: { "Content-Type": "application/json" } }
    //   )
    //   .then(data => {
    //     this.setState({ authToken: "Bearer " + data.data.token })
    //     this.fetchActivitiesList()
    //   })
  }
  showAllActivities() {
    let allActivity = this.state.listOfActivityDetails
    this.setState({ allActivities: allActivity })
  }
  updateValueOfStyleFilter = value => {
    // document.getElementById(value).backgroundColor = "red";
    ["Water Sports", "Adventure", "Romantic", "Tour"].map(
      eachExperience =>
        (document.getElementById(eachExperience).style.backgroundColor =
          "white")
    )
    if (value == this.state.filterExperienceValue) {
      document.getElementById(value).style.backgroundColor = "white"
      this.showAllActivities()
      this.setState({
        filterExperienceValue: "",
      })
    } else {
      this.setState({
        filterExperienceValue: value,
      })
      document.getElementById(value).style.backgroundColor = "#e1e3fa"

      var x = this.state.listOfActivityDetails.filter(eachActivity => {
        var styles = eachActivity.style.split(',');
        return styles.includes(value) === true
      })
      this.setState({ allActivities: x })
    }

    // if(value == "All") {
    //   // let allActivity = this.state.listOfActivityDetails;
    //   // this.setState({allActivities: allActivity})
    //   this.showAllActivities();
    //
    // } else {
    //   // // filter out activities that are not within price range
    //   var x = this.state.listOfActivityDetails.filter(eachActivity => {
    //     return (eachActivity.style === value )
    //   })
    //   this.setState({allActivities:x})
    // }

    // console.log(this.state.allActivities)
    // console.log(this.state.filterDateStart)
  }

  // updates price when price filter range slider is moved
  updateValueOfPriceFilter = e => {
    this.setState({ filterPriceValue: e })
    // filter out activities that are not within price range
    var x = this.state.listOfActivityDetails.filter(eachActivity => {
      // if( (eachActivity.adult_ticket >= e[0]) && (eachActivity.adult_ticket <= e[1]) ){
      //   console.log('true')
      // }else{
      //   console.log( (parseInt(e[1])> parseInt(eachActivity.adult_ticket)) )
      //   console.log(eachActivity.adult_ticket)
      //   console.log(">=")
      //   console.log(e[0])
      //   console.log(eachActivity.adult_ticket)
      //   console.log("<=")
      //   console.log(e[1])
      // }
      return (
        eachActivity.adult_ticket >= e[0] && eachActivity.adult_ticket <= e[1]
      )
    })
    // console.log(x)
    this.setState({ allActivities: x })
    console.log(this.state.allActivities)
    console.log(this.state.filterDateStart)
  }

  updateValueOfLocationFilter = e => {
    let value = e.target.value

    // toggle checkbox
    let tmpPlacesToFilter = Object.assign({}, this.state.listOfPlacesToFilter)
    tmpPlacesToFilter[value] = !tmpPlacesToFilter[value]
    this.setState({ listOfPlacesToFilter: tmpPlacesToFilter })

    // filter out activities
    var newActivitiesList = []
    if (tmpPlacesToFilter[value]) {
      // Following code will attempt to add the activity for selected location

      // Getting all activities for this location
      newActivitiesList = this.state.listOfActivityDetails.filter(
        eachActivity => {
          return value === eachActivity.location
        }
      )
      // creating temporary clone of rendered actities (array of objects) so that we don't accidentally mess up react states
      var tmp = this.state.allActivities.slice(0)
      // Merge list of rendered activies with New list of matched activites based on checked location
      Array.prototype.push.apply(tmp, newActivitiesList)
      // update state
      this.setState({ allActivities: tmp })
    } else {
      console.log("removed activity for " + value)
      // remove activities AT this location FROM currently rendered activities list
      newActivitiesList = this.state.allActivities.filter(eachActivity => {
        return value !== eachActivity.location
      })
      // update state
      this.setState({ allActivities: newActivitiesList })
    }
  }

  filterList = () => {
    console.log("Calling filter from filter list....")
    // var x = this.state.listOfActivityDetails.filter(eachActivity => {
    //   return eachActivity.adult_ticket <= this.state.priceValue
    // })
  }

  dateFilterUpdated = (startDate, endDate) => {
    this.setState({ filterDateStart: startDate, filterDateEnd: endDate })
    // console.log(startDate.format('YYYY-MM-DD'))
    var x = this.state.listOfActivityDetails.filter(eachActivity => {
      // let moments = eachActivity.dates.map(d => moment(d)),
      // console.log(eachActivity.dates)
      let moments = eachActivity.dates.map(d => moment(d)),
        maxDate = moment.max(moments),
        minDate = moment.min(moments)

      return startDate >= minDate && endDate <= maxDate
    })
    this.setState({ allActivities: x })
  }

  componentDidMount() {
    this.fetchActivitiesList()
    this.props.data.source.edges.map((item,i)=>{
      if(item.node.childImageSharp.fluid.name == 'activity_28082019120821.jpg'){
        console.log("found")
      }
    })
    // console.log()
  }

  // ? what is this function for?
  setValueOfSearch() {
    this.fetchActivitiesList()
  }

  fetchActivitiesList = () => {
    console.log('fetching activities')
      this.setState({
              rawData: storedActivityData,
              listOfActivityDetails:storedActivityData,
              allActivities:storedActivityData,
              activities: [1, 2, 3, 4, 5, 6, 7],
              loading:false
            })
  }

  render() {
    let listOfContent
    if (this.state.loading) {
      // listOfContent = <h1>LOADING......</h1>
      if (isMobile) {
        listOfContent = (
          <p style={{ color: "blue", marginTop: "20%", marginLeft: "40%" }}>
            <Spinner
              type="grow"
              color="primary"
              style={{ width: "4rem", height: "4rem", marginTop: "3rem" }}
            />{" "}
          </p>
        )
      } else {
        listOfContent = (
          <Spinner
            type="grow"
            color="primary"
            style={{
              width: "6rem",
              height: "6rem",
              left: "50%",
              marginLeft: "-6rem",
              position: "fixed",
            }}
          />
        )
      }
    } else {
      listOfContent = this.state.allActivities.map(eachActivity => (
        <Col
          sm={{ size: 12 }}
          md={{ size: 4 }}
          lg={{ size: 3 }}
          style={{ marginBottom: "160px" }}
        >
          <div
            style={{
              backgroundImage: `https://www.algarvefun.com/wp-content/uploads/2017/02/albufeira-snorkeling-algarve-fun-1.jpg`,
              height: "300px",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <BrowserView>
              <Link
                to={`/${eachActivity.url}`}
                state={{ activityId: eachActivity.id }}
              >
                {this.props.data.source.edges.map((item, i) => {
                        if(item.node.childImageSharp.fluid.name == eachActivity.image){
                         return <BackgroundImage
                           fluid={item.node.childImageSharp.fluid}
                           backgroundColor={`#040e18`}
                           style={{
                             overflow:"hidden",
                            height: "300px",
                            marginLeft: "19px",
                            marginRight: "19px",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            borderRadius: "5px",
                          }}
          ><div
          className="activity-select"
          
        ></div></BackgroundImage>
                        }
                })}
              </Link>
            </BrowserView>
            <MobileView>
              <Link
                to={`/${eachActivity.url}`}
                state={{ activityId: eachActivity.id }}
              >
                <div
                  style={{
                    backgroundImage:
                      "url(" +apiEndPoints.image+
                      eachActivity.image +
                      ")",
                    height: "300px",
                    marginLeft: "19px",
                    marginRight: "19px",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "5px",
                  }}
                />
              </Link>
            </MobileView>
            <Link
              to={`/${eachActivity.url}`}
              state={{ activityId: eachActivity.id }}
              style={{ textDecoration: "none" }}
            >
              <div style={{ cursor: "pointer" }}>
                <div
                  style={{
                    marginLeft: "19px",
                    marginTop: "5px",
                    paddingTop: "5px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "Open Sans",
                      color: "rgb(118, 118, 118)",
                      fontSize: "12px",
                      padding: "0px",
                      marginBottom: "5px",
                      minHeight: "20px",
                    }}
                  >
                    <b>{eachActivity.name.toUpperCase()}</b>
                  </p>
                  <p
                    style={{
                      fontFamily: "Open Sans",
                      fontSize: "14px",
                      color: "rgb(72,72,72)",
                      minHeight: "35px",
                      marginBottom: "0px",
                    }}
                  >
                    <b>{striptags(eachActivity.small_description)}</b>
                  </p>
                  <span
                    style={{
                      fontFamily: "Open Sans",
                      fontSize: "12px",
                      color: "rgb(118, 118, 118)",
                    }}
                  >
                    <b>
                      ₹{eachActivity.adult_ticket} per person -{" "}
                      {eachActivity.location}
                    </b>{" "}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </Col>
      ))
    }
    return (
      <Layout>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Book underwater adventure activities, scuba diving, romantic dinner in Andaman, Havelock Island, Portblair, Niel</title>
            <link rel="canonical" href="https://ferrybooking.in/activity/" />
            <meta name="description" content="Ferrybooking.in let's you book ferry, underwater activities, kayak, scuba, romantic dinner and adventure activities instantly in Andaman - Portblair - Havelock - Niel" />
        </Helmet>
        <div
          className="filter-container"
          style={{ width: "100", padding: "20px" }}
        >
          <Row>
            <Col sm={{ size: 4 }} />
            <Col
              sm={{ size: 4 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <Button
                id="filterByDate"
                type="button"
                outline
                color="secondary"
                size="sm"
              >
                Dates
              </Button>
              <Button
                id="filterByPrice"
                type="button"
                outline
                color="secondary"
                size="sm"
              >
                Price
              </Button>
              {/* <Button id="filterByGuest" type="button" outline color="secondary" size="sm">
      Guest
      </Button> */}
              <Button
                id="filterByLocation"
                type="button"
                outline
                color="secondary"
                size="sm"
              >
                Location
              </Button>
            </Col>
            <Col sm={{ size: 4 }} />
          </Row>

          <UncontrolledPopover
            trigger="legacy"
            placement="bottom"
            target="filterByDate"
          >
            {/* <PopoverHeader>Filter by date</PopoverHeader> */}
            <PopoverBody>
              <DateRangePicker
                startDateId="startDate"
                endDateId="endDate"
                startDate={this.state.filterDateStart}
                endDate={this.state.filterDateEnd}
                onDatesChange={({ startDate, endDate }) => {
                  this.dateFilterUpdated(startDate, endDate)
                }}
                focusedInput={this.state.filterDateFocusedInput}
                onFocusChange={focusedInput => {
                  this.setState({ filterDateFocusedInput: focusedInput })
                }}
              />
            </PopoverBody>
          </UncontrolledPopover>

          {/* <UncontrolledPopover trigger="legacy" placement="bottom" target="filterByGuest">
      <PopoverHeader>Filter by Guests</PopoverHeader>
      <PopoverBody>
      Legacy is a reactstrap special trigger value (outside of bootstrap's spec/standard). Before reactstrap correctly supported click and focus, it had a hybrid which was very useful and has been brought back as trigger="legacy". One advantage of the legacy trigger is that it allows the popover text to be selected while also closing when clicking outside the triggering element and popover itself.</PopoverBody>
      </UncontrolledPopover> */}
          <UncontrolledPopover
            trigger="legacy"
            placement="bottom"
            target="filterByLocation"
          >
            <PopoverBody>
              <div onChange={this.updateValueOfLocationFilter}>
                <div>
                  <Input
                    addon
                    value="Havelock"
                    type="checkbox"
                    checked={this.state.listOfPlacesToFilter["Havelock"]}
                    aria-label="Show all activities at Havelock"
                  />{" "}
                  Havelock
                </div>
                <div>
                  <Input
                    addon
                    value="Port Blair"
                    type="checkbox"
                    checked={this.state.listOfPlacesToFilter["Port Blair"]}
                    aria-label="Show all activities at Havelock"
                  />{" "}
                  Port Blair
                </div>
                <div>
                  <Input
                    addon
                    value="Niel"
                    type="checkbox"
                    checked={this.state.listOfPlacesToFilter["Niel"]}
                    default="checked"
                    aria-label="Show all activities at Havelock"
                  />{" "}
                  Niel
                </div>
              </div>
            </PopoverBody>
          </UncontrolledPopover>

          <UncontrolledPopover
            trigger="legacy"
            placement="bottom"
            target="filterByPrice"
          >
            <PopoverBody style={{ paddingTop: "18%" }}>
              <h4 style={{ textAlign: "center" }}>
                <Badge href="#" color="light">
                  {this.state.filterPriceValue[0]} to{" "}
                  {this.state.filterPriceValue[1]} INR
                </Badge>
              </h4>
              <Range
                min={0}
                max={15000}
                defaultValue={this.state.filterPriceValue}
                onChange={this.updateValueOfPriceFilter}
              />
            </PopoverBody>
          </UncontrolledPopover>
        </div>
        <BrowserView>
          <p>
            <b>Explore experiences</b>
          </p>

          <Row style={{ marginBottom: "50px" }}>
            {["Water Sports", "Adventure", "Romantic", "Tour"].map(
              eachExperience => (
                <Col sm={{ size: 3 }}>
                  <div style={{ margin: "10px" }}>
                    <Row
                      style={{
                        boxShadow: " 0px 4px 32px rgba(189, 189, 189, 0.24)",
                        border: "1px solid #F2F2F2",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        this.updateValueOfStyleFilter(eachExperience)
                      }
                      id={eachExperience}
                    >
                      <Col
                        sm={{ size: 3 }}
                        style={{
                          backgroundImage: `url(https://cdn.prod-carehubs.net/n1/802899ec472ea3d8/uploads/2015/05/shutterstock_36013711.jpg)`,
                          height: "70px",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                      <Col sm={{ size: 9 }} style={{ marginTop: "5%" }}>
                        <p
                          style={{
                            fontFamily: "Open Sans",
                            fontSize: "14px",
                            color: "#554944",
                          }}
                        >
                          <b>{eachExperience}</b>
                        </p>
                      </Col>
                    </Row>
                  </div>
                </Col>
              )
            )}
          </Row>
        </BrowserView>
        <Container fluid={true}>
          <Row>{listOfContent}</Row>
        </Container>
      </Layout>
    )
  }
}

export default FerryActivities
export const pageQuery = graphql`
  query imageQuery {
    source: allFile(filter: { absolutePath: { regex: "/images/" } }) {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth: 600) {
              name:originalName
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`