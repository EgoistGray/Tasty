import React from 'react';
import './Details.css';
import {Flipped, Flipper} from 'react-flip-toolkit';

class Details extends React.Component {

    constructor(props) {
        super();
        this.state = {
            isShowingDetails: false,
            showFoodDetails: false
        };

        this.setState(_prev => {
            return {
                ..._prev
            }
        })
    }

    componentDidMount() {
        this.setState(_prev => {
            return {
                ..._prev,
                isShowingDetails: this.props.parentState.isShowingDetails
            }
        })
    }

    componentWillUnmount() {
        
    }

    render() {
        return (
            <div className="details page" >
                <Flipped flipId={`foodPhoto-${this.props.details.id}`}>
                    <div className={`photo ${this.props.parentState.isShowingDetails ? "photo-show" : ""}`}></div>
                </Flipped>
                <Flipped flipId="foodDesc">
                    <div className={`food-details-default`}></div>
                </Flipped>
            </div>
                    
        );
    }
}

export default Details;