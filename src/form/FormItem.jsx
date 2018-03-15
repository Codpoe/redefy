import React from 'react';
import PropTypes from 'prop-types';

import './form.css';

export default class FormItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            valid: true,
            message: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    componentDidMount() {
        const { propName } = this.props;
        if (!propName) {
            return;
        }
        this.initialValue = this.context.form.props.value[propName];
        this.context.form.addItem(this);
    }

    componentWillUnmount() {
        this.context.form.removeItem(this);
    }

    handleChange(ev) {
        // 由于验证需要先获取到上层表单 Form 的值，并且 React 的 setState 是异步的，
        // 这就有可能会造成验证的是上一次的输入值。
        // 为了解决这个问题，把 validate 方法放入 setTimeout 中，
        // 利用 JS 的事件循环特性，保证了每次验证的值都是最新输入的。
        setTimeout(() => {
            this.validate('change');
        });
    }

    handleBlur(ev) {
        setTimeout(() => {
            this.validate('blur');
        });
    }

    validate(eventType) {
        const {
            propName
        } = this.props;
        const form = this.context.form;
        const {
            value,
            validators
        } = form.props;
        const propValue = value[propName];
        

        if (!validators
            || !propName
            || !validators[propName]) {
            this.setState({
                valid: true
            });
            return true;
        }

        for (let { required, message, trigger = 'change', customRule } of validators[propName]) {
            if (eventType && eventType !== trigger) {
                continue;
            }

            if (required
                && ((Array.isArray(propValue)
                        && propValue.length === 0)
                    || !propValue)) {
                
                this.setState({
                    valid: false,
                    message: message || ''
                });
                return false;
            } else if (customRule instanceof Function) {
                let msg = customRule(propValue, value);

                if (msg) {
                    this.setState({
                        valid: false,
                        message: msg || ''
                    });
                    return false;
                }

                this.setState({
                    valid: true
                });
                return true;
            } else {
                this.setState({
                    valid: true
                });
                return true;
            }
        }
    }

    reset() {
        const { propName } = this.props;
        
        this.setState({
            valid: true,
            message: ''
        });
        
        return {
            [propName]: this.initialValue
        };
    }

    getItemStyle() {
        const { labelWidth, labelHeight, labelPosition } = this.context.form.props;
        const { label } = this.props;

        if (!label) {
            return;
        }

        return {
            labelStyle: {
                width: labelWidth || '100px',
                height: labelHeight || '32px',
            },
            contentStyle: {
                marginLeft: labelWidth || '100px',
                minHeight: labelHeight || '32px'
            }
        };
    }

    render() {
        const {
            label,
            children,
            className,
            style
        } = this.props;
        const {
            valid,
            message
        } = this.state;
        const itemStyle = this.getItemStyle();

        return (
            <div
                className={`
                    z-form-item
                    ${!valid ? 'z-form-item--invalid' : ''}
                    ${className}
                `}
                style={style}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
            >
                {
                    label &&
                    <label
                        className="z-form-item__label"
                        style={itemStyle && itemStyle.labelStyle}
                    >
                        {label}
                    </label>
                }
                <div
                    className="z-form-item__content"
                    style={itemStyle && itemStyle.contentStyle}
                >
                    {children}
                    {
                        <span className="z-form-item__message">
                            {message}
                        </span>
                    }
                </div>
            </div>
        )
    }
}

FormItem.contextTypes = {
    form: PropTypes.any
};

FormItem.propTypes = {
    label: PropTypes.string,
    propName: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object
};