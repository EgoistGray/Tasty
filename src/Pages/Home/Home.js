import React from 'react';
import '../Root/page.css';
import './Home.css';
import '../../Components/Card/Card';
import './CardContainer/CardContainer';
import CardContainer from './CardContainer/CardContainer';
import Card from '../../Components/Card/Card';
import Details from '../Details/Details';
import { Flipped, Flipper } from 'react-flip-toolkit';
import MealDB from '../../Components/Database/MealDBInterfacer';

class Home extends React.Component {

    constructor(props) {
        super();

        console.log(props.history);
        console.log('RUNNING CONSTRUCTOR');

        this.state = props.location.state || {
            isShowingDetails: false,
            foodDetails: {},
            isLoading: true
        };

        //Implementing rerouting details here


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
        }];


        let defaultPush = props.history.push;
        props.history.push = (args) => {
            console.log(args);
            if (args.state?.playExitAnim) {
                args.state.playExitAnim().then(() => {
                    delete args.state.playExitAnim;
                    defaultPush(args);
                })
            }

            defaultPush(args);
            return;
        }

        props.history.replace(props.location.pathname, this.state);

        if (props.match?.params?.foodId) {
            console.log("UPDATING STUFF");
            //Here setup state to open details
            this.setState({
                isShowingDetails: true,
                foodDetails: {
                    id: props.match.params.foodId
                }
            });
        };

        let db = new MealDB();
        db.getRandoms(16);
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
                    <Flipped flipId="foodDesc">
                        {!this.state.isShowingDetails && <div className={`interpolator ${this.state.isShowingDetails ? "interpolator-visible" : ""}`} />}
                    </Flipped>
                    <Flipped flipId="details">
                        {this.state.isShowingDetails && <Details parentState={this.state} foodDetails={this.state.foodDetails} />}
                    </Flipped>

                    <CardContainer parentState={this.state} showDetails={this.showDetails} />
                </Flipper>
            </div>

        );
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.location !== prevProps.location) {
            this.setState(this.props.location.state);
        }
    }

    showDetails(id, details) {
        this.props.history.push({
            pathname: `/details/${id}`,
            search: '',
            state: {
                isShowingDetails: true,
                foodDetails: {
                    id: id,
                    details: details
                }
            }
        });
        return;
    }
}

export default Home;