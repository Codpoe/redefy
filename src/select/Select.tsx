import React from 'react';
import cx from 'classnames';
import bem from '../utils/bem';
import BaseSelect from '../base-select/index';
import Option from './Option';
import './styles/select.css';

const b = bem('x-select');

export interface SelectProps {
  [key: string]: any;
  value?: any | any[];
  placeholder?: string;
  onChange?: (value: SelectProps['value']) => void;
  className?: string;
  style?: React.CSSProperties;
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
}

export interface SelectState {
  visible: boolean;
  valueToShow: any;
}

export default class Select extends React.Component<SelectProps, SelectState> {
  static Option: typeof Option;

  static getDerivedStateFromProps(props: SelectProps) {
    if (typeof props.value === 'undefined') {
      return null;
    }

    return null;
  }

  state: SelectState = {
    visible: false,
    valueToShow: '',
  };

  isSelected = (optionValue: any) => {
    if (typeof optionValue === 'undefined') {
      return false;
    }

    const { value } = this.props;

    if (Array.isArray(value)) {
      return value.indexOf(optionValue) >= 0;
    }

    return value === optionValue;
  };

  getValueToShow() {}

  handleVisibleChange = (visible: boolean) => {
    this.setState({ visible });
  };

  handleClear = () => {
    const { value, onChange } = this.props;

    if (!onChange) {
      return;
    }

    if (Array.isArray(value)) {
      onChange([]);
    } else {
      onChange('');
    }
  };

  handleOptionClick = (optionValue: any) => {
    let { value, onChange } = this.props;

    if (typeof optionValue === 'undefined' || !onChange) {
      return;
    }

    if (Array.isArray(value)) {
      const index = value.indexOf(optionValue);
      value = value.slice();

      if (index < 0) {
        value.push(optionValue);
      } else {
        value.splice(index, 1);
      }
    } else {
      value = optionValue;
      this.setState({ visible: false });
    }

    onChange(value);
  };

  getOptionsAndLabels() {
    const { children } = this.props;
    const labels: string[] = [];

    const options = React.Children.toArray(children).reduce((res, item) => {
      if (!item) {
        return null;
      }

      const props = (item as any).props;

      if ((item as any).type.name === 'Option') {
        const selected = this.isSelected(props.value);

        if (selected) {
          labels.push(props.label || props.children);
        }

        res = (res as React.ReactNode[]).concat(
          <Option
            {...props}
            key={props.value}
            selected={selected}
            onClick={() => this.handleOptionClick(props.value)}
          />
        );
      } else {
        res = (res as React.ReactNode[]).concat(item);
      }

      return res;
    }, []);

    return { options, labels };
  }

  render() {
    const {
      className,
      style,
      contentClassName,
      contentStyle,
      placeholder,
      ...restProps
    } = this.props;
    const { visible } = this.state;
    const { options, labels } = this.getOptionsAndLabels();

    return (
      <BaseSelect
        {...restProps}
        className={cx(b(), className)}
        style={style}
        contentClassName={cx(b('content'), contentClassName)}
        contentStyle={contentStyle}
        value={labels.join(' | ')}
        visible={visible}
        placeholder={placeholder}
        onChange={this.handleVisibleChange}
        onClear={this.handleClear}
      >
        {options}
      </BaseSelect>
    );
  }
}
