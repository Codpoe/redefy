import React from 'react';
import cx from 'classnames';
import bem from '../utils/bem';
import Content from './Content';
import './styles/pop.css';

const b = bem('x-pop');

export interface PopProps {
  content?: any;
  trigger?: 'hover' | 'click' | 'focus';
  position?:
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'left-top'
    | 'left-center'
    | 'left-bottom'
    | 'right-top'
    | 'right-center'
    | 'right-bottom';
  delay?: number;
  visible?: boolean;
  disabled?: boolean;
  onChange?: (visible: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
}

export interface PopState {
  visible?: boolean;
}

export default class Pop extends React.Component<PopProps, PopState> {
  static defaultProps = {
    trigger: 'hover' as PopProps['trigger'],
    position: 'bottom-left' as PopProps['position'],
    delay: 150,
    disabled: false,
  };

  isControlled: boolean = false;

  popRoot: HTMLElement | null = document.getElementById('x-pop-root');

  triggerRef = React.createRef<HTMLDivElement>();

  contentEl = React.createRef<HTMLDivElement>();

  updateTimer: number | null = null;

  constructor(props: PopProps) {
    super(props);

    if (typeof props.visible === 'undefined') {
      this.state = {
        visible: false,
      };
    } else {
      this.isControlled = true;
    }
  }

  componentDidUpdate() {
    if (this.props.trigger !== 'click') {
      return;
    }

    if (this.checkVisible()) {
      document.body.addEventListener('click', this.handleBodyClick);
    } else {
      document.body.removeEventListener('click', this.handleBodyClick);
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleBodyClick);
  }

  checkVisible(): boolean {
    if (this.isControlled) {
      return this.props.visible as boolean;
    }

    return this.state.visible as boolean;
  }
  handleTriggerClick = () => {
    if (this.props.disabled) {
      return;
    }

    this.updateVisible(true);
  };

  handleBodyClick = () => {
    if (this.props.disabled) {
      return;
    }

    this.updateVisible(false);
  };

  handleMouseOver = () => {
    if (this.props.disabled) {
      return;
    }

    this.updateVisible(true);
  };

  handleMouseOut = () => {
    if (this.props.disabled) {
      return;
    }

    this.updateVisible(false);
  };

  handleFocus = () => {
    if (this.props.disabled) {
      return;
    }

    this.updateVisible(true);
  };

  handleBlur = () => {
    if (this.props.disabled) {
      return;
    }

    this.updateVisible(false);
  };

  /**
   * 更新 visible
   * - 如果是受控的，则触发 change 事件，由外部更新 visible
   * - 如果不是受控的，则直接在组件内部调用 setState 更新 visible
   */
  updateVisible(visible: boolean) {
    const { delay, onChange } = this.props;

    if (this.updateTimer) {
      clearTimeout(this.updateTimer);
    }

    this.updateTimer = setTimeout(() => {
      if (this.isControlled) {
        onChange && onChange(visible);
      } else {
        this.setState({ visible });
      }
    }, delay);
  }

  getTriggerRef = () => {
    return this.triggerRef;
  };

  render() {
    const {
      content,
      position,
      trigger,
      disabled,
      className,
      style,
      children,
      contentClassName,
      contentStyle,
    } = this.props;
    const visible = this.checkVisible();

    const cls = cx(className, b(), {
      [b(['visible'])]: visible,
      [b(['disabled'])]: disabled,
    });

    return (
      <div
        className={cls}
        style={style}
        {...(trigger === 'hover' && {
          onMouseOver: this.handleMouseOver,
          onMouseLeave: this.handleMouseOut,
        })}
      >
        <div
          className={b('trigger')}
          {...(trigger === 'click' && { onClick: this.handleTriggerClick })}
          {...(trigger === 'focus' && {
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
          })}
          ref={this.triggerRef}
        >
          {children}
        </div>

        <Content
          content={content}
          position={position}
          visible={visible}
          getTriggerRef={this.getTriggerRef}
          className={contentClassName}
          style={contentStyle}
        />
      </div>
    );
  }
}
