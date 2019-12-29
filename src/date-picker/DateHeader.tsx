import React from 'react';
import { DatePickerState } from './DatePicker';
import Button from '../button/index';
import { IconChevronLeft, IconChevronRight } from '../icon/index';
import bem from '../utils/bem';

const b = bem('rdf-date-picker-header');

export interface DateHeaderProps {
  dateObj: DatePickerState['dateObj'];
  currentPanel: DatePickerState['currentPanel'];
  onPrevClick: () => void;
  onNextClick: () => void;
  onPanelChange: (panel: DatePickerState['currentPanel']) => void;
}

export default class DateHeader extends React.Component<DateHeaderProps> {
  handleYearClick = () => {
    this.props.onPanelChange('year');
  };

  handleMonthClick = () => {
    this.props.onPanelChange('month');
  };

  renderContent() {
    const { currentPanel, dateObj } = this.props;
    let yearContent;

    if (currentPanel === 'year') {
      const startYear = Math.floor(dateObj.year / 10) * 10;
      const endYear = startYear + 9;

      yearContent = `${startYear} ~ ${endYear}`;
    } else {
      yearContent = `${dateObj.year} 年`;
    }

    return (
      <div className={b('content')}>
        <Button className={b('year')} text onClick={this.handleYearClick}>
          {yearContent}
        </Button>
        {currentPanel === 'date' && (
          <>
            <Button className={b('month')} text onClick={this.handleMonthClick}>
              {dateObj.month + 1} 月
            </Button>
          </>
        )}
      </div>
    );
  }

  render() {
    const { onPrevClick, onNextClick } = this.props;

    return (
      <div className={b()}>
        {this.renderContent()}
        <Button className={b('prev')} text onClick={onPrevClick}>
          <IconChevronLeft />
        </Button>
        <Button className={b('next')} text onClick={onNextClick}>
          <IconChevronRight />
        </Button>
      </div>
    );
  }
}
