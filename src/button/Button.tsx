import React from 'react';
import { CSSTransition } from 'react-transition-group';
import cx from 'classnames';
import Loading from '../loading/index';
import PopMenu, { PopMenuProps } from '../pop-menu/index';
import { IconChevronDown } from '../icon';
import bem from '../utils/bem';
import { noop } from '../utils/vars';

export interface ButtonProps {
  [key: string]: any;
  type?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  size?: 'normal' | 'large' | 'small';
  flat?: boolean;
  text?: boolean;
  pure?: boolean;
  round?: boolean;
  fullRound?: boolean;
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
  href?: string;
  target?: '_self' | '_blank';
  menuItems?: PopMenuProps['items'];
  menuTrigger?: PopMenuProps['trigger'];
  menuPosition?: PopMenuProps['position'];
  menuDisabled?: PopMenuProps['disabled'];
  menuDelay?: PopMenuProps['delay'];
  onMenuClick?: PopMenuProps['onClick'];
  onClick?: React.EventHandler<React.SyntheticEvent>;
  className?: string;
  style?: React.CSSProperties;
}

export interface ButtonState {
  menuVisible: boolean;
}

const b = bem('rdf-button');
export class Button extends React.Component<ButtonProps, ButtonState> {
  static defaultProps: ButtonProps = {
    type: 'default',
    size: 'normal',
    flat: false,
    text: false,
    pure: false,
    round: false,
    fullRound: false,
    block: false,
    disabled: false,
    loading: false,
    href: '',
    target: '_blank',
    onClick: noop,
  };

  state: ButtonState = {
    menuVisible: false,
  };

  handleMenuVisibleChange = (visible: boolean) => {
    this.setState({ menuVisible: visible });
  };

  render() {
    const {
      type,
      size,
      flat,
      text,
      pure,
      round,
      fullRound,
      block,
      disabled,
      loading,
      href,
      target,
      menuItems,
      menuTrigger,
      menuPosition,
      menuDelay,
      menuDisabled,
      onMenuClick,
      children,
      onClick,
      className,
      style,
      ...restProps
    } = this.props;
    const { menuVisible } = this.state;

    const NodeName = href ? 'a' : 'button';

    const cls = cx(className, b(), b([type]), b([size]), {
      [b(['flat'])]: flat,
      [b(['text'])]: text || pure,
      [b(['pure'])]: pure,
      [b(['round'])]: round,
      [b(['full-round'])]: fullRound,
      [b(['block'])]: block,
      [b(['disabled'])]: disabled,
      [b(['loading'])]: loading,
      [b(['menu-visible'])]: menuVisible,
    });

    const btn = (
      <NodeName
        className={cls}
        style={style}
        href={href}
        target={href ? target : undefined}
        disabled={disabled}
        onClick={onClick}
        {...restProps}
        {...((disabled || loading) && { 'data-disabled': true, onClick: noop })}
      >
        <span className={b('content')}>
          {children}
          {menuItems && <IconChevronDown className={b('arrow-icon')} />}
        </span>
        <CSSTransition
          classNames="rdf-button-loading-anim-"
          in={loading}
          timeout={{ exit: 240 }}
          appear
          mountOnEnter
          unmountOnExit
        >
          <Loading className={b('loading')} />
        </CSSTransition>
      </NodeName>
    );

    if (menuItems) {
      return (
        <PopMenu
          items={menuItems}
          trigger={menuTrigger}
          position={menuPosition}
          delay={menuDelay}
          disabled={disabled || menuDisabled}
          onClick={onMenuClick}
          onChange={this.handleMenuVisibleChange}
        >
          {btn}
        </PopMenu>
      );
    }

    return btn;
  }
}

export default Button;
