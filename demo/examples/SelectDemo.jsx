import React from 'react';

import Select from '../../src/select/';

export default class SelectDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect({ value, label }) {
        this.setState({
            value: value
        });
        console.log(`selected value: ${value}\nselected label: ${label}`);
    }

    render() {
        const {
            value
        } = this.state;

        return (
            <div>
                <h1>Select</h1>
                <br />
                <Select value={value} onSelect={this.handleSelect} outline>
                    <Select.Option value="apple" label="苹果">苹果</Select.Option>
                    <Select.Option value="banana" label="香蕉">香蕉</Select.Option>
                    <Select.Option value="chips" label="薯条">薯条</Select.Option>
                </Select>
                <br /><br />
            </div>
        )
    }
}