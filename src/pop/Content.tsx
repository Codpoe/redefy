import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import cx from 'classnames';
import bem from '../utils/bem';
import getViewportSize from '../utils/get-viewport-size';

const b = bem('x-pop');

export interface PopContentProps {
  content?: any;
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
  visible: boolean;
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
  state: PopContentState = {
    positionReady: false,
    positionStyle: {},
  };

  popRoot: HTMLElement | null = document.getElementById('x-pop-root');

  componentDidMount() {
    this.updatePosition();
  }

  componentDidUpdate(prevProps: PopContentProps) {
    const { visible } = this.props;
    if (visible !== prevProps.visible) {
      this.updatePosition();

      if (!visible) {
        this.setState({ positionReady: false });
      }
    }
  }

  updatePosition = () => {
    const { position, visible, getTriggerRef } = this.props;
    const triggerRef = getTriggerRef();

    if (!visible || !triggerRef.current) {
      return;
    }

    const r = triggerRef.current.getBoundingClientRect();
    const v = getViewportSize();
    let style: React.CSSProperties;

    switch (position) {
      case 'bottom-left':
        style = { top: r.bottom, left: r.left };
        break;
      case 'bottom-center':
        style = {
          top: r.bottom,
          left: r.left + r.width / 2,
        };
        break;
      case 'bottom-right':
        style = { top: r.bottom, left: r.right };
        break;
      case 'top-left':
        style = { bottom: v.height - r.top, left: r.left };
        break;
      case 'top-center':
        style = {
          bottom: v.height - r.top,
          left: r.left + r.width / 2,
        };
        break;
      case 'top-right':
        style = { bottom: v.height - r.top, left: r.right };
        break;
      case 'left-top':
        style = { top: r.top, right: v.width - r.left };
        break;
      case 'left-center':
        style = {
          top: r.top + r.height / 2,
          right: v.width - r.left,
        };
        break;
      case 'left-bottom':
        style = { top: r.bottom, right: v.width - r.left };
        break;
      case 'right-top':
        style = { top: r.top, left: r.right };
        break;
      case 'right-center':
        style = {
          top: r.top + r.height / 2,
          left: r.right,
        };
        break;
      case 'right-bottom':
        style = { top: r.bottom, left: r.right };
        break;
      default:
        style = { top: r.bottom, left: r.left };
    }

    this.setState({
      positionReady: true,
      positionStyle: style,
    });
  };

  render() {
    const { content, position, visible, className, style } = this.props;
    const { positionReady, positionStyle } = this.state;

    if (!this.popRoot) {
      this.popRoot = document.createElement('div');
      this.popRoot.id = 'x-pop-root';
      document.body.appendChild(this.popRoot);
    }

    return ReactDOM.createPortal(
      <CSSTransition
        classNames="x-pop-anim-"
        in={visible && positionReady}
        timeout={{ exit: 200 }}
        mountOnEnter
        unmountOnExit
      >
        <div
          className={cx(className, b('content'), b('content', position))}
          style={{ ...style, ...positionStyle }}
        >
          <div className={b('content-inner')}>{content}</div>
          <div className={b('content-arrow')} />
        </div>
      </CSSTransition>,
      this.popRoot
    );
  }
}
