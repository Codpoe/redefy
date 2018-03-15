import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Radio from './Radio.jsx';
import './radio-group.css';

export default class RadioGroup extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            value,
            vertical,
            disabled,
            onChange,
            children,
            className,
            style
        } = this.props;

        const radios = React.Children.map(children, radio => {
            return (
                <Radio
                    {...radio.props}
                    checked={radio.props.value === value}
                    disabled={radio.props.disabled === undefined
                        ? disabled
                        : radio.props.disabled}
                    onChange={onChange}
                >
                    {radio.props.children}
                </Radio>
            )
        })

        return (
            <span
                className={`
                    z-radio-group
                    ${vertical ? 'z-radio-group--vertical' : ''}
                    ${className}
                `}
                style={style}
            >
                {radios}    
            </span>
        )
    }
}

RadioGroup.propTypes = {
    value: PropTypes.any,
    vertical: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func
}

RadioGroup.defaultProps = {
    vertical: false,
    disabled: false
}