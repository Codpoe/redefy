import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import cx from 'classnames';
import throttle from 'lodash/throttle';
import { isBrowser } from '../utils/vars';
import bem from '../utils/bem';
import { isFixed, getRect, getPagePosition } from '../utils/dom';

const b = bem('rdf-pop');

export type PopContentPosition =
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

export interface PopContentProps {
  content?: any;
  position: PopContentPosition;
  visible?: boolean;
  withArrow?: boolean;
  getTriggerRef: () => React.RefObject<HTMLDivElement>;
  className?: string;
  style?: React.CSSProperties;
}

export interface PopContentState {
  positionReady?: boolean;
  positionStyle?: React.CSSProperties;
}

export default class Content extends React.Component<
  PopContentProps,
  PopContentState
> {
  static getDerivedStateFromProps(props: PopContentProps) {
    if (!props.visible) {
      return {
        positionReady: false,
      };
    }

    return null;
  }

  state: PopContentState = {
    positionReady: false,
    positionStyle: {},
  };

  popRoot = isBrowser ? document.getElementById('rdf-pop-root') : null;

  isTriggerFixed?: boolean = undefined;

  componentDidMount() {
    this.updatePosition();
  }

  componentDidUpdate(prevProps: PopContentProps) {
    const { visible } = this.props;
    if (visible !== prevProps.visible) {
      this.updatePosition();
    }
  }

  updatePosition = () => {
    const { position, visible, getTriggerRef } = this.props;
    const triggerRef = getTriggerRef();

    if (!visible || !triggerRef.current) {
      return;
    }

    if (typeof this.isTriggerFixed === 'undefined') {
      this.isTriggerFixed = isFixed(triggerRef.current);
    }

    const trigger = getRect(triggerRef.current);
    let pos;

    if (this.isTriggerFixed) {
      pos = trigger;
    } else {
      pos = getPagePosition(triggerRef.current);
    }

    let style: {
      position?: 'fixed';
      top: number;
      left: number;
    };

    switch (position) {
      case 'bottom-left':
        style = {
          top: pos.bottom,
          left: pos.left,
        };
        break;
      case 'bottom-center':
        style = {
          top: pos.bottom,
          left: pos.left + trigger.width / 2,
        };
        break;
      case 'bottom-right':
        style = {
          top: pos.bottom,
          left: pos.right,
        };
        break;
      case 'top-left':
        style = {
          top: pos.top,
          left: pos.left,
        };
        break;
      case 'top-center':
        style = {
          top: pos.top,
          left: pos.left + trigger.width / 2,
        };
        break;
      case 'top-right':
        style = {
          top: pos.top,
          left: pos.right,
        };
        break;
      case 'left-top':
        style = {
          top: pos.top,
          left: pos.left,
        };
        break;
      case 'left-center':
        style = {
          top: pos.top + trigger.height / 2,
          left: pos.left,
        };
        break;
      case 'left-bottom':
        style = {
          top: pos.bottom,
          left: pos.left,
        };
        break;
      case 'right-top':
        style = {
          top: pos.top,
          left: pos.right,
        };
        break;
      case 'right-center':
        style = {
          top: pos.top + trigger.height / 2,
          left: pos.right,
        };
        break;
      case 'right-bottom':
        style = {
          top: pos.bottom,
          left: pos.right,
        };
        break;
      default:
        style = {
          top: pos.bottom,
          left: pos.left,
        };
    }

    if (this.isTriggerFixed) {
      style.position = 'fixed';
    }

    this.setState({
      positionReady: true,
      positionStyle: style,
    });
  };

  throttledUpdatePosition = throttle(this.updatePosition, 100);

  getPopRoot() {
    if (!this.popRoot) {
      this.popRoot = document.createElement('div');
      this.popRoot.id = 'rdf-pop-root';
      document.body.appendChild(this.popRoot);
    }

    return this.popRoot;
  }

  handleEntered = () => {
    window.addEventListener('resize', this.throttledUpdatePosition);
    window.addEventListener('scroll', this.throttledUpdatePosition);
  };

  handleExited = () => {
    window.removeEventListener('resize', this.throttledUpdatePosition);
    window.removeEventListener('scroll', this.throttledUpdatePosition);
  };

  render() {
    const {
      content,
      position,
      visible,
      withArrow,
      className,
      style,
    } = this.props;
    const { positionReady, positionStyle } = this.state;

    if (!isBrowser) {
      return null;
    }

    return ReactDOM.createPortal(
      <CSSTransition
        classNames="rdf-pop-anim-"
        in={visible && positionReady}
        timeout={{ exit: 320 }}
        mountOnEnter
        unmountOnExit
        onEntered={this.handleEntered}
        onExited={this.handleExited}
      >
        <div
          className={cx(className, b('content'), b('content', position))}
          style={{ ...style, ...positionStyle }}
        >
          <div className={b('content-inner')}>{content}</div>
          {withArrow && <div className={b('content-arrow')} />}
        </div>
      </CSSTransition>,
      this.getPopRoot()
    );
  }
}
