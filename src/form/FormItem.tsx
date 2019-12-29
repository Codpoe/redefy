import React from 'react';
import cx from 'classnames';
import bem from '../utils/bem';
import { FormContext, FormItemContext, FormItemContextValue } from './context';
import { FormValidator } from './Form';

const b = bem('rdf-form-item');

export interface FormItemProps {
  label?: React.ReactNode;
  prop?: string;
  className?: string;
  style?: React.CSSProperties;
}

export interface FormItemState {
  valid: boolean;
  message: string;
}

export default class FormItem extends React.Component<
  FormItemProps,
  FormItemState
> {
  static contextType = FormContext;

  context!: React.ContextType<typeof FormContext>;

  state: FormItemState = {
    valid: true,
    message: '',
  };

  initialValue: any;

  componentDidMount() {
    const { prop } = this.props;
    const { value } = this.context;

    if (!prop || !value) {
      return;
    }

    this.initialValue = value[prop];
    this.context.addItem(this);
  }

  componentWillUnmount() {
    this.context.removeItem(this);
  }

  validate(eventType?: 'change' | 'blur'): boolean {
    const { prop } = this.props;
    const { value, validators } = this.context;

    if (!value || !prop || !validators || !validators[prop]) {
      this.setState({ valid: true, message: '' });
      return true;
    }

    let validator = validators[prop];

    if (!Array.isArray(validator)) {
      validator = [validator];
    }

    return validator.some(rule => {
      return !this.ruleValidate(rule, value[prop], value, eventType);
    });
  }

  ruleValidate(
    rule: FormValidator,
    value: any,
    formValue: Record<string, any>,
    eventType?: 'change' | 'blur'
  ): boolean {
    const {
      required,
      min,
      max,
      message = '',
      trigger = 'change',
      custom,
    } = rule;

    // has set `eventType` but not equal `trigger`
    if (eventType && eventType !== trigger) {
      return this.state.valid;
    }

    // custom validate
    if (typeof custom !== 'undefined') {
      const result = custom(value, formValue);

      if (result === false) {
        return this.setValidateStatus(false, message);
      }

      if (typeof result === 'string' && result) {
        return this.setValidateStatus(false, result);
      }

      return this.setValidateStatus(true);
    }

    // required validate
    if (typeof required !== 'undefined') {
      if (
        typeof value === 'undefined' ||
        value === '' ||
        (Array.isArray(value) && value.length === 0)
      ) {
        return this.setValidateStatus(false, message);
      }
      return this.setValidateStatus(true);
    }

    const hasMin = typeof min !== 'undefined';
    const hasMax = typeof max !== 'undefined';
    // min and max
    if (hasMin || hasMax) {
      if (typeof value === 'undefined') {
        return this.setValidateStatus(true);
      }

      let result: boolean | undefined;

      if (hasMin) {
        result = value >= (min as number);
      }

      if (typeof result === 'undefined' || result) {
        result = value <= (max as number);
      }

      return this.setValidateStatus(result, message);
    }

    return this.setValidateStatus(true);
  }

  setValidateStatus(valid: boolean, message?: string) {
    const status: Record<string, any> = { valid };

    if (!valid && typeof message !== 'undefined') {
      status.message = message;
    }

    this.setState(status as FormItemState);
    return valid;
  }

  reset() {
    const { prop } = this.props;

    if (!prop) {
      return;
    }

    this.setState({
      valid: true,
      message: '',
    });

    return {
      [prop]: this.initialValue,
    };
  }

  handleChange = () => {
    // 由于验证需要先获取到上层表单 Form 的值，并且 React 的 setState 是异步的，
    // 这就有可能会造成验证的是上一次的输入值。
    // 为了解决这个问题，把 validate 方法放入 setTimeout 中，
    // 利用 JS 的事件循环特性，保证了每次验证的值都是最新输入的。
    setTimeout(() => {
      this.validate('change');
    });
  };

  handleBlur = () => {
    setTimeout(() => {
      this.validate('blur');
    });
  };

  getLabelStyle() {
    const { labelPosition, labelWidth, labelHeight } = this.context;
    const { label } = this.props;

    if (labelPosition === 'top' || !label) {
      return;
    }

    return {
      width: labelWidth,
      height: labelHeight,
    };
  }

  render() {
    const { label, className, style, children } = this.props;
    const { valid, message } = this.state;
    const labelStyle = this.getLabelStyle();

    const cls = cx(b(), className, {
      [b(['invalid'])]: !valid,
    });

    const contextValue: FormItemContextValue = {
      onChange: this.handleChange,
      onBlur: this.handleBlur,
    };

    return (
      <div className={cls} style={style}>
        {label && (
          <label className={b('label')} style={labelStyle}>
            {label}
          </label>
        )}
        <div className={b('content')}>
          <FormItemContext.Provider value={contextValue}>
            {children}
          </FormItemContext.Provider>
          <span className={b('message')}>{message}</span>
        </div>
      </div>
    );
  }
}
