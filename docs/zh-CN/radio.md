# Radio 单选框

## 基础用法

:::demo
```js
constructor(props) {
    super(props);
    this.state = {
        radioValue: ''
    }
}

handleChange = (radioValue) => {
    this.setState({
        radioValue
    });
}

render() {
    const { radioValue } = this.state;
    return (
        <div>
            <Radio.Group value={radioValue} onChange={this.handleChange}>
                <Radio value="苹果">苹果</Radio>
                <Radio value="小米">小米</Radio>
                <Radio value="锤子">锤子</Radio>
            </Radio.Group>
            <div>{radioValue}</div>
        </div>
    );
}
```
:::

## 禁用状态

:::demo
```js
constructor(props) {
    super(props);
    this.state = {
        radioValue: '苹果'
    }
}

handleChange = (radioValue) => {
    this.setState({
        radioValue
    });
}

render() {
    const { radioValue } = this.state;
    return (
        <div>
            <Radio.Group value={radioValue} disabled onChange={this.handleChange}>
                <Radio value="苹果">苹果</Radio>
                <Radio value="小米">小米</Radio>
            </Radio.Group>
            <div>{radioValue}</div>
        </div>
    );
}
```
:::
