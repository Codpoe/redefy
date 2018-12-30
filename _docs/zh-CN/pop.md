:::import
```js
import Pop from '../../src/pop/';
import Button from '../../src/button/';
```
:::

# Pop 弹弹弹

## 基础用法

:::demo
```jsx
render() {
    return (
        <Pop
            content={<span style={{ height: '100px', width: '200px' }}>content</span>}
            controlled={false}
        >
            <Button>弹左边</Button>
        </Pop>
    );
}
```
:::

## trigger 触发

:::demo
```jsx
render() {
    return (
        <Pop
            content={<span style={{ height: '100px', width: '200px' }}>content</span>}
            controlled={false}
            trigger="click"
        >
            <Button>点击弹</Button>
        </Pop>
    );
}
```
:::

## position 位置

:::demo
```js
render() {
    return (
        <Pop
            content={<span style={{ height: '100px', width: '200px' }}>content</span>}
            controlled={false}
            position="top-left"
        >
            <Button>弹上面</Button>
        </Pop>
    );
}
```
:::

## disabled 禁用
:::demo
```js
render() {
    return (
        <Pop
            content="123"
            controlled={false}
            disabled
        >
            <Button>禁用状态</Button>
        </Pop>
    );
}
```
:::

## controlled 受控组件
:::demo
```js
constructor(props) {
    super(props);
    this.state = {
        active: false
    };
}

handleChange = (active) => {
    this.setState({ active });
}

render() {
    const { active } = this.state;
    return (
        <Pop
            content="123"
            active={active}
            onChange={this.handleChange}
        >
            <Button>受控组件</Button>
        </Pop>
    );
}
```
:::
