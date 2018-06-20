import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Input from '../input/';
import './input-number.css';

export default class InputNumber extends React.Component {
    constructor(props) {
        super(props);
    }

    isValidInput(inputValue) {
        return inputValue === '+'
            || inputValue === '-'
            || !isNaN(inputValue)
    };

    transformValue(value) {
        const { min, max, step } = this.props;
        let newValue = String(value).replace(/^(\+|\-)/, '');

        if (newValue === '') {
            newValue = '';
        } else {
            newValue = Number(value);
            if (newValue < min) {
                newValue = min;
            } else if (newValue > max) {
                newValue = max;
            }
        }
        
        return newValue;
    }

    handleChange = (value) => {
        const { onChange } = this.props;

        if (this.isValidInput(value)) {
            onChange && onChange(value);
        }
    }

    handleBlur = () => {
        const { value, onChange, onBlur } = this.props;
        
        onChange && onChange(this.transformValue(value));
        onBlur && onBlur();
    }

    handleMinus = () => {
        const { value, step, min, disabled, readOnly, onChange } = this.props;

        if (disabled || readOnly) {
            return;
        }

        onChange && onChange(Math.max(Number(value) - step, min));
    }

    handlePlus = () => {
        const { value, step, max, disabled, readOnly, onChange } = this.props;

        if (disabled || readOnly) {
            return;
        }

        onChange && onChange(Math.min(Number(value) + step, max));
    }

    renderMinus() {
        const { value, min, disabled } = this.props;
        const classes = classnames('x-input-number__icon-wrapper', {
            'x-input-number__icon-wrapper--disabled': disabled || value <= min
        });
        return (
            <div
                className={classes}
                onClick={this.handleMinus}
            >
                <i className="icon icon-minus"></i>
            </div>
        );
    }

    renderPlus() {
        const { value, max, disabled } = this.props;
        const classes = classnames('x-input-number__icon-wrapper', {
            'x-input-number__icon-wrapper--disabled': disabled || value >= max
        });
        return (
            <div
                className={classes}
                onClick={this.handlePlus}
            >
                <i className="icon icon-plus"></i>
            </div>
        );
    }

    render() {
        const {
            value,
            step,
            min,
            max,
            size,
            round,
            disabled,
            readOnly,
            editable,
            autoFocus,
            className,
            style
        } = this.props;

        const classes = classnames(className, 'x-input-number', {
            'x-input-number--disabled': disabled,
        });

        return (
            <div className={classes} style={style}>
                <Input
                    value={value}
                    size={size}
                    round={round}
                    disabled={disabled}
                    readOnly={readOnly || !editable}
                    prefix={this.renderMinus()}
                    suffix={this.renderPlus()}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                />
            </div>
        );
    }
}

InputNumber.propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    step: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    size: PropTypes.oneOf(['small', 'normal', 'large']),
    round: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    editable: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
};

InputNumber.defaultProps = {
    step: 1,
    min: -Infinity,
    max: Infinity,
    size: 'normal',
    round: false,
    disabled: false,
    readOnly: false,
    editable: true,
    className: '',
    style: {}
};
