import React from 'react';
import PropTypes from 'prop-types';

import '../common/color.css';
import './checkbox.css';

export default class Checkbox extends React.Component {
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
            children,
            className,
            style
        } = this.props;

        return (
            <span
                className={`z-checkbox
                    ${checked ? 'z-checkbox--checked' : ''}
                    ${disabled ? 'z-checkbox--disabled' : ''}
                    ${className}
                `}
                style={style}
            >

                <span className="z-checkbox__indicator"></span>
                <label className="z-checkbox__label">{children}</label>
                <input
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={this.handleChange}
                />
            </span>
        )
    }
}

Checkbox.propTypes = {
    value: PropTypes.any,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object
}

Checkbox.defaultProps = {
    checked: false,
    disabled: false,
    className: '',
    style: {}
}