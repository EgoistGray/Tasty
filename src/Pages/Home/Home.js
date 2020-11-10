import React from 'react';
import '../Root/page.css';
import './Home.css';
import '../../Components/Card/Card';
import './CardContainer/CardContainer';
import CardContainer from './CardContainer/CardContainer';
import Details from '../Details/Details';
import { Flipped, Flipper } from 'react-flip-toolkit';
import MealDB from '../../Components/Database/MealDBInterfacer';

class Home extends React.Component {

    constructor(props) {
        super();
        this.quantityPerBatch = 16;
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
        this.initializeDatas = this.getRandomDatas.bind(this);
        this.scrollLoader = this.scrollLoader.bind(this);
        this.onChange = this.onChange.bind(this);
        this.startAnim = this.startAnim.bind(this);
        this.resetDatas = this.resetDatas.bind(this);

        props.history.replace(props.location.pathname, this.state);

        if (props.match?.params?.foodId) {
            console.log("UPDATING STUFF");
            //Here setup state to open details
            this.setState({
                isShowingDetails: true,
                foodDetails: {
                    id: props.match.params.foodId
                },
                displayedDatas: [],
                isLoading: true,
                enterAnim: false
            });
        };

        this.db = new MealDB();
        this.loadData = false;
        this.onSeach = false;
    }

    resetDatas() {
        this.setState(_prev => {
            return {
                ..._prev,
                displayedDatas: []
            }
        })
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollLoader);   
    }

    componentDidMount() {
        window.addEventListener('scroll', this.scrollLoader);        
        this.getRandomDatas();
        setTimeout(this.startAnim, 100)
    }

    scrollLoader(evt) {
        let scrollProgress = window.scrollY + window.innerHeight;
        let total = document.body.scrollHeight;

        if (scrollProgress >= total - 500 && !this.loadData && !this.onSeach) {
            this.loadData = true;
            this.getRandomDatas();
        }
        
    }



    getRandomDatas() {
        this.db.getRandoms(this.quantityPerBatch).then(result => {
            result = result.flat();

            this.setState(_prev => {
                return {
                    ..._prev,
                    isLoading: false,
                    displayedDatas: [...this.state.displayedDatas ,...result]
                }
            });

            this.loadData = false;
        }).catch(err => {

        });

    }

    startAnim() {
        this.setState(_prev => {
            return {
                ..._prev,
                enterAnim: true
            }
        })
    }
    render() {
        return (
            <div className="home page" onScroll={this.scrollLoader}>
                <Flipper flipKey={this.state.enterAnim}>
                    <Flipped staggerConfig={{ title: { reverse: true } }}>
                        <div className="search_component">
                                <div className={`title`}>
                                    <Flipped flipId="tastySearch" stagger="start">
                                        <div className={`brand ${this.state.enterAnim ? "" : "hidden-title"}`}>Tasty</div>
                                    </Flipped>
                                    <Flipped flipId="tastyMotto" stagger="start">
                                        <div className={`motto ${this.state.enterAnim ? "" : "hidden-title"}`}>For food lovers, By food lovers</div>
                                    </Flipped>
                                </div>
                            <Flipped flipId="searchBar" stagger="start"> 
                                <div className={`search ${this.state.enterAnim ? "" : "hidden-title"}`}>
                                    <div className="search_icon">
                                        <input onChange={this.onChange} className="query" type="text" id="query" placeholder="What are you craving for?" />
                                    </div>
                                </div>
                            </Flipped>   
                        </div>
                    </Flipped>
                </Flipper>

                <Flipper flipKey={this.state.isShowingDetails}> 
                    <Flipped flipId="foodDesc">
                        {!this.state.isShowingDetails && <div className={`interpolator ${this.state.isShowingDetails ? "interpolator-visible" : ""}`} />}
                    </Flipped>
                    <Flipped flipId="details"> 
                        {this.state.isShowingDetails && <Details hideDetails={this.hideDetails } parentState={this.state} foodDetails={this.state.foodDetails}/>}
                    </Flipped>

                    <CardContainer resetDatas={this.resetDatas} toggleLoadUI={this.toggleLoadUI} parentState={this.state} showDetails={this.showDetails} />
                </Flipper>
            </div>

        );
    }

    onChange(evt) {
        let query = evt.target.value;
        if (query === "" || query.length <= 0) this.onSeach = false;
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
                displayedDatas: this.state.displayedDatas,
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