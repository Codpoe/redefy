import React, { useCallback, useRef } from 'react';
import bem from '../utils/bem';
import useWindowEvent from '../utils/use-window-event';

const b = bem('rdf-dialog');

export interface DialogWrapProps {
  maskClosable?: boolean;
  keyClosable?: boolean;
  onClose: () => void;
}

const DialogWrap: React.FC<DialogWrapProps> = props => {
  const { maskClosable, keyClosable, onClose, children } = props;
  const el = useRef<HTMLDivElement>(null);
  const handleMaskClick = useCallback(
    (ev: React.SyntheticEvent) => {
      if (maskClosable && onClose && ev.target === el.current) {
        onClose();
      }
    },
    [maskClosable, onClose]
  );

  useWindowEvent(
    'keydown',
    (ev: any) => {
      if (keyClosable && ev && (ev as React.KeyboardEvent).keyCode === 27) {
        onClose();
      }
    },
    { deps: [keyClosable, onClose] }
  );

  return (
    <div className={b('wrap')} ref={el} onClick={handleMaskClick}>
      {children}
    </div>
  );
};

export default DialogWrap;
