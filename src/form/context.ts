import React from 'react';
import Form, { FormProps } from './Form';
import FormItem from './FormItem';

export type FormContextValue = Partial<
  Pick<
    FormProps,
    'value' | 'validators' | 'labelPosition' | 'labelWidth' | 'labelHeight'
  >
> &
  Pick<Form, 'addItem' | 'removeItem'>;

export interface FormItemContextValue {
  onChange: FormItem['handleChange'];
  onBlur: FormItem['handleBlur'];
}

export const FormContext = React.createContext<FormContextValue>({
  addItem: () => {},
  removeItem: () => {},
});

export const FormItemContext = React.createContext<FormItemContextValue>({
  onChange: () => {},
  onBlur: () => {},
});
