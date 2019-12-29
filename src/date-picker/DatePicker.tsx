import React from 'react';
import cx from 'classnames';
import BaseSelect from '../base-select/index';
import { IconCalendar } from '../icon/index';
import DateHeader from './DateHeader';
import DatePanel from './DatePanel';
import MonthPanel from './MonthPanel';
import YearPanel from './YearPanel';
import bem from '../utils/bem';
import { format, parseDate } from '../utils/date-utils';

const b = bem('rdf-date-picker');
const panelHeight = 224;

export interface DatePickerProps {
  value?: string | number | Date;
  placeholder?: string;
  onChange?: (value: DatePickerProps['value']) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface DatePickerState {
  valueStr: string;
  dateObj: DateObj;
  today: Date;
  visible: boolean;
  currentPanel: 'date' | 'month' | 'year';
}

export type DateObj = ReturnType<typeof parseDate>;

export type PanelName = 'DatePanel' | 'MonthPanel' | 'YearPanel';

export class DatePicker extends React.Component<
  DatePickerProps,
  DatePickerState
> {
  static getDerivedStateFromProps(
    props: DatePickerProps
  ): Partial<DatePickerState> | null {
    const { value } = props;

    if (typeof value === 'undefined' || value == '') {
      return {
        valueStr: '',
      };
    } else {
      const date = new Date(value);

      return {
        valueStr: format(date, 'yyyy-MM-dd'),
      };
    }
  }

  state: DatePickerState = {
    valueStr: '',
    dateObj: parseDate(),
    today: new Date(),
    currentPanel: 'date',
    visible: false,
  };

  panelTypes: DatePickerState['currentPanel'][] = ['year', 'month', 'date'];

  panelMap = {
    year: YearPanel,
    month: MonthPanel,
    date: DatePanel,
  };

  handleVisibleChange = (visible: boolean) => {
    const newState: Partial<DatePickerState> = {
      visible,
    };

    if (visible) {
      const { value } = this.props;
      const date = new Date();
      newState.today = date;
      newState.currentPanel = 'date';

      if (typeof value === 'undefined' || value === '') {
        newState.dateObj = parseDate(date);
      } else {
        newState.dateObj = parseDate(new Date(value));
      }
    }

    this.setState(newState as DatePickerState);
  };

  handleClear = () => {
    const { onChange } = this.props;

    if (!onChange) {
      return;
    }

    this.setState({ visible: false });
    onChange('');
  };

  handlePrevClick = () => {
    this.handlePrevNextClick('prev');
  };

  handleNextClick = () => {
    this.handlePrevNextClick('next');
  };

  handlePrevNextClick = (type: 'prev' | 'next') => {
    const {
      currentPanel,
      dateObj: { year, month },
    } = this.state;
    let dateObj!: DateObj;

    switch (currentPanel) {
      case 'date':
        dateObj = parseDate(
          new Date(year, month + (type === 'prev' ? -1 : 1), 1)
        );
        break;
      case 'month':
        dateObj = parseDate(
          new Date(year + (type === 'prev' ? -1 : 1), month, 1)
        );
        break;
      case 'year':
        dateObj = parseDate(
          new Date(year + (type === 'prev' ? -10 : 10), month, 1)
        );
    }

    this.setState({ dateObj });
  };

  handlePanelChange = (panel: DatePickerState['currentPanel']) => {
    this.setState({ currentPanel: panel });
  };

  handleItemClick = (ev: any, panel: string) => {
    const { value } = ev.target.dataset;

    if (!value) {
      return;
    }

    if (panel === 'date') {
      const { onChange } = this.props;

      if (!onChange) {
        return;
      }

      this.setState({ visible: false });
      onChange(new Date(value));

      return;
    }

    if (panel === 'month') {
      const { dateObj } = this.state;

      this.setState({
        dateObj: parseDate(new Date(dateObj.year, +value)),
        currentPanel: 'date',
      });

      return;
    }

    if (panel === 'year') {
      this.setState({
        dateObj: parseDate(new Date(+value, 0)),
        currentPanel: 'month',
      });

      return;
    }
  };

  getPanelsStyle(currentPanel: DatePickerState['currentPanel']) {
    const y = this.panelTypes.indexOf(currentPanel) * panelHeight;

    return {
      transform: `translateY(-${y}px)`,
    };
  }

  renderPanel() {
    const { valueStr, dateObj, today, currentPanel } = this.state;

    return this.panelTypes.map((type, index) => {
      const cls = cx(b('panel'), b(`${type}-panel`), {
        [b('panel', 'active')]: type === currentPanel,
      });

      return (
        <div
          className={cls}
          key={index}
          onClick={ev => this.handleItemClick(ev, type)}
        >
          {React.createElement(this.panelMap[type], {
            valueStr,
            dateObj,
            today,
          })}
        </div>
      );
    });
  }

  render() {
    const { placeholder, className, style } = this.props;
    const { valueStr, dateObj, visible, currentPanel } = this.state;

    return (
      <BaseSelect
        className={cx(b(), className)}
        style={style}
        contentClassName={b('content')}
        value={valueStr}
        placeholder={placeholder}
        visible={visible}
        icon={<IconCalendar />}
        onChange={this.handleVisibleChange}
        onClear={this.handleClear}
      >
        <DateHeader
          dateObj={dateObj}
          currentPanel={currentPanel}
          onPrevClick={this.handlePrevClick}
          onNextClick={this.handleNextClick}
          onPanelChange={this.handlePanelChange}
        />
        <div className={b('panels-wrap')}>
          <div
            className={b('panels')}
            style={this.getPanelsStyle(currentPanel)}
          >
            {this.renderPanel()}
          </div>
        </div>
      </BaseSelect>
    );
  }
}

export default DatePicker;
