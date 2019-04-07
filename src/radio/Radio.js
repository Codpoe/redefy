import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import bem from 'jimu/utils/bem';
import './style/radio.css';

const b = bem('jm-radio');

export default class Radio extends React.Component {
  static propTypes = {
    value: PropTypes.any,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.shape(React.CSSProperties),
  };

  static defaultProps = {
    checked: false,
    disabled: false,
  };

  handleChange = (ev) => {
    const { value, disabled, onChange } = this.props;

    if (!disabled && onChange) {
      onChange(value, ev);
    }
  }

  render() {
    const {
      checked,
      disabled,
      children,
      className,
      style,
    } = this.props;

    const classes = cx(className, b(), {
      [b(['checked'])]: checked,
      [b(['disabled'])]: disabled,
    });

    return (
      <label
        className={classes}
        style={style}
        onClick={this.handleChange}
      >
        <span className={b('indicator')}></span>
        <span className={b('label')}>{children}</span>
      </label>
    );
  }
}
