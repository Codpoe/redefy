import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import cx from 'classnames';
import bem from '../utils/bem';
import { isBrowser } from '../utils/vars';

const b = bem('rdf-drawer');

const drawerMap: Record<string, Drawer> = {};

type Position = 'top' | 'right' | 'bottom' | 'left';

export interface DrawerProps {
  id?: string;
  visible?: boolean;
  defaultVisible?: boolean;
  position?: Position;
  mask?: boolean;
  maskClosable?: boolean;
  disabled?: boolean;
  root?: Element | null;
  onVisibleChange?: (visible: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface DrawerState {
  visible: boolean;
}

export class Drawer extends React.Component<DrawerProps> {
  static defaultProps: Partial<DrawerProps> = {
    defaultVisible: false,
    position: 'top',
    mask: true,
    maskClosable: true,
    disabled: false,
  };

  static getDerivedStateFromProps(props: DrawerProps) {
    if ('visible' in props) {
      return { visible: props.visible };
    }

    return null;
  }

  static toggle(id: string, visible?: boolean) {
    const drawer = drawerMap[id];

    if (!drawer) {
      return;
    }

    visible = typeof visible === 'undefined' ? !drawer.state.visible : visible;
    drawer.changeVisible(visible);
  }

  state: DrawerState = {
    visible: ('visible' in this.props
      ? this.props.visible
      : this.props.defaultVisible) as boolean,
  };

  constructor(props: DrawerProps) {
    super(props);

    if (props.id) {
      drawerMap[props.id] = this;
    }
  }

  changeVisible = (visible: boolean) => {
    const { disabled, onVisibleChange } = this.props;

    if (disabled) {
      return;
    }

    if (!('visible' in this.props)) {
      this.setState({ visible });
    }

    if (onVisibleChange) {
      onVisibleChange(visible);
    }
  };

  handleMaskClick = () => {
    const { maskClosable } = this.props;

    if (maskClosable) {
      this.changeVisible(false);
    }
  };

  render() {
    if (!isBrowser) {
      return null;
    }

    const { position, mask, root, className, style, children } = this.props;
    const { visible } = this.state;
    const cls = cx(b(), className, b('', position as Position));

    let drawerRoot = root || document.getElementById('rdf-drawer-root');

    if (!drawerRoot) {
      drawerRoot = document.createElement('div');
      drawerRoot.id = 'rdf-drawer-root';
      document.body.appendChild(drawerRoot);
    }

    return ReactDOM.createPortal(
      <CSSTransition
        classNames="rdf-drawer-anim-"
        in={visible}
        timeout={{ exit: 300 }}
        appear
        mountOnEnter
        unmountOnExit
      >
        <div className={cls} style={style}>
          {mask && <div className={b('mask')} onClick={this.handleMaskClick} />}
          <div className={b('content')}>{children}</div>
        </div>
      </CSSTransition>,
      drawerRoot
    );
  }
}

export default Drawer;
