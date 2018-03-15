import React from 'react';
import PropTypes from 'prop-types';

import Popup from '../popup/';
import Tree from '../tree/';
import Input from '../input/';

export default class TreeSelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false,
            showClearIcon: false
        }
    }

    handlePopupChange = ({ active }) => {
        this.setState({ 
            active
        })
    }

    handleNodeClick = (value, label) => {
        const { onSelect } = this.props;

        this.popupRef.hide();
        onSelect && onSelect(value, label);
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

    handleClear = () => {
        const { onSelect } = this.props;

        this.popupRef.hide();
        onSelect && onSelect('', '');
    }

    renderTree() {
        const { data, valueProp, labelProp, value } = this.props;

        return (
            <div>
                <Tree
                    data={data}
                    valueProp={valueProp}
                    labelProp={labelProp}
                    value={value}
                    onNodeClick={this.handleNodeClick}
                />
            </div>    
        )
    }

    render() {
        const {
            value,
            placeholder,
            outline,
            round,
            disabled,
            className,
            style
        } = this.props;

        const {
            active,
            showClearIcon
        } = this.state;

        return (
            <div
                className={`
                    my-tree-select
                    ${active ? 'my-tree-select--active' : ''}
                `}
            >
                <Popup
                    ref={el => this.popupRef = el}    
                    content={this.renderTree()}
                    trigger="click"
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
                            : (<i className="icon icon-chevron-down my-tree-select__indicator"></i>)
                        }
                    />
                </Popup>
            </div>
        )
    }
}