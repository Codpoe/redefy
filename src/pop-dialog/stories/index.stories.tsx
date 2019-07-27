import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PopDialog from '../index';
import Button from '../../button/index';

storiesOf('Interaction | PopDialog', module).add('Basic', () => (
  <div style={{ margin: '100px 150px' }}>
    <PopDialog
      content="Are you sure to delete this item?"
      onOk={action('ok')}
      onCancel={action('cancel')}
    >
      <Button>Delete</Button>
    </PopDialog>
  </div>
));
