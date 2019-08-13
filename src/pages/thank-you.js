import React from 'react';

class Thankyou extends React.Component{

    constructor(props){
        super(props);
        // console.log(props.location);
    }

    extractUrlValue = (key, url) =>
    {
        if (typeof(url) === 'undefined')
            url = this.props.location.href;
        var match = url.match('[?&]' + key + '=([^&]+)');
        return match ? match[1] : null;
    }

    render(){
        return(
            <div>
                <p>
                {this.extractUrlValue('booking_id')}
                </p>     
            </div>
        )
    }
}

export default Thankyou;