import React from 'react';
import './Navbar.css';
import NavItem from '../NavbarItem/NavItem';
import AccountItem from '../NavbarItem/AccountItem';
import NavSplitter from './NavSplitter';

class Navbar extends React.Component {
    render() {
        return (
            <div className="navbar">
                <NavSplitter>
                    <NavItem dest="/" name="Home" />
                    <NavItem dest="/feedback" name="Feedback" />
                    <NavItem dest="/about" name="About" />
                </NavSplitter>

                {/* Not yet implementing account system */}
                {/* <NavSplitter>
                    <AccountItem dest="/account" name="Adam Smith" />
                </NavSplitter> */}
            </div>
        );
    }
}

export default Navbar;