import React from 'react';
import { storiesOf } from '@storybook/react';
import Switch from '../index';
import { Check, X } from '../../icon/index';

storiesOf('Basic | Switch', module)
  .add('basic', () => <Switch />)
  .add('children', () => (
    <>
      <Switch>{['是', '否']}</Switch>
      <Switch>
        <Check />
        <X />
      </Switch>
    </>
  ))
  .add('disabled', () => <Switch disabled />);
