import React from 'react';
import cx from 'classnames';
import {
  IconInfo,
  IconCheckCircle,
  IconAlertCircle,
  IconXCircle,
} from '../icon/index';
import bem from '../utils//bem';

const b = bem('rdf-notice');

const icons: Record<
  NoticeType,
  | typeof IconInfo
  | typeof IconCheckCircle
  | typeof IconAlertCircle
  | typeof IconXCircle
> = {
  info: IconInfo,
  success: IconCheckCircle,
  warning: IconAlertCircle,
  error: IconAlertCircle,
};

export type NoticeType = 'info' | 'success' | 'warning' | 'error';

export interface NoticeProps {
  type?: NoticeType;
  inline?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Notice: React.FC<NoticeProps> = props => {
  const { type = 'info', inline, className, style, children } = props;
  const cls = cx(className, b(), b('', type), {
    [b('', 'inline')]: inline,
  });
  const Icon = icons[type];

  return (
    <div className={cls} style={style}>
      <Icon className={b('icon')} />
      {children}
    </div>
  );
};

export default Notice;
