import React from 'react';
import { storiesOf } from '@storybook/react';
import Radio from '../index';

storiesOf('Basic | Radio', module)
  .add('basic', () => (
    <Radio.Group defaultValue="apple">
      <Radio value="apple">Apple</Radio>
      <Radio value="smartisan">Smartisan</Radio>
    </Radio.Group>
  ))
  .add('disabled', () => (
    <Radio.Group defaultValue="apple">
      <Radio value="apple">Apple</Radio>
      <Radio value="smartisan" disabled>
        Smartisan
      </Radio>
    </Radio.Group>
  ));
