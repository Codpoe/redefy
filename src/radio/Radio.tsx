import React from 'react';
import cx from 'classnames';
import RadioGroup from './RadioGroup';
import bem from '../utils/bem';
import './styles/radio.css';

const b = bem('x-radio');

export interface RadioProps {
  value?: any;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean, target: RadioProps) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface RadioChangeEventTarget extends RadioProps {
  checked: boolean;
}

export interface RadioState {
  checked: boolean;
}

export class Radio extends React.Component<RadioProps, RadioState> {
  static Group: typeof RadioGroup;

  static defaultProps: RadioProps = {
    defaultChecked: false,
    disabled: false,
  };

  static getDerivedStateFromProps(props: RadioProps) {
    if (typeof props.checked !== 'undefined') {
      return {
        checked: props.checked,
      };
    }
    return null;
  }

  state: RadioState = {
    checked:
      typeof this.props.checked !== 'undefined'
        ? this.props.checked
        : (this.props.defaultChecked as boolean),
  };

  handleChange = () => {
    const { disabled, onChange } = this.props;
    const { checked } = this.state;

    if (disabled) {
      return;
    }

    if (typeof this.props.checked === 'undefined') {
      this.setState({ checked: !checked });
    }

    if (onChange) {
      onChange(!checked, { ...this.props });
    }
  };

  render() {
    const { checked, disabled, children, className, style } = this.props;

    const cls = cx(className, b(), {
      [b(['checked'])]: checked,
      [b(['disabled'])]: disabled,
    });

    return (
      <label className={cls} style={style} onClick={this.handleChange}>
        <span className={b('indicator')}></span>
        <span className={b('label')}>{children}</span>
      </label>
    );
  }
}

export default Radio;
