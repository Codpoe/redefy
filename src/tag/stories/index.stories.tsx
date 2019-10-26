import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Tag from '../index';

storiesOf('Tag', module).add('basic', () => (
  <>
    <Tag>npm</Tag>
    <Tag round onClick={action('click')} onClose={action('close')}>
      npm
    </Tag>
    <Tag
      type="primary"
      round
      onClick={action('click')}
      onClose={action('close')}
    >
      GitHub
    </Tag>
    <Tag
      type="success"
      round
      onClick={action('click')}
      onClose={action('close')}
    >
      GitHub
    </Tag>
    <Tag
      type="warning"
      round
      onClick={action('click')}
      onClose={action('close')}
    >
      GitHub
    </Tag>
    <Tag type="error" round onClick={action('click')} onClose={action('close')}>
      GitHub
    </Tag>
    <Tag
      href="https://t.tt"
      type="error"
      round
      onClick={action('click')}
      onClose={action('close')}
    >
      GitHub
    </Tag>
  </>
));
