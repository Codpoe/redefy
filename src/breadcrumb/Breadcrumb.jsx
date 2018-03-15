import React from 'react';
import PropTypes from 'prop-types';
import BreadcrumbItem from './BreadcrumbItem.jsx';

import './breadcrumb.css';

const Breadcrumb = ({ separator, children, className, style }) => {
    const content = React.Children.map(children, item => {
        if (!item) {
            return;
        }
        return (
            <span className="my-breadcrumb__wrapper">
                <BreadcrumbItem {...item.props} />
                <span className="my-breadcrumb__separator">{separator}</span>
            </span>
        )    
    })

    return (
        <div
            className={`my-breadcrumb ${className}`}
            style={style}
        >
            {content}
        </div>
    )
}

Breadcrumb.propTypes = {
    separator: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object
};

Breadcrumb.defaultProps = {
    separator: '/'
}

export default Breadcrumb;