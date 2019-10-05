import React from 'react';
import cx from 'classnames';
import Input, { InputProps } from '../input/index';
import Pop from '../pop/index';
import bem from '../utils/bem';
import { ChevronDown, X } from '../icon/index';
import './styles/base-select.css';

const b = bem('x-base-select');

export interface BaseSelectProps {
  [key: string]: any;
  value?: any;
  visible?: boolean;
  onChange?: (visible: boolean) => void;
  onClear?: () => void;
}

export interface BaseSelectState {
  showClearIcon: boolean;
}

export default class BaseSelect extends React.Component<
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

  handleClear: InputProps['onSuffixClick'] = ev => {
    const { onChange, onClear } = this.props;

    ev.stopPropagation();
    onChange && onChange(false);
    onClear && onClear();
  };

  renderSuffix() {
    const { value, visible } = this.props;

    // render arrow
    if (typeof value === 'undefined' || value === '') {
      return (
        <ChevronDown
          className={cx(b('indicator'), {
            [b('indicator', 'active')]: visible,
          })}
        />
      );
    }

    // render clear
    return <X className={b('indicator')} />;
  }

  render() {
    const { value, visible, onChange, children, ...restProps } = this.props;
    const { showClearIcon } = this.state;

    return (
      <Pop
        trigger="click"
        visible={visible}
        content={children}
        onChange={onChange}
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
