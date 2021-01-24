import { observable, computed, action } from 'mobx';
import * as moment from "moment"
class CabWizardModel{
    @observable guestName = 'z';
    @observable guestNumberOfAdults = 0;
    @observable guestNumberOfChildren = 0;
    @observable guestContactNumber = '';
    @observable guestEmail = '';
    @observable guestFlightArrivalDateTime = moment();
    @observable guestFlightDepartureDateTime = moment();
    @observable isGuestFerryTicketsBooked = false;
    @observable guestFerryPortBlairToHavelockDepartureDateTime = moment();
    @observable guestFerryHavelockToNeilDepartureDateTime = moment();
    @observable guestFerryNeilToPortBlairDepartureDateTime = moment();
    
    @observable sightsInPortBlair =[]
    // complexity. if other events happen between 2-6 pm, cellular jail will overlap 

    @observable transfersInPortBlair =[]

    @observable sightsInHavelock = []
    
    @observable transfersInHavelock = []

    @observable sightsInNeil = []

    @observable transfersInNeil = []

    @observable cabsInPortBlair =[]

    @observable cabsInHavelock = []
    
    @observable cabsInNeil = []

    @action setGuestName(value){
        this.guestName = value
    }

    @action setGuestNumberOfAdults(value){
        this.guestNumberOfAdults = value
    }

    @action setGuestNumberOfChildren(value){
        this.guestNumberOfAdults = value
    }

    @action setGuestEmail(value){
        this.guestEmail = value
    }

    @action setGuestContactNumber(value){
        this.guestContactNumber = value
    }

    @action setGuestFlightArrivalDate(value){
        this.guestFlightArrivalDateTime.set('year', value.year());
        this.guestFlightArrivalDateTime.set('month', value.month());
        this.guestFlightArrivalDateTime.set('date', value.date());
    }

    @action setGuestFlightArrivalDateTime(hour, minute){
        this.guestFlightArrivalDateTime.set({h: hour, m: minute});
    }

    @action setGuestFlightDepartureDate(value){
        this.guestFlightDepartureDateTime.set('year', value.year());
        this.guestFlightDepartureDateTime.set('month', value.month());
        this.guestFlightDepartureDateTime.set('date', value.date());
    }

    @action setGuestFlightDepartureDateTime(hour, minute){
        this.guestFlightDepartureDateTime.set({h: hour, m: minute});
    }

    @action setGuestFerryIsBooked(){
        this.isGuestFerryTicketsBooked = true
    }

    @action setGuestFerryIsNotBooked(){
        this.isGuestFerryTicketsBooked = false
    }

    @action setGuestFerryPortBlairToHavelockDepartureDate(value){
        this.guestFerryPortBlairToHavelockDepartureDateTime.set('year', value.year());
        this.guestFerryPortBlairToHavelockDepartureDateTime.set('month', value.month());
        this.guestFerryPortBlairToHavelockDepartureDateTime.set('date', value.date());
    }

    @action setGuestFerryPortBlairToHavelockDepartureDateTime(hour, minute){
        this.guestFerryPortBlairToHavelockDepartureDateTime.set({h: hour, m: minute});
    }

    @action setGuestFerryHavelockToNeilDepartureDate(value){
        this.guestFerryHavelockToNeilDepartureDateTime.set('year', value.year());
        this.guestFerryHavelockToNeilDepartureDateTime.set('month', value.month());
        this.guestFerryHavelockToNeilDepartureDateTime.set('date', value.date());
    }

    @action setGuestFerryHavelockToNeilDepartureDateTime(hour, minute){
        this.guestFerryHavelockToNeilDepartureDateTime.set({h: hour, m: minute});
    }

    @action setGuestFerryNeilToPortBlairDepartureDate(value){
        this.guestFerryNeilToPortBlairDepartureDateTime.set('year', value.year());
        this.guestFerryNeilToPortBlairDepartureDateTime.set('month', value.month());
        this.guestFerryNeilToPortBlairDepartureDateTime.set('date', value.date());
    }

    @action setGuestFerryNeilToPortBlairDepartureDateTime(hour, minute){
        this.guestFerryNeilToPortBlairDepartureDateTime.set({h: hour, m: minute});
    }

    @action setCabsInPortBlair(value){
        this.cabsInPortBlair = value
    }

    @action setCabsInHavelock(value){
        this.cabsInHavelock = value
    }

    @action setCabsInNeil(value){
        this.cabsInNeil = value
    }

    @computed get guestTotalDaysInAndaman(){
        return this.guestFlightDepartureDateTime.endOf('day').diff(this.guestFlightArrivalDateTime.startOf('day'),"days")
    }

    @computed get guestDelayBetweenFlightArrivalAndFerryPortBlairToHavelock(){
        return this.guestFlightArrivalDateTime.diff(this.guestFerryPortBlairToHavelockDepartureDateTime,"hours")
    }

    @computed get guestTotalPreFerryDaysInPortBlair(){
        return this.guestFerryPortBlairToHavelockDepartureDateTime.endOf('day').diff(this.guestFlightArrivalDateTime.startOf('day'),"days")
    }
    
    @computed get guestTotalDaysInHavelock(){
        return this.guestFerryHavelockToNeilDepartureDateTime.endOf('day').diff(this.guestFerryPortBlairToHavelockDepartureDateTime.startOf('day'),"days")
    }

    @computed get guestTotalDaysInNeil(){
        return this.guestFerryNeilToPortBlairDepartureDateTime.endOf('day').diff(this.guestFerryHavelockToNeilDepartureDateTime.startOf('day'),"days")
    }

    @computed get guestTotalPostFerryDaysInPortBlair(){
        return this.guestFlightDepartureDateTime.endOf('day').diff(this.guestFerryNeilToPortBlairDepartureDateTime.startOf('day'),"days")
    }
    
    
}

const CabWizardStore =  new CabWizardModel()
export default CabWizardStore