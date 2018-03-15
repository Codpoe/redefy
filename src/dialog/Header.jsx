import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ children, className, style }) => (
    <div
        className={`my-dialog__header ${className}`}
        style={style}
    >
        {children}
    </div>
);

Header.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
};

Header.defaultProps = {
    className: '',
    style: {}
};

export default Header;