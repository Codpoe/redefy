import React, { useCallback, useState } from 'react';
import { storiesOf } from '@storybook/react';
import DatePicker from '../index';

const Demo1: React.FC = () => {
  const [value, changeValue] = useState('');
  const handleChange = useCallback(
    (date: any) => {
      console.log(date);
      changeValue(date);
    },
    [value, changeValue]
  );

  return <DatePicker value={value} onChange={handleChange} />;
};

storiesOf('DatePicker', module).add('basic', () => <Demo1 />);
