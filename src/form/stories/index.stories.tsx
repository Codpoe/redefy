import React, { useState, useCallback } from 'react';
import { storiesOf } from '@storybook/react';
import Form, { FormProps } from '../index';
import Radio from '../../radio/index';
import Input from '../../input/index';
import InputNumber from '../../input-number/index';
import Checkbox from '../../checkbox/index';
import Switch from '../../switch/index';
import {
  IconUser,
  IconLock,
  IconHeart,
  IconSmile,
  IconMeh,
  IconFrown,
  IconThumbsUp,
  IconDollarSign,
} from '../../icon/index';

const Demo1: React.FC = () => {
  const [value, changeValue] = useState({
    username: '',
    password: '',
  });
  const [labelPosition, changeLabelPosition] = useState<
    FormProps['labelPosition']
  >('right');

  const handleChange = useCallback(
    (propValue: any, target: Record<string, any>) => {
      changeValue({
        ...value,
        [target.name]: propValue,
      });
    },
    [value]
  );

  return (
    <>
      <Radio.Group value={labelPosition} onChange={changeLabelPosition}>
        <Radio value="right">right</Radio>
        <Radio value="left">left</Radio>
        <Radio value="top">top</Radio>
      </Radio.Group>
      <br />
      <Form
        style={{ width: '400px' }}
        value={value}
        labelPosition={labelPosition}
      >
        <Form.Item
          label={
            <>
              <IconUser />
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
              <IconLock />
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
  const [value, changeValue] = useState({
    username: '',
    password: '',
    habits: [],
    mood: 'smile',
    thumbsUp: false,
    money: 100,
  });

  const handleChange = useCallback(
    (propValue: any, target: Record<string, any>) => {
      changeValue({
        ...value,
        [target.name]: propValue,
      });
    },
    [value]
  );

  const validators: FormProps['validators'] = {
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
    habits: { required: true, message: '爱好必填哦' },
    mood: {
      custom(value) {
        if (value === 'frown') {
          return '要开心哦O(∩_∩)O~~';
        }
      },
    },
    thumbsUp: {
      custom(value) {
        if (!value) {
          return 'Big brother is watching you!';
        }
      },
    },
    money: [
      { required: true, message: '必填' },
      { min: 0, max: 300, message: '知足常乐' },
    ],
  };

  return (
    <Form style={{ width: '400px' }} value={value} validators={validators}>
      <Form.Item
        label={
          <>
            <IconUser />
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
            <IconLock />
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
      <Form.Item
        label={
          <>
            <IconDollarSign />
            &nbsp;Money
          </>
        }
        prop="money"
      >
        <InputNumber
          name="money"
          value={value.money}
          step={100}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item
        label={
          <>
            <IconHeart />
            &nbsp;Habits
          </>
        }
        prop="habits"
      >
        <Checkbox.Group
          name="habits"
          value={value.habits}
          onChange={handleChange}
        >
          <Checkbox value="study">study</Checkbox>
          <Checkbox value="play">play</Checkbox>
          <Checkbox value="eat">sleep</Checkbox>
        </Checkbox.Group>
      </Form.Item>

      <Form.Item
        label={
          <>
            <IconUser />
            &nbsp;Mood
          </>
        }
        prop="mood"
      >
        <Radio.Group name="mood" value={value.mood} onChange={handleChange}>
          <Radio value="smile">
            <IconSmile />
          </Radio>
          <Radio value="meh">
            <IconMeh />
          </Radio>
          <Radio value="frown">
            <IconFrown />
          </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label={
          <>
            <IconThumbsUp />
            &nbsp;Thumbs up
          </>
        }
        prop="thumbsUp"
      >
        <Switch
          name="thumbsUp"
          checked={value.thumbsUp}
          onChange={handleChange}
        />
      </Form.Item>
    </Form>
  );
};

storiesOf('Basic | Form', module)
  .add('basic', () => <Demo1 />)
  .add('validators', () => <Demo2 />);
