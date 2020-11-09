import React from 'react';
import './CardContainer.css'

import Card from '../../../Components/Card/Card';
import MealDB from '../../../Components/Database/MealDBInterfacer';
import Loader from '../../../Components/Loader/Loader';
import { Flipped, Flipper } from 'react-flip-toolkit';
import '../../../Components/Card/Card.css'

class CardContainer extends React.Component {

    constructor(props) {
        super();

        this.db = new MealDB();
        this.state = {
            isLoading: props.parentState.isLoading,
            datas: [],
            anim: false
        }

        this.quantityPerBatch = 16;
        this.startAnim = this.startAnim.bind(this);
    }

    render() {
        if (this.props.parentState.displayedDatas === null) return;
        return (
            <div className="cardContainer">
                <Flipper flipKey={ this.props.parentState.isLoading}>
                    <div className="cardAligner">
                        {/* Pls fix the loading stuff */}
                        { this.props.parentState.isLoading ? <Loader /> : this.props.parentState.displayedDatas.map(data => {
                            return (
                                <Flipped key={`card-${data.strMeal}`} stagger="essentialCards" onAppear={this.startAnim}>
                                    { flipProps => <Card className={`cardContainer`} flipProps={flipProps} parentState={this.props.parentState} key={`card-${data.strMeal}`} name={data.strMeal} details={data} showDetails={this.props.showDetails} />}
                                </Flipped>
                            )
                        }) }
                    </div>
                </Flipper>
                    
            </div>
        )
    }
    startAnim() {
        console.log("RANIM");
        this.setState(_prev => {
            return {
                ..._prev,
                anim: true
            }
        })
    }
}

export default CardContainer;