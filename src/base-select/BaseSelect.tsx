import React from 'react';
import cx from 'classnames';
import Input, { InputProps } from '../input/index';
import Pop from '../pop/index';
import bem from '../utils/bem';
import { IconChevronDown, IconX } from '../icon/index';

const b = bem('x-base-select');

export interface BaseSelectProps extends Omit<InputProps, 'fieldContext'> {
  [key: string]: any;
  value?: any;
  icon?: React.ReactNode;
  visible?: boolean;
  onChange?: (visible: boolean) => void;
  onClear?: () => void;
  className?: string;
  style?: React.CSSProperties;
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
}

export interface BaseSelectState {
  showClearIcon: boolean;
}

export class BaseSelect extends React.Component<
  BaseSelectProps,
  BaseSelectState
> {
  static defaultProps: BaseSelectProps = {
    visible: false,
  };

  static getDerivedStateFromProps(props: BaseSelectProps): BaseSelectState {
    const { value, onClear } = props;

    if (typeof value === 'undefined' || value === '' || !onClear) {
      return { showClearIcon: false };
    }

    return { showClearIcon: true };
  }

  state: BaseSelectState = {
    showClearIcon: false,
  };

  handleClear: InputProps['onSuffixClick'] = ev => {
    const { onChange, onClear } = this.props;

    ev.stopPropagation();
    onChange && onChange(false);
    onClear && onClear();
  };

  renderSuffix() {
    const { value, visible, icon } = this.props;
    const { showClearIcon } = this.state;

    // render arrow
    if (typeof value === 'undefined' || value === '' || !showClearIcon) {
      return (
        icon || (
          <IconChevronDown
            className={cx(b('indicator'), {
              [b('indicator', 'active')]: visible,
            })}
          />
        )
      );
    }

    // render clear
    return <IconX className={b('indicator')} />;
  }

  render() {
    const {
      value,
      visible,
      onChange,
      className,
      style,
      contentClassName,
      contentStyle,
      children,
      ...restProps
    } = this.props;
    const { showClearIcon } = this.state;

    return (
      <Pop
        trigger="click"
        visible={visible}
        content={children}
        onChange={onChange}
        className={className}
        style={style}
        contentClassName={contentClassName}
        contentStyle={contentStyle}
      >
        <Input
          value={value}
          focused={visible}
          readOnly
          suffix={this.renderSuffix()}
          onSuffixClick={showClearIcon ? this.handleClear : undefined}
          {...restProps}
        />
      </Pop>
    );
  }
}

export default BaseSelect;
