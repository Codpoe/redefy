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
  defaultVisible?: boolean;
  disabled?: boolean;
  withArrow?: boolean;
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
  static defaultProps: PopProps = {
    defaultVisible: false,
    trigger: 'hover' as PopProps['trigger'],
    position: 'bottom-left' as PopProps['position'],
    delay: 150,
    disabled: false,
    withArrow: false,
  };

  isControlled: boolean = true;

  isHovered: boolean = false;

  popRoot: HTMLElement | null = document.getElementById('x-pop-root');

  triggerRef = React.createRef<HTMLDivElement>();

  updateTimer?: number = undefined;

  constructor(props: PopProps) {
    super(props);

    if (typeof props.visible === 'undefined') {
      this.isControlled = false;
      this.state = {
        visible: props.defaultVisible,
      };
    }
  }

  componentDidUpdate() {
    if (this.props.trigger !== 'click') {
      return;
    }

    if (this.checkVisible()) {
      document.addEventListener('click', this.handleBodyClick);
    } else {
      document.removeEventListener('click', this.handleBodyClick);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleBodyClick);
  }

  checkVisible(): boolean {
    if (this.isControlled) {
      return this.props.visible as boolean;
    }

    return this.state.visible as boolean;
  }
  handleTriggerClick = () => {
    this.updateVisible(true);
  };

  handleBodyClick = () => {
    this.updateVisible(false);
  };

  handlePopMouseEnter = () => {
    this.isHovered = true;
  };

  handlePopMouseLeave = () => {
    this.isHovered = false;

    if (this.props.trigger === 'hover') {
      this.updateVisible(false);
    }
  };

  handleMouseEnter = () => {
    this.updateVisible(true);
  };

  handleFocus = () => {
    this.updateVisible(true);
  };

  handleBlur = () => {
    this.updateVisible(false);
  };

  /**
   * 更新 visible
   * - 如果是受控的，则触发 change 事件，由外部更新 visible
   * - 如果不是受控的，则直接在组件内部调用 setState 更新 visible
   */
  updateVisible(visible: boolean) {
    const { trigger, delay, disabled, onChange } = this.props;

    if (disabled || (!visible && this.isHovered)) {
      return;
    }

    const update = () => {
      if (!this.isControlled) {
        this.setState({ visible });
      }
      onChange && onChange(visible);
    };

    if (trigger === 'hover') {
      clearTimeout(this.updateTimer);
      this.updateTimer = setTimeout(update, delay);
    } else {
      update();
    }
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
      withArrow,
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
        onMouseEnter={this.handlePopMouseEnter}
        onMouseLeave={this.handlePopMouseLeave}
      >
        <div
          className={b('trigger')}
          {...(trigger === 'hover' && {
            onMouseEnter: this.handleMouseEnter,
          })}
          {...(trigger === 'click' && {
            onClick: this.handleTriggerClick,
          })}
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
          withArrow={withArrow}
          getTriggerRef={this.getTriggerRef}
          className={contentClassName}
          style={contentStyle}
        />
      </div>
    );
  }
}
