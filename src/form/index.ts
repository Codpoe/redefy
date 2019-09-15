import Form from './Form';
import FormItem from './FormItem';
import toBeField from './to-be-field';

export * from './Form';
export * from './FormItem';
export * from './to-be-field';

Form.Item = FormItem;
Form.toBeField = toBeField;

export default Form;
