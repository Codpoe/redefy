import React from 'react';
import PropTypes from 'prop-types';

import './icon.css';

export default (props) => {
    const {
        className
    } = props;

    return (
        <i className={`icon icon-${className}`}></i>
    )
}