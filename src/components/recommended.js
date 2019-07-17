import React, { Component } from "react"
import axios from "axios"
// import Layout from "../components/layout"
import { Container, Row, Col } from 'reactstrap';
import { Link } from "gatsby";
var striptags = require('striptags');

class RecommendedActivities extends Component {
    constructor (props) {
        super(props);
        this.state = {
           activities: [],
           loading: true,
          recommendations: []
        }
      }

      componentDidMount() {
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
        let newRecommendation = this.props.listOfRecommendation.map((eachRecommendation) => {
          eachRecommendation = JSON.parse(eachRecommendation);
          return {...eachRecommendation, url: slugify(eachRecommendation.small_description)};
        });
        this.setState({
          recommendations: newRecommendation,
        })
     }


        render() {
            return(
                   <Container>
                    <Row>
                        {this.state.recommendations.map((eachActivity) => (
                              <Col sm={{ size: 3}} style={{marginBottom: '40px'}} >
                                <Link to={`/${eachActivity.url}`}
                                      state={{ activityId: eachActivity.id }}
                                >

                                <div style={{backgroundImage:  'url(https://travelcheckins.com/apitest/public/activity_images/'+eachActivity.image_name+')' , height: '300px', marginLeft: '19px', marginRight: '19px',  backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '5px'}}>
                            </div>
                            </Link>
                        <div style ={{marginLeft: '19px' , marginTop: '5px' , paddingTop: '5px'}}>
                                <p style={{ fontFamily: 'Helvetica', fontSize: '11px', color: 'grey', letterSpacing: '1px', padding: '0px', margin: '0px',}}>{striptags(eachActivity.small_description)}</p>
                                <p style={{ fontFamily: 'Times', fontSize: '14px', color: '#554944', padding: '0px', margin: '0px',}}><b>{striptags(eachActivity.name)}</b></p>
                                <span style={{ fontFamily: 'Times', fontSize: '13px', color: '#3F4A4A', padding: '5px' , backgroundColor: '#DFE6E6' , boxSizing: 'border-box'}}>Rating {eachActivity.rating}</span>
                        </div>

                            </Col>

                        ))}
                
                    </Row>
                   </Container>
            )

        }
}

export default RecommendedActivities
