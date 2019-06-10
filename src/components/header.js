import React, { Component } from "react"
// import { graphql } from "gatsby"
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

import axios from "axios"
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
                <Navbar color="white" style={{borderBottom: '1px solid grey', paddingRight: '150px'}} light expand="md">
                  <NavbarBrand href="/" style={{color: '#1E67B4', fontFamily: 'Montserrat', fontSize: '28px', paddingLeft: '100px'}}>FerryBooking.in</NavbarBrand>
                  <NavbarToggler onClick={this.toggle} />
                  <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                     
                      <NavItem>
                        <NavLink href="/">Home</NavLink>
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
                        <NavLink href="/components/">Book Tickets Now</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="/components/">Cabs</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="/activities/">Scuba</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="/components/">Cancel Tiket</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="/components/">Contact Us</NavLink>
                      </NavItem>
                    </Nav>
                  </Collapse>
                </Navbar>
                
                <Row style={{borderBottom: '1px solid grey', marginBottom: '20px', }}>
                <Col sm={{ size: 2}} >
                </Col> 
                <Col sm={{ size: 3}}  className="header-select" style={{fontFamily: 'Montserrat', fontSize: '22px', textAlign: 'center' , color: '#1F69B0', padding: '10px'}}>
                    FERRY BOOKING  
                    <span style={{fontSize: '14px', marginTop: '-10px', display: 'block'}}>FOR HAVELOCK</span>
                </Col>
                <Col sm={{ size: 3}}  className="header-select" style={{fontFamily: 'Montserrat', fontSize: '22px', textAlign: 'center' , color: '#1F69B0', padding: '10px'}}>
                    BOAT BOOKING 
                    <span style={{fontSize: '14px', marginTop: '-10px', display: 'block'}}>FOR HAVELOCK</span>
                </Col>
                <Col sm={{ size: 3}}  className="header-select" style={{fontFamily: 'Montserrat', fontSize: '22px', textAlign: 'center' , color: 'white' , backgroundColor: '#1F69B0' , padding: '10px'}}>
                    ACTIVITIES 
                    <span style={{fontSize: '14px', marginTop: '-10px', display: 'block'}}>FOR HAVELOCK</span>
                </Col>
                <Col sm={{ size: 1}} >
                </Col>
                
                
                
                </Row>
              </div>
            )

        }
} 

export default Header
