import React, { useCallback } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import cx from 'classnames';
import DialogWrap, { DialogWrapProps } from './Wrap';
import DialogContent, { DialogContentProps } from './Content';
import bem from '../utils/bem';

const b = bem('rdf-dialog');

export interface DialogProps
  extends Omit<DialogWrapProps, 'onClose' | 'onMousePositionChange'>,
    Omit<DialogContentProps, 'onClose'> {
  visible?: boolean;
  mask?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
}

export const Dialog: React.FC<DialogProps> & {
  dialogRoot?: HTMLElement;
} = props => {
  const {
    visible,
    mask,
    maskClosable,
    onVisibleChange,
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
      mountOnEnter
      unmountOnExit
    >
      <div className={cx(b(), className)} style={style}>
        {mask && <div className={b('mask')} />}
        <DialogWrap maskClosable={maskClosable} onClose={handleClose}>
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
};

export default Dialog;
