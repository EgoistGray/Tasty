import React from 'react';
import { Flipped } from 'react-flip-toolkit';
import { Link } from 'react-router-dom';
import './Card.css';

class Card extends React.Component {
    render() {
        return (
            <div className="cardContainer">
                <Flipped flipId={`foodPhoto-${this.props.details.id}`} >
                {this.props.details.id !== this.props.parentState.foodDetails?.id &&        
                        <div onClick={() => { this.props.showDetails(this.props.details.id) }} className="card" style={{ background: "#2b2b2b", backgroundSize: "cover" }} >
                            <div className="image-placeholder"></div>

                            <div className="description">
                                <div className="name">
                                    {this.props.name}
                                </div>
                                <div className="type">
                                    {this.props.name}
                                </div>
                            </div>
                        </div>
                }
                </Flipped>
            </div>

        );
    }
}

export default Card;