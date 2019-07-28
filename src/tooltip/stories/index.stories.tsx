import React from 'react';
import { storiesOf } from '@storybook/react';
import Tooltip from '../index';
import Button from '../../button/index';
import PopShowcase from '../../pop/stories/pop-showcase/index';

const content = 'Tooltip content';

storiesOf('Interaction | Tooltip', module).add('basic', () => (
  <PopShowcase>
    <Tooltip content={content} position="top-left">
      <Button>TL</Button>
    </Tooltip>
    <Tooltip content={content}>
      <Button>Top</Button>
    </Tooltip>
    <Tooltip content={content} position="top-right">
      <Button>TR</Button>
    </Tooltip>
    <Tooltip content={content} position="left-top">
      <Button>LT</Button>
    </Tooltip>
    <Tooltip content={content} position="left-center">
      <Button>Left</Button>
    </Tooltip>
    <Tooltip content={content} position="left-bottom">
      <Button>LB</Button>
    </Tooltip>
    <Tooltip content={content} position="right-top">
      <Button>RT</Button>
    </Tooltip>
    <Tooltip content={content} position="right-center">
      <Button>Right</Button>
    </Tooltip>
    <Tooltip content={content} position="right-bottom">
      <Button>RB</Button>
    </Tooltip>
    <Tooltip content={content} position="bottom-left">
      <Button>BL</Button>
    </Tooltip>
    <Tooltip content={content} position="bottom-center">
      <Button>Bottom</Button>
    </Tooltip>
    <Tooltip content={content} position="bottom-right">
      <Button>BR</Button>
    </Tooltip>
  </PopShowcase>
));
