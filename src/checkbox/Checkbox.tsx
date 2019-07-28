import React from 'react';
import cx from 'classnames';
import CheckboxGroup from './CheckboxGroup';
import bem from '../utils/bem';
import { toXEvent, XEvent } from '../utils/event';
import './styles/checkbox.css';

const b = bem('x-checkbox');

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  value?: any;
  disabled?: boolean;
  onChange?: (ev: XEvent<CheckboxChangeEventTarget>) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface CheckboxChangeEventTarget extends CheckboxProps {
  checked: boolean;
}

export interface CheckboxState {
  checked: boolean;
}

export default class Checkbox extends React.Component<
  CheckboxProps,
  CheckboxState
> {
  static Group: typeof CheckboxGroup;
  static defaultProps: CheckboxProps = {
    defaultChecked: false,
    disabled: false,
  };

  static getDerivedStateFromProps(props: CheckboxProps) {
    if ('checked' in props) {
      return { checked: props.checked };
    }
    return null;
  }

  state: CheckboxState = {
    checked:
      typeof this.props.checked !== 'undefined'
        ? this.props.checked
        : (this.props.defaultChecked as boolean),
  };

  handleChange = (ev: React.SyntheticEvent) => {
    const { disabled, onChange } = this.props;
    const { checked } = this.state;

    if (disabled) {
      return;
    }

    if (!('checked' in this.props)) {
      this.setState({ checked: !checked });
    }

    if (onChange) {
      const target: CheckboxChangeEventTarget = {
        ...this.props,
        checked: !checked,
      };

      onChange(toXEvent(ev, target));
    }
  };

  render() {
    const { disabled, className, style, children } = this.props;
    const { checked } = this.state;
    const cls = cx(className, b(), {
      [b(['checked'])]: checked,
      [b(['disabled'])]: disabled,
    });

    return (
      <label className={cls} style={style} onClick={this.handleChange}>
        <span className={b('indicator')}>
          <div className={b('line')}></div>
        </span>
        <span className={b('label')}>{children}</span>
      </label>
    );
  }
}
