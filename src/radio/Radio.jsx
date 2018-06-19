import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './radio.css';

export default class Radio extends Component {
    constructor(props) {
        super(props);
    }

    handleChange = (ev) => {
        const { value, onChange } = this.props;
        onChange && onChange(value, ev);
    }

    render() {
        const {
            value,
            checked,
            disabled,
            children,
            className,
            style
        } = this.props;

        const classes = classnames(className, 'x-radio', {
            'x-radio--checked': checked,
            'x-radio--disabled': disabled
        });

        return (
            <span
                className={classes}
                style={style}
            >
                <span className="x-radio__indicator"></span>
                <label className="x-radio__label">{children}</label>
                <input 
                    type="radio"
                    value={value}
                    checked={checked}
                    disabled={disabled}
                    onChange={this.handleChange}
                />
            </span>
        );    
    }
}

Radio.propTypes = {
    value: PropTypes.any,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    onChange: PropTypes.func
};

Radio.defaultProps = {
    checked: false,
    disabled: false,
    className: '',
    style: {}
};
