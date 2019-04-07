import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import bem from 'jimu/utils/bem';
import Radio from './Radio';
import './style/radio-group.css';

const b = bem('jm-radio-group');

const RadioGroup = (props) => {
  const {
    value,
    disabled,
    onChange,
    children,
    className,
    style,
  } = props;

  const radios = React.Children.map(children, (radio) => {
    return (
      <Radio
        {...radio.props}
        checked={radio.props.value === value}
        disabled={radio.props.disabled || disabled}
        onChange={onChange}
      >
        {radio.props.children}
      </Radio>
    );
  });

  return (
    <span
      className={cx(className, b())}
      style={style}
    >
      {radios}
    </span>
  );
};

RadioGroup.propTypes = {
  value: PropTypes.any,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.shape(React.CSSProperties),
};

RadioGroup.defaultProps = {
  disabled: false,
};

export default RadioGroup;
