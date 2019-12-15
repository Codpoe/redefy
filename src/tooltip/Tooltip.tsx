import React from 'react';
import cx from 'classnames';
import Pop, { PopProps } from '../pop/index';
import bem from '../utils/bem';

const b = bem('x-tooltip');

export type TooltipProps = PopProps;

export const Tooltip: React.SFC<TooltipProps> = (props: TooltipProps) => (
  <Pop
    delay={[300, 150]}
    {...props}
    className={cx(b(), props.className)}
    contentClassName={cx(b('content'), props.contentClassName)}
  />
);

Tooltip.defaultProps = {
  position: 'top-center',
  withArrow: true,
};

export default Tooltip;
