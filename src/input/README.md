:::import
```js
import Input from '../../src/input/';
import Button from '../../src/button/';
```
:::

# Input 输入框
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
        <div style={{ width: '200px' }}>
            <Input
                value={inputValue}
                placeholder="输入提示"
                onChange={this.handleChange}
            />
            <br /><br />
            <Input
                type="password"
                value={inputValue}
                placeholder="密码"
                onChange={this.handleChange}
            />
        </div>
    )
}
```
:::

## 两边圆形

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
        <div style={{ width: '200px' }}>
            <Input
                value={inputValue}
                placeholder="输入提示"
                round
                onChange={this.handleChange}
            />
        </div>
    )
}
```
:::


## 禁用状态

:::demo
```js
constructor(props) {
    super(props);
    this.state = {
        inputValue: '内容'
    };
}

handleChange = (inputValue) => {
    this.setState({ inputValue });
}

render() {
    const { inputValue } = this.state;
    return (
        <div style={{ width: '200px' }}>
            <Input
                value={inputValue}
                placeholder="输入提示"
                disabled
                onChange={this.handleChange}
            />
        </div>
    )
}
```
:::

## 尺寸

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
        <div style={{ width: '200px' }}>
            <Input
                value={inputValue}
                placeholder="输入提示"
                size="large"
                onChange={this.handleChange}
            />
            <br /><br />
            <Input
                value={inputValue}
                placeholder="输入提示"
                onChange={this.handleChange}
            />
            <br /><br />
            <Input
                value={inputValue}
                placeholder="输入提示"
                size="small"
                onChange={this.handleChange}
            />
        </div>
    )
}
```
:::

## prefix & suffix

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
        <div style={{ width: '200px' }}>
            <Input
                value={inputValue}
                placeholder="输入提示"
                prefix="http://"
                onChange={this.handleChange}
            />
            <br /><br />
            <Input
                value={inputValue}
                placeholder="输入提示"
                suffix=".com"
                onChange={this.handleChange}
            />
            <br /><br />
            <Input
                value={inputValue}
                placeholder="输入提示"
                suffix={<i className="icon icon-search"></i>}
                onSuffixClick={() => { console.log('suffix clicked') }}
                onChange={this.handleChange}
            />
            <br /><br />
            <Input
                value={inputValue}
                placeholder="输入提示"
                suffix={<Button text size="small" type="primary">搜索</Button>}
                noPadding
                onChange={this.handleChange}
            />
        </div>
    )
}
```
:::

## 多行输入 textarea

### 基础用法
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
        <div style={{ width: '200px' }}>
            <Input
                type="textarea"
                value={inputValue}
                placeholder="输入提示"                
                onChange={this.handleChange}
            />
        </div>
    )
}
```
:::

### minRows & maxRows
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
        <div style={{ width: '200px' }}>
            <Input
                type="textarea"
                autoResize={{ minRows: 2, maxRows: 4 }}
                value={inputValue}
                placeholder="输入提示"                
                onChange={this.handleChange}
            />
        </div>
    )
}
```
:::

### 禁止自适应
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
        <div style={{ width: '200px' }}>
            <Input
                type="textarea"
                autoResize={false}
                value={inputValue}
                placeholder="输入提示"                
                onChange={this.handleChange}
            />
        </div>
    )
}
```
:::
