import React from 'react';
import './CardContainer.css'

import Card from '../../../Components/Card/Card';
import MealDB from '../../../Components/Database/MealDBInterfacer';
import Loader from '../../../Components/Loader/Loader';

class CardContainer extends React.Component {

    constructor(props) {
        super();

        this.db = new MealDB();
        this.state = {
            isLoading: props.parentState.isLoading,
            datas : []
        }

        this.quantityPerBatch = 16;
    }

    render() {
        return (
            <div className="cardContainer">
                <div className="cardAligner">
                    {/* Pls fix the loading stuff */}
                    { this.props.parentState.isLoading ? <Loader /> : this.props.parentState.displayedDatas.map(data => {
                        return (
                             <Card  parentState={this.props.parentState} key={`card-${data.strMeal}`} name={data.strMeal} details={data} showDetails={this.props.showDetails} />
                        )
                    }) }
                </div>
            </div>
        )
    }

}

export default CardContainer;