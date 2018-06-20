# InputNumber

## 基础用法

:::demo
```js
constructor(props) {
    super(props);
    this.state = {
        inputValue: ''
    };
}

handleChange = (inputValue) => {
    this.setState({ inputValue });
}

render() {
    const { inputValue } = this.state;
    return (
        <div style={{ width: '100px' }}>
            <InputNumber
                value={inputValue}
                placeholder="输入提示"
                onChange={this.handleChange}
            />
        </div>
    )
}
```
:::

## 最小值 / 最大值

:::demo
```js
constructor(props) {
    super(props);
    this.state = {
        inputValue: 5
    };
}

handleChange = (inputValue) => {
    this.setState({ inputValue });
}

render() {
    const { inputValue } = this.state;
    return (
        <div style={{ width: '100px' }}>
            <InputNumber
                value={inputValue}
                placeholder="输入提示"
                min={1}
                max={10}
                onChange={this.handleChange}
            />
        </div>
    )
}
```
:::

## 每次递增 / 递减的数目

:::demo
```js
constructor(props) {
    super(props);
    this.state = {
        inputValue: 1
    };
}

handleChange = (inputValue) => {
    this.setState({ inputValue });
}

render() {
    const { inputValue } = this.state;
    return (
        <div style={{ width: '100px' }}>
            <InputNumber
                value={inputValue}
                placeholder="输入提示"
                min={1}
                max={10}
                step={1.5}
                onChange={this.handleChange}
            />
        </div>
    )
}
```
:::
