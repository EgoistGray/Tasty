import React from 'react';
import { Flipped } from 'react-flip-toolkit';
import { Link } from 'react-router-dom';
import './Card.css';

class Card extends React.Component {
    constructor(props) {
        super();
        console.log(props);
    }
    render() {
        console.log(this.props);
        return (
            <Link to={`/details/${this.props.details.id}`}>
                <div {...this.props.flipToolkitProperties} onClick={() => { this.props.showDetails(this.props.details.id) }} className="card" style={{ background: "#2b2b2b", backgroundSize: "cover" }} >
                    <Flipped flipId={`foodPhoto-${this.props.details.id}`}>
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