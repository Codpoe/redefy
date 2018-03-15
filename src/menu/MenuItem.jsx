import React from 'react';
import PropTypes from 'prop-types';

import './css/menu-item.css';

export default class MenuItem extends React.Component {
    constructor(props) {
        super(props);
        this.type = 'item';
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(ev) {
        const { value, label } = this.props;
        this.context.menu.handleClick({
            type: this.type,
            value,
            label
        }, ev);
    }

    isActive() {
        const { value: menuValue } = this.context.menu.props;
        const { value: itemValue } = this.props;

        if (!menuValue) {
            return false;
        }

        return Array.isArray(menuValue) ? menuValue.includes(itemValue)
            : menuValue === itemValue;    
    }

    getRealPosition() {
        const { horizontal, indicatorPosition } = this.context.menu.props;
        
        if (horizontal) {
            if (indicatorPosition !== 'top') {
                return 'bottom';
            }
            return 'top';
        } else {
            if (indicatorPosition !== 'right') {
                return 'left';
            }
            return 'right';
        }
    }

    render() {
        const {
            value,
            label,
            disabled,
            children,
            className,
            style
        } = this.props;

        const {
            menuWidth
        } = this.context.menu.props;

        return (
            <li
                className={`
                    z-menu-item
                    ${this.isActive() ? 'z-menu-item--active' : ''}
                    z-menu-item--${this.getRealPosition()}
                    ${className}
                `}
                style={style}
                onClick={this.handleClick}
            >
                {children}
            </li>
        )
    }
}

MenuItem.contextTypes = {
    menu: PropTypes.any
};

MenuItem.propTypes = {
    value: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object
};

MenuItem.defaultProps = {
    className: '',
    style: {}
};