import React from 'react';
import PropTypes from 'prop-types';

const Body = ({ children, className, style }) => (
    <div
        className={`my-dialog__body ${className}`}
        style={style}
    >
        {children}
    </div>
);

Body.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
};

Body.defaultProps = {
    className: '',
    style: {}
};

export default Body;