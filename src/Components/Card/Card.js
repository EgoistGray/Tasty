import React from 'react';
import { Flipped } from 'react-flip-toolkit';
import './Card.css';

class Card extends React.Component {
    render() {
        return (
            <div onClick={() => { this.props.showDetails(this.props.details.id) }} className="card" style={{ background: "#2b2b2b", backgroundSize: "cover" }} >
                <Flipped flipId="cardFoodPhoto">
                    <div className="image"></div>
                </Flipped>
                <div className="description">
                    <div className="name">
                        {this.props.name}
                    </div>
                    <div className="type">
                        {this.props.name}
                    </div>
                </div>

            </div>

        );
    }
}

export default Card;