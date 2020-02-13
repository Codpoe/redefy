import React from 'react';
import cx from 'classnames';
import Button, { ButtonProps } from '../button/index';
import { IconX } from '../icon/index';
import bem from '../utils/bem';

const b = bem('rdf-dialog');

type DialogButtonType = 'default' | 'primary' | 'success' | 'warning' | 'error';

export interface DialogContentProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  okType?: DialogButtonType;
  cancelType?: DialogButtonType;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  okProps?: ButtonProps;
  cancelProps?: ButtonProps;
  onOk?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const DialogContent: React.FC<DialogContentProps> = props => {
  const {
    okType,
    okText,
    okProps,
    cancelType,
    cancelText,
    cancelProps,
    onOk,
    onCancel,
    onClose,
    style,
    className,
    children,
  } = props;
  let { header, footer } = props;
  const actions: React.ReactNode[] = [];

  // render header
  if (['string', 'number'].includes(typeof header)) {
    header = <div className={b('header')}>{header}</div>;
  }

  // render footer
  if (!footer) {
    if (onCancel) {
      actions.push(
        <Button
          key="cancel"
          type={cancelType}
          onClick={onCancel}
          {...cancelProps}
        >
          {cancelText}
        </Button>
      );
    }

    if (onOk) {
      actions.push(
        <Button key="ok" type={okType} onClick={onOk} {...okProps}>
          {okText}
        </Button>
      );
    }

    if (actions.length) {
      footer = <div className={b('footer')}>{actions}</div>;
    }
  }

  return (
    <div className={cx(b('content'), className)} style={style}>
      {header}
      <div className={b('body')}>{children}</div>
      {footer}
      <Button className={b('close-btn')} text fullRound onClick={onClose}>
        <IconX />
      </Button>
    </div>
  );
};

DialogContent.defaultProps = {
  okType: 'primary',
  okText: '确认',
  cancelType: 'default',
  cancelText: '取消',
};

export default DialogContent;
