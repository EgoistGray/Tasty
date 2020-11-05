import React from 'react';
import { Link } from 'react-router-dom';
import './navbarItem.css';

class NavItem extends React.Component {
    render() {
        return (
            <div className="nav_item">
                <Link to={this.props.dest}>{this.props.name}</Link>
            </div>
        );
    }
}

export default NavItem;