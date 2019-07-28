import React from 'react';
import { storiesOf } from '@storybook/react';
import Pop from '../index';
import Button from '../../button/index';
import PopShowcase from './pop-showcase/index';

const content = (
  <div>
    <h4 style={{ margin: 0 }}>Title</h4>
    <p style={{ margin: 0 }}>Wow! Awesome!</p>
  </div>
);

storiesOf('Interaction | Pop', module).add('basic', () => (
  <PopShowcase>
    <Pop content={content} position="top-left" withArrow>
      <Button>TL</Button>
    </Pop>
    <Pop content={content} position="top-center" withArrow>
      <Button>Top</Button>
    </Pop>
    <Pop content={content} position="top-right" withArrow>
      <Button>TR</Button>
    </Pop>
    <Pop content={content} position="left-top" withArrow>
      <Button>LT</Button>
    </Pop>
    <Pop content={content} position="left-center" withArrow>
      <Button>Left</Button>
    </Pop>
    <Pop content={content} position="left-bottom" withArrow>
      <Button>LB</Button>
    </Pop>
    <Pop content={content} position="right-top" withArrow>
      <Button>RT</Button>
    </Pop>
    <Pop content={content} position="right-center" withArrow>
      <Button>Right</Button>
    </Pop>
    <Pop content={content} position="right-bottom" withArrow>
      <Button>RB</Button>
    </Pop>
    <Pop content={content} withArrow>
      <Button>BL</Button>
    </Pop>
    <Pop content={content} position="bottom-center" withArrow>
      <Button>Bottom</Button>
    </Pop>
    <Pop content={content} position="bottom-right" withArrow>
      <Button>BR</Button>
    </Pop>
  </PopShowcase>
));
