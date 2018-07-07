:::import
```js
import Switch from '../../src/switch/';
```
:::

# Switch 开关
开关用于表示两种状态之间的切换，跟单独使用的`checkbox`有点类似，但`switch`开关更多的是触发即可改变状态，而`checkbox`更多的是用于表格，一般都需要配合表单的提交操作。

## 基础用法
:::demo
```jsx
constructor(props) {
    super(props);
    this.state = {
        checked: false
    };
}

handleChange = (checked) => {
    this.setState({
        checked
    });
}

render() {
    const { checked } = this.state;
    return (
        <div>
            <Switch
                checked={checked}
                onChange={this.handleChange}
            />
            {String(checked)}
        </div>
    );
}
```
:::

## 禁用状态
:::demo
```jsx
render() {
    return ( <Switch disabled /> );
}
```
:::
