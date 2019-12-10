import React from 'react';
import { storiesOf } from '@storybook/react';
import Toast from '../index';
import Button from '../../button/index';

const Demo1 = () => {
  const handleClick = () => {
    Toast.info('Hello World.');
  };

  return <Button onClick={handleClick}>Toast</Button>;
};

storiesOf('Basic | Toast', module).add('basic', () => <Demo1 />);
