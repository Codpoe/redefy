import React from 'react';
import cx from 'classnames';
import Radio, { RadioProps } from './Radio';
import bem from '../utils/bem';
import './styles/radio-group.css';

const b = bem('x-radio-group');

export interface RadioGroupProps {
  value?: any;
  defaultValue?: any;
  disabled?: boolean;
  onChange?: (value: any) => void;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export interface RadioGroupState {
  value?: any;
}

export default class RadioGroup extends React.Component<
  RadioGroupProps,
  RadioGroupState
> {
  static defaultProps: RadioGroupProps = {
    disabled: false,
  };

  static getDerivedStateFromProps(props: RadioGroupProps) {
    if (typeof props.value !== 'undefined') {
      return { value: props.value };
    }
    return null;
  }

  state: RadioGroupState = {
    value:
      typeof this.props.value !== 'undefined'
        ? this.props.value
        : this.props.defaultValue,
  };

  handleChange: RadioProps['onChange'] = ev => {
    const { disabled, onChange } = this.props;
    const { value } = ev.target;

    if (disabled) {
      return;
    }

    if (typeof this.props.value === 'undefined') {
      this.setState({ value });
    }

    if (onChange) {
      onChange(value);
    }
  };

  render() {
    const { disabled, children, className, style } = this.props;
    const { value } = this.state;

    const radios = React.Children.map(children, (radio: any) => {
      if (!radio) {
        return null;
      }
      return (
        <Radio
          {...radio.props}
          checked={radio.props.value === value}
          disabled={radio.props.disabled || disabled}
          onChange={this.handleChange}
        />
      );
    });

    return (
      <span className={cx(className, b())} style={style}>
        {radios}
      </span>
    );
  }
}
