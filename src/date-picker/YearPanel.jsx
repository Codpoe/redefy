import React from 'react';
import PropTypes from 'prop-types';

export default class YearPanel extends React.Component {

    handleBodyClick = (ev) => {
        const { onYearClick } = this.props;
        const { year } = ev.target.dataset;
        if (!year) {
            return;
        }
        onYearClick && onYearClick(year);
    }

    render() {
        const {
            data,
            onPrevClick,
            onNextClick
        } = this.props;

        const startYear = Math.floor(data.year / 10) * 10;
        const endYear = startYear + 9;

        return (
            <div className="my-date-picker__year-panel">
                <div className="my-date-picker__header">
                    <i
                        className="icon icon-chevron-left"
                        onClick={onPrevClick}
                    >
                    </i>

                    <span
                        className="my-date-picker__header-year"
                    >
                        {`${startYear} ~ ${endYear}`}
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
                    {new Array(10).fill().map((item, index) => {
                        const _year = startYear + index;
                        return (
                            <span
                                key={_year}
                                title={_year}
                                data-year={_year}
                                className={`
                                    my-date-picker__body-year
                                    ${data.year === _year ? 'my-date-picker__body-year--active' : ''}
                                `}
                            >
                                {_year}
                            </span>
                    )})}
                </div>
            </div>
        )
    }
}