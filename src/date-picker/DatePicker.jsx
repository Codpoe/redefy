import React from 'react';
import PropTypes from 'prop-types';

import Popup from '../popup/';
import Input from '../input/';
import DatePanel from './DatePanel.jsx';
import YearPanel from './YearPanel.jsx';
import MonthPanel from './MonthPanel.jsx';
import { format } from '../utils/date-utils';

import './date-picker.css';

export default class DatePicker extends React.Component {
    constructor(props) {
        super(props);

        let _date;
        let dateString;

        if (!props.value) {
            _date = new Date();
            dateString = '';
        } else {
            _date = new Date(props.value);
            dateString = format(_date, 'yyyy-MM-dd')
        }

        this.state = {
            dateString,
            active: false,
            showClearIcon: false,
            currentPanel: 'date',
            currentData: this.calcData(_date),
            today: new Date()
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value) {
            let _date;
            let dateString;

            if (!nextProps.value) {
                _date = new Date();
                dateString = '';
            } else {
                _date = new Date(nextProps.value);
                dateString = format(_date, 'yyyy-MM-dd');
            }

            this.setState({
                dateString,
                currentData: this.calcData(_date)
            });
        }
    }

    handlePopupChange = ({ active }) => {
        const { value } = this.props;
        
        this.setState({
            active
        })

        if (active) {
            let _date;
            let dateString;

            if (!value) {
                _date = new Date();
                dateString = '';
            } else {
                _date = new Date(value);
                dateString = format(_date, 'yyyy-MM-dd');
            }

            this.setState({
                dateString,
                currentData: this.calcData(_date),
                currentPanel: 'date',
                today: new Date()
            });
        }
    }

    handleMouseEnter = () => {
        this.setState({
            showClearIcon: true
        });
    }

    handleMouseLeave = () => {
        this.setState({
            showClearIcon: false
        });
    }

    handleHeaderYearClick = () => {
        this.setState({
            currentPanel: 'year'
        });
    }

    handleHeaderMonthClick = () => {
        this.setState({
            currentPanel: 'month'
        });
    }

    handleDayClick = (date) => {
        const { onChange } = this.props;

        this.popupRef.hide();
        onChange && onChange(date, new Date(date));
    }

    handleYearMonthClick(type, value) {
        const { currentData: { year, month, date } } = this.state;
        let newData;

        if (type === 'year') {
            newData = this.calcData(new Date(value, month, 1));
        } else if (type === 'month') {
            newData = this.calcData(new Date(year, value, 1));
        }

        this.setState({
            currentPanel: 'date',
            currentData: newData
        });
    }

    handlePrevClick = () => {
        this.handlePrevNextClick('prev');
    }

    handleNextClick = () => {
        this.handlePrevNextClick('next');
    }

    handlePrevNextClick = (type) => {
        const {
            currentPanel,
            currentData: { year, month, date }
        } = this.state;
        let newData;

        switch (currentPanel) {
            case 'date':
                newData = this.calcData(new Date(
                    year,
                    month + (type === 'prev' ? -1 : 1),
                    1
                ));
                break;
            case 'year':
                newData = this.calcData(new Date(
                    year + (type === 'prev' ? -10 : 10),
                    month,
                    1
                ));
                break;
            case 'month':
                newData = this.calcData(new Date(
                    year + (type === 'prev' ? -1 : 1),
                    month,
                    1
                ));
                break;
        }

        this.setState({
            currentData: newData
        });
    }

    handleClear = (ev) => {
        const { onChange } = this.props;

        ev.stopPropagation();
        this.popupRef.hide();
        onChange && onChange('', null);
    }

    /**
     * 根据传进的 Date 对象，进行数据处理和整合，得出组件需要的信息
     * @param {Date} dateArg 
     */
    calcData(dateArg) {
        const year = dateArg.getFullYear();
        const month = dateArg.getMonth();
        const date = dateArg.getDate();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDay = new Date(year, month + 1, 0).getDay();

        return {
            year,
            month,
            date,
            firstDay,
            lastDay,
            monthLength: new Date(year, month + 1, 0).getDate(),
            origin: dateArg
        }
    }

    getPanel() {
        const { today, dateString, currentPanel, currentData } = this.state;

        switch (currentPanel) {
            case 'date':
                return (
                    <DatePanel
                        date={dateString}
                        today={today}
                        data={currentData}
                        onDayClick={this.handleDayClick}
                        onYearClick={this.handleHeaderYearClick}
                        onMonthClick={this.handleHeaderMonthClick}
                        onPrevClick={this.handlePrevClick}
                        onNextClick={this.handleNextClick}
                    />
                );
            case 'year':
                return (
                    <YearPanel
                        data={currentData}
                        onYearClick={this.handleYearMonthClick.bind(this, 'year')}
                        onPrevClick={this.handlePrevClick}
                        onNextClick={this.handleNextClick}
                    />
                );
            case 'month':
                return (
                    <MonthPanel
                        data={currentData}
                        onMonthClick={this.handleYearMonthClick.bind(this, 'month')}
                        onYearClick={this.handleHeaderYearClick}
                        onPrevClick={this.handlePrevClick}
                        onNextClick={this.handleNextClick}
                    />
                )
        }
    }

    render() {
        const {
            value,
            placeholder,
            outline,
            round,
            disabled,
            className,
            style
        } = this.props;
        const {
            dateString,
            active,
            showClearIcon,
            currentPanel,
            currentData
        } = this.state;

        return (
            <div className={`my-date-picker`}>
                <Popup
                    ref={el => this.popupRef = el}
                    content={this.getPanel()}
                    trigger="click"
                    popupWidth="100%"
                    disabled={disabled}
                    onChange={this.handlePopupChange}
                >
                    <Input
                        className={className}
                        style={style}
                        value={dateString}
                        placeholder={placeholder}
                        outline={outline}
                        round={round}
                        disabled={disabled}
                        readOnly
                        keepFocused={active}
                        onMouseEnter={this.handleMouseEnter}
                        onMouseLeave={this.handleMouseLeave}
                        suffix={(!disabled && value && showClearIcon)
                            ? (<i className="icon icon-x" onClick={this.handleClear}></i>)
                            : (<i className="icon icon-calendar"></i>)
                        }
                    />
                </Popup>    
            </div>
        )
    }
}

DatePicker.propTypes = {
    placeholder: PropTypes.string,
    outline: PropTypes.bool,
    round: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    onChange: PropTypes.func
}

DatePicker.defaultProps = {
    placeholder: '选择日期',
    outline: false,
    round: false,
    disabled: false
}