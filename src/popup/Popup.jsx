import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import './popup.css';

export default class Popup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false
        };

        this.handleOuterClick = this.handleOuterClick.bind(this);
        this.handleContentClick = this.handleContentClick.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.bodyClickListener = this.bodyClickListener.bind(this);
    }

    getChildContext() {
        return {
            popup: this
        };
    }

    handleOuterClick(ev) {
        const { trigger, disabled, onChange } = this.props;
        const { active } = this.state;

        if (disabled) {
            return;
        }

        if (trigger !== 'click') {
            return;
        }

        if (active) {
            return;
        }

        this.setState({
            active: true
        });
        onChange && onChange({ active: true });
        document.addEventListener('click', this.bodyClickListener);
    }

    handleContentClick(ev) {
        ev.stopPropagation();
        ev.nativeEvent.stopImmediatePropagation();
    }

    handleMouseOver(ev) {
        const { trigger, onChange } = this.props;
        const { active } = this.state;
        
        if (trigger !== 'hover') {
            return;
        }

        if (active) {
            return;
        }

        this.setState({
            active: true
        });
        onChange && onChange({ active: true });
    }

    handleMouseOut(ev) {
        const { trigger, onChange } = this.props;
        const { active } = this.state;
        
        if (trigger !== 'hover') {
            return;
        }

        if (!active) {
            return;
        }

        this.setState({
            active: false
        });
        onChange && onChange({ active: false });
    }

    handleFocus(ev) {
        const { trigger, disabled, onChange } = this.props;
        
        if (disabled) {
            return;
        }

        if (trigger !== 'focus') {
            return;
        }

        this.setState({
            active: true
        });
        onChange && onChange({ active: true });
    }

    handleBlur(ev) {
        const { trigger, onChange } = this.props;

        if (trigger !== 'focus') {
            return;
        }

        this.setState({
            active: false
        });
        onChange && onChange({ active: false });
    }

    bodyClickListener(ev) {
        const { onChange } = this.props;

        this.setState({
            active: false
        });
        onChange && onChange({ active: false });
        document.removeEventListener('click', this.bodyClickListener);
    }

    hide() {
        const { hideOnClick, onChange } = this.props;

        this.setState({
            active: false
        });
        onChange && onChange({ active: false });
        document.removeEventListener('click', this.bodyClickListener);
    }

    render() {
        const {
            position,
            trigger,
            hideOnClick,
            content,
            popupWidth,
            popupHeight,
            children
        } = this.props;

        const {
            active
        } = this.state;

        return (
            <div
                className={`my-popup
                    ${active ? 'my-popup--active' : ''}
                `}
                onMouseOver={this.handleMouseOver}
                onMouseLeave={this.handleMouseOut}
            >
                <span
                    className="my-popup__outer"
                    onClick={this.handleOuterClick}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                >
                    {children}
                </span>

                <CSSTransition
                    classNames={`${position}-`}
                    in={active}
                    timeout={{ exit: 400 }}
                >
                    <div
                        className={`my-popup__wrapper
                        my-popup__wrapper--${position}`}
                        onClick={this.handleContentClick}
                        style={{ minWidth: popupWidth }}
                    >
                        <div
                            className="my-popup__content"
                            style={{
                                minWidth: popupWidth,
                                maxHeight: popupHeight
                            }}
                        >
                            {content}
                        </div>
                    </div>
                </CSSTransition>    
            </div>
        )
    }
}

Popup.childContextTypes = {
    popup: PropTypes.any
};

Popup.propTypes = {
    content: PropTypes.any,
    trigger: PropTypes.oneOf(['hover', 'click', 'focus']),
    hideOnClick: PropTypes.bool,
    position: PropTypes.oneOf([
        'bottom-left', 'bottom-center', 'bottom-right',
        'top-left', 'top-center', 'top-right',
        'left-top', 'left-center', 'left-bottom',
        'right-top', 'right-center', 'right-bottom'
    ]),
    popupWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    disabled: PropTypes.bool,
    onChange: PropTypes.func
};

Popup.defaultProps = {
    trigger: 'hover',
    hideOnClick: false,
    position: 'bottom-left',
    disabled: false
}