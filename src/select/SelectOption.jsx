import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import SelectContext from './select-context';
import './select-option.css';

class SelectOption extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick = () => {
        const { value, label, onSelect } = this.props;
        onSelect(value, label);
    }

    render() {
        const {
            value,
            selected,
            className,
            style,
            children,
        } = this.props;

        const classes = classnames(className, 'x-select-option', {
            'x-select-option--selected': value === selected
        });

        return (
            <li
                className={classes}
                style={style}
                onClick={this.handleClick}
            >
                {children}
            </li>
        );
    }
}

SelectOption.propTypes = {
    value: PropTypes.any,
    label: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object
};

SelectOption.defaultProps = {
    label: '',
    className: '',
    style: {}
};

export default props => (
    <SelectContext.Consumer>
        {({ value: selected, onSelect }) => (
            <SelectOption
                {...props}
                selected={selected}
                onSelect={onSelect}
            />
        )}
    </SelectContext.Consumer>
);
