import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';

import './pop.css';

export default class Pop extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false
        };
    }

    getChildContext() {
        return {
            pop: this
        };
    }

    static getDerivedStateFromProps({ active, controlled }, { active: _active }) {
        if (controlled) {
            return { active };
        }
        return null;
    }

    componentDidUpdate() {
        if (this.state.active) {
            document.addEventListener('click', this.bodyClickListener);
        } else {
            document.removeEventListener('click', this.bodyClickListener);
        }
    }

    handleOuterClick = () => {
        const { trigger, disabled } = this.props;
        const { active } = this.state;

        if (disabled || trigger !== 'click' || active) {
            return;
        }

        this.updateActive(true);
    }

    handleContentClick = (ev) => {
        ev.stopPropagation();
        ev.nativeEvent.stopImmediatePropagation();
    }

    handleMouseOver = () => {
        const { trigger, disabled } = this.props;
        const { active } = this.state;
        
        if (disabled || trigger !== 'hover' || active) {
            return;
        }

        this.updateActive(true);
    }

    handleMouseOut = () => {
        const { trigger } = this.props;
        const { active } = this.state;
        
        if (trigger !== 'hover' || !active) {
            return;
        }

        this.updateActive(false);
    }

    handleFocus = () => {
        const { trigger, disabled } = this.props;
        
        if (disabled || trigger !== 'focus') {
            return;
        }

        this.updateActive(true);
    }

    handleBlur = () => {
        const { trigger } = this.props;

        if (trigger !== 'focus') {
            return;
        }

        this.updateActive(false);
    }

    bodyClickListener = (ev) => {
        if (this.props.trigger === 'hover') {
            return;
        }
        this.updateActive(false);
    }

    hide = () => {
        const { hideOnClick, onChange } = this.props;

        this.setState({
            active: false
        });
        onChange && onChange({ active: false });
        document.removeEventListener('click', this.bodyClickListener);
    }

    /**
     * 更新 active
     * 1. 如果是受控的，则触发 change 事件，由外部更新 active
     * 2. 如果不是受控的，则直接在组件内部调用 setState 更新 active
     * @param {Boolean} active 是否弹弹弹
     */
    updateActive(active) {
        const { controlled, onChange } = this.props;
        
        if (controlled) {
            onChange && onChange(active);
        } else {
            this.setState({ active });
        }
    }

    render() {
        const {
            position,
            content,
            popHeight,
            controlled,
            disabled,
            className,
            style,
            children
        } = this.props;

        const {
            active
        } = this.state;

        const classes = classnames(className, 'x-pop', {
            'x-pop--disabled': disabled,
            'x-pop--active': active
        });

        return (
            <div
                className={classes}
                style={style}
                onMouseOver={this.handleMouseOver}
                onMouseLeave={this.handleMouseOut}
            >
                <div
                    className="x-pop__outer"
                    onClick={this.handleOuterClick}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                >
                    {children}
                </div>

                <CSSTransition
                    classNames={`${position}-`}
                    in={active}
                    timeout={{ exit: 400 }}
                >
                    <div
                        className={`x-pop__wrapper x-pop__wrapper--${position}`}
                        onClick={this.handleContentClick}
                    >
                        <div
                            className="x-pop__content"
                            style={{
                                maxHeight: `${popHeight}px`
                            }}
                        >
                            {content}
                        </div>
                    </div>
                </CSSTransition>    
            </div>
        );
    }
}

Pop.childContextTypes = {
    pop: PropTypes.any
};

Pop.propTypes = {
    content: PropTypes.any,
    trigger: PropTypes.oneOf(['hover', 'click', 'focus']),
    hideOnClick: PropTypes.bool,
    position: PropTypes.oneOf([
        'bottom-left', 'bottom-center', 'bottom-right',
        'top-left', 'top-center', 'top-right',
        'left-top', 'left-center', 'left-bottom',
        'right-top', 'right-center', 'right-bottom'
    ]),
    popHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    disabled: PropTypes.bool,
    controlled: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    onChange: PropTypes.func
};

Pop.defaultProps = {
    trigger: 'hover',
    hideOnClick: false,
    position: 'bottom-left',
    popHeight: '200',
    disabled: false,
    controlled: true,
    className: '',
    style: {}
};
