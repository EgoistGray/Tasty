import React from 'react';
import './Details.css';
import {Flipped, Flipper} from 'react-flip-toolkit';

class Details extends React.Component {

    constructor(props) {
        super();
        this.state = {
            isShowingDetails: false,
            showFoodDetails: false,
            imgSrc: ""
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
                isShowingDetails: this.props.parentState.isShowingDetails,
                imgSrc: `url("${this.props.foodDetails.details.strMealThumb}")`
            }
        })
    }

    render() {
        console.log(this.props);
        return (
            <div className="details page" >
                <Flipped flipId={`foodPhoto-${this.props.foodDetails.id}`}>
                    <div style={{ backgroundImage: this.state.imgSrc, backgroundSize: "cover", backgroundRepeat: "no-repeat" }} className={`photo ${this.props.parentState.isShowingDetails ? "photo-show" : ""}`}></div>
                </Flipped>
                <Flipped flipId="foodDesc">
                    {this.props.parentState.isShowingDetails && <div className={`food-details-default`}>\
                     
                    </div>}
                </Flipped>
            </div>
                    
        );
    }
}

export default Details;