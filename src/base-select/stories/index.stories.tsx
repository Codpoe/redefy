import React, { useState, useCallback } from 'react';
import { storiesOf } from '@storybook/react';
import BaseSelect from '../index';

const Demo1: React.FC = () => {
  const [visible, changeVisible] = useState(false);
  const [value, changeValue] = useState('');
  const handleChange = useCallback(
    visible => {
      if (visible) {
        setTimeout(() => {
          changeValue('r u ok?');
        }, 1000);
      }
      changeVisible(visible);
    },
    [changeVisible]
  );

  return (
    <BaseSelect
      value={value}
      visible={visible}
      onChange={handleChange}
      onClear={() => changeValue('')}
    >
      <div style={{ background: '#fff', padding: '4px 6px' }}>
        永远相信美好的事情即将发生
      </div>
    </BaseSelect>
  );
};

storiesOf('Basic | BaseSelect', module).add('basic', () => <Demo1 />);
