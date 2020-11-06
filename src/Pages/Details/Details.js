import React from 'react';
import './Details.css';
import {Flipped} from 'react-flip-toolkit';

class Details extends React.Component {

    constructor(props) {
        super();
        
        // this.state = {
        //     foodId : props.match.params.foodId
        // }

    }

    componentDidMount() {
        
    }
    render() {
        return (
            // <div className="details page" {...this.props.flipToolkitProperties}>
            <div className="details page">
                <Flipped flipId={`foodPhoto-${this.props.match.params.foodId}`}>
                    <div className="photo"></div>
                </Flipped>
                <div className="food-details">

                </div>
            </div>
        );
    }
}

export default Details;