import React from 'react';

export default ({ children, className, style }) => (
    <span className={`my-breadcrumb__item ${className}`} style={style}>
        {children}
    </span>
)