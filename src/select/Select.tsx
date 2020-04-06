import React from 'react';
import cx from 'classnames';
import bem from '../utils/bem';
import BaseSelect from '../base-select/index';
import Option, { OptionProps } from './Option';

const b = bem('rdf-select');

export interface SelectProps {
  [key: string]: any;
  value?: any | any[];
  defaultValue?: any | any[];
  items: OptionProps[];
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
  keySelectable: boolean;
  keySelectedIndex: number;
}

export class Select extends React.Component<SelectProps, SelectState> {
  static getDerivedStateFromProps(props: SelectProps) {
    if ('value' in props) {
      return { value: props.value };
    }
    return null;
  }

  state: SelectState = {
    value: 'value' in this.props ? this.props.value : this.props.defaultValue,
    visible: false,
    keySelectable: true,
    keySelectedIndex: -1,
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

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

    if (visible) {
      window.addEventListener('keydown', this.handleKeyDown);
    } else {
      this.setState({ keySelectedIndex: -1 });
      window.removeEventListener('keydown', this.handleKeyDown);
    }
  };

  handleClear = () => {
    const { value } = this.props;

    if (Array.isArray(value)) {
      this.proxyChange([]);
    } else {
      this.proxyChange('');
    }
  };

  handleMouseEnter = () => {
    this.setState({
      keySelectable: false,
      keySelectedIndex: -1,
    });
  };

  handleMouseLeave = () => {
    this.setState({
      keySelectable: true,
    });
  };

  handleKeyDown = (ev: KeyboardEvent) => {
    const { key, keyCode } = ev;
    const { items } = this.props;
    const { keySelectable, keySelectedIndex } = this.state;

    if (!items.length || !keySelectable) {
      return;
    }

    ev.preventDefault();

    if (key === 'ArrowUp' || keyCode === 38) {
      if (keySelectedIndex > 0) {
        this.setState({
          keySelectedIndex: keySelectedIndex - 1,
        });
      }
      return;
    }

    if (key === 'ArrowDown' || keyCode === 40) {
      if (keySelectedIndex < items.length - 1) {
        this.setState({
          keySelectedIndex: keySelectedIndex + 1,
        });
      }
      return;
    }

    if (key === 'enter' || keyCode === 13) {
      if (keySelectedIndex >= 0) {
        this.handleOptionClick(items[keySelectedIndex].value);
      }
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
      this.handleVisibleChange(false);
    }

    this.proxyChange(value);
  };

  getOptionsAndLabels() {
    const { items } = this.props;
    const { keySelectedIndex } = this.state;
    const labels: string[] = [];

    const options = items.reduce((res, item, index) => {
      const selected = this.isSelected(item.value);

      if (selected) {
        labels.push(item.text || (item.label as string));
      }

      res = res.concat(
        <Option
          {...item}
          key={item.value}
          selected={selected}
          preSelected={index === keySelectedIndex}
          onClick={
            item.disabled ? undefined : () => this.handleOptionClick(item.value)
          }
        />
      );

      return res;
    }, [] as React.ReactNode[]);

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
        <div
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          {options}
        </div>
      </BaseSelect>
    );
  }
}

export default Select;
