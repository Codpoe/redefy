import React from 'react';
import { storiesOf } from '@storybook/react';
import Switch from '../index';
import { CheckCircle, XCircle } from '../../icon/index';

storiesOf('Basic | Switch', module)
  .add('basic', () => <Switch />)
  .add('children', () => (
    <>
      <Switch>{['是', '否']}</Switch>
      <Switch>
        <CheckCircle />
        <XCircle />
      </Switch>
    </>
  ))
  .add('disabled', () => <Switch disabled />);
