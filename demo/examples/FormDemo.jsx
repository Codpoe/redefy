import React from 'react';

import Form from '../../src/form/';
import Input from '../../src/input/';
import Radio from '../../src/radio/';
import Checkbox from '../../src/checkbox/';
import Switch from '../../src/switch/';
import Button from '../../src/button/';
import Select from '../../src/select/';
import './css/form-demo.css';

const _style = {
    height: '32px'
};

export default class FormDemo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                username: '',
                desc: '',
                love: '',
                food: [],
                pay: '',
                discount: false
            },
            validators: {
                username: [
                    {required: true, message: '用户名不能为空', trigger: 'blur'}
                ],
                food: [
                    {required: true, message: '至少选择一种食物', trigger: 'change'}
                ],
                pay: [
                    {required: true, message: '请选择付款方式', trigger: 'change'}
                ]
            },
            labelPosition: 'left'
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.setFormRef = this.setFormRef.bind(this);
    }

    handleChange(propName, { value }, ev) {
        const { form } = this.state;
        this.setState({
            form: Object.assign(form, { [propName]: value })
        });
    }

    handleSubmit(ev) {
        ev.preventDefault();
        if (this.formRef.validate()) {
            console.log('validate pass');
        } else {
            console.log('validate fail');
        }
    }

    handleReset(ev) {
        this.setState({
            form: this.formRef.reset()
        });
    }

    setFormRef(el) {
        this.formRef = el;
    }

    render() {
        const {
            form,
            validators,
            labelPosition
        } = this.state;

        return (
            <div className="form-demo">
                <h1>Form</h1>
                <br />
                <Form ref={this.setFormRef} labelPosition={labelPosition} value={form} validators={validators}>
                    <Form.Item label="标题" propName="username">
                        <Input value={form.username} placeholder="请输入标题" onChange={this.handleChange.bind(this, 'username')}></Input>
                    </Form.Item>
                    <Form.Item label="简短描述" propName="desc">
                        <Input value={form.desc} placeholder="请简单描述" onChange={this.handleChange.bind(this, 'desc')}></Input>
                    </Form.Item>
                    <Form.Item label="喜爱" propName="love">
                        <Select value={form.love} onSelect={this.handleChange.bind(this, 'love')}>
                            <Select.Option value="live" label="生活">生活</Select.Option>
                            <Select.Option value="work" label="工作">工作</Select.Option>
                            <Select.Option value="code" label="写代码">写代码</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="食物" propName="food">
                        <Checkbox.Group value={form.food} onChange={this.handleChange.bind(this, 'food')}>
                            <Checkbox value="apple">苹果苹果苹果苹果</Checkbox>
                            <Checkbox value="banana">香蕉香蕉香蕉香蕉香蕉香蕉香蕉香蕉</Checkbox>
                            <Checkbox value="chips">薯条薯条薯条薯条薯条薯条薯条薯条薯条薯条薯条</Checkbox>
                        </Checkbox.Group>    
                    </Form.Item>
                    <Form.Item label="付款方式" propName="pay">
                        <Radio.Group value={form.pay} onChange={this.handleChange.bind(this, 'pay')}>
                            <Radio value="wechat">微信支付</Radio>
                            <Radio value="zhifubao">支付宝</Radio>
                            <Radio value="card">银行卡</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="付款方式" propName="discount">
                        <Switch checked={form.discount} onChange={this.handleChange.bind(this, 'discount')}></Switch>
                    </Form.Item>
                    <Form.Item label=" ">
                        <Button type="primary" text onClick={this.handleSubmit}>提交</Button>&nbsp;&nbsp;
                        <Button outline onClick={this.handleReset}>重置</Button>
                    </Form.Item>
                </Form>
                <br />
            </div>
        )
    }
}