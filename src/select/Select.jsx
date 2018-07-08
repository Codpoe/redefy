import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Input from '../input/';
import Pop from '../pop/';
import Loader from '../loader/';
import SelectOption from './SelectOption.jsx';
import SelectContext from './select-context';
import './select.css';

const findLabelByValue = (options, value) => {
    for (const option of options) {
        if (option.props.value === value) {
            return option.props.label || option.props.children;
        }
        if (option.type.name === 'SelectGroup') {
            let label = findLabelByValue(option.children, value);
            if (label) {
                return label;
            }
        }
    }
    return '';
}

export default class Select extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false,
            showClearIcon: false,
            rerenderOptions: true
        };
    }

    static getDerivedStateFromProps({ children, value }) {
        const label = findLabelByValue(children, value);
        return {
            label,
            inputValue: label
        };
    }

    handleSelect = (value, label) => {
        const { multi, onSelect } = this.props;
        
        if (!multi) {
            this.setState({
                active: false
            });
        }
        onSelect && onSelect(value, label);
    }

    handlePopChange = (active) => {
        const { label } = this.state;

        this.setState({
            active
        });

        if (!active) {
            this.setState({
                inputValue: label
            });
        }
    }

    handleInputChange = (value) => {
        this.setState({
            inputValue: value
        });
    }

    handleInputMouseEnter = () => {
        const { value, clearable } = this.props;

        clearable && value && this.setState({
            showClearIcon: true
        });
    }

    handleInputMouseLeave = () => {
        const { clearable } = this.props;

        clearable && this.setState({
            showClearIcon: false
        });
    }

    handleClear = (ev) => {
        const { onSelect } = this.props;

        ev.stopPropagation();
        onSelect && onSelect('', '');
    }

    defaultFilter = (option, index) => {
        const { inputValue } = this.state;
        const label = option.props.label || option.props.children;

        return label.indexOf(inputValue) !== -1;
    }

    renderOptions() {
        const { value, filterable, children } = this.props;
        const { rerenderOptions } = this.state;
        let options;   

        return (
            <SelectContext.Provider
                value={{
                    value,
                    onSelect: this.handleSelect
                }}
            >
                <ul className="x-select__list">
                    {children}
                </ul>
            </SelectContext.Provider>
        );
    }

    renderLoading() {
        return (
            <div className="x-select__loader-wrapper">
                <Loader />
            </div>
        )
    }

    renderIcon() {
        const { inputValue, showClearIcon } = this.state;
        const show = inputValue && showClearIcon;
        return (
            <div
                className="x-select__icon-wrapper"
                onClick={show ? this.handleClear : null}
            >
                {show
                    ? (<i className="icon icon-x"></i>)
                    : (<i className="icon icon-chevron-down"></i>)}
            </div>
        )
    }

    render() {
        const {
            name,
            value,
            label,
            placeholder,
            multi,
            round,
            filterable,
            loading,
            disabled,
            onSelect,
            children,
            className,
            style
        } = this.props;

        const {
            active,
            inputValue,
            showClearIcon
        } = this.state;

        let popContent;

        if (loading) {
            popContent = this.renderLoading();
        } else {
            popContent = this.renderOptions();
        }

        const classes = classnames(className, 'x-select', {
            'x-select--active': active
        });

        return (
            <div
                className={classes}
                style={style}
            >
                <Pop
                    content={popContent}
                    trigger="click"
                    active={active}
                    className="x-select__pop"
                    onChange={this.handlePopChange}
                >
                    <Input
                        className="x-select__input"
                        value={inputValue}
                        placeholder={placeholder}
                        round={round}
                        disabled={disabled}
                        keepFocused={active}
                        readOnly={!filterable}
                        onMouseEnter={this.handleInputMouseEnter}
                        onMouseLeave={this.handleInputMouseLeave}
                        onChange={this.handleInputChange}
                        suffix={this.renderIcon()}
                    />
                </Pop>    
            </div>
        )
    }
}

Select.propTypes = {
    name: PropTypes.string,
    value: PropTypes.any,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    round: PropTypes.bool,
    filterable: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    loading: PropTypes.bool,
    clearable: PropTypes.bool,
    disabled: PropTypes.bool,
    multi: PropTypes.bool,
    onSelect: PropTypes.func
}

Select.defaultProps = {
    label: '',
    round: false,
    filterable: false,
    loading: false,
    clearable: true,
    disabled: false,
    multi: false
}
