import React from 'react';
import cx from 'classnames';
import bem from '../utils/bem';
import BaseSelect from '../base-select/index';
import Option, { OptionProps } from './Option';
import './styles/select.css';

const b = bem('x-select');

export interface SelectProps {
  [key: string]: any;
  value?: any | any[];
  defaultValue?: any | any[];
  data: OptionProps[];
  placeholder?: string;
  onChange?: (value: SelectProps['value']) => void;
  className?: string;
  style?: React.CSSProperties;
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
}

export interface SelectState {
  value: any | any[];
  visible: boolean;
}

export default class Select extends React.Component<SelectProps, SelectState> {
  static getDerivedStateFromProps(props: SelectProps) {
    if ('value' in props) {
      return { value: props.value };
    }
    return null;
  }

  state: SelectState = {
    value: 'value' in this.props ? this.props.value : this.props.defaultValue,
    visible: false,
  };

  isSelected = (optionValue: any) => {
    const { value } = this.state;

    if (Array.isArray(value)) {
      return value.indexOf(optionValue) >= 0;
    }

    return value === optionValue;
  };

  proxyChange(value: any) {
    if (!('value' in this.props)) {
      this.setState({ value });
    }

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  handleVisibleChange = (visible: boolean) => {
    this.setState({ visible });
  };

  handleClear = () => {
    const { value } = this.props;

    if (Array.isArray(value)) {
      this.proxyChange([]);
    } else {
      this.proxyChange('');
    }
  };

  handleOptionClick = (optionValue: any) => {
    let { value } = this.state;

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

    this.proxyChange(value);
  };

  getOptionsAndLabels() {
    const { data } = this.props;
    const labels: string[] = [];

    const options = data.reduce(
      (res, item) => {
        const selected = this.isSelected(item.value);

        if (selected) {
          labels.push(item.text || (item.label as string));
        }

        res = res.concat(
          <Option
            {...item}
            key={item.value}
            selected={selected}
            onClick={() => this.handleOptionClick(item.value)}
          />
        );

        return res;
      },
      [] as React.ReactNode[]
    );

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
