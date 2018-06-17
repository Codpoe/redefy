# Checkbox 多选框

## 基础用法
:::demo
```js
constructor(props) {
    super(props);
    this.state = {
        checked: false
    }
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
            <Checkbox checked={checked} onChange={this.handleChange}>苹果</Checkbox>  
            <div>{checked.toString()}</div>
        </div>
    );
}
```
:::

## 禁用状态 disabled

:::demo
```js
render() {
    return (
        <div>
            <Checkbox checked={false} disabled>苹果</Checkbox>
            <Checkbox checked disabled>小米</Checkbox>
        </div>
    );
}
```
:::

## Checkbox Group

:::demo
```js
constructor(props) {
    super(props);
    this.state = {
        checkedList: []
    };
}

handleChange = (checkedList) => {
    this.setState({
        checkedList
    });
}

render() {
    const { checkedList } = this.state;
    return (
        <div>
            <Checkbox.Group value={checkedList} onChange={this.handleChange}>
                <Checkbox value="苹果">苹果</Checkbox>
                <Checkbox value="小米">小米</Checkbox>
                <Checkbox value="锤子">锤子</Checkbox>
            </Checkbox.Group>
            <div>{`[${checkedList.toString()}]`}</div>
        </div>
    );
}
```
:::
