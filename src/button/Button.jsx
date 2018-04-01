import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Loader from '../loader/';
import './button.css';

export default class Button extends Component {
    constructor(props) {
        super(props);
        // a
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

        const btnClass = classnames(className, 'my-button', {
            [`my-button--${type}`]: true,
            [`my-button--${size}`]: true,
            'my-button--text': text,
            'my-button--outline': outline,
            'my-button--flat': flat,
            'my-button--round': round,
            'my-button--circle': circle,
            'my-button--block': block,
            'my-button--disabled': disabled,
            'my-button--loading': loading
        });

        return (
            <Node
                className={btnClass}
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
    circle: PropTypes.bool,
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
    circle: false,
    block: false,
    disabled: false,
    loading: false,
    loaderColor: 'white',
    className: '',
    style: {}
}