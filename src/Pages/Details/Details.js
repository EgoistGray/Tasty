import React from 'react';
import './Details.css';

class Details extends React.Component {

    constructor(props) {
        super();
        
        this.state = {
            foodId : props.match.params.foodId
        }

    }

    componentDidMount() {
        
    }
    render() {

        console.log(this.props);
        console.log(this.props.match.params);
        return (
            <div className="details page">
                <div className="photo"></div>
                <div className="food-details">

                </div>
            </div>
        );
    }
}

export default Details;