import React from 'react';
import { storiesOf } from '@storybook/react';
import Tab from '../index';

storiesOf('Basic | Tab', module)
  .add('basic', () => (
    <Tab
      items={[
        { label: 'Apple', value: 'apple' },
        { label: 'Smartisan', value: 'smartisan' },
        { label: 'OnePlus', value: 'oneplus' },
      ]}
      defaultActive="apple"
    />
  ))
  .add('use Tab.Item', () => (
    <Tab defaultActive="apple">
      <Tab.Item label="Apple" value="apple">
        😃This is Apple.
      </Tab.Item>
      <Tab.Item label="Smartisan" value="smartisan">
        🎁This is Smartisan.
      </Tab.Item>
      <Tab.Item label="OnePlus" value="oneplus">
        🎉This is OnePlus.
      </Tab.Item>
    </Tab>
  ))
  .add('stretch', () => (
    <Tab
      items={[
        { label: 'Apple', value: 'apple' },
        { label: 'Smartisan', value: 'smartisan' },
        { label: 'OnePlus', value: 'oneplus' },
      ]}
      defaultActive="apple"
      stretch
    />
  ))
  .add('custom indicator', () => (
    <Tab
      items={[
        { label: 'Apple', value: 'apple' },
        { label: 'Smartisan', value: 'smartisan' },
        { label: 'OnePlus', value: 'oneplus' },
      ]}
      defaultActive="apple"
      indicator={
        <div
          style={{
            transform: 'translateY(15px)',
          }}
        >
          👆
        </div>
      }
    />
  ));
