import React from 'react';
import PropTypes from 'prop-types';

import './input.css';

const HIDDEN_TEXTAREA_STYLE = `
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    height: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
    z-index: -999 !important;
`;

const styleNames = [
    'box-sizing',
    'width',
    'border-width',
    'padding-top',
    'padding-right',
    'padding-bottom',
    'padding-left',
    'font-size',
    'line-height',
    'letter-spacing',
];

let hiddenTextarea;

export default class Input extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            focused: false,
            textareaStyle: {},
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    componentDidMount() {
        this.resize();
    }

    handleChange(ev) {
        const { type, autoSize, onChange } = this.props;
        this.resize();
        onChange && onChange({ value: ev.target.value }, ev);
    }

    handleFocus(ev) {
        const { onFocus } = this.props;

        if (ev.target.readOnly) {
            return;
        }

        this.setState({
            focused: true
        });

        onFocus && onFocus(ev);
    }

    handleBlur(ev) {
        const { onBlur } = this.props;

        if (ev.target.readOnly) {
            return;
        }

        this.setState({
            focused: false
        });
        
        onBlur && onBlur(ev);
    }

    isStrOrIcon(fix) {
        return (typeof fix === 'string')
            || (fix.props.className && fix.props.className.startsWith('icon'));
    }

    resize() {
        const { type, autoResize = true } = this.props;

        if (type !== 'textarea' || !autoResize) {
            return;
        }

        let minRows;
        let maxRows;

        ({ minRows = 1, maxRows = Infinity } = autoResize);
        this.setState({
            textareaStyle: this.getHeightStyle(this.textareaRef, minRows, maxRows)
        });
    }

    getHeightStyle(node, minRows, maxRows) {
        const {
            boxSizing,
            borderSize,
            paddingSize,
            fontSize,
            lineHeight,
            styleStr
        } = this.getNodeStyle(node);
        let height;

        if (!hiddenTextarea) {
            hiddenTextarea = document.createElement('textarea');
            document.body.appendChild(hiddenTextarea);
        }

        hiddenTextarea.setAttribute('style', `${styleStr}${HIDDEN_TEXTAREA_STYLE}`);
        hiddenTextarea.value = node.value || '';

        height = hiddenTextarea.scrollHeight;
        
        if (boxSizing === 'border-box') {
            height += borderSize;
        } else {
            height -= paddingSize;
        }

        if (minRows) {
            let minHeight = minRows * lineHeight;
            if (boxSizing === 'border-box') {
                minHeight += paddingSize + borderSize;
            }
            height = Math.max(minHeight, height);
        }

        if (maxRows) {
            let maxHeight = maxRows * lineHeight;
            if (boxSizing === 'border-box') {
                maxHeight += paddingSize + borderSize;
            }
            height = Math.min(maxHeight, height);
        }

        return {
            height: `${height}px`
        };
    }

    getNodeStyle(node) {
        const style = window.getComputedStyle(node);

        return {
            boxSizing: style.getPropertyValue('box-sizing'),

            borderSize: parseFloat(style.getPropertyValue('border-top-width'))
                + parseFloat(style.getPropertyValue('border-bottom-width')),
            
            paddingSize: parseFloat(style.getPropertyValue('padding-top'))
                + parseFloat(style.getPropertyValue('padding-bottom')),
            
            fontSize: parseFloat(style.getPropertyValue('font-size')),

            lineHeight: parseFloat(style.getPropertyValue('line-height')),

            styleStr: styleNames
                .map(name => (`${name}: ${style.getPropertyValue(name)}`))
                .join(';')
                + ';'
        }
    }

    render() {
        const {
            type,
            name,
            value,
            placeholder,
            size,
            outline,
            round,
            prefix,
            suffix,
            autoFocus,
            readOnly,
            keepFocused,
            disabled,
            onChange,
            onFocus,
            onBlur,
            onMouseEnter,
            onMouseLeave,
            className,
            style
        } = this.props;

        const {
            focused,
            textareaStyle
        } = this.state;

        if (type === 'textarea') {
            return (
                <div
                    className={`
                        z-input z-textarea
                        ${outline ? 'z-input--outline' : ''}
                        ${(keepFocused || focused) ? 'z-input--focused' : ''}
                        ${disabled ? 'z-input--disabled' : ''}
                        ${className}
                    `}
                    style={style}
                >
                    <textarea
                        ref={el => {this.textareaRef = el}}    
                        className="z-input__content"
                        style={textareaStyle}
                        rows="2"
                        name={name}
                        value={value}
                        placeholder={placeholder}
                        autoFocus={autoFocus}
                        readOnly={readOnly}
                        disabled={disabled}
                        onChange={this.handleChange}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                    />
                </div>
            )
        }

        return (
            <div
                className={`
                    z-input
                    z-input--${size}
                    ${outline ? 'z-input--outline' : ''}
                    ${round ? 'z-input--round' : ''}
                    ${(keepFocused || focused) ? 'z-input--focused' : ''}
                    ${typeof prefix === 'string' ? 'z-input--pre-str' : ''}
                    ${typeof prefix === 'string' ? 'z-input--suf-str' : ''}
                    ${disabled ? 'z-input--disabled' : ''}
                    ${className}
                `}
                style={style}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                {prefix &&
                    <div className={`z-input__prefix
                        ${this.isStrOrIcon(prefix) ? 'z-input__prefix--str' : ''}`}
                    >
                        {prefix}
                    </div>}
                <input
                    className="z-input__content"
                    type={type}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    autoFocus={autoFocus}
                    readOnly={readOnly}
                    disabled={disabled}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                />
                {suffix &&
                    <div className={`z-input__suffix
                        ${this.isStrOrIcon(suffix) ? 'z-input__suffix--str' : ''}`}
                    >
                        {suffix}
                    </div>}
            </div>
        )
    }
}

Input.propTypes = {
    type: PropTypes.oneOf(['text', 'textarea', 'password', 'number']),
    name: PropTypes.string,
    value: PropTypes.any,
    placeholder: PropTypes.string,
    size: PropTypes.oneOf(['normal', 'large', 'small']),
    outline: PropTypes.bool,
    round: PropTypes.bool,
    prefix: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    autoFocus: PropTypes.bool,
    readOnly: PropTypes.bool,
    keepFocused: PropTypes.bool,
    disabled: PropTypes.bool,
    autoResize: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object
}

Input.defaultProps = {
    type: 'text',
    size: 'normal',
    outline: false,
    round: false,
    autoFocus: false,
    keepFocused: false,
    disabled: false,
    autoResize: true,
    readOnly: false
}