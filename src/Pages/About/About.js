import React, { Component } from 'react'
import '../Root/page.css';
import './About.css';
import { Flipped, Flipper } from 'react-flip-toolkit';
export default class About extends Component {
    constructor(props) {
        super(props)

        this.state = {
            animate: false,
            animate2: false,
        }

        this.startAnimation = this.startAnimation.bind(this);
        this.startAnimation2 = this.startAnimation2.bind(this);
    }

    componentDidMount() {
        setTimeout(this.startAnimation, 100);
    }


    startAnimation() {
        this.setState({ animate: true, animate2:false });
    }

    startAnimation2() {
        this.setState({ animate: true, animate2: true });
    }

    render() {
        return (
            <Flipper flipKey={this.state.animate}>
                <Flipped flipId="AboutPage" staggerConfig={{
                    title: {
                        reverse: true
                    },
                    devs: {
                        reverse: false,
                        speed: .9
                    }
                }}>
                    <div className="about page">
                        <Flipped flipId={`AboutTitle`} stagger="title" onComplete={this.startAnimation2}>
                            <div className={`about-title ${this.state.animate ? "" : "hidden-item"}`}>About us</div>
                        </Flipped>

                        <Flipped flipId={`AboutContent`} stagger="title" >
                            <div className={`about-content-container ${this.state.animate ? "" : "hidden-item"}`}>
                                <div className="about-content">Hi there! We're students from Xia Men University Malaysia, and this website is an assignment for Intro to Computer Science.</div>
                                <div className="about-content">The idea for this website is simple, a place for people to explore new foods and search for recipes.</div>
                                <div className="about-content">This project still have a lot of update coming, even after this website is graded</div>
                                <div className="about-content">We hope you like it!</div>
                            </div>
                        </Flipped>
                        <Flipped flipId="AboutDevs" stagger="title">
                                <div className={`about-developer ${this.state.animate ? "" : "hidden-item"}`}>The Devs
                                    <Flipped flipId="devnames-1" stagger="devs">
                                        <div className={`about-developer-name ${this.state.animate2 ? "" : "hidden-devs"}`}>William H</div>
                                    </Flipped>
                                    <Flipped flipId="devnames-2" stagger="devs">
                                        <div className={`about-developer-name ${this.state.animate2 ? "" : "hidden-devs"}`}>Venus</div>
                                    </Flipped>
                                    <Flipped flipId="devnames-3" stagger="devs">
                                        <div className={`about-developer-name ${this.state.animate2 ? "" : "hidden-devs"}`}>Sabine</div>
                                    </Flipped>
                                    <Flipped flipId="devnames-4" stagger="devs">
                                        <div className={`about-developer-name ${this.state.animate2 ? "" : "hidden-devs"}`}>Mohammed</div>
                                    </Flipped>
                                    <Flipped flipId="devnames-5" stagger="devs">
                                        <div className={`about-developer-name ${this.state.animate2 ? "" : "hidden-devs"}`}>Hao Qing</div>
                                    </Flipped>
                            </div>
                        </Flipped>
                            
                    </div>
                    </Flipped>
            </Flipper>
                
        )
    }
}
