import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './radio.css';

export default class Radio extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(ev) {
        const { value, checked, onChange } = this.props;
        onChange && onChange({ value, checked: !checked }, ev);
    }

    render() {
        const {
            value,
            checked,
            disabled,
            onChange,
            children,
            className,
            style
        } = this.props;

        return (
            <span
                className={`
                    z-radio
                    ${checked ? 'z-radio--checked' : ''}
                    ${disabled ? 'z-radio--disabled' : ''}
                    ${className}
                `}
                style={style}
            >
                <span className="z-radio__indicator"></span>
                <label className="z-radio__label">{children}</label>
                <input 
                    type="radio"
                    checked={checked}
                    disabled={disabled}
                    onChange={this.handleChange}
                />
            </span>
        )    
    }
}

Radio.propTypes = {
    value: PropTypes.any,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func
}

Radio.defaultProps = {
    checked: false,
    disabled: false
}