import React, { useCallback } from 'react';
import cx from 'classnames';
import Item, { BreadcrumbItemProps } from './Item';
import bem from '../utils/bem';

const b = bem('rdf-breadcrumb');

export interface BreadcrumbProps {
  items?: BreadcrumbItemProps[];
  separator?: React.ReactNode;
  onClick?: (item: BreadcrumbItemProps) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const Breadcrumb: React.FC<BreadcrumbProps> & {
  Item: typeof Item;
} = props => {
  const { separator, onClick, children, className, style } = props;
  let { items } = props;

  const handleItemClick = useCallback(
    (item: BreadcrumbItemProps) => {
      if (!onClick) {
        return;
      }
      onClick(item);
    },
    [onClick]
  );

  if (!items) {
    items =
      React.Children.map(children, (item: any) => {
        if (!item) {
          return null;
        }
        return item.props;
      }) || [];
  }

  return (
    <div className={cx(b(), className)} style={style}>
      {items
        .filter(item => !!item)
        .map((item, index, arr) => (
          <>
            <Item {...item} onClick={handleItemClick} />
            {index !== arr.length - 1 && (
              <span className={b('separator')}>{separator}</span>
            )}
          </>
        ))}
    </div>
  );
};

Breadcrumb.defaultProps = {
  separator: '/',
};

Breadcrumb.Item = Item;

export default Breadcrumb;
