import React from 'react';
import { storiesOf } from '@storybook/react';
import * as Icon from '../index';

const allIconKeys = Object.keys(Icon);

storiesOf('Basic | Icon', module).add('基础用法', () => (
  <>
    {allIconKeys.length} icons
    <br />
    {allIconKeys.map(key => {
      const C = Icon[key];
      return <C key={key} />;
    })}
  </>
));
