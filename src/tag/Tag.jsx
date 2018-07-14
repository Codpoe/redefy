import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './tag.css';

export default class Tag extends React.Component {
    handleClick = () => {
        const { onClose } = this.props;
        onClose && onClose();
    }

    render() {
        const {
            type,
            color,
            round,
            closable,
            className,
            style,
            children
        } = this.props;

        const classes = classnames(className, 'x-tag', {
            [`x-tag--${type}`]: true,
            'x-tag--round': round,
            'x-tag--closable': closable
        });

        return (
            <span
                className={classes}
                style={{
                    backgroundColor: color,
                    borderColor: color,
                    ...style
                }}
            >
                <span className="x-tag__text">{children}</span>
                {closable && (
                    <i className="icon icon-x" onClick={this.handleClick}></i>
                )}
            </span>
        );
    }
}

Tag.propTypes = {
    type: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'error']),
    color: PropTypes.string,
    round: PropTypes.bool,
    closable: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object
};

Tag.defaultProps = {
    type: 'default',
    color: '',
    round: false,
    closable: false,
    className: '',
    style: {}
};
