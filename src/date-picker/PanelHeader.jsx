import React from 'react';
import PropTypes from 'prop-types';

export default class PanelHeader extends React.Component {

    renderDateHeader() {
        const {
            data,
            onYearClick,
            onMonthClick,
            onPrevClick,
            onNextClick
        } = this.props;

        return (
            <div className="my-date-picker__header">
                <i className="icon icon-chevron-left"></i>
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
                <i className="icon icon-chevron-right"></i>
            </div>
        )
    }

    renderYearHeader() {
        const {
            data,
            onPrevClick,
            onNextClick
        } = this.props;

        return (
            <div className="my-date-picker__header">
                <i className="icon icon-chevron-left"></i>
                <span
                    className="my-date-picker__header-year"
                >
                    {`${startYear} ~ ${endYear}`}
                </span>
                <i className="icon icon-chevron-right"></i>
            </div>
        )
    }

    render() {
        const {
            panel,
            data,
            onYearClick,
            onMonthClick,
            onPrevClick,
            onNextClick
        } = this.props;

        switch (panel) {
            case 'date':
                return (
                    <div className="my-date-picker__header">
                        <i className="icon icon-chevron-left"></i>
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
                        <i className="icon icon-chevron-right"></i>
                    </div>
                )
        }
    }
}