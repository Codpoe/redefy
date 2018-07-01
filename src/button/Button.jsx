import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Loader from '../loader/';
import './button.css';

export default class Button extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(ev) {
        const { onClick } = this.props;

        if (onClick) {
            onClick(ev);
        }
    }

    render() {
        const {
            type,
            size,
            text,
            hollow,
            round,
            circle,
            block,
            disabled,
            loading,
            href,
            target,
            loaderColor,
            children,
            className,
            style
        } = this.props;

        const Node = href ? 'a' : 'button';

        const classes = classnames(className, 'x-button', {
            [`x-button--${type}`]: true,
            [`x-button--${size}`]: true,
            'x-button--text': text,
            'x-button--hollow': hollow,
            'x-button--round': round,
            'x-button--circle': circle,
            'x-button--block': block,
            'x-button--disabled': disabled,
            'x-button--loading': loading
        });

        return (
            <Node
                className={classes}
                style={style}
                href={href}
                target={href ? target : undefined}
                disabled={disabled}
                onClick={this.handleClick}
            >
                {children}
                {loading && (
                    <Loader color={loaderColor} />
                )}
            </Node>
        );
    }
}

Button.propTypes = {
    type: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'error']),
    size: PropTypes.oneOf(['normal', 'large', 'small', 'smaller']),
    text: PropTypes.bool,
    hollow: PropTypes.bool,
    round: PropTypes.bool,
    circle: PropTypes.bool,
    block: PropTypes.bool,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    href: PropTypes.string,
    target: PropTypes.oneOf(['_self', '_blank']),
    onClick: PropTypes.func,
    children: PropTypes.any,
    loaderColor: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object
};

Button.defaultProps = {
    type: 'default',
    size: 'normal',
    text: false,
    hollow: false,
    round: false,
    circle: false,
    block: false,
    disabled: false,
    loading: false,
    href: undefined,
    target: '_blank',
    loaderColor: 'white',
    className: '',
    style: {}
};
