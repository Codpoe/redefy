import React from 'react';
import cx from 'classnames';
import bem from '../utils/bem';
import { FormContext, FormContextValue } from './context';
import FormItem from './FormItem';
import './styles/form.css';
import toBeField from './to-be-field';

const b = bem('x-form');

export interface FormValidator {
  required?: boolean;
  min?: number;
  max?: number;
  message?: string;
  trigger?: 'change' | 'blur' | 'none';
  custom?: (
    propValue: any,
    value: NonNullable<FormProps['value']>
  ) => boolean | string | undefined;
}

export interface FormProps {
  value?: Record<string, any>;
  validators?: Record<string, FormValidator | FormValidator[]>;
  labelPosition?: 'left' | 'right' | 'top';
  labelWidth?: number | string;
  labelHeight?: number | string;
  onSubmit?: (valid: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
}

export class Form extends React.Component<FormProps> {
  static Item: typeof FormItem;

  static toBeField: typeof toBeField;

  static defaultProps: FormProps = {
    labelPosition: 'right',
    labelWidth: '100px',
    labelHeight: '32px',
  };

  items: FormItem[] = [];

  addItem = (item: FormItem) => {
    this.items.push(item);
  };

  removeItem = (item: FormItem) => {
    const index = this.items.indexOf(item);

    if (index >= 0) {
      this.items.splice(index, 1);
    }
  };

  reset() {
    return this.items.reduce((prev, cur) => {
      return { ...prev, ...cur };
    }, {});
  }

  validate() {
    return this.items.some(item => !item.validate());
  }

  handleSubmit = (ev: React.SyntheticEvent) => {
    ev.preventDefault();
    const { onSubmit } = this.props;

    if (onSubmit) {
      onSubmit(this.validate());
    }
  };

  render() {
    const {
      value,
      validators,
      labelPosition,
      labelWidth,
      labelHeight,
      className,
      style,
      children,
    } = this.props;
    const contextValue: FormContextValue = {
      value,
      validators,
      labelPosition,
      labelWidth,
      labelHeight,
      addItem: this.addItem,
      removeItem: this.removeItem,
    };
    const cls = cx(className, b(), [b([`label-${labelPosition}`])]);

    return (
      <form className={cls} style={style} onSubmit={this.handleSubmit}>
        <FormContext.Provider value={contextValue}>
          {children}
        </FormContext.Provider>
      </form>
    );
  }
}

export default Form;
