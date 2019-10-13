import React from 'react';
import Button from '../button/index';
import { DatePickerState } from './DatePicker';
import bem from '../utils/bem';

const b = bem('x-date-picker__year-panel');

export interface YearPanelProps {
  valueStr: string;
  dateObj: DatePickerState['dateObj'];
  today: Date;
}

const YearPanel: React.FC<YearPanelProps> = props => {
  const { valueStr, dateObj, today } = props;
  const startYear = Math.floor(dateObj.year / 10) * 10;
  const nowYear = today.getFullYear();
  const selectedYear = +valueStr.slice(0, 4);

  return (
    <>
      {Array.from({ length: 10 }, (item, index) => {
        const year = startYear + index;
        const isNow = year === nowYear;
        const isSelected = year === selectedYear;

        return (
          <div className={b('item')} key={year}>
            <Button
              title={String(year)}
              data-value={year}
              type={isNow || isSelected ? 'primary' : 'default'}
              flat={isNow && !isSelected}
              text={!isNow && !isSelected}
            >
              {year}
            </Button>
          </div>
        );
      })}
    </>
  );
};

export default YearPanel;
