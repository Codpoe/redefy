import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import bem from '../utils/bem';
import './style/input.css';

const b = bem('jm-input');

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
  static propTypes = {
    type: PropTypes.oneOf(['text', 'textarea', 'password', 'number']),
    name: PropTypes.string,
    value: PropTypes.any,
    placeholder: PropTypes.string,
    size: PropTypes.oneOf(['normal', 'large', 'small']),
    round: PropTypes.bool,
    prefix: PropTypes.node,
    suffix: PropTypes.node,
    noPadding: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['prefix', 'suffix'])]),
    autoFocus: PropTypes.bool,
    readOnly: PropTypes.bool,
    keepFocused: PropTypes.bool,
    disabled: PropTypes.bool,
    autoResize: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onPrefixClick: PropTypes.func,
    onSuffixClick: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
  };

  static defaultProps = {
    type: 'text',
    size: 'normal',
    round: false,
    autoFocus: false,
    keepFocused: false,
    autoResize: true,
    noPadding: false,
    readOnly: false,
    disabled: false,
    style: {},
  };

  constructor(props) {
    super(props);
    this.textareaInstance = React.createRef();
  }

  state = {
    focused: false,
    textareaStyle: {},
  };

  componentDidMount() {
    this.resize();
  }

  handleChange = (ev) => {
    const { onChange } = this.props;
    this.resize();
    onChange && onChange(ev.target.value, ev);
  };

  handleFocus = (ev) => {
    const { onFocus } = this.props;

    if (ev.target.readOnly) {
      return;
    }

    this.setState({
      focused: true,
    });

    onFocus && onFocus(ev);
  };

  handleBlur = (ev) => {
    const { onBlur } = this.props;

    if (ev.target.readOnly) {
      return;
    }

    this.setState({
      focused: false,
    });

    onBlur && onBlur(ev);
  };

  resize() {
    const { type, autoResize = true } = this.props;
    const el = this.textareaInstance.current;

    if (type !== 'textarea' || !autoResize || !el) {
      return;
    }

    const { minRows = 1, maxRows = Infinity } = autoResize;

    this.setState({
      textareaStyle: this.getHeightStyle(el, minRows, maxRows),
    });
  }

  getHeightStyle(element, minRows, maxRows) {
    const {
      boxSizing,
      borderSize,
      paddingSize,
      lineHeight,
      styleStr,
    } = this.getNodeStyle(element);
    let height;

    if (!hiddenTextarea) {
      hiddenTextarea = document.createElement('textarea');
      document.body.appendChild(hiddenTextarea);
    }

    hiddenTextarea.setAttribute('style', `${styleStr}${HIDDEN_TEXTAREA_STYLE}`);
    hiddenTextarea.value = element.value || '';

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
      height: `${height}px`,
    };
  }

  getNodeStyle(element) {
    const style = window.getComputedStyle(element);

    return {
      boxSizing: style.getPropertyValue('box-sizing'),

      borderSize: parseFloat(style.getPropertyValue('border-top-width'))
                + parseFloat(style.getPropertyValue('border-bottom-width')),

      paddingSize: parseFloat(style.getPropertyValue('padding-top'))
                + parseFloat(style.getPropertyValue('padding-bottom')),

      fontSize: parseFloat(style.getPropertyValue('font-size')),

      lineHeight: parseFloat(style.getPropertyValue('line-height')),

      styleStr: styleNames
        .map((name) => (`${name}: ${style.getPropertyValue(name)}`))
        .join(';')
                + ';',
    };
  }

  render() {
    const {
      type,
      name,
      value,
      placeholder,
      size,
      round,
      prefix,
      suffix,
      autoFocus,
      readOnly,
      keepFocused,
      disabled,
      noPadding,
      onMouseEnter,
      onMouseLeave,
      onPrefixClick,
      onSuffixClick,
      className,
      style,
    } = this.props;

    const {
      focused,
      textareaStyle,
    } = this.state;

    let cls = '';

    if (type === 'textarea') {
      cls = cx(className, b(), 'jm-textarea', {
        [b(['focused'])]: keepFocused || focused,
        [b(['disabled'])]: disabled,
      });

      return (
        <div
          className={cls}
          style={style}
        >
          <textarea
            ref={this.textareaInstance}
            className={b('content')}
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
      );
    }

    cls = cx(className, b(), b([size]), {
      [b(['round'])]: round,
      [b(['focused'])]: keepFocused || focused,
      [b(['disabled'])]: disabled,
    });

    return (
      <div
        className={cls}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {prefix && (
          <div
            className={cx(b('prefix'), {
              [b('prefix', 'no-padding')]: noPadding || noPadding === 'prefix',
              [b('prefix', 'clickable')]: onPrefixClick,
            })}
            onClick={onPrefixClick}
          >
            {prefix}
          </div>
        )}
        <input
          className={cx(b('content'), {
            [b('content', 'has-prefix')]: prefix,
            [b('content', 'has-suffix')]: suffix,
          })}
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
          style={{ width: 'auto' }}
        />
        {suffix && (
          <div
            className={cx(b('suffix'), {
              [b('suffix', 'no-padding')]: noPadding || noPadding === 'suffix',
              [b('suffix', 'clickable')]: onSuffixClick,
            })}
            onClick={onSuffixClick}
          >
            {suffix}
          </div>
        )}
      </div>
    );
  }
}
