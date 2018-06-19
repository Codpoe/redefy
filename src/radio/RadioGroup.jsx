import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Radio from './Radio.jsx';
import './radio-group.css';

export default class RadioGroup extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            value,
            disabled,
            onChange,
            children,
            className,
            style
        } = this.props;

        const classes = classnames(className, 'x-radio-group');

        const radios = React.Children.map(children, radio => {
            return (
                <Radio
                    {...radio.props}
                    checked={radio.props.value === value}
                    disabled={radio.props.disabled || disabled}
                    onChange={onChange}
                >
                    {radio.props.children}
                </Radio>
            );
        });

        return (
            <span
                className={classes}
                style={style}
            >
                {radios}
            </span>
        );
    }
}

RadioGroup.propTypes = {
    value: PropTypes.any,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    onChange: PropTypes.func
};

RadioGroup.defaultProps = {
    disabled: false,
    className: '',
    style: {}
};
