import React from 'react';
import '../Root/page.css';
import './Home.css';
import '../../Components/Card/Card';
import './CardContainer/CardContainer';
import CardContainer from './CardContainer/CardContainer';
import Card from '../../Components/Card/Card';
import Details from '../Details/Details';
import { Flipped, Flipper } from 'react-flip-toolkit';

class Home extends React.Component {

    constructor(props) {
        super();
        this.state = {
            isShowingDetails: false,
            foodDetails: {}
        };

        //Implementing rerouting details here
        if (props.match?.params) {
            //Here setup state to open details
        };


        this.showDetails = this.showDetails.bind(this);
        this.tmpDatas = [{
            name: "Macaroni",
            id: 1234
        }, {
            name: "Dolly",
            id: 1233
        }, {
            name: "Mumuwu",
            id: 1231
        }, {
            name: "Homu",
            id: 1243
        }, {
            name: "Matuli",
            id: 1123
        },]
    }
    render() {
        return (
            <div className="home page">
                <div className="search_component">
                    <div className="title">
                        <div className="brand">Tasty</div>
                        <div className="motto">For food lovers, By food lovers</div>
                    </div>
                    <div className="search">
                        <div className="search_icon">
                            <input className="query" type="text" id="query" placeholder="What are you craving for?" />
                        </div>
                    </div>
                </div>

                <Flipper flipKey={this.state.isShowingDetails}>

                    <Flipped flipId="details">
                        {this.state.isShowingDetails && <Details details={this.state.foodDetails} />}
                    </Flipped>

                    <CardContainer>
                        {this.tmpDatas.map(data => {
                            return (
                                <Card key={Math.random()} name={data.name} details={data} showDetails={this.showDetails} />
                            )
                        })}
                    </CardContainer>
                </Flipper>
            </div>

        );
    }

    showDetails(id) {
        this.setState(state => {
            return {
                ...state,
                isShowingDetails: true,
                foodDetails: {
                    id: id
                }
            }
        });
    }
}

export default Home;