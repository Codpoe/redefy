import React from 'react';

import Tooltip from '../../src/tooltip/';
import Input from '../../src/input/';

export default class TooltipDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            test: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange({ value }, ev) {
        this.setState({
            [ev.target.name]: value
        });
    }

    render() {
        const {
            test
        } = this.state;

        return (
            <div>
                <h1>Tooltip</h1>
                <br />
                <h3>trigger="hover"</h3>
                <br/>
                <Tooltip
                    content="上方提示文字"
                    position="top"
                >
                    上
                </Tooltip>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Tooltip
                    content="下方提示文字"
                    position="bottom"
                >
                    下
                </Tooltip>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Tooltip
                    content="左方提示文字"
                    position="left"
                >
                    左
                </Tooltip>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Tooltip
                    content="右方提示文字"
                    position="right"
                >
                    右
                </Tooltip>
                <br /><br />
                <h3>trigger="focus"</h3>
                <br/>
                <Tooltip
                    content="focus 带来的提示文字"
                    trigger="focus"
                >
                    <Input    
                        name="test"
                        value={test}
                        placeholder="请输入内容"
                        onChange={this.handleChange}
                        />
                </Tooltip>  
                <br/><br/>
            </div>
        )
    }
}