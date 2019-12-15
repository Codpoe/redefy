import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PopMenu, { PopMenuProps } from '../index';
import Button from '../../button/index';
import { IconChevronDown } from '../../icon/index';

const items: PopMenuProps['items'] = [
  {
    label: 'Phone',
    items: [
      { label: 'Apple', href: '//www.apple.com' },
      { label: 'Smartisan', href: '//www.smartisan.com' },
      { label: 'OnePlus', href: '//www.oneplus.com' },
    ],
  },
  {
    label: 'Phone',
    items: [
      { label: 'Apple', href: '//www.apple.com' },
      { label: 'Smartisan', href: '//www.smartisan.com' },
      { label: 'OnePlus', href: '//www.oneplus.com' },
    ],
  },
];

storiesOf('Interaction | PopMenu', module).add('basic', () => (
  <div style={{ marginLeft: '200px' }}>
    <PopMenu items={items} onClick={action('click')}>
      <Button>
        PopMenu&nbsp;
        <IconChevronDown />
      </Button>
    </PopMenu>
  </div>
));
