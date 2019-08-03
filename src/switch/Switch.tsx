import React from 'react';
import cx from 'classnames';
import bem from '../utils/bem';
import { XEvent, toXEvent } from '../utils/event';
import './styles/switch.css';

const b = bem('x-switch');

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (ev: XEvent<SwitchChangeEventTarget>) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface SwitchChangeEventTarget extends SwitchProps {
  checked: boolean;
}

export interface SwitchState {
  checked: boolean;
}

export default class Switch extends React.Component<SwitchProps, SwitchState> {
  static defaultProps: SwitchProps = {
    defaultChecked: false,
    disabled: false,
  };

  static getDerivedStateFromProps(props: SwitchProps) {
    if (typeof props.checked !== 'undefined') {
      return { checked: props.checked };
    }
    return null;
  }

  state: SwitchState = {
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

    if (typeof this.props.checked === 'undefined') {
      this.setState({ checked: !checked });
    }

    if (onChange) {
      onChange(toXEvent(ev, { ...this.props, checked: !checked }));
    }
  };

  render() {
    const { disabled, children, className, style } = this.props;
    const { checked } = this.state;

    const childNodes = React.Children.toArray(children);

    const cls = cx(className, b(), {
      [b(['checked'])]: checked,
      [b(['disabled'])]: disabled,
    });

    return (
      <label className={cls} style={style} onClick={this.handleChange}>
        {childNodes[0] && checked && (
          <span className={b('check-child')}>{childNodes[0]}</span>
        )}
        {childNodes[1] && !checked && (
          <span className={b('uncheck-child')}>{childNodes[1]}</span>
        )}
        <span className={b('indicator')}></span>
      </label>
    );
  }
}
