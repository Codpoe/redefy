import React, { useState, useCallback } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Select, { SelectProps } from '../index';

const data: SelectProps['data'] = [
  { value: 'apple', label: 'Apple' },
  { value: 'smartisan', label: 'Smartisan', text: 'ByteDance' },
  { value: 'oneplus', label: 'OnePlus' },
];

const Demo1: React.FC = () => {
  return (
    <Select data={data} defaultValue="smartisan" onChange={action('change')} />
  );
};

const Demo2: React.FC = () => {
  const [value, setValue] = useState('');
  const changeValue = useCallback(
    (value: any) => {
      setValue(value);
    },
    [setValue]
  );

  return <Select data={data} value={value} onChange={changeValue} />;
};

storiesOf('Basic | Select', module)
  .add('basic', () => <Demo1 />)
  .add('controlled', () => <Demo2 />);
