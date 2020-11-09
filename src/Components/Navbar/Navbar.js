import React from 'react';
import './Navbar.css';
import NavItem from '../NavbarItem/NavItem';
import NavSplitter from './NavSplitter';

class Navbar extends React.Component {
    render() {
        return (
            <div className="navbar">
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
}

export default Navbar;