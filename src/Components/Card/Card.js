import React from 'react';
import { Flipped, Flipper } from 'react-flip-toolkit';
import './Card.css';

class Card extends React.Component {

    constructor() {
        super();
        this.state = {
            loadingImage: true,
            cardAnim: false
        }

        this.startAnim = this.startAnim.bind(this);

    }
    startAnim() {
         this.setState(_prev => {
             return {
                 ..._prev,
                 cardAnim: true
             }
         });
    }
    render() {
        return (
                <Flipped flipId={`cardAnim-${this.props.details.idMeal}`} stagger="essential">
                    <div className={`cardContainer ${this.state.cardAnim ? "" :  "hidden-card" }`} >
                        <Flipped flipId={`foodPhoto-${this.props.details.idMeal}`} >
                            {this.props.details.idMeal !== this.props.parentState.foodDetails?.id &&        
                                    <div onClick={() => { this.props.showDetails(this.props.details.idMeal, this.props.details) }} className="card" style={{backgroundImage: !this.state.loadingImage ? `url("${this.props.details.strMealThumb}")` : "", backgroundSize: "cover"}} >
                                        <div className="image-placeholder"></div>

                                        <div className="description">
                                            <div className="name">
                                                {this.props.name}
                                            </div>
                                            <div className="type">
                                                {`${this.props.details.strArea} Food`}
                                            </div>
                                        </div>
                                    </div>
                            }
                        </Flipped>
                    </div>
                </Flipped>
        );
    }

    componentDidMount() {
        setTimeout(this.startAnim, 100);

        let image = new Image();
        image.src = this.props.details.strMealThumb;
        image.onload = () => {
            this.setState(_prev => {
                return {
                    ..._prev,
                    loadingImage: false
                }
            });
        }

    }

}

export default Card;