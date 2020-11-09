import React from 'react';
import './Details.css';
import {Flipped} from 'react-flip-toolkit';
import ContentParser from '../../Components/ContentParser/ContentParser';

class Details extends React.Component {

    constructor(props) {
        super();
        this.state = {
            isShowingDetails: false,
            showFoodDetails: false,
            imgSrc: "",
            content : ""
        };

        this.setState(_prev => {
            return {
                ..._prev
            }
        })

        this.ContentParser = new ContentParser();
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
        return (
            <div className="details page" >
                <Flipped flipId={`foodPhoto-${this.props.foodDetails.id}`}>
                    <div style={{ backgroundImage: this.state.imgSrc, backgroundSize: "cover", backgroundRepeat: "no-repeat" }} className={`photo ${this.props.parentState.isShowingDetails ? "photo-show" : ""}`}></div>
                </Flipped>
                <Flipped flipId="foodDesc" stagger>
                    {this.props.parentState.isShowingDetails && <div className={`food-details-default`}>

                        <div className={`name-details ${this.props.parentState.isShowingDetails ? "": "hidden" }`}>{ this.props.foodDetails.details.strMeal}</div>
                        <div className={`content ${this.props.parentState.isShowingDetails ? "": "hidden" }`}>
                            {this.ContentParser.parseContent(this.props.foodDetails.details)}
                        </div>

                        <div className="back-btn-container">
                            <div className="back-btn" onClick={this.props.hideDetails}>Return</div>
                        </div>
                    </div>}
                </Flipped>

            </div>
                    
        );
    }
}

export default Details;