import React from 'react';

import Input from '../../src/input/';
import Button from '../../src/button/';

export default class InputDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            test: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange({ value }, ev) {
        this.setState({
            [ev.target.name]: value
        });
    }

    render() {
        const {
            username,
            password,
            test
        } = this.state;

        return (
            <div>
                <h1>Input</h1>
                <br />
                <Input
                    name="username" 
                    value={username}
                    placeholder="请输入用户名"
                    onChange={this.handleChange}
                />&nbsp;
                <Input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="请输入密码"
                    onChange={this.handleChange}
                    round
                />
                <br /><br />
                <h3>size</h3>
                <br />
                <Input
                    name="test"
                    value={test}
                    placeholder="请输入内容"
                    size="large"
                    onChange={this.handleChange}
                />&nbsp;
                <Input
                    name="test"
                    value={test}
                    placeholder="请输入内容"
                    size="small"
                    onChange={this.handleChange}
                />
                <br /><br />
                <h3>prefix & suffix</h3>
                <br />
                <Input
                    name="test"
                    value={test}
                    placeholder="请输入内容"
                    prefix="广州市"
                    suffix="暨南大学"
                    onChange={this.handleChange}
                />
                <br /><br />
                <h3>outline & round</h3>
                <br />
                <Input    
                    name="test"
                    value={test}
                    placeholder="请输入内容"
                    onChange={this.handleChange}
                    outline
                />&nbsp;
                <Input
                    name="test"
                    value={test}
                    placeholder="请输入内容"
                    onChange={this.handleChange}
                    outline
                    round
                />
                <br /><br />
                <Input
                    name="test"
                    value={test}
                    placeholder="请输入内容"
                    onChange={this.handleChange}
                    size="large"
                    outline
                    round
                />&nbsp;
                <Input
                    name="test"
                    value={test}
                    placeholder="请输入内容"
                    onChange={this.handleChange}
                    size="small"
                    outline
                    round
                />
                <br /><br />
                <Input
                    name="test"
                    value={test}
                    placeholder="请输入内容"
                    prefix="广州市"
                    suffix="暨南大学"
                    onChange={this.handleChange}
                    outline
                />
                <br /><br />
                <Input
                    name="test"
                    value={test}
                    placeholder="请输入内容"
                    outline
                    prefix={<i className="icon-date"></i>}
                    onChange={this.handleChange}
                />&nbsp;
                <Input
                    name="test"
                    value={test}
                    placeholder="请输入内容"
                    outline
                    suffix={<Button flat type="primary" size="small">获取验证码</Button>}
                    onChange={this.handleChange}
                />
                <br /><br />
                <h3>disabled</h3>
                <br />
                <Input
                    name="test"
                    value={test}
                    placeholder="请输入内容"
                    outline
                    disabled
                    onChange={this.handleChange}
                />
                <br /><br />
                <h3>type={'"textarea"'}</h3>
                <br />
                <h5>autoResize (默认为 true)</h5>
                <br />
                <Input
                    type="textarea"
                    name="test"
                    value={test}
                    placeholder="自适应..."
                    onChange={this.handleChange}
                />
                <br /><br />
                <h5>autoResize={'{{ minRows: 2, maxRows: 4 }}'}</h5>
                <br />
                <Input
                    type="textarea"
                    autoResize={{ minRows: 2, maxRows: 4 }}
                    name="test"
                    value={test}
                    placeholder="最小 2 行，最大 4 行..."
                    onChange={this.handleChange}
                />
                <br /><br />
                <h5>autoResize={'false'}</h5>
                <br />
                <Input
                    type="textarea"
                    autoResize={false}
                    name="test"
                    value={test}
                    placeholder="手动适应"
                    onChange={this.handleChange}
                />
                <br /><br />
            </div>
        )
    }
}