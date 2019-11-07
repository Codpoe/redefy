import React, { useState, useCallback } from 'react';
import { storiesOf } from '@storybook/react';
import Select from '../index';

const Demo1: React.FC = () => {
  const [value, setValue] = useState('');
  const changeValue = useCallback(
    (value: any) => {
      setValue(value);
    },
    [setValue]
  );

  return (
    <Select value={value} onChange={changeValue}>
      <Select.Option value="apple">Apple</Select.Option>
      <Select.Option value="smartisan">Smartisan</Select.Option>
      <Select.Option value="oneplus">OnePlus</Select.Option>
    </Select>
  );
};

storiesOf('Basic | Select', module).add('basic', () => <Demo1 />);
