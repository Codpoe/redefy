import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import bem from 'jimu/utils/bem';
import Checkbox from './Checkbox';
import './style/checkbox-group.css';

const b = bem('jm-checkbox-group');

export default class CheckboxGroup extends React.Component {
  static propTypes = {
    value: PropTypes.array,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.shape(React.CSSProperties),
  };

  static defaultProps = {
    disabled: false,
  };

  handleChange = (checked, changedValue, ev) => {
    const { value, onChange } = this.props;
    let groupValue = value.slice();

    if (!Array.isArray(changedValue)) {
      changedValue = [changedValue];
    }

    if (checked) {
      changedValue.forEach((item) => {
        if (!groupValue.includes(item)) {
          groupValue.push(item);
        }
      });
      // groupValue = [...(new Set(groupValue.concat(changedValue)))];
    } else {
      groupValue = groupValue.filter((item) => !changedValue.includes(item));
    }

    onChange && onChange(groupValue, ev);
  }

  isPartOfArray(first, second) {
    if (Array.isArray(second)) {
      return second.every((item) => first.includes(item));
    }
    return first.includes(second);
  }

  render() {
    const {
      value,
      disabled,
      children,
      className,
      style,
    } = this.props;

    const checkboxs = React.Children.map(children, (checkbox) => {
      return (
        <Checkbox
          {...checkbox.props}
          checked={this.isPartOfArray(value, checkbox.props.value)}
          disabled={checkbox.props.disabled || disabled}
          onChange={this.handleChange}
        >
          {checkbox.props.children}
        </Checkbox>
      );
    });

    return (
      <span
        className={cx(b(), className)}
        style={style}
      >
        {checkboxs}
      </span>
    );
  }
}
