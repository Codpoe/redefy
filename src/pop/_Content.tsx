import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import cx from 'classnames';
import throttle from 'lodash-es/throttle';
import bem from '../utils/bem';
import useWindowEvent from '../utils/use-window-event';
import { getRect, getPagePosition } from '../utils/dom';

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
  visible?: boolean;
  hasArrow?: boolean;
  getTriggerRef: () => React.RefObject<HTMLDivElement>;
  className?: string;
  style?: React.CSSProperties;
}

const Content: React.SFC<PopContentProps> = props => {
  const { content, visible, position, hasArrow, className, style } = props;
  const [positionReady, setPositionReady] = useState(false);
  const [positionStyle, setPositionStyle] = useState({});

  const updatePosition = () => {
    const { visible, getTriggerRef } = props;
    const triggerRef = getTriggerRef();

    if (!visible || !triggerRef.current) {
      return;
    }

    const pos = getPagePosition(triggerRef.current);
    const trigger = getRect(triggerRef.current);
    let style: { top: number; left: number };

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

    setPositionReady(true);
    setPositionStyle(style);
  };

  useEffect(updatePosition, [visible, position]);

  const throttled = throttle(updatePosition, 100);
  useWindowEvent('scroll', throttled);
  useWindowEvent('resize', throttled);

  let popRoot = document.querySelector('body #x-pop-root');

  if (!popRoot) {
    popRoot = document.createElement('div');
    popRoot.id = 'x-pop-root';
    document.body.appendChild(popRoot);
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
        {hasArrow && <div className={b('content-arrow')} />}
      </div>
    </CSSTransition>,
    popRoot
  );
};

export default Content;
