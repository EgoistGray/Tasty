import React, { Component } from 'react'
import './Load.css';

export default class Loader extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }

    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
        
    }

    render() {
        return (
                <div className="loadingContainer">
                    <div className="loading">
                        Fetching Datas...
                    </div>
                </div>
        )
    }
}
