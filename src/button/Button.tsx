import React from 'react';
import cx from 'classnames';
import bem from '../utils/bem';

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
  onClick?: React.EventHandler<React.SyntheticEvent>;
  className?: string;
  style?: React.CSSProperties;
}

const b = bem('rdf-button');
export class Button extends React.Component<ButtonProps> {
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
    onClick: () => {},
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
      children,
      onClick,
      className,
      style,
      ...restProps
    } = this.props;

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
    });

    return (
      <NodeName
        className={cls}
        style={style}
        href={href}
        target={href ? target : undefined}
        disabled={disabled}
        onClick={onClick}
        {...restProps}
      >
        {children}
      </NodeName>
    );
  }
}

export default Button;
