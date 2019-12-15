import React from 'react';
import cx from 'classnames';
import { toBeField, FieldProps } from '../form/index';
import bem from '../utils/bem';

const b = bem('x-input');

const HIDDEN_TEXTAREA_STYLE = `
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  height: 0 !important;
  visibility: hidden !important;
  pointer-events: none !important;
  z-index: -999 !important;
`;

const STYLE_NAMES = [
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

export interface InputProps extends FieldProps {
  type?: 'text' | 'textarea' | 'password' | 'number';
  name?: string;
  value?: any;
  defaultValue?: any;
  placeholder?: string;
  size?: 'normal' | 'large' | 'small';
  round?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  noPadding?: boolean | 'prefix' | 'suffix';
  autoFocus?: boolean;
  focused?: boolean;
  defaultFocused?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  autoResize?: boolean | { minRows?: number; maxRows?: number };
  onChange?: (value: InputProps['value'], target: InputProps) => void;
  onFocus?: (ev: React.SyntheticEvent) => void;
  onBlur?: (ev: React.SyntheticEvent) => void;
  onMouseEnter?: (ev: React.SyntheticEvent) => void;
  onMouseLeave?: (ev: React.SyntheticEvent) => void;
  onPrefixClick?: (ev: React.SyntheticEvent) => void;
  onSuffixClick?: (ev: React.SyntheticEvent) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface InputState {
  value: any;
  focused: boolean;
  textareaStyle: React.CSSProperties;
}

class InnerInput extends React.Component<InputProps, InputState> {
  static defaultProps: InputProps = {
    type: 'text',
    size: 'normal',
    round: false,
    autoFocus: false,
    defaultFocused: false,
    autoResize: true,
    noPadding: false,
    readOnly: false,
    disabled: false,
    fieldContext: {
      onChange: () => {},
      onBlur: () => {},
    },
  };

  static getDerivedStateFromProps(props: InputProps) {
    let derivedState: Partial<InputState> = {};

    if (typeof props.value !== 'undefined') {
      derivedState.value = props.value;
    }

    if (typeof props.focused !== 'undefined') {
      derivedState.focused = props.focused;
    }

    return Object.keys(derivedState).length ? derivedState : null;
  }

  constructor(props: InputProps) {
    super(props);

    const { value, defaultValue, focused, defaultFocused } = props;

    this.state = {
      value: typeof value !== 'undefined' ? value : defaultValue,
      focused:
        typeof focused !== 'undefined' ? focused : (defaultFocused as boolean),
      textareaStyle: {},
    };
  }

  inputRef = React.createRef<HTMLInputElement | HTMLTextAreaElement>();

  hiddenTextarea: HTMLTextAreaElement | null = document.querySelector(
    '#x-hidden-textarea'
  );

  componentDidMount() {
    this.resize();
  }

  handleChange = (
    ev: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, disabled, onChange, fieldContext } = this.props;
    const newValue = (ev.target as any).value;

    if (disabled) {
      return;
    }

    if (typeof value === 'undefined') {
      this.setState({ value: newValue });
    }

    if (onChange) {
      onChange(ev.currentTarget.value, { ...this.props });
      // form
      fieldContext.onChange();
    }

    this.resize();
  };

  handleFocus = (ev: React.SyntheticEvent) => {
    const { focused, disabled, onFocus } = this.props;

    if (disabled) {
      return;
    }

    if (typeof focused === 'undefined') {
      this.setState({ focused: true });
    }

    if (onFocus) {
      onFocus(ev);
    }
  };

  handleBlur = (ev: React.SyntheticEvent) => {
    const { focused, disabled, onBlur, fieldContext } = this.props;

    if (disabled) {
      return;
    }

    if (typeof focused === 'undefined') {
      this.setState({ focused: false });
    }

    if (onBlur) {
      onBlur(ev);
    }

    fieldContext.onBlur();
  };

  resize() {
    const { type, autoResize } = this.props;
    const el = this.inputRef.current;
    let minRows = 1;
    let maxRows = Infinity;

    if (type !== 'textarea' || !autoResize || !el) {
      return;
    }

    if (typeof autoResize === 'object') {
      minRows = autoResize.minRows || 1;
      maxRows = autoResize.maxRows || Infinity;
    }

    this.setState({
      textareaStyle: this.getHeightStyle(el, minRows, maxRows),
    });
  }

  getHeightStyle(element: HTMLElement, minRows: number, maxRows: number) {
    const {
      boxSizing,
      borderSize,
      paddingSize,
      lineHeight,
      styleStr,
    } = this.getNodeStyle(element);

    if (!this.hiddenTextarea) {
      this.hiddenTextarea = document.createElement('textarea');
      this.hiddenTextarea.setAttribute('id', 'x-hidden-textarea');
      document.body.appendChild(this.hiddenTextarea);
    }

    this.hiddenTextarea.setAttribute(
      'style',
      `${styleStr}${HIDDEN_TEXTAREA_STYLE}`
    );
    this.hiddenTextarea.value = element.nodeValue || '';

    let height = this.hiddenTextarea.scrollHeight;
    let minHeight = minRows * lineHeight;
    let maxHeight = maxRows * lineHeight;

    if (boxSizing === 'border-box') {
      height += borderSize;
      minHeight += paddingSize + borderSize;
      maxHeight += paddingSize + borderSize;
    } else {
      height -= borderSize;
    }

    height = Math.max(minHeight, height);
    height = Math.min(maxHeight, height);

    return { height: `${height}px` };
  }

  getNodeStyle(element: HTMLElement) {
    const style = window.getComputedStyle(element);

    return {
      boxSizing: style.boxSizing,
      borderSize:
        parseFloat(style.getPropertyValue('border-top-width')) +
        parseFloat(style.getPropertyValue('border-bottom-width')),
      paddingSize:
        parseFloat(style.getPropertyValue('padding-top')) +
        parseFloat(style.getPropertyValue('padding-bottom')),
      fontSize: parseFloat(style.getPropertyValue('font-size')),
      lineHeight: parseFloat(style.getPropertyValue('line-height')),
      styleStr:
        STYLE_NAMES.map(
          name => `${name}: ${style.getPropertyValue(name)}`
        ).join(';') + ';',
    };
  }

  render() {
    const {
      type,
      name,
      placeholder,
      size,
      round,
      prefix,
      suffix,
      noPadding,
      autoFocus,
      readOnly,
      disabled,
      onMouseEnter,
      onMouseLeave,
      onPrefixClick,
      onSuffixClick,
      className,
      style,
    } = this.props;

    const { value, focused, textareaStyle } = this.state;

    let cls = '';
    let contentCls = '';
    let prefixCls = '';
    let suffixCls = '';

    if (type === 'textarea') {
      cls = cx(className, b(), 'x-textarea', {
        [b(['focused'])]: focused,
        [b(['disabled'])]: disabled,
      });

      return (
        <div className={cls} style={style}>
          <textarea
            ref={this.inputRef as React.Ref<HTMLTextAreaElement>}
            className={b('content')}
            style={textareaStyle}
            rows={2}
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
      [b(['focused'])]: focused,
      [b(['disabled'])]: disabled,
    });

    contentCls = cx(b('content'), {
      [b('content', 'has-prefix')]: prefix,
      [b('content', 'has-suffix')]: suffix,
    });

    prefixCls = cx(b('prefix'), {
      [b('prefix', 'no-padding')]: noPadding === 'prefix' || noPadding,
      [b('prefix', 'clickable')]: onPrefixClick,
    });

    suffixCls = cx(b('suffix'), {
      [b('suffix', 'no-padding')]: noPadding === 'suffix' || noPadding,
      [b('suffix', 'clickable')]: onSuffixClick,
    });

    return (
      <div
        className={cls}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {prefix && (
          <div className={prefixCls} onClick={onPrefixClick}>
            {prefix}
          </div>
        )}
        <input
          ref={this.inputRef as React.Ref<HTMLInputElement>}
          className={contentCls}
          style={{ width: 'auto' }}
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
        {suffix && (
          <div className={suffixCls} onClick={onSuffixClick}>
            {suffix}
          </div>
        )}
      </div>
    );
  }
}

export const Input = toBeField(InnerInput);
export default Input;
