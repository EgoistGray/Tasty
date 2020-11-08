import React from 'react';
import './CardContainer.css'

import Card from '../../../Components/Card/Card';
import MealDB from '../../../Components/Database/MealDBInterfacer';

class CardContainer extends React.Component {

    constructor() {
        super();

        this.db = new MealDB();
        this.state = {
            isLoading: true,
            datas : []
        }

        this.quantityPerBatch = 16;
    }

    render() {
        return (
            <div className="cardContainer">
                <div className="cardAligner">
                    {!this.state.isLoading && this.state.datas.map(data => {
                        return (
                             <Card  parentState={this.props.parentState} key={`card-${data.strMeal}`} name={data.strMeal} details={data} showDetails={this.props.showDetails} />
                        )
                    })}
                </div>
            </div>
        )
    }

    componentDidMount() {
        //Get datas here
        this.db.getRandoms(this.quantityPerBatch).then(result => {
            result = result.flat();

            this.setState(_prev => {
                return {
                    ..._prev,
                    isLoading: false,
                    datas: result
                }
            });
            console.log(this.state);
        }).catch(err => {
            console.log(err);
        });

    }

}

export default CardContainer;