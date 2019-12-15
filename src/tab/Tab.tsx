import React from 'react';
import cx from 'classnames';
import bem from '../utils/bem';
import Item, { ItemProps } from './Item';

const b = bem('x-tab');

export interface TabProps {
  items?: ItemProps[];
  active?: any;
  defaultActive?: any;
  indicator?: React.ReactNode;
  stretch?: boolean;
  vertical?: boolean;
  onActiveChange?: (activeValue: ItemProps['value'], item: ItemProps) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface TabState {
  active?: any;
}

export class Tab extends React.Component<TabProps, TabState> {
  static Item: typeof Item;

  static getDerivedStateFromProps(props: TabProps): TabState | null {
    if ('active' in props) {
      return { active: props.active };
    }
    return null;
  }

  state: TabState = {
    active:
      'active' in this.props ? this.props.active : this.props.defaultActive,
  };

  handleItemClick: ItemProps['onClick'] = item => {
    const { onActiveChange } = this.props;

    if (!('active' in this.props)) {
      this.setState({ active: item.value });
    }

    if (onActiveChange) {
      onActiveChange(item.value, item);
    }
  };

  renderItems() {
    const { items, stretch, indicator, children } = this.props;
    const { active } = this.state;

    if (items) {
      return items.map(item => {
        const { value } = item;
        return (
          <Item
            {...item}
            key={value}
            active={value === active}
            stretch={stretch}
            indicator={indicator}
            onClick={this.handleItemClick}
          />
        );
      });
    }

    return React.Children.map(children, (item: any) => {
      if (!item) {
        return null;
      }

      const { value } = item.props;
      return (
        <Item
          {...item.props}
          key={value}
          active={value === active}
          stretch={stretch}
          indicator={indicator}
          onClick={this.handleItemClick}
        />
      );
    });
  }

  render() {
    const { className, style } = this.props;
    const items = this.renderItems();

    return (
      <div className={cx(className, b())} style={style}>
        <div className={b('labels')}>{items}</div>
        {items.map((item: any) => {
          const { value, active, children } = item.props;
          return (
            active &&
            children && (
              <div key={value} className={b('content')}>
                {children}
              </div>
            )
          );
        })}
      </div>
    );
  }
}

export default Tab;
