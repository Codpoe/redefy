import React from 'react';
import cx from 'classnames';
import bem from '../utils/bem';
import { Check } from '../icon/index';
import './styles/option.css';

const b = bem('x-select-option');

export interface OptionProps {
  [key: string]: any;
  value?: any;
  label?: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: (value: any) => void;
  className?: string;
  style?: React.CSSProperties;
}

const Option: React.FC<OptionProps> = props => {
  const {
    value,
    selected,
    disabled,
    onClick,
    className,
    style,
    children,
    ...restProps
  } = props;
  const cls = cx(b(), className, {
    [b('', 'selected')]: selected,
    [b('', 'disabled')]: disabled,
  });

  return (
    <div
      {...restProps}
      className={cls}
      style={style}
      data-value={value}
      onClick={onClick}
    >
      <div className={b('item')}>{children}</div>
      {selected && <Check className={b('icon')} />}
    </div>
  );
};

export default Option;
