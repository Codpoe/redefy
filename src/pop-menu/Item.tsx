import React from 'react';
import cx from 'classnames';
import bem from '../utils/bem';
import './styles/item.css';

const b = bem('x-pop-menu-item');

export interface ItemProps {
  [key: string]: any;
  value?: any;
  label: React.ReactNode;
  href?: string;
  target?: '_self' | '_blank';
  disabled?: boolean;
  menu?: ItemProps[];
  onClick?: (item: ItemProps, ev: React.SyntheticEvent) => void;
  className?: string;
  style?: React.CSSProperties;
}

const Item: React.FC<ItemProps> = props => {
  const {
    label,
    href,
    target = '_blank',
    disabled,
    onClick,
    className,
    ...restProps
  } = props;
  const NodeName = href ? 'a' : 'div';
  const cls = cx(b(), className, {
    [b('', 'disabled')]: disabled,
  });
  const handleClick = (ev: React.SyntheticEvent) => {
    if (!onClick) {
      return;
    }
    onClick(props, ev);
  };

  return (
    <NodeName
      {...restProps}
      className={cls}
      href={href}
      target={target}
      onClick={handleClick}
    >
      {label}
    </NodeName>
  );
};

export default Item;
