import React from 'react';
import PropTypes from 'prop-types';

import './css/menu.css';

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
        const { defaultOpen } = props;
        
        this.state = {
            openValue: Array.isArray(defaultOpen)
                ? defaultOpen 
                : [defaultOpen]
        };
    }

    getChildContext() {
        return {
            menu: this
        };
    }

    handleClick({ type, value, label, open }, ev) {
        const { defaultOpen, onSelect } = this.props;
        const { openValue } = this.state;
        const { popup } = this.context;

        switch (type) {
            case 'item':
                onSelect && onSelect({ value, label });
                popup && popup.props.hideOnClick && popup.hide();
                break;
            case 'sub':
                let _openValue = openValue.slice();

                if (open) {
                    _openValue.splice(_openValue.indexOf(value), 1);
                } else {
                    _openValue.push(value);
                }

                this.setState({
                    openValue: _openValue
                });
                break;
            default:
                break;
        }
    }

    render() {
        const {
            flat,
            full,
            link,
            horizontal,
            menuWidth,
            children,
            className,
            style
        } = this.props;

        return (
            <ul
                className={`
                    z-menu
                    ${horizontal ? 'z-menu--horizontal' : ''}
                    ${flat ? 'z-menu--flat' : ''}
                    ${full ? 'z-menu--full' : ''}
                    ${link ? 'z-menu--link' : ''}
                    ${className}
                `}
                style={{
                    width: horizontal ? 'auto' : menuWidth || '180px'
                }}
            >
                {children}
            </ul>
        )
    }
}

Menu.contextTypes = {
    popup: PropTypes.any
};

Menu.childContextTypes = {
    menu: PropTypes.any
};

Menu.propTypes = {
    indicatorPosition: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    value: PropTypes.string,
    defaultOpen: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    flat: PropTypes.bool,
    link: PropTypes.bool,
    full: PropTypes.bool,
    horizontal: PropTypes.bool,
    menuWidth: PropTypes.string,
    onSelect: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object
};

Menu.defaultProps = {
    flat: false,
    link: false,
    full: false,
    horizontal: false,
    indicatorPosition: 'left',
    defaultOpen: [],
    className: '',
    style: {}
}