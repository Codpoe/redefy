import React from 'react';
import PropTypes from 'prop-types';

import './css/menu-group.css';

const MenuGroup = (props) => {
    const {
        label,
        children
    } = props;

    return (
        <ul className="z-menu-group">
            <span className="z-menu-group__title">{label}</span>
            {children}
        </ul>
    )
};

MenuGroup.propTypes = {
    label: PropTypes.string
};

export default MenuGroup;

