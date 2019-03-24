import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import bem from '../utils/bem';
import Loader from '../loader';
import './style/button.css';

const b = bem('x-button');
export default class Button extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'error']),
    size: PropTypes.oneOf(['normal', 'large', 'small']),
    text: PropTypes.bool,
    hollow: PropTypes.bool,
    pure: PropTypes.bool,
    round: PropTypes.bool,
    fullRound: PropTypes.bool,
    block: PropTypes.bool,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    href: PropTypes.string,
    target: PropTypes.oneOf(['_self', '_blank']),
    onClick: PropTypes.instanceOf(React.MouseEventHandler),
    loaderColor: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.shape(React.CSSProperties),
  };

  static defaultProps = {
    type: 'default',
    size: 'normal',
    text: false,
    hollow: false,
    round: false,
    fullRound: false,
    block: false,
    pure: false,
    disabled: false,
    loading: false,
    href: undefined,
    target: '_blank',
    loaderColor: 'white',
  };

  render() {
    const {
      type,
      size,
      text,
      hollow,
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

    const Node = href ? 'a' : 'button';

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
      <Node
        className={cls}
        style={style}
        href={href}
        target={href ? target : undefined}
        disabled={disabled}
        onClick={onClick}
      >
        {loading ? (
          <Loader color={loaderColor} />
        ) : children}
      </Node>
    );
  }
}
