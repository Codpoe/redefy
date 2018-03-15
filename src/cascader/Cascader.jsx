import React from 'react';
import PropTypes from 'prop-types';

import BaseSelect from '../base-select/';

import './cascader.css';

export default class Cascader extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            inputValue: this.findLabelByValue(props.value),
            activePath: props.value,
        };
        this.inputValue = [];
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value) {
            this.setState({
                inputValue: this.findLabelByValue(nextProps.value),
                activePath: nextProps.value
            });
        }
    }

    handleItemClick = (ev) => {
        const { changeOnSelect, onChange } = this.props;
        const { value, label, leaf } = ev.target.dataset;

        if (!value) {
            return;
        }

        if (changeOnSelect || leaf === 'true') {
            onChange && onChange(value.split(','), label.split[',']);
        } else {
            this.setState({
                activePath: value.split(',')
            });
        }

        if (leaf === 'true') {
            this.selectRef.hide();
        }
    }

    handleClear = () => {
        const { onChange } = this.props;
        onChange && onChange([], []);
    }

    handleVisibleChange = (visible) => {
        if (visible) {
            this.setState({
                activePath: this.props.value
            })
        }
    }

    findLabelByValue(value) {
        const { data, valueProp, labelProp, childrenProp } = this.props;
        let res = [];
        let _data = data;

        for (let i = 0; i < value.length; i++) {
            for (let j = 0; j < _data.length; j++) {
                if (_data[j][valueProp] === value[i]) {
                    res.push(_data[j][labelProp]);

                    if (_data[j][childrenProp]) {
                        _data = _data[j][childrenProp];
                    } else {
                        _data = [];
                    }
                    break;
                }
            }
        }

        return res;
    }

    renderCascader(data, depth = 0, valuePath = [], labelPath = []) {
        const { valueProp, labelProp, childrenProp, value } = this.props;
        const { activePath } = this.state;
        let shouldRenderNext = false;
        let nextData;
        let nextValuePath;
        let nextLabelPath;

        return (
            <span>
                <ul
                    className={`
                        my-cascader__level
                        my-cascader__${depth}
                        ${depth > 0 ? 'my-cascader__children' : ''}
                    `}
                >
                    {data.map((item, index) => {
                        let _valuePath = valuePath.slice();
                        let _labelPath = labelPath.slice();
                        let hasChildren = false;

                        _valuePath.push(item[valueProp]);
                        _labelPath.push(item[labelProp]);

                        if (item[childrenProp] && item[childrenProp].length > 0) {
                            hasChildren = true;
                        }

                        if (activePath[depth] === item[valueProp]) {
                            if (hasChildren) {
                                shouldRenderNext = true;
                                nextData = item[childrenProp];
                                nextValuePath = _valuePath;
                                nextLabelPath = _labelPath;
                            }    
                        }

                        return (
                            <li
                                key={item[valueProp]}
                                data-value={_valuePath}
                                data-label={_labelPath}
                                data-leaf={!hasChildren}
                                className={`
                                    my-cascader__item
                                    ${activePath[depth] === item[valueProp] ? 'my-cascader__item--active' : ''}
                                `}
                            >
                                {item[labelProp]}
                                {hasChildren && (
                                    <i className="icon icon-chevron-right"></i>
                                )}
                            </li>
                        )
                    })}
                </ul>
                {shouldRenderNext && this.renderCascader(nextData, depth + 1, nextValuePath, nextLabelPath)}
            </span>    
        )
    }

    render() {
        const {
            data,
            value,
            placeholder,
            outline,
            round,
            disabled,
            className,
            style,
            onChange
        } = this.props;

        const {
            inputValue
        } = this.state;

        return (
            <BaseSelect
                ref={el => this.selectRef = el}    
                value={inputValue.join(' / ')}
                placeholder={placeholder}
                outline={outline}
                round={round}
                disabled={disabled}
                className={className}
                style={style}
                popupWidth="auto"
                onClear={this.handleClear}
                onVisibleChange={this.handleVisibleChange}
            >
                <div
                    className={`my-cascader`}
                    onClick={this.handleItemClick}
                >
                    {this.renderCascader(data)}
                </div>    
            </BaseSelect>
        )
    }
}

Cascader.propTypes = {
    value: PropTypes.array,
    valueProp: PropTypes.string,
    labelProp: PropTypes.string,
    childrenProp: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object
}

Cascader.defaultProps = {
    value: [],
    valueProp: 'value',
    labelProp: 'label',
    childrenProp: 'children',
    placeholder: '选择'
}