import React from 'react';
import PropTypes from 'prop-types';

import Input from '../input/';
import Popup from '../popup/';
import Menu from '../menu/Menu.jsx';
import Loader from '../loader/';
import SelectOption from './SelectOption.jsx';
import './select.css';

export default class Select extends React.Component {
    constructor(props) {
        super(props);

        const label = this.findLabelByValue(props.children, props.value);

        this.state = {
            active: false,
            label,
            inputValue: label,
            showClearIcon: false,
            rerenderOptions: true
        };
        this.handleSelect = this.handleSelect.bind(this);
        this.handlePopupChange = this.handlePopupChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { value, children } = nextProps;
        if (this.props.value !== value) {
            const label = this.findLabelByValue(children, value);
            this.setState({
                inputValue: label,
                label
            });
        }
    }

    handleSelect({ value, label }) {
        const { onSelect } = this.props;
        onSelect && onSelect(value, label);
    }

    handleInputChange = ({ value }) => {
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

    handlePopupChange({ active }) {
        const { label } = this.state;

        this.setState({
            active
        });

        if (!active) {
            this.setState({
                inputValue: label,
                rerenderOptions: false
            });
        } else {
            this.setState({
                rerenderOptions: true
            });
        }
    }

    handleClear = (ev) => {
        const { onSelect } = this.props;

        ev.stopPropagation();

        this.setState({
            rerenderOptions: false
        });
        onSelect && onSelect('', '');
    }

    findLabelByValue(options, value) {
        for (const option of options) {
            if (option.props.value === value) {
                return option.props.label || option.props.children;
            }

            // to do
            if (option.type.name === 'SelectGroup') {
                let label = findLabelByValue(React.Children.toArray(option.children));
                if (label) {
                    return label;
                }
            }
        }

        return '';
    }

    defaultFilter = (option, index) => {
        const { inputValue } = this.state;
        const label = option.props.label || option.props.children;

        return label.indexOf(inputValue) !== -1;
    }

    renderOptions() {
        const { value, filterable, children } = this.props;
        const { rerenderOptions } = this.state;


        if (rerenderOptions) {
            if (!filterable) {
                this.options = children;
            } else if (typeof filterable === 'boolean') {
                this.options = children.filter(this.defaultFilter);
            } else if (typeof filterable === 'function') {
                this.options = children.filter(filterable);
            }
        }    

        return (
            <Menu
                value={value}
                onSelect={this.handleSelect}
                menuWidth="100%"
            >
                {this.options}
            </Menu>
        );
    }

    renderLoading() {
        return (
            <div className="my-select__loader-wrapper">
                <Loader />
            </div>
        )
    }

    render() {
        const {
            name,
            value,
            placeholder,
            multi,
            outline,
            round,
            filterable,
            loading,
            disabled,
            onSelect,
            children,
            className,
            style,
            popupHeight
        } = this.props;

        const {
            active,
            inputValue,
            showClearIcon
        } = this.state;

        let popupContent;

        if (loading) {
            popupContent = this.renderLoading();
        } else {
            popupContent = this.renderOptions();
        }

        return (
            <div
                className={`my-select
                ${active ? 'my-select--active' : ''}`}>
                <Popup
                    content={popupContent}
                    trigger="click"
                    hideOnClick={true}
                    popupWidth="100%"
                    popupHeight={popupHeight}
                    onChange={this.handlePopupChange}
                >
                    <Input
                        className={className}
                        style={style}
                        value={inputValue}
                        placeholder={placeholder}
                        outline={outline}
                        round={round}
                        disabled={disabled}
                        keepFocused={active}
                        readOnly={!filterable}
                        onMouseEnter={this.handleInputMouseEnter}
                        onMouseLeave={this.handleInputMouseLeave}
                        onChange={this.handleInputChange}
                        suffix={(inputValue && showClearIcon)
                            ? (<i className="icon icon-x" onClick={this.handleClear}></i>)
                            : (<i className="icon icon-chevron-down my-select__indicator"></i>)
                        }
                    />
                </Popup>    
            </div>
        )
    }
}

Select.propTypes = {
    name: PropTypes.string,
    value: PropTypes.any,
    placeholder: PropTypes.string,
    outline: PropTypes.bool,
    round: PropTypes.bool,
    filterable: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    loading: PropTypes.bool,
    clearable: PropTypes.bool,
    disabled: PropTypes.bool,
    multi: PropTypes.bool,
    onSelect: PropTypes.func
}

Select.defaultProps = {
    outline: false,
    round: false,
    filterable: false,
    loading: false,
    clearable: true,
    disabled: false,
    multi: false
}