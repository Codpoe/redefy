import React from 'react';
import PropTypes from 'prop-types';

const months = [
    '一', '二', '三',
    '四', '五', '六',
    '七', '八', '九',
    '十', '十一', '十二'
];

export default class MonthPanel extends React.Component {

    handleBodyClick = (ev) => {
        const { onMonthClick } = this.props;
        const { month } = ev.target.dataset;
        if (!month) {
            return;
        }
        onMonthClick && onMonthClick(month);
    }

    render() {
        const {
            data,
            onYearClick,
            onPrevClick,
            onNextClick
        } = this.props;

        return (
            <div className="my-date-picker__month-panel">
                <div className="my-date-picker__header">
                    <i
                        className="icon icon-chevron-left"
                        onClick={onPrevClick}
                    >
                    </i>

                    <span
                        className="my-date-picker__header-month"
                        onClick={onYearClick}
                    >
                        {data.year} 年
                    </span>

                    <i
                        className="icon icon-chevron-right"
                        onClick={onNextClick}
                    >
                    </i>
                </div>

                <div
                    className="my-date-picker__body"
                    onClick={this.handleBodyClick}
                >
                    {new Array(12).fill().map((item, index) => {
                        return (
                            <span
                                key={index}
                                title={index + 1}
                                data-month={index}
                                className={`
                                    my-date-picker__body-month
                                    ${data.month === index ? 'my-date-picker__body-month--active' : ''}
                                `}
                            >
                                {months[index]}月
                            </span>
                        )
                    })}
                </div>
            </div>
        )
    }
}