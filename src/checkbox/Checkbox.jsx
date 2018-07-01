import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './checkbox.css';

export default class Checkbox extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange = (ev) => {
        const { value, checked, onChange } = this.props;
        onChange && onChange(!checked, value, ev);
    }

    render() {
        const {
            checked,
            disabled,
            children,
            className,
            style
        } = this.props;

        const classes = classnames(className, 'x-checkbox', {
            'x-checkbox--checked': checked,
            'x-checkbox--disabled': disabled
        });

        return (
            <span
                className={classes}
                style={style}
            >
                <span className="x-checkbox__indicator">
                    <div className="x-checkbox__line"></div>
                </span>
                <label className="x-checkbox__label">{children}</label>
                <input
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={this.handleChange}
                />
            </span>
        );
    }
}

Checkbox.propTypes = {
    value: PropTypes.any,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object
};

Checkbox.defaultProps = {
    value: undefined,
    checked: false,
    disabled: false,
    className: '',
    style: {}
};
