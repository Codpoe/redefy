import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from '../menu/MenuItem.jsx';

export default class SelectOption extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            value,
            label,
            children,
            ...rest
        } = this.props;

        return (
            <MenuItem value={value} label={label} {...rest}>
                {children}
            </MenuItem>
        )
    }
}