:::import
```js
import Select from '../../src/select/';
```
:::

# Select 选择器

## 基础用法
:::demo
```js
constructor(props) {
    super(props);
    this.state = {
        selected: ''
    };
}

handleSelect = (selected) => {
    this.setState({ selected });
}

render() {
    const { selected } = this.state;
    return (
        <Select value={selected} onSelect={this.handleSelect} style={{ width: '100px' }}>
            <Select.Option value="beijing">北京</Select.Option>
            <Select.Option value="shanghai">上海</Select.Option>
            <Select.Option value="guangzhou">广州</Select.Option>
            <Select.Option value="shenzhen">深圳深圳深圳</Select.Option>
        </Select>
    )
}
```
:::

## 可清除 clearable

:::demo
```js
constructor(props) {
    super(props);
    this.state = {
        selected: ''
    };
}

handleSelect = (selected) => {
    this.setState({ selected });
}

render() {
    const { selected } = this.state;
    return (
        <Select
            value={selected}
            clearable
            onSelect={this.handleSelect}
            style={{ width: '100px' }}
        >
            <Select.Option value="beijing">北京</Select.Option>
            <Select.Option value="shanghai">上海</Select.Option>
            <Select.Option value="guangzhou">广州</Select.Option>
            <Select.Option value="shenzhen">深圳深圳深圳</Select.Option>
        </Select>
    )
}
```
:::

## 多选 multiple

:::demo
```js
constructor(props) {
    super(props);
    this.state = {
        selected: []
    };
}

handleSelect = (selected) => {
    this.setState({ selected });
}

render() {
    const { selected } = this.state;
    return (
        <Select
            value={selected}
            multiple
            onSelect={this.handleSelect}
            style={{ width: '200px' }}>
            <Select.Option value="beijing">北京</Select.Option>
            <Select.Option value="shanghai">上海</Select.Option>
            <Select.Option value="guangzhou">广州</Select.Option>
            <Select.Option value="shenzhen">深圳深圳深圳</Select.Option>
        </Select>
    )
}
```
:::
