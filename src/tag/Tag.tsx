import React from 'react';
import cx from 'classnames';
import bem from '../utils/bem';
import Button from '../button/index';
import { IconX } from '../icon/index';

const b = bem('rdf-tag');

type TagTypes = 'default' | 'primary' | 'success' | 'warning' | 'error';

export interface TagProps {
  [key: string]: any;
  type?: TagTypes;
  round?: boolean;
  href?: string;
  target?: '_self' | '_blank';
  onClick?: () => void;
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export class Tag extends React.Component<TagProps> {
  handleClose = (ev: React.SyntheticEvent) => {
    const { onClose } = this.props;
    ev.stopPropagation();
    ev.preventDefault();

    if (!onClose) {
      return;
    }

    onClose();
  };

  render() {
    const {
      type,
      round,
      className,
      style,
      children,
      onClick,
      onClose,
      ...restProps
    } = this.props;

    const cls = cx(className, b(), {
      [b('', type as TagTypes)]: type,
      [b('', 'clickable')]: onClick,
      [b('', 'closable')]: onClose,
    });

    return (
      <Button
        className={cls}
        style={style}
        flat
        size="small"
        type={type}
        round={round}
        {...restProps}
      >
        <span className={b('content')} onClick={onClick}>
          {children}
        </span>
        {onClose && <IconX className={b('close')} onClick={this.handleClose} />}
      </Button>
    );
  }
}

export default Tag;
