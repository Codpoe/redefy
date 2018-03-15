import React from 'react';

import Switch from '../../src/switch/';

export default class SwitchDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            switched: false
        };
        
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange({ checked }) {
        this.setState({
            switched: checked
        });
    }

    render() {
        const {
            switched
        } = this.state;

        return (
            <div>
                <h1>Switch</h1>
                <br />
                <Switch checked={switched} onChange={this.handleChange} />&nbsp;&nbsp;
                <Switch checked={switched} disabled onChange={this.handleChange} />
                <br /><br />
            </div >
        )
    }
}