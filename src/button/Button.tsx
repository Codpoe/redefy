import React from 'react';
import cx from 'classnames';
import bem from '../utils/bem';
import Loader from '../loader/index';
import './style/button.css';

export interface ButtonProps {
  type?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  size?: 'normal' | 'large' | 'small';
  hollow?: boolean;
  text?: boolean;
  pure?: boolean;
  round?: boolean;
  fullRound?: boolean;
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
  href?: string;
  target?: '_self' | '_blank';
  loaderColor?: string;
  onClick?: React.EventHandler<any>;
  className?: string;
  style?: React.CSSProperties;
}

const b = bem('jm-button');
export default class Button extends React.Component<ButtonProps> {
  static defaultProps = {
    type: 'default',
    size: 'normal',
    hollow: false,
    text: false,
    pure: false,
    round: false,
    fullRound: false,
    block: false,
    disabled: false,
    loading: false,
    loaderColor: 'white',
    href: '',
    target: '_blank',
    onClick: () => {},
  };

  render() {
    const {
      type,
      size,
      hollow,
      text,
      pure,
      round,
      fullRound,
      block,
      disabled,
      loading,
      href,
      target,
      loaderColor,
      children,
      onClick,
      className,
      style,
    } = this.props;

    const NodeName = href ? 'a' : 'button';

    const cls = cx(className, b(), b([type]), b([size]), {
      [b(['hollow'])]: hollow,
      [b(['text'])]: text || pure,
      [b(['pure'])]: pure,
      [b(['round'])]: round,
      [b(['full-round'])]: fullRound,
      [b(['block'])]: block,
      [b(['disabled'])]: disabled,
      [b(['loading'])]: loading,
    });

    return (
      <NodeName
        className={cls}
        style={style}
        href={href}
        target={href ? target : undefined}
        disabled={disabled}
        onClick={onClick}
      >
        {loading ? <Loader color={loaderColor} /> : children}
      </NodeName>
    );
  }
}
