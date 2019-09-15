import React, { useState, useCallback } from 'react';
import { storiesOf } from '@storybook/react';
import Form, { FormProps } from '../index';
import Radio from '../../radio/index';
import Input from '../../input/index';
import { User, Lock } from '../../icon/index';

const Demo1: React.FC = () => {
  const [value, changeValue] = useState({ username: '', password: '' });
  const [labelPosition, changeLabelPosition] = useState<
    FormProps['labelPosition']
  >('right');

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
    <>
      <Radio.Group value={labelPosition} onChange={changeLabelPosition}>
        <Radio value="right">right</Radio>
        <Radio value="left">left</Radio>
        <Radio value="top">top</Radio>
      </Radio.Group>
      <Form
        style={{ width: '400px' }}
        value={value}
        labelPosition={labelPosition}
      >
        <Form.Item
          label={
            <>
              <User />
              &nbsp;Username
            </>
          }
          prop="username"
        >
          <Input
            name="username"
            value={value.username}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item
          label={
            <>
              <Lock />
              &nbsp;Password
            </>
          }
          prop="password"
        >
          <Input
            type="password"
            name="password"
            value={value.password}
            onChange={handleChange}
          />
        </Form.Item>
      </Form>
    </>
  );
};

const Demo2: React.FC = () => {
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
      style={{ width: '400px' }}
      value={value}
      validators={{
        username: { required: true, message: '用户名必填' },
        password: [
          {
            required: true,
            message: '密码必填',
          },
          {
            trigger: 'blur',
            custom(value) {
              if (value.length <= 6) {
                return '密码长度必须大于 6';
              }
            },
          },
        ],
      }}
    >
      <Form.Item
        label={
          <>
            <User />
            &nbsp;Username
          </>
        }
        prop="username"
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
        prop="password"
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

storiesOf('Basic | Form', module)
  .add('basic', () => <Demo1 />)
  .add('validators', () => <Demo2 />);
