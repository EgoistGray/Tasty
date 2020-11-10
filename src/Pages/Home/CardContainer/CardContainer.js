import React from 'react';
import './CardContainer.css'

import Card from '../../../Components/Card/Card';
import MealDB from '../../../Components/Database/MealDBInterfacer';
import Loader from '../../../Components/Loader/Loader';
import { Flipper } from 'react-flip-toolkit';
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

        if (this.props.parentState.displayedDatas === undefined) console.log(this.props);

        return (
            <div className="cardContainer">
                <Flipper flipKey={this.state.datas.length} straggerConfig={{ essentialCards: {reverse:true} }}>
                    <div className="cardAligner">
                        {/* Pls fix the loading stuff */}
                        { this.props.parentState.isLoading  ? <Loader /> : this.props.parentState.displayedDatas.map(data => {
                            return (
                                <Card className={`cardContainer ${this.state.anim ? "" :  "hidden-card" }`} parentState={this.props.parentState} key={`card-${data.strMeal}`} name={data.strMeal} details={data} showDetails={this.props.showDetails} />
                            )
                        }) }
                    </div>
                </Flipper>
                    
            </div>
        )
    }
    startAnim() {
        this.setState(_prev => {
            return {
                ..._prev,
                anim: true
            }
        })
    }
}

export default CardContainer;