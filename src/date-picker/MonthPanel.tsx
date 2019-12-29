import React from 'react';
import Button from '../button/index';
import { DatePickerState } from './DatePicker';
import bem from '../utils/bem';
import { format } from '../utils/date-utils';

const b = bem('rdf-date-picker__month-panel');

export interface MonthPanelProps {
  valueStr: string;
  dateObj: DatePickerState['dateObj'];
  today: Date;
}

const MonthPanel: React.FC<MonthPanelProps> = props => {
  const {
    valueStr,
    dateObj: { year },
    today,
  } = props;
  const nowStr = format(today, 'yyyy-MM');
  const selectedStr = valueStr.slice(0, 7);

  return (
    <>
      {Array.from({ length: 12 }, (item, index) => {
        const dateStr = format(new Date(year, index), 'yyyy-MM');
        const isNow = dateStr === nowStr;
        const isSelected = dateStr === selectedStr;

        return (
          <div className={b('item')} key={index}>
            <Button
              title={String(index + 1)}
              data-value={index}
              type={isNow || isSelected ? 'primary' : 'default'}
              flat={isNow && !isSelected}
              text={!isNow && !isSelected}
            >
              {index + 1} 月
            </Button>
          </div>
        );
      })}
    </>
  );
};

export default MonthPanel;
