import React from 'react';
import cx from 'classnames';
import bem from '../utils/bem';
import Button, { ButtonProps } from '../button/index';
import Form from '../form/index';
import Input from '../input/index';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from '../icon/index';

const b = bem('x-paginator');

export interface PaginatorProps {
  total: number;
  current?: number;
  defaultCurrent?: number;
  quickJump?: boolean;
  onChange?: (current: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface PaginatorState {
  current: number;
  hoverMore: '' | 'left' | 'right';
  form: {
    input: any;
  };
}

export interface PaginatorChangeParams {
  total: number;
  current: number;
}

export class Paginator extends React.Component<PaginatorProps, PaginatorState> {
  static defaultProps: Partial<PaginatorProps> = {
    defaultCurrent: 1,
  };

  static getDerivedStateFromProps(
    props: PaginatorProps
  ): Partial<PaginatorState> | null {
    if ('current' in props) {
      return { current: props.current };
    }
    return null;
  }

  state: PaginatorState = {
    current: ('current' in this.props
      ? this.props.current
      : this.props.defaultCurrent) as number,
    hoverMore: '',
    form: { input: '' },
  };

  handleChange(current: number) {
    const { total, onChange } = this.props;

    current = Math.max(1, current);
    current = Math.min(total, current);

    if (!('current' in this.props)) {
      this.setState({ current });
    }

    if (onChange) {
      onChange(current);
    }
  }

  handleMouseEnter = (ev: React.SyntheticEvent) => {
    const { more } = (ev.currentTarget as any).dataset;
    this.setState({ hoverMore: more });
  };

  handleMouseLeave = () => {
    this.setState({ hoverMore: '' });
  };

  handleClick = (ev: React.SyntheticEvent) => {
    const { index } = (ev.target as any).dataset;
    const { current, hoverMore } = this.state;

    if (index) {
      this.handleChange(+index);
      return;
    }

    if (hoverMore === 'left') {
      this.handleChange(current - 5);
    } else if (hoverMore === 'right') {
      this.handleChange(current + 5);
    }
  };

  handlePrevNextClick = (ev: React.SyntheticEvent) => {
    const { type } = (ev.currentTarget as any).dataset;
    const { total } = this.props;
    const { current } = this.state;

    if (type === 'prev') {
      this.handleChange(Math.max(1, current - 1));
    } else {
      this.handleChange(Math.min(total, current + 1));
    }
  };

  handleJumperChange = (value: any) => {
    this.setState({
      form: { input: value },
    });
  };

  handleJump = (valid: boolean) => {
    const input = parseInt(this.state.form.input, 10);

    if (!valid || !input) {
      return;
    }

    this.setState({
      form: { input },
    });

    this.handleChange(input);
  };

  renderItem(index: number) {
    const { current } = this.state;
    let otherProps: Partial<ButtonProps> = {
      text: true,
    };

    if (index === current) {
      otherProps = {
        type: 'primary',
      };
    }

    return (
      <Button
        key={index}
        className={b('item')}
        data-index={index}
        {...otherProps}
      >
        {index}
      </Button>
    );
  }

  renderMore(align: 'left' | 'right') {
    const { hoverMore } = this.state;
    let icon;

    if (align === 'left') {
      icon = <ChevronsLeft />;
    } else if (align === 'right') {
      icon = <ChevronsRight />;
    }

    return (
      <Button
        key={align}
        className={b('more')}
        text
        data-more={align}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {align === hoverMore ? icon : <MoreHorizontal />}
      </Button>
    );
  }

  renderPrevNext(type: 'prev' | 'next') {
    const { total } = this.props;
    const { current } = this.state;
    const disabled = type === 'prev' ? current === 1 : current === total;

    return (
      <Button
        className={b(type)}
        text
        disabled={disabled}
        data-type={type}
        onClick={this.handlePrevNextClick}
      >
        {type === 'prev' ? <ChevronLeft /> : <ChevronRight />}
      </Button>
    );
  }

  renderItems() {
    const { total } = this.props;
    const { current } = this.state;

    if (total <= 7) {
      return Array.from({ length: total }, (item, index) => {
        return this.renderItem(index + 1);
      });
    }

    let first: React.ReactNode;
    let last: React.ReactNode;
    let middle: React.ReactNode;
    let leftMore: React.ReactNode;
    let rightMore: React.ReactNode;
    let startIndex = 1;
    let endIndex = total;

    if (current - 3 <= 1) {
      startIndex = 1;
      endIndex = 5;
    } else {
      startIndex = current - 1;
      first = this.renderItem(1);
      leftMore = this.renderMore('left');
    }

    if (current + 3 >= total) {
      startIndex = total - 4;
      endIndex = total;
    } else {
      endIndex = Math.max(current + 1, 5);
      last = this.renderItem(total);
      rightMore = this.renderMore('right');
    }

    middle = Array.from(
      { length: endIndex - startIndex + 1 },
      (item, index) => {
        return this.renderItem(startIndex + index);
      }
    );

    return ([] as React.ReactNode[]).concat(
      first,
      leftMore,
      middle,
      rightMore,
      last
    );
  }

  renderJumper() {
    const { total } = this.props;
    const { form } = this.state;

    return (
      <Form
        value={form}
        validators={{
          input: {
            custom(value) {
              if (!value) {
                return;
              }

              value = parseInt(value, 10);

              if (value < 1 || value > total) {
                return `1 ~ ${total}`;
              }
            },
          },
        }}
        labelWidth={60}
        onSubmit={this.handleJump}
      >
        <Form.Item prop="input" className={b('jumper-wrap')}>
          <Input
            className={b('jumper')}
            value={form.input}
            onChange={this.handleJumperChange}
          />
        </Form.Item>
      </Form>
    );
  }

  render() {
    const { quickJump, className, style } = this.props;

    return (
      <div className={cx(className, b())} style={style}>
        <ul className={b('items')} onClick={this.handleClick}>
          {this.renderPrevNext('prev')}
          {this.renderItems()}
          {this.renderPrevNext('next')}
        </ul>
        {quickJump && this.renderJumper()}
      </div>
    );
  }
}

export default Paginator;
