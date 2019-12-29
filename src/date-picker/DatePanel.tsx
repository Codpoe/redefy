import React from 'react';
import cx from 'classnames';
import Button from '../button/index';
import { DatePickerState } from './DatePicker';
import { format } from '../utils/date-utils';
import bem from '../utils/bem';

const b = bem('rdf-date-picker__date-panel');

export interface DatePanelProps {
  valueStr: string;
  dateObj: DatePickerState['dateObj'];
  today: Date;
}

export default class DatePanel extends React.Component<DatePanelProps> {
  renderCurrentMonth() {
    const {
      valueStr,
      today,
      dateObj: { year, month, monthLength },
    } = this.props;
    const todayStr = format(today, 'yyyy-MM-dd');

    return Array.from({ length: monthLength }, (item, index) => {
      const dateStr = format(new Date(year, month, index + 1), 'yyyy-MM-dd');
      const isNow = dateStr === todayStr;
      const isSelected = dateStr === valueStr;

      return (
        <Button
          key={dateStr}
          className={b('day')}
          title={dateStr}
          data-value={dateStr}
          type={isNow || isSelected ? 'primary' : 'default'}
          flat={isNow && !isSelected}
          text={!isNow && !isSelected}
          fullRound
        >
          {index + 1}
        </Button>
      );
    });
  }

  renderPrevMonth() {
    const {
      dateObj: { year, month, startDay },
    } = this.props;
    const prevMonthEndDate = new Date(year, month, 0).getDate();
    const prevMonthStartDate = prevMonthEndDate - startDay + 1;

    return Array.from({ length: startDay }).map((item, index) => {
      const dateStr = format(
        new Date(year, month - 1, prevMonthStartDate + index),
        'yyyy-MM-dd'
      );
      const cls = cx(b('day'), b('day', 'prev'));
      return (
        <Button
          className={cls}
          key={dateStr}
          title={dateStr}
          data-value={dateStr}
          text
          fullRound
        >
          {prevMonthStartDate + index}
        </Button>
      );
    });
  }

  renderNextMonth() {
    const {
      dateObj: { year, month, startDay, monthLength },
    } = this.props;

    return Array.from({ length: 42 - startDay - monthLength }).map(
      (item, index) => {
        const _dateStr = format(
          new Date(year, month + 1, index + 1),
          'yyyy-MM-dd'
        );
        const cls = cx(b('day'), b('day', 'next'));
        return (
          <Button
            className={cls}
            key={_dateStr}
            title={_dateStr}
            data-value={_dateStr}
            text
            fullRound
          >
            {index + 1}
          </Button>
        );
      }
    );
  }

  render() {
    return (
      <>
        {['日', '一', '二', '三', '四', '五', '六'].map(item => (
          <span key={item} className={b('week')}>
            {item}
          </span>
        ))}
        {this.renderPrevMonth()}
        {this.renderCurrentMonth()}
        {this.renderNextMonth()}
      </>
    );
  }
}
