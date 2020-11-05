import React from 'react';
import './Navbar.css';

class NavSplitter extends React.Component {
    render() {
        return (
            <div className="nav_splitter">
                {this.props.children}
            </div>
        );
    }
}

export default NavSplitter;