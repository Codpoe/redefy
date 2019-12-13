import React from 'react';
import cx from 'classnames';
import bem from '../utils/bem';
import Pop, { PopProps } from '../pop/index';
import Item, { ItemProps } from './Item';
import './styles/pop-menu.css';

const b = bem('x-pop-menu');

export interface PopMenuProps extends PopProps {
  items: ItemProps[];
  onClick?: (item: ItemProps, ev: React.SyntheticEvent) => void;
}

export interface PopMenuState {}

export class PopMenu extends React.Component<PopMenuProps, PopMenuState> {
  static defaultProps: PopMenuProps = {
    items: [],
  };

  handleMenuClick = (item: ItemProps, ev: React.SyntheticEvent) => {
    const { onClick } = this.props;

    if (item.disabled) {
      ev.preventDefault();
      return;
    }

    onClick && onClick(item, ev);
  };

  renderMenu(items: PopMenuProps['items'], level = 0): React.ReactNode[] {
    return items.map((itemProps, index) => {
      if (!itemProps.items) {
        return (
          <Item
            {...itemProps}
            key={`${level}-${index}`}
            onClick={this.handleMenuClick}
          />
        );
      } else {
        const groupCls = cx(b('group'), {
          [b('group', 'first')]: level === 0 && index === 0,
        });
        return (
          <>
            <div className={groupCls}>{itemProps.label}</div>
            {this.renderMenu(itemProps.items)}
          </>
        );
      }
    });
  }

  render() {
    const { items, className, contentClassName, ...restProps } = this.props;

    return (
      <Pop
        {...restProps}
        className={cx(b(), className)}
        contentClassName={cx(b('menu'), contentClassName)}
        content={this.renderMenu(items)}
      />
    );
  }
}

export default PopMenu;
