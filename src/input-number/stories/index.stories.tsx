import React from 'react';
import { storiesOf } from '@storybook/react';
import InputNumber from '../index';

storiesOf('Basic | InputNumber', module)
  .add('basic', () => <InputNumber defaultValue={18} />)
  .add('round', () => <InputNumber defaultValue={18} round />)
  .add('editable', () => <InputNumber defaultValue={18} editable={false} />)
  .add('readOnly', () => <InputNumber defaultValue={18} readOnly />)
  .add('disabled', () => <InputNumber defaultValue={18} disabled />)
  .add('step', () => <InputNumber defaultValue={18} step={0.1} />)
  .add('min & max', () => <InputNumber defaultValue={18} min={10} max={20} />);
