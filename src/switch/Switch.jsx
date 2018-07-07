import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

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
            className,
            style
        } = this.props;

        const classes = classnames(className, 'x-switch', {
            'x-switch--switched': checked,
            'x-switch--disabled': disabled
        });

        return (
            <span className={classes} style={style}>
                {/* <span className="x-switch__indicator"></span> */}
                <input
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={this.handleChange} />
            </span>
        );
    }
}

Switch.propTypes = {
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    onChange: PropTypes.func
};

Switch.defaultProps = {
    checked: false,
    disabled: false,
    className: '',
    style: {}
};
