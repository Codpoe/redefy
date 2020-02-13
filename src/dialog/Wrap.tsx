import React, { useCallback, useRef } from 'react';
import bem from '../utils/bem';

const b = bem('rdf-dialog');

export interface DialogWrapProps {
  maskClosable?: boolean;
  onClose: () => void;
}

const DialogWrap: React.FC<DialogWrapProps> = props => {
  const { maskClosable, onClose, children } = props;
  const el = useRef<HTMLDivElement>(null);
  const handleMaskClick = useCallback(
    (ev: React.SyntheticEvent) => {
      if (maskClosable && onClose && ev.target === el.current) {
        onClose();
      }
    },
    [maskClosable, onClose]
  );

  return (
    <div className={b('wrap')} ref={el} onClick={handleMaskClick}>
      {children}
    </div>
  );
};

export default DialogWrap;
