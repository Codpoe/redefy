:::import
```js
import Tag from '../../src/tag/';
```
:::

# Tag 标签

## 基础用法

:::demo
```jsx
render() {
    return (
        <div>
            <Tag>标签一</Tag>{' '}
            <Tag type="primary">标签二</Tag>{' '}
            <Tag type="success">标签三</Tag>{' '}
            <Tag type="warning">标签四</Tag>{' '}
            <Tag type="error">标签五</Tag>
        </div>
    );
}
```
:::

## round 两边圆形

:::demo
```jsx
render() {
    return (
        <div>
            <Tag round>标签一</Tag>{' '}
            <Tag round type="primary">标签二</Tag>{' '}
            <Tag round type="success">标签三</Tag>{' '}
            <Tag round type="warning">标签四</Tag>{' '}
            <Tag round type="error">标签五</Tag>
        </div>
    );
}
```
:::

## color 颜色

:::demo
```jsx
render() {
    return (
        <div>
            <Tag color="#6ed4d2">#6ed4d2</Tag>
        </div>
    );
}
```
:::

## closable 可关闭

:::demo
```jsx
constructor(props) {
    super(props);
    this.state = { closed: false };
}
handleClose = () => {
    this.setState({ closed: true });
    setTimeout(() => {
        this.setState({ closed: false });
    }, 1000);
}

render() {
    return (
        <div>
            <Tag
                closable
                onClose={this.handleClose}
            >
                标签一
            </Tag>{' '}
            <Tag
                closable
                round
                onClose={this.handleClose}
                type="primary"
            >
                标签二
            </Tag>{' '}
            {String(this.state.closed)}
        </div>
    );
}
```
:::
