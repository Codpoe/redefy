import React from 'react';
import PropTypes from 'prop-types';

import './switch.css';

export default class Switch extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(ev) {
        const { checked, onChange } = this.props;
        onChange && onChange(!checked , ev);
    }

    render() {
        const {
            checked,
            disabled,
            onChange,
            children
        } = this.props;

        return (
            <span className={`z-switch
                ${checked ? 'z-switch--switched' : ''}
                ${disabled ? 'z-switch--disabled': ''}`}
            >
                <span className="z-switch__indicator"></span>
                <input
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={this.handleChange} />
            </span>
        )
    }
}

Switch.propTypes = {
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func
}

Switch.defaultProps = {
    checked: false,
    disabled: false
}