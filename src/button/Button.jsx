import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loader from '../loader/';
import './button.css';

export default class Button extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(ev) {
        const { onClick } = this.props;
        onClick && onClick(ev);
    }

    render() {
        const {
            type,
            size,
            text,
            outline,
            flat,
            round,
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

        return (
            <Node className={`
                ${className}
                z-button
                z-button--${type}
                z-button--${size}
                ${text ? 'z-button--text' : ''}
                ${outline ? 'z-button--outline' : ''}
                ${flat ? 'z-button--flat' : ''}
                ${round ? 'z-button--round' : ''}
                ${block ? 'z-button--block' : ''}
                ${disabled ? 'z-button--disabled' : ''}
                ${loading ? 'z-button--loading' : ''}`}
                style={style}
                href={href}
                target={target}
                disabled={disabled}
                onClick={this.handleClick}
            >
                {children}
                {loading && (
                    <Loader color={loaderColor}/>
                )}
            </Node>
        )
    }
}

Button.propTypes = {
    type: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'error']),
    size: PropTypes.oneOf(['normal', 'large', 'small']),
    text: PropTypes.bool,
    outline: PropTypes.bool,
    flat: PropTypes.bool,
    round: PropTypes.bool,
    block: PropTypes.bool,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    onClick: PropTypes.func,
    loaderColor: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object
}

Button.defaultProps = {
    type: 'default',
    size: 'normal',
    text: false,
    outline: false,
    flat: false,
    round: false,
    block: false,
    disabled: false,
    loading: false,
    loaderColor: 'white',
    className: '',
    style: {}
}