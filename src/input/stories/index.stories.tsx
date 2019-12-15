import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Input from '../index';
import Button from '../../button/index';
import { IconSearch } from '../../icon/index';
import Pop from '../../pop/index';

storiesOf('Basic | Input', module)
  .add('basic', () => (
    <div style={{ width: '200px' }}>
      <Input placeholder="Input something..." />
    </div>
  ))
  .add('round', () => (
    <div style={{ width: '200px' }}>
      <Input placeholder="Input something..." round />
    </div>
  ))
  .add('size', () => (
    <div style={{ width: '200px' }}>
      <Input placeholder="Input something..." size="large" />
      <br />
      <Input placeholder="Input something..." size="normal" />
      <br />
      <Input placeholder="Input something..." size="small" />
    </div>
  ))
  .add('prefix & suffix', () => (
    <div style={{ width: '200px' }}>
      <Input placeholder="Input something..." prefix="https://" />
      <br />
      <Input placeholder="Input something..." suffix=".com" />
      <br />
      <Input
        placeholder="Input something..."
        onSuffixClick={action('click suffix')}
        suffix={
          <Button pure type="primary">
            Copy
          </Button>
        }
      />
      <br />
      <Input
        placeholder="Input something..."
        prefix={
          <Button pure type="primary">
            <IconSearch />
          </Button>
        }
      />
    </div>
  ))
  .add('disabled', () => (
    <div style={{ width: '200px' }}>
      <Input placeholder="Input something..." disabled />
    </div>
  ))
  .add('readOnly', () => (
    <div style={{ width: '200px' }}>
      <Input
        defaultValue="This is readonly"
        placeholder="Input something..."
        readOnly
      />
    </div>
  ))
  .add('with pop', () => (
    <div style={{ width: '200px' }}>
      <Pop trigger="focus" content="This is pop content" withArrow>
        <Input placeholder="Input something..." />
      </Pop>
    </div>
  ));
