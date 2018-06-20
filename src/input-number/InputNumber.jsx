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
        const { value, step, min, onChange } = this.props;
        onChange && onChange(Math.max(Number(value) - step, min));
    }

    handlePlus = () => {
        const { value, step, max, onChange } = this.props;
        onChange && onChange(Math.min(Number(value) + step, max));
    }

    renderMinus() {
        const { value, min } = this.props;
        const classes = classnames('x-input-number__icon-wrapper', {
            'x-input-number__icon-wrapper--disabled': value <= min
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
        const { value, max } = this.props;
        const classes = classnames('x-input-number__icon-wrapper', {
            'x-input-number__icon-wrapper--disabled': value >= max
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
            disabled,
            readOnly,
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
                    disabled={disabled}
                    readOnly={readOnly}
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
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
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
    disabled: false,
    readOnly: false,
    className: '',
    style: {}
};
