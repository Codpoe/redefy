import React from 'react';
import cx from 'classnames';
import Button, { ButtonProps } from './Button';
import './style/group.css';

export interface ButtonGroupProps {
  children?: React.ReactElement[];
  className?: string;
  style?: React.CSSProperties;
}

const ButtonGroup: React.SFC<ButtonGroupProps & ButtonProps> = ({
  children,
  className,
  style,
  ...restProps
}: ButtonGroupProps & ButtonProps) => {
  if (!children) {
    return null;
  }

  const btns = React.Children.map(children, item => {
    if (!item) {
      return null;
    }
    return <Button {...item.props} {...restProps} />;
  });

  return (
    <div className={cx('jm-button-group', className)} style={style}>
      {btns}
    </div>
  );
};

export default ButtonGroup;
