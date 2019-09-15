import React from 'react';
import { FormItemContext, FormItemContextValue } from './context';

export interface FieldProps {
  fieldContext: FormItemContextValue;
}

function toBeField<T extends FieldProps>(Component: React.ComponentType<T>) {
  const FormField: React.FC<Omit<T, keyof FieldProps>> = function(
    props: Omit<T, keyof FieldProps>
  ) {
    return (
      <FormItemContext.Consumer>
        {value => <Component {...(props as T)} fieldContext={value} />}
      </FormItemContext.Consumer>
    );
  };

  return FormField;
}

export default toBeField;
