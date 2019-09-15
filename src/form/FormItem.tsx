import React from 'react';
import cx from 'classnames';
import bem from '../utils/bem';
import { FormContext, FormItemContext, FormItemContextValue } from './context';

const b = bem('x-form-item');

export interface FormItemProps {
  label?: React.ReactNode;
  propName?: string;
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
    const { propName } = this.props;
    const { value } = this.context;

    if (!propName || !value) {
      return;
    }

    this.initialValue = value[propName];
    this.context.addItem(this);
  }

  componentWillUnmount() {
    this.context.removeItem(this);
  }

  validate(eventType?: 'change' | 'blur'): boolean {
    const { propName } = this.props;
    const { value, validators } = this.context;

    if (!value || !propName || !validators || !validators[propName]) {
      this.setState({ valid: true, message: '' });
      return true;
    }

    const propValue = value[propName];
    const { required, message = '', trigger = 'change', custom } = validators[
      propName
    ];

    // has set `eventType` but not equal `trigger`
    if (eventType && eventType !== trigger) {
      return this.state.valid;
    }

    // required validate
    if (
      required &&
      (!propValue || (Array.isArray(propValue) && propValue.length === 0))
    ) {
      this.setState({
        valid: false,
        message,
      });
      return false;
    }

    // custom validate
    if (custom) {
      const result = custom(propValue, value);

      if (result === false) {
        this.setState({
          valid: false,
          message,
        });
        return false;
      }

      if (typeof result === 'string' && result) {
        this.setState({
          valid: false,
          message: result,
        });
        return false;
      }
    }

    this.setState({ valid: true });
    return true;
  }

  reset() {
    const { propName } = this.props;

    if (!propName) {
      return;
    }

    this.setState({
      valid: true,
      message: '',
    });

    return {
      [propName]: this.initialValue,
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
