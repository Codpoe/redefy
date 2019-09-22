import React from 'react';
import cx from 'classnames';
import Checkbox, { CheckboxProps } from './Checkbox';
import { toBeField, FieldProps } from '../form/index';
import bem from '../utils/bem';
import './styles/checkbox-group.css';

const b = bem('x-checkbox-group');

export interface CheckboxGroupProps extends FieldProps {
  value?: any[];
  defaultValue?: any[];
  disabled?: boolean;
  onChange?: (value: any[], target: CheckboxGroupProps) => void;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

export interface CheckboxGroupState {
  value: any[];
}

class CheckboxGroup extends React.Component<
  CheckboxGroupProps,
  CheckboxGroupState
> {
  static defaultProps: CheckboxGroupProps = {
    defaultValue: [],
    disabled: false,
    fieldContext: {
      onChange: () => {},
      onBlur: () => {},
    },
  };

  static getDerivedStateFromProps(props: CheckboxGroupProps) {
    if ('value' in props) {
      return { value: props.value };
    }
    return null;
  }

  state: CheckboxGroupState = {
    value:
      typeof this.props.value !== 'undefined'
        ? this.props.value
        : (this.props.defaultValue as any[]),
  };

  isPartOfArray(a: any[] = [], b: any[] = []) {
    if (Array.isArray(b)) {
      return b.every(item => a.indexOf(item) >= 0);
    }
    return a.indexOf(b) >= 0;
  }

  handleChange: CheckboxProps['onChange'] = (checked, target) => {
    const { onChange, fieldContext } = this.props;
    let { value } = this.state;
    let { value: changedValue } = target;
    value = value.slice();

    // 统一为数组
    if (!Array.isArray(changedValue)) {
      changedValue = [changedValue];
    }

    if (checked) {
      value = (changedValue as any[]).reduce((a, b) => {
        if (a.indexOf(b) < 0) {
          a = a.concat(b);
        }
        return a;
      }, value);
    } else {
      value = value.filter(item => changedValue.indexOf(item) < 0);
    }

    if (!('value' in this.props)) {
      this.setState({ value });
    }

    if (onChange) {
      onChange(value, { ...this.props });
      fieldContext.onChange();
    }
  };

  render() {
    const { disabled, children, className, style } = this.props;
    const { value } = this.state;

    const checkboxs = React.Children.map(children, (checkbox: any) => {
      if (!checkbox) {
        return null;
      }
      return (
        <Checkbox
          {...checkbox.props}
          checked={this.isPartOfArray(value, checkbox.props.value)}
          disabled={checkbox.props.disabled || disabled}
          onChange={this.handleChange}
        />
      );
    });

    return (
      <span className={cx(b(), className)} style={style}>
        {checkboxs}
      </span>
    );
  }
}

export default toBeField(CheckboxGroup);
