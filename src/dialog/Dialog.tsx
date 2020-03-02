import React, { useCallback, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import cx from 'classnames';
import DialogWrap, { DialogWrapProps } from './Wrap';
import DialogContent, { DialogContentProps } from './Content';
import bem from '../utils/bem';
import { isBrowser, noop } from '../utils/vars';

const b = bem('rdf-dialog');

export interface DialogProps
  extends Omit<DialogWrapProps, 'onClose'>,
    Omit<DialogContentProps, 'onClose'> {
  visible?: boolean;
  mask?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  onExited?: () => void;
  className?: string;
  style?: React.CSSProperties;
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
}

export const Dialog: React.FC<DialogProps> & {
  dialogRoot?: HTMLElement;
  open: (props: DialogProps) => void;
} = props => {
  if (!isBrowser) {
    return null;
  }

  const {
    visible,
    mask,
    maskClosable,
    keyClosable,
    onVisibleChange,
    onExited,
    className,
    style,
    contentClassName,
    contentStyle,
    ...restProps
  } = props;

  const handleClose = useCallback(() => {
    if (onVisibleChange) {
      onVisibleChange(false);
    }
  }, [onVisibleChange]);

  if (!Dialog.dialogRoot) {
    Dialog.dialogRoot = document.createElement('div');
    Dialog.dialogRoot.id = 'rdf-dialog-root';
    document.body.appendChild(Dialog.dialogRoot);
  }

  return ReactDOM.createPortal(
    <CSSTransition
      classNames="rdf-dialog-anim-"
      in={visible}
      timeout={{ exit: 500 }}
      appear
      mountOnEnter
      unmountOnExit
      onExited={onExited}
    >
      <div className={cx(b(), className)} style={style}>
        {mask && <div className={b('mask')} />}
        <DialogWrap
          maskClosable={maskClosable}
          keyClosable={keyClosable}
          onClose={handleClose}
        >
          <DialogContent
            {...restProps}
            onClose={handleClose}
            className={contentClassName}
            style={contentStyle}
          />
        </DialogWrap>
      </div>
    </CSSTransition>,
    Dialog.dialogRoot
  );
};

Dialog.defaultProps = {
  visible: false,
  mask: true,
  maskClosable: true,
  keyClosable: true,
};

Dialog.open = props => {
  let close = noop;

  // create mount node
  const div = document.createElement('div');
  document.body.appendChild(div);

  const Alone = (props: DialogProps) => {
    const [visible, setVisible] = useState(true);
    const handleVisibleChange = useCallback(visible => {
      setVisible(visible);
    }, []);
    const handleExited = useCallback(() => {
      // trigger unmount
      ReactDOM.unmountComponentAtNode(div);
    }, []);

    useEffect(() => {
      close = () => setVisible(false);
      return () => {
        // clean
        close = noop;
        document.body.removeChild(div);
      };
    }, []);

    return (
      <Dialog
        {...props}
        visible={visible}
        onVisibleChange={handleVisibleChange}
        onExited={handleExited}
      />
    );
  };

  ReactDOM.render(<Alone {...props} />, div);

  // closure
  return () => close();
};

export default Dialog;
