import React from 'react';
import PropTypes from 'prop-types';

import { format } from '../utils/date-utils';

export default class DatePanel extends React.Component {
    constructor(props) {
        super(props);
    }

    handleBodyClick = (ev) => {
        const { onDayClick } = this.props;
        const { date } = ev.target.dataset;
        if (!date) {
            return;
        }
        onDayClick && onDayClick(date);
    }

    renderHeader() {
        const {
            data,
            onYearClick,
            onMonthClick,
            onPrevClick,
            onNextClick
        } = this.props;

        return (
            <div className="my-date-picker__header">
                <i
                    className="icon icon-chevron-left"
                    onClick={onPrevClick}
                >
                </i>

                <div className="my-date-picker__header-content">
                    <span    
                        className="my-date-picker__header-year"
                        onClick={onYearClick}
                    >
                        {data.year} 年
                    </span>
                    <span
                        className="my-date-picker__header-month"
                        onClick={onMonthClick}
                    >
                        {data.month + 1} 月
                    </span>
                </div>

                <i
                    className="icon icon-chevron-right"
                    onClick={onNextClick}
                >
                </i>
            </div>
        )
    }

    renderBody() {
        const { data } = this.props;
        return (
            <div
                className="my-date-picker__body"
                onClick={this.handleBodyClick}
            >
                {['日', '一', '二', '三', '四', '五', '六'].map(item => (
                    <span
                        key={item}    
                        className="my-date-picker__body-week"
                    >
                        {item}
                    </span>
                ))}
                {this.renderPrevMonth()}    
                {this.renderCurrentMonth()}
                {this.renderNextMonth()}
            </div>
        )
    }

    renderCurrentMonth() {
        const {date, today, data: { year, month, monthLength, origin } } = this.props;
        const todayString = format(today, 'yyyy-MM-dd');

        return new Array(monthLength).fill().map((item, index) => {
            const dateStr = format(new Date(year, month, index + 1), 'yyyy-MM-dd');
            return (
                <span
                    key={dateStr}
                    title={dateStr}
                    data-date={dateStr}
                    className={`my-date-picker__body-day
                        ${date === dateStr ? 'my-date-picker__body-day--active' : ''}
                        ${todayString === dateStr ? 'my-date-picker__body-day--today' : ''}
                    `}
                >
                    {index + 1}
                </span>
            )
        })
    }

    renderPrevMonth() {
        const { data: { year, month, firstDay } } = this.props;
        // 上个月的最后一天
        const prevMonthLastDate = new Date(year, month, 0).getDate();
        // 上个月在这个月的开始
        const prevMonthStartDate = prevMonthLastDate - firstDay + 1;

        return Array(firstDay).fill().map((item, index) => {
            const dateStr = format(new Date(year, month - 1, prevMonthStartDate + index), 'yyyy-MM-dd');
            return (
                <span
                    key={dateStr}
                    title={dateStr}
                    data-date={dateStr}
                    className="my-date-picker__body-day my-date-picker__body-prev-day"
                >
                    {prevMonthStartDate + index}
                </span>
            )
        })
    }

    renderNextMonth() {
        const { data: { year, month, lastDay } } = this.props;

        return Array(6 - lastDay).fill().map((item, index) => {
            const dateStr = format(new Date(year, month + 1, index + 1), 'yyyy-MM-dd');
            return (
                <span
                    key={dateStr}
                    title={dateStr}
                    data-date={dateStr}
                    className="my-date-picker__body-day my-date-picker__body-next-day"
                >
                    {index + 1}
                </span>
            )
        })
    }

    renderFooter() {
        return;
    }

    render() {

        return (
            <div className={`my-date-picker__date-panel`}>
                {this.renderHeader()}
                {this.renderBody()}
                {this.renderFooter()}
            </div>
        )
    }
}