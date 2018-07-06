import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from './Checkbox.jsx';
import './checkbox-group.css';

export default class CheckboxGroup extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange = (checked, changedValue, ev) => {
        const {
            value,
            onChange
        } = this.props;
        let groupValue = value.slice();

        if (!Array.isArray(changedValue)) {
            changedValue = [changedValue];
        }

        if (checked) {
            changedValue.forEach((item) => {
                if (!groupValue.includes(item)) {
                    groupValue.push(item);
                }
            });
            // groupValue = [...(new Set(groupValue.concat(changedValue)))];
        } else {
            groupValue = groupValue.filter((item) => {
                return !changedValue.includes(item);
            });
        }

        onChange && onChange(groupValue, ev);
    }

    isPartOfArray(first, second) {
        if (Array.isArray(second)) {
            return second.every((item) => {
                return first.includes(item);
            });
        }
        return first.includes(second);
    }

    render() {
        const {
            value,
            disabled,
            children,
            className,
            style
        } = this.props;

        const checkboxs = React.Children.map(children, (checkbox) => {
            return (
                <Checkbox
                    {...checkbox.props}
                    checked={this.isPartOfArray(value, checkbox.props.value)}
                    disabled={checkbox.props.disabled || disabled}
                    onChange={this.handleChange}
                >
                    {checkbox.props.children}
                </Checkbox>
            );
        });

        return (
            <span
                className={`x-checkbox-group ${className}`}
                style={style}
            >
                {checkboxs}
            </span>
        );
    }
}

CheckboxGroup.propTypes = {
    value: PropTypes.array,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object
};

CheckboxGroup.defaultProps = {
    disabled: false,
    className: '',
    style: {}
};
