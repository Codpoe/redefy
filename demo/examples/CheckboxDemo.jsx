import React from 'react';

import Checkbox from '../../src/checkbox/';

export default class CheckboxDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            checkedList: ['苹果', '香蕉']
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleGroupChange = this.handleGroupChange.bind(this);
    }

    handleChange({ checked }) {
        this.setState({
            checked
        });
    }

    handleGroupChange({ value }) {
        this.setState({
            checkedList: value
        });
    }

    render() {
        const {
            checked,
            checkedList
        } = this.state;

        return (
            <div>
                <h1>Checkbox</h1>
                <br />
                <Checkbox checked={checked} onChange={this.handleChange}>记住密码</Checkbox>
                <br /><br />
                <Checkbox.Group value={checkedList} onChange={this.handleGroupChange}>
                    <Checkbox value={['苹果', '香蕉', '薯条']}>全选</Checkbox>    
                    <Checkbox value="苹果">苹果</Checkbox>
                    <Checkbox value="香蕉">香蕉</Checkbox>
                    <Checkbox value="薯条">薯条</Checkbox>
                </Checkbox.Group>
                <br /><br />
                <Checkbox checked={checked} onChange={this.handleChange} disabled>禁用状态</Checkbox>
                <br /><br />
            </div>
        )
    }
}