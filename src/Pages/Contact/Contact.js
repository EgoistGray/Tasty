import React, { Component } from 'react'
import '../Root/page.css';
import './Contact.css';
import { Flipped, Flipper } from 'react-flip-toolkit';
export default class Contact extends Component {
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
        this.setState({ animate: true, animate2: false });
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
                    <div className="contact page">
                        <Flipped flipId={`ContactTitle`} stagger="title" onComplete={this.startAnimation2}>
                            <div className={`contact-title ${this.state.animate ? "" : "hidden-item"}`}>Contact us</div>
                        </Flipped>

                        <Flipped flipId={`ContactContent`} stagger="title" >
                            <div className={`contact-content-container ${this.state.animate ? "" : "hidden-item"}`}>
                                <div className="contact-content">Hi there! If you'd like to give us feedback or report a bud</div>
                                <div className="contact-content">We'll be happy to comply, you can reach us by email from: </div>
                                <div className="contact-content link-email">@egoistgray@gmail.com</div>
                            </div>
                        </Flipped>

                    </div>
                </Flipped>
            </Flipper>

        )
    }
}
