import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from '../index';


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
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));
