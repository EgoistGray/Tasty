import React from 'react';
import '../Root/page.css';
import './Home.css';

class Home extends React.Component {
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
            </div>
        );
    }
}

export default Home;