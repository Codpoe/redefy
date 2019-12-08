import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Paginator from '../index';

storiesOf('Interaction | Paginator', module)
  .add('basic', () => (
    <>
      <Paginator total={3} defaultCurrent={1} />
      <br />
      <Paginator total={7} defaultCurrent={1} />
      <br />
      <Paginator total={8} defaultCurrent={1} />
      <br />
      <Paginator total={99} defaultCurrent={1} />
    </>
  ))
  .add('quickJump', () => (
    <Paginator
      total={99}
      defaultCurrent={1}
      quickJump
      onChange={action('change')}
    />
  ));
