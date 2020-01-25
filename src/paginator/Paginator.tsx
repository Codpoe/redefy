import React from 'react';
import cx from 'classnames';
import bem from '../utils/bem';
import Button, { ButtonProps } from '../button/index';
import Form from '../form/index';
import Input from '../input/index';
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconMoreHorizontal,
} from '../icon/index';

const b = bem('rdf-paginator');

export interface PaginatorProps {
  total: number;
  page?: number;
  defaultPage?: number;
  pageSize: number;
  quickJump?: boolean;
  onChange?: (page: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface PaginatorState {
  totalPages: number;
  page: number;
  hoverMore: '' | 'left' | 'right';
  form: {
    input: any;
  };
}

export class Paginator extends React.Component<PaginatorProps, PaginatorState> {
  static defaultProps: Partial<PaginatorProps> = {
    defaultPage: 1,
  };

  static getDerivedStateFromProps(
    props: PaginatorProps
  ): Partial<PaginatorState> | null {
    const { total, pageSize, page } = props;
    const totalPages = Math.ceil(total / pageSize);

    if ('page' in props) {
      return { totalPages, page };
    }

    return { totalPages };
  }

  state: PaginatorState = {
    totalPages: Math.ceil(this.props.total / this.props.pageSize),
    page: ('page' in this.props
      ? this.props.page
      : this.props.defaultPage) as number,
    hoverMore: '',
    form: { input: '' },
  };

  handleChange(page: number) {
    const { onChange } = this.props;
    const { totalPages } = this.state;

    page = Math.max(1, page);
    page = Math.min(totalPages, page);

    if (!('page' in this.props)) {
      this.setState({ page });
    }

    if (onChange) {
      onChange(page);
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
    const { page, hoverMore } = this.state;

    if (index) {
      this.handleChange(+index);
      return;
    }

    if (hoverMore === 'left') {
      this.handleChange(page - 5);
    } else if (hoverMore === 'right') {
      this.handleChange(page + 5);
    }
  };

  handlePrevNextClick = (ev: React.SyntheticEvent) => {
    const { type } = (ev.currentTarget as any).dataset;
    const { totalPages, page } = this.state;

    if (type === 'prev') {
      this.handleChange(Math.max(1, page - 1));
    } else {
      this.handleChange(Math.min(totalPages, page + 1));
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
    const { page } = this.state;
    let otherProps: Partial<ButtonProps> = {
      text: true,
    };

    if (index === page) {
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
      icon = <IconChevronsLeft />;
    } else if (align === 'right') {
      icon = <IconChevronsRight />;
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
        {align === hoverMore ? icon : <IconMoreHorizontal />}
      </Button>
    );
  }

  renderPrevNext(type: 'prev' | 'next') {
    const { totalPages, page } = this.state;
    const disabled = type === 'prev' ? page === 1 : page === totalPages;

    return (
      <Button
        className={b(type)}
        text
        disabled={disabled}
        data-type={type}
        onClick={this.handlePrevNextClick}
      >
        {type === 'prev' ? <IconChevronLeft /> : <IconChevronRight />}
      </Button>
    );
  }

  renderItems() {
    const { totalPages, page } = this.state;

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => {
        return this.renderItem(index + 1);
      });
    }

    let first: React.ReactNode;
    let last: React.ReactNode;
    let middle: React.ReactNode;
    let leftMore: React.ReactNode;
    let rightMore: React.ReactNode;
    let startIndex = 1;
    let endIndex = totalPages;

    if (page - 3 <= 1) {
      startIndex = 1;
      endIndex = 5;
    } else {
      startIndex = page - 1;
      first = this.renderItem(1);
      leftMore = this.renderMore('left');
    }

    if (page + 3 >= totalPages) {
      startIndex = totalPages - 4;
      endIndex = totalPages;
    } else {
      endIndex = Math.max(page + 1, 5);
      last = this.renderItem(totalPages);
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
    const { totalPages, form } = this.state;

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

              if (value < 1 || value > totalPages) {
                return `1 ~ ${totalPages}`;
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
