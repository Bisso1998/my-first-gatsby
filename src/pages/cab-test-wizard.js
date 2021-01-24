import React, { Component } from "react"
// import axios from "axios"
import Layout from "../components/layout"
import GuestsSelector from "../components/guestsSelector/guestsSelector"
import { Container, Row, Col } from "reactstrap"
import {
    InputGroup,
// InputGroupText,
// InputGroupAddon,
Input,
} from "reactstrap"
import StepWizard from 'react-step-wizard';
import GetUserDetails from './cab-wizard-steps/getUserDetails';
import IsFerryBooked from './cab-wizard-steps/isFerryBooked';
import GetFerryDetails from './cab-wizard-steps/getFerryDetails';
import GetFlightDetails from './cab-wizard-steps/getFlightDetails';
import SelectDay1Activities from './cab-wizard-steps/selectDay1Activities'
import DaysList from './cab-wizard-steps/daysList';
import PortBlairCabs from './cab-wizard-steps/portBlairCabs'
import HavelockCabs from './cab-wizard-steps/havelockCabs'
import NeilCabs from './cab-wizard-steps/neilCabs'
import Step99 from './cab-wizard-steps/step99';
import { observer, Provider, inject } from 'mobx-react';

@observer
@inject('store')
class CabWizard extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    componentDidMount = ()=> {
        
        // props.location is only available on browser/client
        // gatsby will build server side.. so if window is undefined, ignore props.location
        if (typeof window === "undefined") {
            return
        }
    }

    render = ()=> {
        return (

            <Layout>
            <Container style={{ marginTop: "4rem" }}>
                
                <StepWizard>
                    <GetUserDetails />
                    <GetFlightDetails />
                    <IsFerryBooked />
                    <GetFerryDetails />
                    <PortBlairCabs />
                    <HavelockCabs />
                    <NeilCabs />
                    {/* <SelectDay1Activities /> */}
                    {/* <Step99 />  */}
                    <DaysList />
                </StepWizard>
            </Container>
            </Layout>
            )
        }
    }

export default CabWizard
