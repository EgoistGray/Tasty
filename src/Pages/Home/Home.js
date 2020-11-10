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
        this.quantityPerBatch = 12;
        this.state = props.location.state || {
            isShowingDetails: false,
            foodDetails: {},
            isLoading: true,
            searchQuery: "",
            displayedDatas: [],
        };

        //Implementing rerouting details here

        this.showDetails = this.showDetails.bind(this);
        this.hideDetails = this.hideDetails.bind(this);
        this.initializeDatas = this.getRandomDatas.bind(this);
        this.scrollLoader = this.scrollLoader.bind(this);
        this.onChange = this.onChange.bind(this);
        this.startAnim = this.startAnim.bind(this);
        this.resetDatas = this.resetDatas.bind(this);
        this.commitState = this.commitState.bind(this);
        this.updateState = this.updateState.bind(this);

        this.commitState(props.location.pathname, this.state);

        if (props.match?.params?.foodId) {
            //Here setup state to open details
            this.setState({
                isShowingDetails: true,
                foodDetails: {
                    id: props.match.params.foodId
                },
                displayedDatas: [],
                isLoading: true,
                enterAnim: false,
                onBottomPage: false

            });
        };

        //Temporary State
        this.loadData = false;
        this.onSearch = false;
        this.db = new MealDB();
    }

    commitState(path, state, props) {
        if (props) { props.history.replace(path, state); return; };
        this.props?.history.replace(path, state);
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
        if( this.state.displayedDatas.length <= 0 ) this.getRandomDatas();
        setTimeout(() => {
            this.startAnim();
            this.updateState("onBottomPage", true);
        }, 100);

    }

    scrollLoader(evt) {
        let scrollProgress = window.scrollY + window.innerHeight;
        let total = document.body.scrollHeight;

        if (scrollProgress >= total - 500 && !this.loadData && !this.onSearch) {
            this.loadData = true;
            this.getRandomDatas();
        }

        //Page Bottom
        if (scrollProgress >= (total - 100)) {
            this.updateState("onBottomPage", true);
        }
        if (scrollProgress <= (total - 100)) {
            this.updateState("onBottomPage", false);
        }
        
    }

    updateState(stateName, stateValue) {
        this.setState(_prev => {
            return {
                ..._prev,
                [stateName] : stateValue
            }
        })
    }


    getRandomDatas() {
        this.db.getRandoms(this.quantityPerBatch).then(result => {
            result = result.flat();

            let unsanitized_data = [...this.state.displayedDatas, ...result];
            let sanitized = MealDB.sanitizeDatasets(unsanitized_data);

            this.setState(_prev => {
                return {
                    ..._prev,
                    isLoading: false,
                    displayedDatas: sanitized
                }
            }, () => {
                    this.commitState(this.props.location.pathname, this.state);
                    unsanitized_data = undefined;
                    sanitized = undefined;
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

                    <div className={`contentLoaderContainer ${this.state.onBottomPage && !this.onSearch || this.state.isLoading ? "showLoader" :"hideLoader"}`}>
                        <div className="loader">
                            Getting datas ready
                        </div>
                    </div>
            </div>

        );
    }

    onChange(evt) {
        let query = evt.target.value;
        if (query === "" || query.length <= 0) {
            this.onSearch = false;
        } else {
            this.onSearch = true;
        };
        this.db.search(query).then((json) => {
            let datas = json.meals;

            if (datas === null || datas.length < 0) datas = []; 

            this.setState(_prev => {
                return {
                    ..._prev,
                    displayedDatas: datas
                }
            });

            this.commitState(this.props.location.pathname, this.state); 
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
                state: {
                    ...this.state,
                    isShowingDetails: true,
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
                        ...this.state,
                        isShowingDetails: false,
                        foodDetails: {},
                        isLoading: false,
                        displayedDatas: this.state.displayedDatas,
                    },
                }
        );
        return;
    }
}

export default Home;