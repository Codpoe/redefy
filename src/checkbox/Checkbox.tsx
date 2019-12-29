import React from 'react';
import cx from 'classnames';
import CheckboxGroup from './CheckboxGroup';
import bem from '../utils/bem';

const b = bem('rdf-checkbox');

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  value?: any;
  disabled?: boolean;
  onChange?: (checked: boolean, target: CheckboxProps) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface CheckboxState {
  checked: boolean;
}

export class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
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

  handleChange = () => {
    const { disabled, onChange } = this.props;
    const { checked } = this.state;

    if (disabled) {
      return;
    }

    if (!('checked' in this.props)) {
      this.setState({ checked: !checked });
    }

    if (onChange) {
      onChange(!checked, { ...this.props });
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

export default Checkbox;
