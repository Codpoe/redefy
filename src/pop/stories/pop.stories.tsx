import React from 'react';
import { storiesOf } from '@storybook/react';
import Pop from '../index';

storiesOf('Basic | Pop', module).add('基础用法', () => (
  <>
    <Pop content="这是内容">bottom-left</Pop>
    <br />
    <Pop content="这是内容" position="bottom-center">
      bottom-center
    </Pop>
    <br />
    <Pop content="这是内容" position="bottom-right">
      bottom-right
    </Pop>
    <br />
    <Pop content="这是内容" position="top-left">
      top-left
    </Pop>
    <br />
    <Pop content="这是内容" position="top-center">
      top-center
    </Pop>
    <br />
    <Pop content="这是内容" position="top-right">
      top-right
    </Pop>
    <br />
    <Pop content="这是内容" position="left-top">
      left-top
    </Pop>
    <br />
    <Pop content="这是内容" position="left-center">
      left-center
    </Pop>
    <br />
    <Pop content="这是内容" position="left-bottom">
      left-bottom
    </Pop>
    <br />
    <Pop content="这是内容" position="right-top">
      right-top
    </Pop>
    <br />
    <Pop content="这是内容" position="right-center">
      right-center
    </Pop>
    <br />
    <Pop content="这是内容" position="right-bottom">
      right-bottom
    </Pop>
  </>
));
