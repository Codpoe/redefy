import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button, { ButtonGroup } from '../index';

storiesOf('Basic | Button', module)
  .add('基础用法', () => (
    <>
      <Button onClick={action('clicked')}>默认按钮</Button>{' '}
      <Button type="primary">主要按钮</Button>{' '}
      <Button type="success">成功按钮</Button>{' '}
      <Button type="warning">警告按钮</Button>{' '}
      <Button type="error">危险按钮</Button>
    </>
  ))
  .add('镂空 hollow', () => (
    <>
      <Button hollow>默认按钮</Button>{' '}
      <Button type="primary" hollow>
        边框按钮
      </Button>{' '}
      <Button type="success" hollow>
        边框按钮
      </Button>{' '}
      <Button type="warning" hollow>
        边框按钮
      </Button>{' '}
      <Button type="error" hollow>
        边框按钮
      </Button>
    </>
  ))
  .add('文字 text', () => (
    <>
      <Button text>默认按钮</Button>{' '}
      <Button type="primary" text>
        文字按钮
      </Button>{' '}
      <Button type="success" text>
        文字按钮
      </Button>{' '}
      <Button type="warning" text>
        文字按钮
      </Button>{' '}
      <Button type="error" text>
        文字按钮
      </Button>
    </>
  ))
  .add('两边圆形 round', () => (
    <>
      <Button round>圆形按钮</Button>{' '}
      <Button type="primary" hollow round>
        圆形按钮
      </Button>
    </>
  ))
  .add('全圆形 fullRound', () => (
    <>
      <Button fullRound size="large">
        <i className="icon icon-search"></i>
      </Button>{' '}
      <Button fullRound hollow type="primary">
        <i className="icon icon-search"></i>
      </Button>{' '}
      <Button fullRound type="primary" size="small">
        <i className="icon icon-search"></i>
      </Button>
    </>
  ))
  .add('带图标', () => (
    <>
      <Button>
        <i className="icon icon-upload"></i>&nbsp;上传
      </Button>{' '}
      <Button hollow type="primary">
        <i className="icon icon-download"></i>&nbsp;下载
      </Button>
    </>
  ))
  .add('尺寸 size', () => (
    <>
      <Button size="large">大型按钮</Button>{' '}
      <Button size="normal">普通按钮</Button>{' '}
      <Button size="small">小型按钮</Button>
    </>
  ))
  .add('无 padding 纯净', () => (
    <>
      <Button pure>默认按钮</Button>{' '}
      <Button type="primary" pure>
        纯净按钮
      </Button>{' '}
      <Button type="success" pure>
        纯净按钮
      </Button>{' '}
      <Button type="warning" pure>
        纯净按钮
      </Button>{' '}
      <Button type="error" pure>
        纯净按钮
      </Button>
    </>
  ))
  .add('禁用 disabled', () => (
    <>
      <Button disabled>禁用按钮</Button>{' '}
      <Button type="primary" disabled>
        禁用按钮
      </Button>{' '}
      <Button hollow type="error" disabled>
        禁用按钮
      </Button>{' '}
      <Button text disabled>
        禁用按钮
      </Button>
    </>
  ))
  .add('链接', () => (
    <Button href="http://t.tt" target="_blank" type="primary">
      链接按钮
    </Button>
  ))
  .add('块级按钮 block', () => <Button block>块级按钮</Button>)
  .add('组合', () => (
    <>
      <ButtonGroup>
        <Button>过去</Button>
        <Button>现在</Button>
        <Button>未来</Button>
      </ButtonGroup>{' '}
      <ButtonGroup type="primary" hollow>
        <Button>过去</Button>
        <Button>现在</Button>
        <Button>未来</Button>
      </ButtonGroup>
    </>
  ));
