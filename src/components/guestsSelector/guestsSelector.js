import React from 'react';
import './guestsSelector.css';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Button,
} from 'reactstrap';
import Pluralize from 'react-pluralize';

class GuestsSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      roomCount: 1,
      adultCount: 1,
      childCount: 0,
      maxTotalCount:props.maxTotalCount,

    };
  }

  componentDidMount=()=>{
    // this.setState( { maxTotalCount : this.props.maxTotalCount } )
  }

  shouldComponentUpdate(nextProps, nextState){
    if(this.state.adultCount != nextState.adultCount || this.state.childCount != nextState.childCount ){
      this.props.handler(nextState.adultCount,nextState.childCount)
    }
    if(nextProps.maxTotalCount!=this.state.maxTotalCount){
      this.setState({maxTotalCount:nextProps.maxTotalCount})
    }
    return true
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  };

  incrementRoomCount = () => {
    if (this.state.roomCount < 20) {
      let newRoomCount = this.state.roomCount + 1;
      if (this.state.adultCount > newRoomCount * 2) {
        this.setState({
          roomCount: newRoomCount,
          adultCount: newRoomCount * 2,
        });
      } else {
        this.setState({ roomCount: newRoomCount });
      }
    }
  };

  incrementAdultCount = () => {
    if ((this.state.childCount + this.state.adultCount) < this.state.maxTotalCount) {
      let newAdultCount = this.state.adultCount + 1;
      this.setState({ adultCount: newAdultCount });
    }else{
      alert("max allowed guests is "+ this.state.maxTotalCount)
    }
  };

  incrementChildCount = () => {
    // console.log(this.state.maxTotalCount)
    if ((this.state.childCount + this.state.adultCount) < this.state.maxTotalCount) {
      let newChildCount = this.state.childCount + 1;
      this.setState({ childCount: newChildCount });
    }else{
      alert("max allowed guests is "+ this.state.maxTotalCount)
    }
  };

  decrementRoomCount = () => {
    if (this.state.roomCount > 1) {
      let newRoomCount = this.state.roomCount - 1;
      if (this.state.adultCount > newRoomCount * 2) {
        this.setState({
          roomCount: newRoomCount,
          adultCount: newRoomCount * 2,
        });
      } else {
        this.setState({ roomCount: newRoomCount });
      }
    }
  };

  decrementAdultCount = () => {
    if (this.state.adultCount > 1) {
      let newAdultCount = this.state.adultCount - 1;
      this.setState({ adultCount: newAdultCount });
    }
  };

  decrementChildCount = () => {
    if (this.state.childCount > 0) {
      let newChildCount = this.state.childCount - 1;
      this.setState({ childCount: newChildCount });
    }
  };

  render() {
    return (
      <ButtonDropdown
        id="roomsGuestsInput"
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
      >
        <DropdownToggle caret>
          {/* <Pluralize singular={'Room'} count={this.state.roomCount} />{' '} */}
          <Pluralize singular={'Adult'} count={this.state.adultCount} />{' '}
          <Pluralize
            singular={'Child'}
            plural={'Children'}
            count={this.state.childCount}
            zero={' '}
          />
        </DropdownToggle>
        <DropdownMenu id="roomsGuestsDropDownContainer">
          {/* <DropdownItem header>Rooms</DropdownItem>

          <div>
            <Row className="roomGuestsSelectorItem">
              <Col>
                <Pluralize
                  singular={'Room'}
                  count={this.state.roomCount}
                  style={{ marginTop: '8px', position: 'absolute' }}
                />
              </Col>
              <Col style={{ marginLeft: '0%' }}>
                <Button
                  className="IncrementDecrement"
                  onClick={this.incrementRoomCount}
                >
                  +
                </Button>
                <Button
                  className="IncrementDecrement"
                  onClick={this.decrementRoomCount}
                >
                  -
                </Button>
              </Col>
            </Row>
          </div>
          <DropdownItem divider /> */}
          <DropdownItem header>Adults</DropdownItem>
          <div>
            <Row className="roomGuestsSelectorItem">
              <Col>
                <Pluralize
                  singular={'Adult'}
                  count={this.state.adultCount}
                  style={{ marginTop: '8px', position: 'absolute' }}
                />
              </Col>
              <Col style={{ marginLeft: '0%',padding:'0' }}>
                <Button
                  className="IncrementDecrement"
                  onClick={this.incrementAdultCount}
                >
                  +
                </Button>
                <Button
                  className="IncrementDecrement"
                  onClick={this.decrementAdultCount}
                >
                  -
                </Button>
              </Col>
            </Row>
          </div>
          <DropdownItem divider />
          <DropdownItem header>Children</DropdownItem>
          <div>
            <Row className="roomGuestsSelectorItem">
              <Col>
                <Pluralize
                  singular={'Child'}
                  plural={'Children'}
                  count={this.state.childCount}
                  style={{ marginTop: '8px', position: 'absolute' }}
                />
              </Col>
              <Col style={{ marginLeft: '0%',padding:'0' }}>
                <Button
                  className="IncrementDecrement"
                  onClick={this.incrementChildCount}
                >
                  +
                </Button>
                <Button
                  className="IncrementDecrement"
                  onClick={this.decrementChildCount}
                >
                  -
                </Button>
              </Col>
            </Row>
          </div>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}
export default GuestsSelector;
