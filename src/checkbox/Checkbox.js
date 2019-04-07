import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import bem from '../utils/bem';
import './style/checkbox.css';

const b = bem('jm-checkbox');

export default class Checkbox extends React.Component {
  static propTypes = {
    value: PropTypes.any,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.shape(React.CSSProperties),
  }

  static defaultProps = {
    checked: false,
    disabled: false,
  };

  handleChange = (ev) => {
    const { value, checked, onChange } = this.props;
    onChange && onChange(!checked, value, ev);
  }

  render() {
    const {
      checked,
      disabled,
      children,
      className,
      style,
    } = this.props;

    const cls = cx(className, b(), {
      [b(['checked'])]: checked,
      [b(['disabled'])]: disabled,
    });

    return (
      <label
        className={cls}
        style={style}
        onClick={this.handleChange}
      >
        <span className={b('indicator')}>
          <div className={b('line')}></div>
        </span>
        <span className={b('label')}>{children}</span>
      </label>
    );
  }
}
