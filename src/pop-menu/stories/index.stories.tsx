import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PopMenu, { PopMenuProps } from '../index';
import Button from '../../button/index';
import { ChevronDown } from '../../icon/index';

const menu: PopMenuProps['menu'] = [
  {
    label: 'Phone',
    menu: [
      { label: 'Apple', href: '//www.apple.com' },
      { label: 'Smartisan', href: '//www.smartisan.com' },
      { label: 'OnePlus', href: '//www.oneplus.com' },
    ],
  },
  {
    label: 'Phone',
    menu: [
      { label: 'Apple', href: '//www.apple.com' },
      { label: 'Smartisan', href: '//www.smartisan.com' },
      { label: 'OnePlus', href: '//www.oneplus.com' },
    ],
  },
];

storiesOf('Interaction | PopMenu', module).add('basic', () => (
  <div style={{ marginLeft: '200px' }}>
    <PopMenu menu={menu} onClick={action('click')}>
      <Button>
        PopMenu&nbsp;
        <ChevronDown />
      </Button>
    </PopMenu>
  </div>
));
