import React from 'react';
import { Link } from 'react-router-dom';
import { Flipped } from 'react-flip-toolkit';
import './Card.css';

class Card extends React.Component{
    render() {
        return (
            <Link to={`details/${this.props.details.id}`}>
                <div className="card" style={{ background: "#2b2b2b", backgroundSize: "cover" }} >
                    <Flipped flipId="foodPhoto">
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
            </Link>
                
        );
    }
}

export default Card;