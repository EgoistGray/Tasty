import React from 'react';
import './Navbar.css';
import NavItem from '../NavbarItem/NavItem';
import NavSplitter from './NavSplitter';

class Navbar extends React.Component {
    constructor() {
        super();

        this.state = {
            opaqueTaskbar:false,
        }

        this.config = {
            opaqueOffset : -600
        }

        this.scrollOpaque = this.scrollOpaque.bind(this);

    }

    scrollOpaque(evt) {
        if (window.scrollY >= ( this.config.opaqueOffset  + window.innerHeight)) {
            this.setState(_prev => {
                return {
                    _prev,
                    opaqueTaskbar: true
                }
            })
        };
        if (window.scrollY <= ( this.config.opaqueOffset  + window.innerHeight)) {
            this.setState( _prev => {
                return {
                    _prev,
                    opaqueTaskbar: false
                }
            });
        }
    }

    render() {
        return (
            <div className={`navbar ${this.state.opaqueTaskbar ? "opaque" : "transparent"}`}>
                <NavSplitter>
                    <NavItem dest="/" name="Home" />
                    <NavItem dest="/about" name="About us" />
                </NavSplitter>

                {/* Not yet implementing account system */}
                {/* <NavSplitter>
                    <AccountItem dest="/account" name="Adam Smith" />
                </NavSplitter> */}
            </div>
        );
    }

    componentDidMount() {
        window.addEventListener('scroll', this.scrollOpaque);
    }
}

export default Navbar;