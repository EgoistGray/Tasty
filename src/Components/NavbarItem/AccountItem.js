import React from 'react';
import { Link } from 'react-router-dom';
import './navbarItem.css';

class AccountItem extends React.Component {
    render() {
        return (
            <div className="nav_item_account">
                <Link to={this.props.dest}>{this.props.name}</Link>
            </div>
        );
    }
}

export default AccountItem;