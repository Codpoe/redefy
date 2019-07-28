import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Checkbox from '../index';

storiesOf('Basic | Checkbox', module)
  .add('basic', () => (
    <Checkbox checked onChange={action('change')}>
      Apple
    </Checkbox>
  ))
  .add('group', () => (
    <Checkbox.Group defaultValue={['apple', 'oneplus']}>
      <Checkbox value={['apple', 'smartisan', 'oneplus']}>All</Checkbox>
      <Checkbox value="apple">Apple</Checkbox>
      <Checkbox value="smartisan">Smartisan</Checkbox>
      <Checkbox value="oneplus">OnePlus</Checkbox>
    </Checkbox.Group>
  ))
  .add('disabled', () => (
    <>
      <Checkbox value="apple" disabled>
        Apple
      </Checkbox>
      <br />
      <Checkbox.Group defaultValue={['apple', 'oneplus']} disabled>
        <Checkbox value={['apple', 'smartisan', 'oneplus']}>All</Checkbox>
        <Checkbox value="apple">Apple</Checkbox>
        <Checkbox value="smartisan">Smartisan</Checkbox>
        <Checkbox value="oneplus">OnePlus</Checkbox>
      </Checkbox.Group>
    </>
  ));
