import React, { useState, useCallback } from 'react';
import { storiesOf } from '@storybook/react';
import Form from '../index';
import Input from '../../input/index';
import { User, Lock } from '../../icon/index';

const Demo: React.FC = () => {
  const [value, changeValue] = useState({ username: '', password: '' });
  const handleChange = useCallback(
    (value: any, target: Record<string, any>) => {
      changeValue({
        ...value,
        [target.name]: value,
      });
    },
    []
  );

  return (
    <Form
      style={{ width: '300px' }}
      value={value}
      validators={{ username: { required: true, message: '必填' } }}
      labelPosition="top"
    >
      <Form.Item
        label={
          <>
            <User />
            &nbsp;Username
          </>
        }
        propName="username"
      >
        <Input name="username" value={value.username} onChange={handleChange} />
      </Form.Item>
      <Form.Item
        label={
          <>
            <Lock />
            &nbsp;Password
          </>
        }
        propName="password"
      >
        <Input
          type="password"
          name="password"
          value={value.password}
          onChange={handleChange}
        />
      </Form.Item>
    </Form>
  );
};

storiesOf('Basic | Form', module).add('basic', () => <Demo />);
