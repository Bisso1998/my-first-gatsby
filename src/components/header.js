import React, { Component } from "react"
// import { graphql } from "gatsby"
import { Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

// import axios from "axios"
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

class Header extends Component {
    constructor (props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
      componentDidMount() {
      }

     

        render() {
            return(
                <div>
                <Navbar color="white" style={{margin:'10px', paddingRight: '150px'}} light expand="md">
                  <NavbarBrand href="/" style={{color: '#1E67B4', fontFamily: 'Montserrat', fontSize: '28px', fontWeight:'bold', paddingLeft: '100px'}}>FerryBooking.in</NavbarBrand>
                  <NavbarToggler onClick={this.toggle} />
                  <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                     
                      <NavItem>
                        <NavLink href="https://ferrybooking.in/">Home</NavLink>
                      </NavItem>
                      <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                          More in Andaman
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem>
                            Option 1
                          </DropdownItem>
                          <DropdownItem>
                            Option 2
                          </DropdownItem>
                          <DropdownItem divider />
                          <DropdownItem>
                            Reset
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                      <NavItem>
                        <NavLink href="https://ferrybooking.in/book">Book Tickets Now</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="https://ferrybooking.in/cab-booking-for-andaman-tour-trip/">Cabs</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="https://ferrybooking.in/scuba-diving-booking-andaman/">Scuba</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="https://ferrybooking.in/cancel-ticket-for-ferry-cruise-boat/">Cancel Tiket</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="https://ferrybooking.in/contact-us/">Contact Us</NavLink>
                      </NavItem>
                    </Nav>
                  </Collapse>
                </Navbar>
                
                <Row style={{borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', marginBottom: '10px', }}>
              
                <Col sm={{ size: 4}}  className="header-select" style={{fontFamily: 'Montserrat', fontSize: '22px', textAlign: 'center' , color: '#1F69B0', padding: '10px'}}>
                    FERRY BOOKING  
                    <span style={{fontSize: '14px', marginTop: '-10px', display: 'block'}}> FOR HAVELOCK & NEIL</span>
                </Col>
                <Col sm={{ size: 4}}  className="header-select" style={{fontFamily: 'Montserrat', fontSize: '22px', textAlign: 'center' , color: '#1F69B0', padding: '10px'}}>
                    BOAT BOOKING 
                    <span style={{fontSize: '14px', marginTop: '-10px', display: 'block'}}>ROSS,NORTH,ELEPHANTA</span>
                </Col>
                <Col sm={{ size: 4}}  className="header-select" style={{fontFamily: 'Montserrat', fontSize: '22px', textAlign: 'center' , color: 'white' , backgroundColor: '#1F69B0' , padding: '10px'}}>
                    ACTIVITIES 
                    <span style={{fontSize: '14px', marginTop: '-10px', display: 'block'}}>FOR HAVELOCK</span>
                </Col>
              
                </Row>
              </div>
            )

        }
} 

export default Header
