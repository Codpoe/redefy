import React from 'react';
import cx from 'classnames';
import Button from '../button';
import bem from '../utils/bem';

const b = bem('rdf-breadcrumb-item');

export interface BreadcrumbItemProps {
  [key: string]: any;
  href?: string;
  className?: string;
  style?: React.CSSProperties;
}

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = props => {
  const { className, onClick, ...restProps } = props;

  const handleClick = () => {
    if (!onClick) {
      return;
    }
    onClick(props);
  };

  return (
    <Button
      {...restProps}
      className={cx(b(), className)}
      text
      target="_self"
      onClick={handleClick}
    />
  );
};

export default BreadcrumbItem;
