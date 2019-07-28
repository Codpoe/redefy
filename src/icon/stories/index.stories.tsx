import React from 'react';
import { storiesOf } from '@storybook/react';
import * as Icon from '../index';

const allIconKeys = Object.keys(Icon) as (keyof typeof Icon)[];

storiesOf('Basic | Icon', module).add('basic', () => (
  <>
    {allIconKeys.length} icons
    <br />
    {allIconKeys.map(key => {
      const C = Icon[key];
      return <C key={key} />;
    })}
  </>
));
