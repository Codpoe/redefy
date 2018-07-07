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
    )
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
            <Button>弹左边</Button>
        </Pop>
    )
}
```
:::
