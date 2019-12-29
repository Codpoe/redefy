import React from 'react';
import cx from 'classnames';
import bem from '../utils/bem';
import Content, { PopContentPosition } from './Content';

const b = bem('rdf-pop');

export interface PopProps {
  content?: any;
  trigger?: 'hover' | 'click' | 'focus';
  position?: PopContentPosition;
  delay?: number | number[];
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
  delays?: (number | undefined)[];
}

export class Pop extends React.Component<PopProps, PopState> {
  static defaultProps: PopProps = {
    defaultVisible: false,
    trigger: 'hover',
    position: 'bottom-left',
    delay: 150,
    disabled: false,
    withArrow: false,
  };

  static getDerivedStateFromProps(props: PopProps) {
    const { visible, delay } = props;
    const state: PopState = {
      delays: Array.isArray(delay) ? delay : [delay, delay],
    };

    if (typeof visible !== 'undefined') {
      state.visible = visible;
    }

    return state;
  }

  state: PopState = {
    visible:
      typeof this.props.visible !== 'undefined'
        ? this.props.visible
        : this.props.defaultVisible,
  };

  isHovered: boolean = false;

  popRoot: HTMLElement | null = document.getElementById('rdf-pop-root');

  triggerRef = React.createRef<HTMLDivElement>();

  updateTimer?: number = undefined;

  componentDidUpdate() {
    if (this.props.trigger !== 'click') {
      return;
    }

    if (this.state.visible) {
      document.addEventListener('click', this.handleBodyClick);
    } else {
      document.removeEventListener('click', this.handleBodyClick);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleBodyClick);
  }

  handleTriggerClick = () => {
    this.updateVisible(!this.state.visible, true);
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
  updateVisible(visible: boolean, force: boolean = false) {
    const { trigger, disabled, onChange } = this.props;
    const delays = this.state.delays as (number | undefined)[];

    if (disabled || (!force && !visible && this.isHovered)) {
      return;
    }

    const update = () => {
      if (typeof this.props.visible === 'undefined') {
        this.setState({ visible });
      }
      if (onChange) {
        onChange(visible);
      }
    };

    if (trigger === 'hover') {
      clearTimeout(this.updateTimer);
      this.updateTimer = setTimeout(
        update,
        visible ? delays[0] : delays[1]
      ) as any;
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
    const { visible } = this.state;

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
          position={position as PopContentPosition}
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

export default Pop;
