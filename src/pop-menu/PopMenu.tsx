import React from 'react';
import cx from 'classnames';
import bem from '../utils/bem';
import Pop, { PopProps } from '../pop/index';
import Item, { ItemProps } from './Item';
import './styles/pop-menu.css';

const b = bem('x-pop-menu');

export interface PopMenuProps extends PopProps {
  menu: ItemProps[];
  onClick?: (item: ItemProps, ev: React.SyntheticEvent) => void;
}

export interface PopMenuState {}

export default class PopMenu extends React.Component<
  PopMenuProps,
  PopMenuState
> {
  static defaultProps: PopMenuProps = {
    menu: [],
  };

  handleMenuClick = (item: ItemProps, ev: React.SyntheticEvent) => {
    const { onClick } = this.props;

    if (item.disabled) {
      ev.preventDefault();
      return;
    }

    onClick && onClick(item, ev);
  };

  renderMenu() {
    const { menu } = this.props;

    return menu.map((itemProps, index) => (
      <Item
        {...itemProps}
        key={itemProps.value || index}
        onClick={this.handleMenuClick}
      />
    ));
  }

  render() {
    const { className, contentClassName, ...restProps } = this.props;

    return (
      <Pop
        {...restProps}
        className={cx(b(), className)}
        contentClassName={cx(b('menu'), contentClassName)}
        content={this.renderMenu()}
      />
    );
  }
}
