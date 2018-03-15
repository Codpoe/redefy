import React, { Component } from 'react';

import Radio from '../../src/radio/';
import Button from '../../src/button/';

export default class extends Component{
    constructor(props) {
        super(props);
        this.state = {
            radioValue: 'hangzhou',
            vertical: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange({ value }) {
        this.setState({
            radioValue: value
        });
    }

    handleClick(ev) {
        this.setState((prevState) => {
            return {
                vertical: !prevState.vertical
            };
        });
    }

    render() {
        const {
            radioValue,
            vertical
        } = this.state;

        return (
            <div>
                <h1>Radio</h1>
                <br />
                <Radio.Group value={radioValue} onChange={this.handleChange} vertical={vertical}>
                    <Radio value={`guangzhou`}>广州</Radio>
                    <Radio value={`shenzhen`}>深圳</Radio>
                    <Radio value={`hangzhou`} disabled>杭州</Radio>
                </Radio.Group>
                <br /><br />
                <Button type="primary" onClick={this.handleClick}>vertical: {vertical.toString()}</Button>
                <br /><br />
            </div>
        );
    }    
}