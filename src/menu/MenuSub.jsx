import React from 'react';
import PropTypes from 'prop-types';

import './css/menu-item.css';
import './css/menu-sub.css';

export default class MenuSub extends React.Component {
    constructor(props) {
        super(props);
        this.type = 'sub';
        this.handleTitleClick = this.handleTitleClick.bind(this);
    }

    componentDidMount() {
        this.contentHeight = this.contentRef.scrollHeight;
        this.transitionDuration = Math.min(this.contentHeight / 180, 0.4);
    }

    handleTitleClick(ev) {
        const { value, label } = this.props;
        this.context.menu.handleClick({
            type: this.type,
            value,
            label,
            open: this.isOpen()
        }, ev);
    }

    isOpen() {
        const { value } = this.props;
        const { openValue } = this.context.menu.state;

        if (!openValue) {
            return false;
        }

        return openValue.includes(value);
    }

    calcContentStyle() {
        if (!this.contentHeight) {
            return {}
        }
    }

    render() {
        const {
            value,
            label,
            children
        } = this.props;

        const open = this.isOpen();

        return (
            <li className={`z-menu-sub
                ${open ? 'z-menu-sub--open' : ''}`}
            >
                <div
                    className="z-menu-item z-menu-sub__title"
                    onClick={this.handleTitleClick}
                >
                    <span>{label}</span>
                    <i className="z-menu-sub__indicator icon-arrow-down"></i>
                </div>
                <ul
                    ref={el => this.contentRef = el}
                    className="z-menu-sub__content"
                    style={{
                        maxHeight: `${open ? this.contentHeight || 500 : 0}px`,
                        transitionDuration: `${this.transitionDuration || 0}s`
                    }}
                >
                    {children}
                </ul>
            </li>
        )
    }
}

MenuSub.contextTypes = {
    menu: PropTypes.any
};

MenuSub.propTypes = {
    value: PropTypes.string,
    label: PropTypes.string
};