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

        this.quantityPerBatch = 100;
        this.state = props.location.state || {
            isShowingDetails: false,
            foodDetails: {},
            isLoading: true,
            searchQuery: "",
            displayedDatas: []
        };

        //Implementing rerouting details here

        this.showDetails = this.showDetails.bind(this);
        this.hideDetails = this.hideDetails.bind(this);
        this.initializeDatas = this.initializeDatas.bind(this);
        this.scrollLoader = this.scrollLoader.bind(this);
        this.onChange = this.onChange.bind(this);

        props.history.replace(props.location.pathname, this.state);

        if (props.match?.params?.foodId) {
            console.log("UPDATING STUFF");
            //Here setup state to open details
            this.setState({
                isShowingDetails: true,
                foodDetails: {
                    id: props.match.params.foodId
                },
                isLoading: true,
            });
        };

        this.db = new MealDB();
        this.db.getRandoms(16);



    }

    componentDidMount() {
        window.addEventListener('scroll', () => {
            console.log("HELLO");
        });        
        this.initializeDatas();
    
    }

    scrollLoader(evt) {
        console.log("HELLO PLS OMG")
    }



    initializeDatas() {
        this.db.getRandoms(this.quantityPerBatch).then(result => {
            result = result.flat();

            this.setState(_prev => {
                return {
                    ..._prev,
                    isLoading: false,
                    displayedDatas: result
                }
            });
        }).catch(err => {

        });

    }

    render() {
        return (
            <div className="home page" onScroll={this.scrollLoader}>

                <div className="search_component">
                    <div className="title">
                        <div className="brand">Tasty</div>
                        <div className="motto">For food lovers, By food lovers</div>
                    </div>
                    <div className="search">
                        <div className="search_icon">
                            <input onChange={this.onChange} className="query" type="text" id="query" placeholder="What are you craving for?" />
                        </div>
                    </div>
                </div>

                <Flipper flipKey={this.state.isShowingDetails}> 
                    <Flipped flipId="foodDesc">
                        {!this.state.isShowingDetails && <div className={`interpolator ${this.state.isShowingDetails ? "interpolator-visible" : ""}`} />}
                    </Flipped>
                    <Flipped flipId="details"> 
                        {this.state.isShowingDetails && <Details hideDetails={this.hideDetails } parentState={this.state} foodDetails={this.state.foodDetails}/>}
                    </Flipped>

                    <CardContainer toggleLoadUI={this.toggleLoadUI} parentState={this.state} showDetails={this.showDetails} />
                </Flipper>
            </div>

        );
    }

    onChange(evt) {

        let query = evt.target.value;
        this.db.search(query).then((json) => {
            let datas = json.meals;

            if (datas === null || datas.length < 0) datas = []; 

            this.setState(_prev => {
                return {
                    ..._prev,
                    displayedDatas: datas
                }
            })
        });

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
                state: {isShowingDetails: true,
                foodDetails: {
                        id: id,
                        details: details
                    },
                datas: this.state.displayedDatas,
                isLoading: false
            }
        });
        return;
    }
    hideDetails() {
        this.props.history.push({
                pathname: `/`, 
                search: '',
                state: {
                    isShowingDetails: false,
                    foodDetails: {},
                    isLoading: false
                },
            }
        );
        return;
    }
}

export default Home;