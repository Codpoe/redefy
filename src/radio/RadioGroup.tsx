import React from 'react';
import cx from 'classnames';
import Radio, { RadioProps } from './Radio';
import { toBeField, FieldProps } from '../form/index';
import bem from '../utils/bem';

const b = bem('rdf-radio-group');

export interface RadioGroupProps extends FieldProps {
  value?: any;
  defaultValue?: any;
  disabled?: boolean;
  onChange?: (value: any, target: RadioGroupProps) => void;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export interface RadioGroupState {
  value?: any;
}

class RadioGroup extends React.Component<RadioGroupProps, RadioGroupState> {
  static defaultProps: RadioGroupProps = {
    disabled: false,
    fieldContext: {
      onChange: () => {},
      onBlur: () => {},
    },
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

  handleChange: RadioProps['onChange'] = (checked, target) => {
    const { disabled, fieldContext, onChange } = this.props;
    const { value } = target;

    if (disabled) {
      return;
    }

    if (typeof this.props.value === 'undefined') {
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

export default toBeField(RadioGroup);
