import React from 'react';
import './Card.css';

class Card extends React.Component{
    render() {
        return (
            <div className="card" style={{ background: "#2b2b2b", backgroundSize: "cover" }}>
                <div className="image"></div>
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