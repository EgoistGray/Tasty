import React from 'react';
import './CardContainer.css'

class CardContainer extends React.Component {

    render() {
        return (
            <div className="cardContainer">
                <div className="cardAligner">
                    {this.props.children}
                </div>
            </div>
        )
    }

    componentDidMount() {
        //Get datas here
    }

}

export default CardContainer;