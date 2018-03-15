import React from 'react';
import PropTypes from 'prop-types';

import Popup from '../popup/';
import Input from '../input/';

import './base-select.css';

export default class BaseSelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false,
            showClearIcon: false
        }
    }

    handlePopupChange = ({ active }) => {
        const { onVisibleChange } = this.props;

        this.setState({
            active
        })
        onVisibleChange && onVisibleChange(active);
    }

    handleChange = (value, label) => {
        const { onChange } = this.props;

        this.popupRef.hide();
        onChange && onChange(value, label);
    }

    handleMouseEnter = () => {
        const { value } = this.props;

        if (value) {
            this.setState({
                showClearIcon: true
            });
        }
    }

    handleMouseLeave = () => {
        this.setState({
            showClearIcon: false
        })
    }

    handleClear = (ev) => {
        const { onClear } = this.props;

        ev.stopPropagation();
        this.popupRef.hide();
        onClear && onClear();
    }

    hide = () => {
        this.popupRef.hide();
    }

    render() {
        const {
            value,
            placeholder,
            outline,
            round,
            disabled,
            popupWidth,
            className,
            style,
            children
        } = this.props;

        const {
            active,
            showClearIcon
        } = this.state;

        return (
            <div
                className={`
                    my-base-select
                    ${active ? 'my-base-select--active' : ''}
                `}
            >
                <Popup
                    ref={el => this.popupRef = el}
                    content={children}
                    trigger="click"
                    popupWidth={popupWidth}
                    onChange={this.handlePopupChange}
                >
                    <Input
                        className={className}
                        style={style}
                        value={value}
                        placeholder={placeholder}
                        outline={outline}
                        round={round}
                        disabled={disabled}
                        readOnly
                        keepFocused={active}
                        onMouseEnter={this.handleMouseEnter}
                        onMouseLeave={this.handleMouseLeave}
                        suffix={showClearIcon
                            ? (<i
                                className="icon icon-x" onClick={this.handleClear}></i>)
                            : (<i className="icon icon-chevron-down my-base-select__indicator"></i>)
                        }
                    />
                </Popup>
            </div>
        )
    }
}