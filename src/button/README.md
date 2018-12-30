:::import
```js
import Button from './';
```
:::

# Button 按钮

按钮用于传递用户触摸时会触发的操作

## 基础用法
:::demo
```js
render() {
    return (
        <div>
            <Button>默认按钮</Button>{' '}
            <Button type="primary">主要按钮</Button>{' '}
            <Button type="success">成功按钮</Button>{' '}
            <Button type="warning">警告按钮</Button>{' '}
            <Button type="error">危险按钮</Button>
        </div>
    );
}

```
:::

## 镂空 hollow
:::demo
```js
render() {
    return (
        <div>
            <Button hollow>默认按钮</Button>{' '}
            <Button type="primary" hollow>边框按钮</Button>{' '}
            <Button type="success" hollow>边框按钮</Button>{' '}
            <Button type="warning" hollow>边框按钮</Button>{' '}
            <Button type="error" hollow>边框按钮</Button>
        </div>
    );
}
```
:::

## 文字 text
:::demo
```js
render() {
    return (
        <div>
            <Button text>默认按钮</Button>{' '}
            <Button type="primary" text>文字按钮</Button>{' '}
            <Button type="success" text>文字按钮</Button>{' '}
            <Button type="warning" text>文字按钮</Button>{' '}
            <Button type="error" text>文字按钮</Button>
        </div>
    );
}
```
:::

## 两边圆形 round
:::demo
```js
render() {
    return (
        <div>
            <Button round>圆形按钮</Button>{' '}
            <Button type="primary" hollow round>圆形按钮</Button>
        </div>
    );
}
```
:::

## 全圆形 circle
:::demo
```js
render() {
    return (
        <div>
            <Button circle size="large"><i className="icon icon-search"></i></Button>{' '}
            <Button circle hollow type="primary"><i className="icon icon-search"></i></Button>{' '}
            <Button circle type="primary" size="small"><i className="icon icon-search"></i></Button>
        </div>
    );
}
```
:::

## 带图标
:::demo
```js
render() {
    return (
        <div>
            <Button><i className="icon icon-upload"></i>&nbsp;上传</Button>{' '}
            <Button hollow type="primary"><i className="icon icon-download"></i>&nbsp;下载</Button>
        </div>
    );
}
```
:::

## 尺寸 size
:::demo
```js
render() {
    return (
        <div>
            <Button size="large">大型按钮</Button>{' '}
            <Button size="normal">普通按钮</Button>{' '}
            <Button size="small">小型按钮</Button>
        </div>
    );
}
```
:::

## 禁用 disabled
:::demo
```js
render() {
    return (
        <div>
            <Button disabled>禁用按钮</Button>{' '}
            <Button hollow disabled>禁用按钮</Button>{' '}
            <Button text disabled>禁用按钮</Button>
        </div>
    );
}
```
:::

## 链接
:::demo
```js
render() {
    return (
        <div>
            <Button href="http://t.tt" target="_blank" type="primary">链接按钮</Button>
        </div>
    );
}
```
:::

## 块级按钮
:::demo
```js
render() {
    return (
        <div>
            <Button block>块级按钮</Button>
        </div>
    );
}
```
:::

## 组合
:::demo
```js
render() {
    return (
        <div>
            <Button.Group>
                <Button>过去</Button>
                <Button>现在</Button>
                <Button>未来</Button>
            </Button.Group>
        </div>
    );
}
```
:::
