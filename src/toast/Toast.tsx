import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import { CSSTransition } from 'react-transition-group';
import bem from '../utils/bem';
import { Info, CheckCircle, AlertCircle, XCircle } from '../icon/index';
import './styles/toast.css';

const b = bem('x-toast');

const ICONS = {
  info: <Info className={cx(b('icon'), b('icon', 'info'))} />,
  success: <CheckCircle className={cx(b('icon'), b('icon', 'success'))} />,
  warning: <AlertCircle className={cx(b('icon'), b('icon', 'warning'))} />,
  error: <XCircle className={cx(b('icon'), b('icon', 'error'))} />,
};

const TOAST_ROOT_ID = 'x-toast-root';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface ToastProps {
  content: React.ReactNode;
  type?: ToastType;
  duration?: number;
  mountNode?: Element;
  className?: string;
  style?: React.CSSProperties;
}

export interface ToastState {
  visible: boolean;
}

export default class Toast extends React.Component<ToastProps, ToastState> {
  static defaultProps: ToastProps = {
    type: 'info',
    content: '',
    duration: 2000,
  };

  state: ToastState = {
    visible: false,
  };

  toastRoot = document.getElementById(TOAST_ROOT_ID);

  componentDidMount() {
    setTimeout(() => {
      this.setState({ visible: true });
    }, 0);
  }

  handleEntered = () => {
    setTimeout(() => {
      this.setState({ visible: false });
    }, this.props.duration);
  };

  handleExited = () => {
    const { mountNode } = this.props;

    if (!mountNode) {
      return;
    }

    ReactDOM.unmountComponentAtNode(mountNode);
    document.body.removeChild(mountNode);
  };

  getToastRoot() {
    if (!this.toastRoot) {
      this.toastRoot = document.createElement('div');
      this.toastRoot.id = TOAST_ROOT_ID;
      document.body.appendChild(this.toastRoot);
    }

    return this.toastRoot;
  }

  render() {
    const { type = 'info', content, className, style } = this.props;
    const { visible } = this.state;

    return ReactDOM.createPortal(
      <CSSTransition
        classNames="x-toast-anim-"
        in={visible}
        timeout={{ exit: 1000 }}
        mountOnEnter
        unmountOnExit
        onEntered={this.handleEntered}
        onExited={this.handleExited}
      >
        <div className={cx(className, b())} style={style}>
          <div className={b('content')}>
            {ICONS[type]}
            {content}
          </div>
        </div>
      </CSSTransition>,
      this.getToastRoot()
    );
  }
}
