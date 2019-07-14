import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button, { ButtonGroup } from '../index';
import { Search, Upload, Download } from '../../icon/index';

storiesOf('Basic | Button', module)
  .add('基础用法', () => (
    <>
      <Button onClick={action('clicked')}>Default</Button>{' '}
      <Button type="primary">Primary</Button>{' '}
      <Button type="success">Success</Button>{' '}
      <Button type="warning">Warning</Button>{' '}
      <Button type="error">Error</Button>
    </>
  ))
  .add('镂空 hollow', () => (
    <>
      <Button hollow>Hollow</Button>{' '}
      <Button type="primary" hollow>
        Hollow
      </Button>{' '}
      <Button type="success" hollow>
        Hollow
      </Button>{' '}
      <Button type="warning" hollow>
        Hollow
      </Button>{' '}
      <Button type="error" hollow>
        Hollow
      </Button>
    </>
  ))
  .add('文字 text', () => (
    <>
      <Button text>Text</Button>{' '}
      <Button type="primary" text>
        Text
      </Button>{' '}
      <Button type="success" text>
        Text
      </Button>{' '}
      <Button type="warning" text>
        Text
      </Button>{' '}
      <Button type="error" text>
        Text
      </Button>
    </>
  ))
  .add('两边圆形 round', () => (
    <>
      <Button round>Round</Button>{' '}
      <Button type="primary" hollow round>
        Round
      </Button>
    </>
  ))
  .add('全圆形 fullRound', () => (
    <>
      <Button fullRound size="large">
        <Search />
      </Button>{' '}
      <Button fullRound hollow type="primary">
        <Search />
      </Button>{' '}
      <Button fullRound type="primary" size="small">
        <Search />
      </Button>
    </>
  ))
  .add('带图标', () => (
    <>
      <Button>
        <Upload />
        &nbsp;Upload
      </Button>{' '}
      <Button hollow type="primary">
        <Download />
        &nbsp;Download
      </Button>
    </>
  ))
  .add('尺寸 size', () => (
    <>
      <Button size="large">Large</Button> <Button size="normal">Normal</Button>{' '}
      <Button size="small">Small</Button>
    </>
  ))
  .add('无 padding 纯净', () => (
    <>
      <Button pure>Pure</Button>{' '}
      <Button type="primary" pure>
        Pure
      </Button>{' '}
      <Button type="success" pure>
        Pure
      </Button>{' '}
      <Button type="warning" pure>
        Pure
      </Button>{' '}
      <Button type="error" pure>
        Pure
      </Button>
    </>
  ))
  .add('禁用 disabled', () => (
    <>
      <Button disabled>Disabled</Button>{' '}
      <Button type="primary" disabled>
        Disabled
      </Button>{' '}
      <Button hollow type="error" disabled>
        Disabled
      </Button>{' '}
      <Button text disabled>
        Disabled
      </Button>
    </>
  ))
  .add('链接', () => (
    <Button href="http://t.tt" target="_blank" type="primary">
      Smartisan
    </Button>
  ))
  .add('块级按钮 block', () => <Button block>块级按钮</Button>)
  .add('组合', () => (
    <>
      <ButtonGroup>
        <Button>Past</Button>
        <Button>Present</Button>
        <Button>Future</Button>
      </ButtonGroup>{' '}
      <ButtonGroup type="primary" hollow>
        <Button>Past</Button>
        <Button>Present</Button>
        <Button>Future</Button>
      </ButtonGroup>
    </>
  ));
